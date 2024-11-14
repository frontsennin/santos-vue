import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: number
  type: NotificationType
  message: string
  timeout?: number
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  let nextId = 1

  const addNotification = (
    message: string,
    type: NotificationType = 'info',
    timeout = 5000
  ) => {
    const notification: Notification = {
      id: nextId++,
      type,
      message,
      timeout
    }

    notifications.value.push(notification)

    if (timeout) {
      setTimeout(() => {
        removeNotification(notification.id)
      }, timeout)
    }
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
})
