import React, { useState, createContext } from 'react';

import { loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password, onResolve) => {
    setIsLoading(true);
    if (!email || !password) return;
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        onResolve && onResolve();
      })
      .catch((e) => {
        setIsLoading(false);
        setError('Email or Password is not correct!');
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
