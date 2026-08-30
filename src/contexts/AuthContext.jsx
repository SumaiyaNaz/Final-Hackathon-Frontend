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
          console.log('Profile response:', res.data);
          setUser(res.data.data);
          console.log('User role after load:', res.data.data.role);
        } catch (error) {
          console.error('Failed to load user:', error);
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setToken(null);
          }
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

      console.log('Login response - user data:', userData);
      console.log('Login response - user role:', userData.role);

      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);

      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Hello ${userData.name}`,
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials. Please try again.',
        confirmButtonColor: '#8C5A32',
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
        text: `Welcome ${userData.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Error creating account. Please try again.',
        confirmButtonColor: '#8C5A32',
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await API.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);

      Swal.fire({
        icon: 'info',
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const updateProfile = async (name) => {
    try {
      const res = await API.put('/auth/profile', { name });
      setUser(res.data.data);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile.',
        confirmButtonColor: '#8C5A32',
      });
      return false;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
  };

  console.log('AuthContext - isAdmin:', value.isAdmin);
  console.log('AuthContext - user role:', user?.role);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};