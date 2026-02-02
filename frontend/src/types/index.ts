export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content?: string
  published: boolean
  authorId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  name: string
  email: string
}

export interface CreatePostRequest {
  title: string
  content?: string
  published?: boolean
}

export interface UpdatePostRequest {
  id: string
  title?: string
  content?: string
  published?: boolean
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PWABeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}