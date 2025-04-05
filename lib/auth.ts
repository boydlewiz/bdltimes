import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  id: string
  name: string
  email: string
  image?: string
  role: "user" | "editor" | "admin"
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "admin",
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find user with matching email (in a real app, we'd verify the password too)
        const user = mockUsers.find((u) => u.email === email)

        if (user) {
          set({ user, isAuthenticated: true })
          return true
        }

        return false
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        const existingUser = mockUsers.find((u) => u.email === email)
        if (existingUser) {
          return false
        }

        // Create new user
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          role: "user",
        }

        // In a real app, we'd save this to a database
        mockUsers.push(newUser)

        set({ user: newUser, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }))
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

