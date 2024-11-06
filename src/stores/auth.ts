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
    await db.initDB();
  }

  async function login(email: string, password: string): Promise<boolean> {
    const foundUser = await db.getUser(email);
    if (foundUser && foundUser.password === password) {
      user.value = foundUser;
      isAuthenticated.value = true;
      return true;
    }
    return false;
  }

  async function register(userData: User): Promise<void> {
    await db.createUser(userData);
  }

  function logout(): void {
    user.value = null;
    isAuthenticated.value = false;
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