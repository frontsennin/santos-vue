interface User {
  email: string;
  password: string;
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
} 