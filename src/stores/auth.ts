import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DatabaseService } from '../services/db';

interface User {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const db = new DatabaseService();

  async function init() {
    try {
      await db.initDB();
      // Recupera dados da sessão
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        const savedUser = await db.getUser(savedEmail);
        if (savedUser) {
          user.value = savedUser;
          isAuthenticated.value = true;
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao inicializar auth:', error);
      return false;
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const foundUser = await db.getUser(email);
      if (foundUser && foundUser.password === password) {
        user.value = foundUser;
        isAuthenticated.value = true;
        // Salva dados da sessão
        localStorage.setItem('userEmail', email);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  }

  async function register(userData: User): Promise<void> {
    try {
      await db.createUser(userData);
      user.value = userData;
      isAuthenticated.value = true;
      // Salva dados da sessão
      localStorage.setItem('userEmail', userData.email);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  function logout(): void {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('userEmail');
  }

  return {
    user,
    isAuthenticated,
    init,
    login,
    register,
    logout
  };
});
