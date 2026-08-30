import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullName.length < 2) {
      return Swal.fire({
        icon: 'warning',
        title: 'Name Too Short',
        text: 'Name must be at least 2 characters long.',
        confirmButtonColor: '#8C5A32',
      });
    }

    if (password.length < 8) {
      return Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters long.',
        confirmButtonColor: '#8C5A32',
      });
    }

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Passwords Mismatch',
        text: 'Password and confirm password do not match.',
        confirmButtonColor: '#8C5A32',
      });
    }

    setLoading(true);
    const result = await signup(fullName, email, password);
    setLoading(false);

    if (result) {
      navigate('/home');
    }
  };

  return (
    <div className="page-container flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-2xl glass shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-[#3D2817] dark:text-[#8C5A32]">Create</span>
            <span className="text-[#8C5A32] dark:text-[#D4A574]"> Account</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Join SupportFlow and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="input-focus"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-focus"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 8 chars)"
                className="input-focus pr-12"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                disabled={loading}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="input-focus pr-12"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                disabled={loading}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center"
          >
            {loading ? (
              <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8C5A32] dark:text-[#D4A574] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}