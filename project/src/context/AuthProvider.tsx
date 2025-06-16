import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('qrkart-user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('qrkart-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('qrkart-user', JSON.stringify(data.user));
        localStorage.setItem('qrkart-token', data.token);
        return true;
      } else {
        console.error(data.message || 'Login failed');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    try {
      // Register user
      const userRes = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const userResult = await userRes.json();
      if (!userRes.ok) {
        console.error(userResult.message || 'User registration failed');
        return false;
      }

      // Register vendor
      const vendorRes = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          upiId: userData.upiId,
          location: userData.location || 'Not updated',
          coordinates: userData.coordinates || {},
          cartStatus: 'Pending',
        }),
      });

      const vendorResult = await vendorRes.json();
      if (!vendorRes.ok) {
        console.error(vendorResult.message || 'Vendor registration failed');
        return false;
      }

      // Merge vendor ID into user
      const finalUser = {
        ...userResult.user,
        vendorId: vendorResult.vendor._id,
      };

      setUser(finalUser);
      localStorage.setItem('qrkart-user', JSON.stringify(finalUser));
      localStorage.setItem('qrkart-token', userResult.token);

      return true;
    } catch (err) {
      console.error('Registration error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qrkart-user');
    localStorage.removeItem('qrkart-token');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
