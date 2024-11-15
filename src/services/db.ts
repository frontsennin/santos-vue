interface User {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  phone?: string;
  address?: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  gender?: string;
}

export class DatabaseService {
  private db: IDBDatabase | null = null;

  async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('SantosSociosDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'email' });
          userStore.createIndex('email', 'email', { unique: true });
        }
      };
    });
  }

  async createUser(user: User): Promise<IDBValidKey> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise<IDBValidKey>((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add(user);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(email: string): Promise<User | undefined> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise<User | undefined>((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(email);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateUser(email: string, userData: User): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');

      // Primeiro verifica se o usuário existe
      const getRequest = store.get(email);

      getRequest.onsuccess = () => {
        if (!getRequest.result) {
          reject(new Error('Usuário não encontrado'));
          return;
        }

        // Mescla os dados existentes com os novos dados
        const existingUser = getRequest.result;
        const updatedUser = {
          ...existingUser,
          ...userData,
          // Garante que o email não seja alterado pois é a chave
          email: email
        };

        // Atualiza os dados mantendo o email como chave
        const updateRequest = store.put(updatedUser);

        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}
