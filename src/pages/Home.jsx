// import { motion } from 'framer-motion';
// import { useAuth } from '../contexts/AuthContext';
// import { FiUser, FiMail, FiShield, FiCheckCircle, FiPlus, FiList } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const { user } = useAuth();

//   const stats = [
//     { title: 'Profile Status', value: 'Active', icon: FiCheckCircle, color: 'text-emerald-500' },
//     { title: 'Email', value: user?.email || 'N/A', icon: FiMail, color: 'text-[#8C5A32]' },
//     { title: 'Role', value: user?.role?.toUpperCase() || 'USER', icon: FiShield, color: 'text-[#3D2817]' },
//     { title: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', icon: FiUser, color: 'text-amber-600' },
//   ];

//   const quickActions = [
//     { title: 'Create New Ticket', description: 'Submit a new support request', icon: FiPlus, link: '/create-ticket', color: 'bg-[#3D2817]' },
//     { title: 'View My Tickets', description: 'Check status of your tickets', icon: FiList, link: '/my-tickets', color: 'bg-[#8C5A32]' },
//   ];

//   return (
//     <div className="page-container">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="p-8 rounded-3xl glass shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-6 border border-[#E5E0DA] dark:border-gray-800">
//           <div className="avatar-circle w-24 h-24 text-4xl shadow-[#3D2817]/20">
//             {user?.name?.charAt(0).toUpperCase() || 'U'}
//           </div>
//           <div className="text-center sm:text-left">
//             <h1 className="text-3xl font-extrabold mb-1">
//               Welcome back, <span className="text-[#8C5A32] dark:text-[#D4A574]">{user?.name}</span>!
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
//               Manage your support tickets and track their status
//             </p>
//             <span className={user?.role === 'admin' ? 'admin-badge' : 'user-badge'}>
//               {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, i) => {
//             const Icon = stat.icon;
//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="p-6 rounded-2xl glass card-hover flex items-center gap-4"
//               >
//                 <div className={`p-3 rounded-xl bg-[#FAFAFA] dark:bg-gray-800 ${stat.color}`}>
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <div className="overflow-hidden">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
//                     {stat.title}
//                   </p>
//                   <p className="text-base font-bold truncate mt-0.5">{stat.value}</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {quickActions.map((action, i) => {
//             const Icon = action.icon;
//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 + i * 0.1 }}
//               >
//                 <Link to={action.link}>
//                   <div className="p-6 rounded-2xl glass card-hover flex items-center gap-4 cursor-pointer">
//                     <div className={`p-4 rounded-xl ${action.color} text-white`}>
//                       <Icon className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-lg">{action.title}</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>
//     </div>
//   );
// }








import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiShield, FiCheckCircle, FiPlus, FiList, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const stats = [
    { title: 'Profile Status', value: 'Active', icon: FiCheckCircle, color: 'text-emerald-500' },
    { title: 'Email', value: user?.email || 'N/A', icon: FiMail, color: 'text-[#8C5A32]' },
    { title: 'Role', value: user?.role?.toUpperCase() || 'USER', icon: FiShield, color: 'text-[#3D2817]' },
    { title: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', icon: FiUser, color: 'text-amber-600' },
  ];

  // Regular users get ticket actions; admins get the admin dashboard link instead.
  const quickActions = isAdmin
    ? [
        { title: 'Manage Tickets & Users', description: 'Open the admin dashboard', icon: FiUsers, link: '/admin', color: 'bg-[#3D2817]' },
      ]
    : [
        { title: 'Create New Ticket', description: 'Submit a new support request', icon: FiPlus, link: '/create-ticket', color: 'bg-[#3D2817]' },
        { title: 'View My Tickets', description: 'Check status of your tickets', icon: FiList, link: '/my-tickets', color: 'bg-[#8C5A32]' },
      ];

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8 rounded-3xl glass shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-6 border border-[#E5E0DA] dark:border-gray-800">
          <div className="avatar-circle w-24 h-24 text-4xl shadow-[#3D2817]/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold mb-1">
              Welcome back, <span className="text-[#8C5A32] dark:text-[#D4A574]">{user?.name}</span>!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              {isAdmin ? 'Manage support tickets and users' : 'Manage your support tickets and track their status'}
            </p>
            <span className={isAdmin ? 'admin-badge' : 'user-badge'}>
              {isAdmin ? 'Administrator' : 'Standard User'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <div className={`p-3 rounded-xl bg-[#FAFAFA] dark:bg-gray-800 ${stat.color}`}>
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

        <div className={`grid grid-cols-1 ${isAdmin ? '' : 'md:grid-cols-2'} gap-6`}>
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link to={action.link}>
                  <div className="p-6 rounded-2xl glass card-hover flex items-center gap-4 cursor-pointer">
                    <div className={`p-4 rounded-xl ${action.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{action.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}