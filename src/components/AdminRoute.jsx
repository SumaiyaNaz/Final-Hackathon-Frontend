// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../contexts/AuthContext';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await login(email, password);
//     setLoading(false);
//     if (result) {
//       navigate('/home');
//     }
//   };

//   return (
//     <div className="page-container flex items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md p-8 rounded-2xl glass shadow-xl"
//       >
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold">
//             <span className="text-[#3D2817] dark:text-[#8C5A32]">Welcome</span>
//             <span className="text-[#8C5A32] dark:text-[#D4A574]"> Back</span>
//           </h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//             Sign in to your SupportFlow account
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="name@example.com"
//               className="input-focus"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="input-focus pr-12"
//                 disabled={loading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
//                 disabled={loading}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full btn-primary flex justify-center items-center"
//           >
//             {loading ? (
//               <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-[#8C5A32] dark:text-[#D4A574] font-semibold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }







import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FAFAFA] dark:bg-gray-900">
        <div className="spinner h-12 w-12"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}