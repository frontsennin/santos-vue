export const VALIDATION_MESSAGES = {
  REQUIRED: 'Campo obrigatório',
  EMAIL_INVALID: 'E-mail inválido',
  PASSWORD_MIN: 'A senha deve ter pelo menos 6 caracteres',
  PASSWORD_MATCH: 'As senhas não coincidem',
  CPF_INVALID: 'CPF inválido',
  AGE_MIN: 'É necessário ter pelo menos 18 anos',
  GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.'
}

export const REGEX_PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{2}\) \d{5}-\d{4}$/
}

export const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, '')
  
  if (numbers.length !== 11) return false
  
  // Implementar validação completa de CPF aqui
  return true
}

export const validateAge = (birthDate: string): boolean => {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  return age > 18 || (age === 18 && monthDiff >= 0)
} 