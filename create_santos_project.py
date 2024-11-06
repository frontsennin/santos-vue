import os
import subprocess
import urllib.request

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def create_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def download_logo():
    # Criar diretório assets se não existir
    create_directory('src/assets')
    
    # URL da logo do Santos
    logo_url = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png'
    
    # Baixar e salvar a logo
    urllib.request.urlretrieve(logo_url, 'src/assets/santos-logo.png')

def main():
    # Criar projeto Vue
    subprocess.run(['npm', 'create', 'vue@latest', 'santos-socios', '--', '--typescript', '--router', '--pinia', '--eslint', '--prettier'], check=True)
    
    # Mudar para o diretório do projeto
    os.chdir('santos-socios')
    
    # Instalar dependências incluindo Sass
    try:
        subprocess.run(['npm', 'install'], check=True)
        subprocess.run(['npm', 'install', '@vueuse/core'], check=True)
        subprocess.run(['npm', 'install', '-D', 'sass'], check=True)
        subprocess.run(['npm', 'install', '-D', 'sass-embedded'], check=True)
    except AttributeError:
        subprocess.check_call(['npm', 'install'])
        subprocess.check_call(['npm', 'install', '@vueuse/core'])
        subprocess.check_call(['npm', 'install', '-D', 'sass'])
        subprocess.check_call(['npm', 'install', '-D', 'sass-embedded'])

    # Criar estrutura de diretórios incluindo assets
    directories = [
        'src/services',
        'src/stores',
        'src/views',
        'src/components',
        'src/styles',
        'src/styles/views',
        'src/assets',
    ]

    for directory in directories:
        create_directory(directory)

    # Baixar logo do Santos
    download_logo()

    # Conteúdo dos arquivos
    db_service = '''export class DatabaseService {
  db = null;

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('SantosSociosDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const userStore = db.createObjectStore('users', { keyPath: 'email' });
        userStore.createIndex('email', 'email', { unique: true });
      };
    });
  }

  async createUser(user) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add(user);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(email) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(email);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}'''

    auth_store = '''import { defineStore } from 'pinia';
import { DatabaseService } from '../services/db';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    db: new DatabaseService(),
  }),

  actions: {
    async init() {
      await this.db.initDB();
    },

    async login(email, password) {
      const user = await this.db.getUser(email);
      if (user && user.password === password) {
        this.user = user;
        this.isAuthenticated = true;
        return true;
      }
      return false;
    },

    async register(userData) {
      await this.db.createUser(userData);
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});'''

    login_view = '''<template>
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/santos-logo.png" alt="Santos FC Logo" class="logo">
      <h2>Login Sócio Santos FC</h2>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input 
            v-model="email" 
            type="email" 
            placeholder="E-mail"
            required
          >
        </div>
        
        <div class="form-group">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Senha"
            required
          >
        </div>

        <button type="submit" class="login-button">
          Entrar
        </button>
      </form>

      <p class="register-link">
        Ainda não é sócio? 
        <router-link to="/register">Cadastre-se aqui</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push('/dashboard');
    } else {
      alert('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1c1c1c 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.logo {
  width: 120px;
  margin: 0 auto 2rem;
  display: block;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.login-button {
  background: #000000;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #333;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}
</style>'''

    # Conteúdo dos arquivos de estilo
    mixins_scss = '''// Variáveis
$primary-color: #000000;
$secondary-color: #1c1c1c;
$white: #ffffff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-600: #6c757d;

// Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@mixin gradient-background {
  background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
}

@mixin responsive-image {
  max-width: 100%;
  height: auto;
}

@mixin transition-all {
  transition: all 0.3s ease;
}'''

    main_scss = '''// Importações do Bootstrap e Font Awesome
@import 'bootstrap/dist/css/bootstrap.min.css';
@import '@fortawesome/fontawesome-free/css/all.min.css';

// Importação dos mixins
@import './mixins';

// Estilos globais
body {
  font-family: var(--bs-body-font-family);
  background-color: $gray-100;
}

// Estilos de componentes comuns
.auth-container {
  @include flex-center;
  min-height: 100vh;
  @include gradient-background;
  padding: 1rem;
}

.auth-card {
  background: $white;
  padding: 2rem;
  border-radius: 1rem;
  @include card-shadow;
  width: 100%;
  max-width: 400px;
}

.auth-logo {
  @include responsive-image;
  max-width: 120px;
  margin: 0 auto 2rem;
  display: block;
}

// Importações de estilos específicos de views
@import './views/login';
@import './views/register';
@import './views/dashboard';'''

    login_scss = '''.login-view {
  .form-control {
    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 0.25rem rgba($primary-color, 0.25);
    }
  }

  .btn-dark {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      background-color: $secondary-color;
    }
  }
}'''

    register_scss = '''.register-view {
  .form-control {
    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 0.25rem rgba($primary-color, 0.25);
    }
  }

  .btn-dark {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      background-color: $secondary-color;
    }
  }
}'''

    dashboard_scss = '''.dashboard-view {
  .navbar {
    @include card-shadow;
  }

  .navbar-brand img {
    @include transition-all;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  .btn-outline-light {
    @include transition-all;
    
    &:hover {
      transform: translateY(-1px);
    }
  }

  .card {
    @include card-shadow;
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}'''

    # Criar arquivos
    files = {
        'src/services/db.ts': db_service,
        'src/stores/auth.ts': auth_store,
        'src/views/LoginView.vue': login_view,
    }

    # Adicionar arquivos de estilo ao dicionário de arquivos
    style_files = {
        'src/styles/_mixins.scss': mixins_scss,
        'src/styles/main.scss': main_scss,
        'src/styles/views/_login.scss': login_scss,
        'src/styles/views/_register.scss': register_scss,
        'src/styles/views/_dashboard.scss': dashboard_scss,
    }

    # Atualizar o dicionário de arquivos com os arquivos de estilo
    files.update(style_files)

    # Criar todos os arquivos
    for file_path, content in files.items():
        create_file(file_path, content)

    print("Projeto criado com sucesso!")
    print("Para iniciar o projeto:")
    print("1. cd santos-socios")
    print("2. npm run dev")

if __name__ == "__main__":
    main()