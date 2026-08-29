import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/profile');
          setUser(res.data.data);
        } catch (error) {
          console.error('Failed to load user:', error);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { user: userData, token: authToken } = res.data.data;
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);
      
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
        confirmButtonColor: '#6366f1',
      });
      return false;
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      const res = await API.post('/auth/signup', {
        name: fullName,
        email,
        password,
        confirmPassword: password,
      });
      
      const { user: userData, token: authToken } = res.data.data;
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);
      
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Error creating account',
        confirmButtonColor: '#6366f1',
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      if (token) await API.post('/auth/logout');
    } catch (error) {
      // Fallthrough
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);