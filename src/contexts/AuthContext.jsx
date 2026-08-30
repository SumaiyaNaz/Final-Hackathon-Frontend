import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Load user on app start if token exists
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

  // Login function
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
        text: `Hello ${userData.name}`,
        timer: 2000,
        showConfirmButton: false,
        background: 'white',
        backdrop: 'rgba(0,0,0,0.4)',
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials. Please try again.',
        confirmButtonColor: '#6366f1',
      });
      return false;
    }
  };

  // Signup function
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
        text: `Welcome ${userData.name}! Your account has been created successfully.`,
        timer: 2000,
        showConfirmButton: false,
        background: 'white',
        backdrop: 'rgba(0,0,0,0.4)',
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Error creating account. Please try again.',
        confirmButtonColor: '#6366f1',
      });
      return false;
    }
  };

  // Logout function
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
        background: 'white',
        backdrop: 'rgba(0,0,0,0.4)',
      });
    }
  };

  // Update profile function
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
        background: 'white',
        backdrop: 'rgba(0,0,0,0.4)',
      });
      
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile.',
        confirmButtonColor: '#6366f1',
      });
      return false;
    }
  };

  // Get user's first letter for avatar
  const getFirstLetter = () => {
    if (!user || !user.name) return 'U';
    return user.name.charAt(0).toUpperCase();
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    getFirstLetter,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};