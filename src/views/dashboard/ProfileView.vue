<template>
  <div class="container py-4">
    <h1 class="h3 mb-4">Meu Perfil</h1>

    <div class="row g-4">
      <!-- Informações Básicas -->
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent">
            <h5 class="mb-0">Informações Básicas</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label">Nome Completo</label>
                  <input type="text" class="form-control" v-model="profileData.name">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">E-mail</label>
                  <input type="email" class="form-control" v-model="profileData.email" disabled>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">CPF</label>
                  <input type="text" class="form-control" v-model="profileData.cpf" disabled>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Data de Nascimento</label>
                  <input type="date" class="form-control" v-model="profileData.birthDate" disabled>
                </div>
              </div>
              <div class="mt-5 d-flex justify-content-end">
                <button type="submit" class="btn btn-dark" :disabled="isSaving">
                  <span v-if="isSaving">
                    <i class="fas fa-spinner fa-spin me-2"></i>Salvando...
                  </span>
                  <span v-else>
                    Salvar Informações Básicas
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Informações Adicionais -->
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent">
            <h5 class="mb-0">Informações Adicionais</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleAdditionalInfoSubmit">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label">Telefone</label>
                  <input type="tel" class="form-control" v-model="additionalInfo.phone" v-maska="'(##) #####-####'"
                    placeholder="(00) 00000-0000">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Sexo</label>
                  <select class="form-select" v-model="additionalInfo.gender">
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                    <option value="N">Prefiro não informar</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">CEP</label>
                  <input type="text" class="form-control" v-model="additionalInfo.cep" v-maska="'#####-###'"
                    placeholder="00000-000" @blur="fetchAddress">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Endereço</label>
                  <input type="text" class="form-control" v-model="additionalInfo.street">
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Número</label>
                  <input type="text" class="form-control" v-model="additionalInfo.number">
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Complemento</label>
                  <input type="text" class="form-control" v-model="additionalInfo.complement">
                </div>
                <div class="col-12 col-md-4">
                  <label class="form-label">Bairro</label>
                  <input type="text" class="form-control" v-model="additionalInfo.neighborhood">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Cidade</label>
                  <input type="text" class="form-control" v-model="additionalInfo.city">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Estado</label>
                  <input type="text" class="form-control" v-model="additionalInfo.state">
                </div>
              </div>
              <div class="mt-5 d-flex justify-content-end">
                <button type="submit" class="btn btn-dark" :disabled="isSaving">
                  <span v-if="isSaving">
                    <i class="fas fa-spinner fa-spin me-2"></i>Salvando...
                  </span>
                  <span v-else>
                    Salvar Informações Adicionais
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Reconhecimento Facial -->
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Reconhecimento Facial</h5>
            <button class="btn btn-dark" @click="showFaceRecognitionModal = true">
              <i class="fas fa-camera me-2"></i>Cadastrar Face ID
            </button>
          </div>
          <div class="card-body">
            <div class="face-recognition-status">
              <i :class="['fas', hasFaceId ? 'fa-check-circle text-success' : 'fa-times-circle text-danger']"></i>
              <span>{{ hasFaceId ? 'Face ID cadastrado' : 'Face ID não cadastrado' }}</span>
            </div>
            <p class="text-muted mt-2">
              O reconhecimento facial permite entrada mais rápida nos jogos, sem necessidade de apresentar documentos.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Reconhecimento Facial -->
    <div class="modal fade" :class="{ 'show': showFaceRecognitionModal }" v-if="showFaceRecognitionModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Face ID</h5>
            <button type="button" class="btn-close" @click="showFaceRecognitionModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="face-capture-area">
              <div v-if="!isCapturing" class="text-center">
                <i class="fas fa-camera fa-3x mb-3"></i>
                <p>Clique no botão abaixo para iniciar a captura</p>
                <button class="btn btn-dark" @click="startCapture">
                  Iniciar Captura
                </button>
              </div>
              <video v-else ref="videoRef" autoplay playsinline></video>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showFaceRecognitionModal = false">
              Cancelar
            </button>
            <button type="button" class="btn btn-dark" :disabled="!isCapturing" @click="captureFace">
              Capturar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { vMaska } from 'maska/vue'
import { useNotificationStore } from '@/stores/notification'
import { DatabaseService } from '@/services/db';



const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const profileData = ref({ ...authStore.user })
const showFaceRecognitionModal = ref(false)
const isCapturing = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const hasFaceId = ref(false)
const isSaving = ref(false)

const additionalInfo = ref({
  phone: '',
  gender: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
})

onMounted(() => {
  loadUserData()
})

const loadUserData = async () => {
  try {
    if (!authStore.user?.email) return

    const dbService = new DatabaseService()
    await dbService.initDB()
    const userData = await dbService.getUser(authStore.user.email)

    if (userData) {
      // Preenche os dados básicos
      profileData.value = {
        name: userData.name,
        email: userData.email,
        cpf: userData.cpf,
        birthDate: userData.birthDate,
        password: userData.password
      }

      // Preenche os dados adicionais se existirem
      if (userData.phone || userData.address) {
        additionalInfo.value = {
          phone: userData.phone || '',
          gender: userData.gender || '',
          cep: userData.address?.cep || '',
          street: userData.address?.street || '',
          number: userData.address?.number || '',
          complement: userData.address?.complement || '',
          neighborhood: userData.address?.neighborhood || '',
          city: userData.address?.city || '',
          state: userData.address?.state || ''
        }
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error)
    notificationStore.addNotification('Erro ao carregar dados do usuário', 'error')
  }
}

const fetchAddress = async () => {
  if (additionalInfo.value.cep.length === 9) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${additionalInfo.value.cep.replace('-', '')}/json/`)
      const data = await response.json()

      if (!data.erro) {
        additionalInfo.value.street = data.logradouro
        additionalInfo.value.neighborhood = data.bairro
        additionalInfo.value.city = data.localidade
        additionalInfo.value.state = data.uf
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }
}

const startCapture = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      isCapturing.value = true
    }
  } catch (error) {
    console.error('Erro ao acessar câmera:', error)
    notificationStore.addNotification('Erro ao acessar câmera', 'error')
  }
}

const captureFace = () => {
  // Implementar captura e processamento da imagem
  hasFaceId.value = true
  showFaceRecognitionModal.value = false
  isCapturing.value = false
  if (videoRef.value?.srcObject) {
    const tracks = (videoRef.value.srcObject as MediaStream).getTracks()
    tracks.forEach(track => track.stop())
  }
  notificationStore.addNotification('Face ID cadastrado com sucesso!', 'success')
}

const handleSubmit = async () => {
  try {
    isSaving.value = true

    if (!profileData.value.name?.trim()) {
      notificationStore.addNotification('Nome é obrigatório', 'error')
      return
    }

    if (!authStore.user) return

    // Cria um objeto User usando a estrutura existente
    const updatedUser = {
      name: profileData.value.name,
      cpf: authStore.user.cpf,
      birthDate: authStore.user.birthDate,
      email: authStore.user.email,
      password: authStore.user.password
    }

    // Usa o DatabaseService existente
    const dbService = new DatabaseService()
    await dbService.initDB()
    await dbService.updateUser(updatedUser.email, updatedUser)

    // Atualiza o auth store
    await authStore.login(updatedUser.email, updatedUser.password)

    notificationStore.addNotification('Informações básicas atualizadas com sucesso!', 'success')
  } catch (error) {
    console.error('Erro ao atualizar informações básicas:', error)
    notificationStore.addNotification('Erro ao atualizar informações', 'error')
  } finally {
    isSaving.value = false
  }
}

const handleAdditionalInfoSubmit = async () => {
  try {
    isSaving.value = true

    if (!authStore.user) return

    // Validação do telefone (se fornecido)
    if (additionalInfo.value.phone && additionalInfo.value.phone.length < 14) {
      notificationStore.addNotification('Telefone inválido', 'error')
      return
    }

    // Validação do CEP (se fornecido)
    if (additionalInfo.value.cep && additionalInfo.value.cep.length < 9) {
      notificationStore.addNotification('CEP inválido', 'error')
      return
    }

    // Usa o DatabaseService existente
    const dbService = new DatabaseService()
    await dbService.initDB()

    // Mantém a estrutura do User existente e adiciona as informações adicionais
    const updatedUser = {
      name: authStore.user.name,
      email: authStore.user.email,
      cpf: authStore.user.cpf,
      birthDate: authStore.user.birthDate,
      password: authStore.user.password,
      phone: additionalInfo.value.phone || '',
      gender: additionalInfo.value.gender || '',
      address: {
        cep: additionalInfo.value.cep || '',
        street: additionalInfo.value.street || '',
        number: additionalInfo.value.number || '',
        complement: additionalInfo.value.complement || '',
        neighborhood: additionalInfo.value.neighborhood || '',
        city: additionalInfo.value.city || '',
        state: additionalInfo.value.state || ''
      }
    }

    await dbService.updateUser(authStore.user.email, updatedUser)

    // Atualiza o auth store
    await authStore.login(updatedUser.email, updatedUser.password)

    notificationStore.addNotification('Informações adicionais atualizadas com sucesso!', 'success')
  } catch (error) {
    console.error('Erro ao atualizar informações adicionais:', error)
    notificationStore.addNotification('Erro ao atualizar informações adicionais', 'error')
  } finally {
    isSaving.value = false
  }
}

const resetForm = () => {
  profileData.value = { ...authStore.user }
  additionalInfo.value = {
    phone: '',
    gender: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: none;
  background-color: rgba(0, 0, 0, 0.5);

  &.show {
    display: block;
  }
}

.face-capture-area {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;

  video {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
  }
}

.face-recognition-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.5rem;
  }
}

.card-header {
  border-bottom: none;
  padding-bottom: 0;
}

.form-control:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}
</style>
