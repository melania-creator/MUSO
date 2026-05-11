import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const login = useCallback(async (email, password) => {
    const u = await authService.login(email, password);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (data) => {
    const u = await authService.register(data);
    setUser(u);
    return u;
  }, []);

  const loginWithProvider = useCallback(async (provider, data) => {
    const u = await authService.loginWithProvider(provider, data);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const u = await authService.updateProfile(updates);
    setUser(u);
    return u;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithProvider, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
