import React, { useState, createContext } from 'react'

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const onLogin = (email, password, onResolve) => {
    setIsLoading(true)
    if (!email || !password) return
    setIsLoading(false)
    onResolve && onResolve()
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
      }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
