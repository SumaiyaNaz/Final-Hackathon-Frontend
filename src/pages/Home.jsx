import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiShield, FiCheckCircle } from 'react-icons/fi';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    { title: 'Profile Status', value: 'Active', icon: FiCheckCircle, color: 'text-emerald-500' },
    { title: 'Email', value: user?.email || 'N/A', icon: FiMail, color: 'text-indigo-500' },
    { title: 'Role', value: user?.role?.toUpperCase() || 'USER', icon: FiShield, color: 'text-purple-500' },
    { title: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', icon: FiUser, color: 'text-pink-500' },
  ];

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8 rounded-3xl glass shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="avatar-circle w-24 h-24 text-4xl shadow-indigo-500/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              Here is an overview of your profile status and activity.
            </p>
            <span className={user?.role === 'admin' ? 'admin-badge' : 'user-badge'}>
              {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass card-hover flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                    {stat.title}
                  </p>
                  <p className="text-base font-bold truncate mt-0.5">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}