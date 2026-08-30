import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'quickserve_auth_user_v2'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse auth user', e)
    }
    // Default demo user
    return {
      id: 'cust-101',
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      role: 'customer',
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = (email, role = 'customer', name = '') => {
    const defaultName = name.trim() || email.split('@')[0]
    const defaultId = role === 'provider' ? '10000000-0000-0000-0000-000000000001' : 'cust-101'
    const newUser = {
      id: defaultId,
      email,
      name: defaultName.charAt(0).toUpperCase() + defaultName.slice(1),
      role,
    }
    setUser(newUser)
    return newUser
  }

  const register = (email, role, name) => {
    return login(email, role, name)
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (newRole) => {
    if (!user) return
    const updated = {
      ...user,
      role: newRole,
      id: newRole === 'provider' ? '10000000-0000-0000-0000-000000000001' : 'cust-101',
      name: newRole === 'provider' ? 'Marcus Chen' : 'Jane Doe',
    }
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role || 'customer', login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
