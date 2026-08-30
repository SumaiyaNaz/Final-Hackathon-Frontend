// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser } from 'react-icons/fi';
// // // // // // import { MdOutlineConfirmationNumber } from 'react-icons/md';
// // // // // // import API from '../services/api';
// // // // // // import Swal from 'sweetalert2';

// // // // // // export default function AdminPanel() {
// // // // // //   const [activeTab, setActiveTab] = useState('tickets');
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [tickets, setTickets] = useState([]);
// // // // // //   const [stats, setStats] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, [activeTab]);

// // // // // //   const fetchData = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       if (activeTab === 'users') {
// // // // // //         const res = await API.get('/admin/users');
// // // // // //         setUsers(res.data.data || []);
// // // // // //       } else {
// // // // // //         const [ticketsRes, statsRes] = await Promise.all([
// // // // // //           API.get('/admin/tickets'),
// // // // // //           API.get('/admin/stats')
// // // // // //         ]);
// // // // // //         setTickets(ticketsRes.data.data || []);
// // // // // //         setStats(statsRes.data.data);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching data:', error);
// // // // // //       Swal.fire({
// // // // // //         icon: 'error',
// // // // // //         title: 'Error Loading Data',
// // // // // //         text: error.response?.data?.message || 'Server connection error',
// // // // // //         confirmButtonColor: '#8C5A32',
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDeleteUser = async (id) => {
// // // // // //     const result = await Swal.fire({
// // // // // //       title: 'Delete User?',
// // // // // //       text: 'This will delete the user and all their tickets!',
// // // // // //       icon: 'warning',
// // // // // //       showCancelButton: true,
// // // // // //       confirmButtonColor: '#ef4444',
// // // // // //       cancelButtonColor: '#6b7280',
// // // // // //       confirmButtonText: 'Yes, Delete',
// // // // // //     });

// // // // // //     if (result.isConfirmed) {
// // // // // //       try {
// // // // // //         await API.delete(`/admin/users/${id}`);
// // // // // //         setUsers(users.filter((u) => u._id !== id));
// // // // // //         Swal.fire({
// // // // // //           icon: 'success',
// // // // // //           title: 'Deleted!',
// // // // // //           text: 'User deleted successfully.',
// // // // // //           timer: 1500,
// // // // // //           showConfirmButton: false,
// // // // // //         });
// // // // // //       } catch (error) {
// // // // // //         Swal.fire({
// // // // // //           icon: 'error',
// // // // // //           title: 'Error!',
// // // // // //           text: error.response?.data?.message || 'Could not delete user.',
// // // // // //           confirmButtonColor: '#8C5A32',
// // // // // //         });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleUpdateRole = async (id, currentRole) => {
// // // // // //     const newRole = currentRole === 'admin' ? 'user' : 'admin';
// // // // // //     const result = await Swal.fire({
// // // // // //       title: 'Update Role?',
// // // // // //       text: `Change user role to ${newRole}?`,
// // // // // //       icon: 'question',
// // // // // //       showCancelButton: true,
// // // // // //       confirmButtonColor: '#8C5A32',
// // // // // //       cancelButtonColor: '#6b7280',
// // // // // //       confirmButtonText: 'Update',
// // // // // //     });

// // // // // //     if (result.isConfirmed) {
// // // // // //       try {
// // // // // //         await API.put(`/admin/users/${id}/role`, { role: newRole });
// // // // // //         setUsers(users.map((u) => 
// // // // // //           u._id === id ? { ...u, role: newRole } : u
// // // // // //         ));
// // // // // //         Swal.fire({
// // // // // //           icon: 'success',
// // // // // //           title: 'Updated!',
// // // // // //           text: 'User role updated successfully.',
// // // // // //           timer: 1500,
// // // // // //           showConfirmButton: false,
// // // // // //         });
// // // // // //       } catch (error) {
// // // // // //         Swal.fire({
// // // // // //           icon: 'error',
// // // // // //           title: 'Error!',
// // // // // //           text: error.response?.data?.message || 'Could not update role.',
// // // // // //           confirmButtonColor: '#8C5A32',
// // // // // //         });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleUpdatePriority = async (id, currentPriority) => {
// // // // // //     const priorities = ['Low', 'Medium', 'High', 'Urgent'];
// // // // // //     const currentIndex = priorities.indexOf(currentPriority);
// // // // // //     const nextIndex = (currentIndex + 1) % priorities.length;
// // // // // //     const newPriority = priorities[nextIndex];

// // // // // //     const result = await Swal.fire({
// // // // // //       title: 'Update Priority?',
// // // // // //       text: `Change ticket priority from ${currentPriority} to ${newPriority}?`,
// // // // // //       icon: 'question',
// // // // // //       showCancelButton: true,
// // // // // //       confirmButtonColor: '#8C5A32',
// // // // // //       cancelButtonColor: '#6b7280',
// // // // // //       confirmButtonText: 'Update',
// // // // // //     });

// // // // // //     if (result.isConfirmed) {
// // // // // //       try {
// // // // // //         await API.put(`/tickets/${id}/status`, { priority: newPriority });
// // // // // //         setTickets(tickets.map((t) => 
// // // // // //           t._id === id ? { ...t, priority: newPriority } : t
// // // // // //         ));
// // // // // //         Swal.fire({
// // // // // //           icon: 'success',
// // // // // //           title: 'Updated!',
// // // // // //           text: `Priority changed to ${newPriority}`,
// // // // // //           timer: 1500,
// // // // // //           showConfirmButton: false,
// // // // // //         });
// // // // // //       } catch (error) {
// // // // // //         Swal.fire({
// // // // // //           icon: 'error',
// // // // // //           title: 'Error!',
// // // // // //           text: error.response?.data?.message || 'Could not update priority.',
// // // // // //           confirmButtonColor: '#8C5A32',
// // // // // //         });
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const getPriorityBadge = (priority) => {
// // // // // //     const classes = {
// // // // // //       Low: 'priority-low',
// // // // // //       Medium: 'priority-medium',
// // // // // //       High: 'priority-high',
// // // // // //       Urgent: 'priority-urgent',
// // // // // //     };
// // // // // //     return `px-2 py-0.5 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// // // // // //   };

// // // // // //   const getStatusBadge = (status) => {
// // // // // //     const classes = {
// // // // // //       New: 'status-new',
// // // // // //       Assigned: 'status-assigned',
// // // // // //       'In Progress': 'status-inprogress',
// // // // // //       Resolved: 'status-resolved',
// // // // // //     };
// // // // // //     return `px-2 py-0.5 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// // // // // //   };

// // // // // //   const StatCard = ({ title, value, icon: Icon, color }) => (
// // // // // //     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <div>
// // // // // //           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
// // // // // //           <p className="text-2xl font-bold">{value}</p>
// // // // // //         </div>
// // // // // //         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
// // // // // //           <Icon className={`w-6 h-6 ${color}`} />
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="page-container flex justify-center items-center">
// // // // // //         <div className="spinner h-12 w-12"></div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="page-container">
// // // // // //       <motion.div
// // // // // //         initial={{ opacity: 0, y: 15 }}
// // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // //         transition={{ duration: 0.3 }}
// // // // // //       >
// // // // // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
// // // // // //           <div>
// // // // // //             <h1 className="text-3xl font-extrabold">
// // // // // //               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
// // // // // //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
// // // // // //             </h1>
// // // // // //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// // // // // //               Manage all users and support tickets
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
// // // // // //             <button
// // // // // //               onClick={() => setActiveTab('tickets')}
// // // // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // // // //                 activeTab === 'tickets'
// // // // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // // // //               }`}
// // // // // //             >
// // // // // //               <MdOutlineConfirmationNumber /> All Tickets ({tickets.length})
// // // // // //             </button>
// // // // // //             <button
// // // // // //               onClick={() => setActiveTab('users')}
// // // // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // // // //                 activeTab === 'users'
// // // // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // // // //               }`}
// // // // // //             >
// // // // // //               <FiUsers /> All Users ({users.length})
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {activeTab === 'tickets' && stats && (
// // // // // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // // // //             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
// // // // // //             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
// // // // // //             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
// // // // // //             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {activeTab === 'users' ? (
// // // // // //           <div className="glass rounded-2xl overflow-hidden shadow-lg border border-[#E5E0DA] dark:border-gray-800">
// // // // // //             <div className="overflow-x-auto">
// // // // // //               <table className="w-full text-left border-collapse">
// // // // // //                 <thead>
// // // // // //                   <tr className="bg-[#FAFAFA] dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-[#E5E0DA] dark:border-gray-800">
// // // // // //                     <th className="p-4">User</th>
// // // // // //                     <th className="p-4">Email</th>
// // // // // //                     <th className="p-4">Role</th>
// // // // // //                     <th className="p-4">Tickets</th>
// // // // // //                     <th className="p-4">Joined</th>
// // // // // //                     <th className="p-4 text-right">Actions</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody>
// // // // // //                   {users.map((u) => {
// // // // // //                     const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
// // // // // //                     return (
// // // // // //                       <tr key={u._id} className="table-row">
// // // // // //                         <td className="p-4 font-semibold flex items-center gap-3">
// // // // // //                           <div className="avatar-circle w-8 h-8 text-xs">
// // // // // //                             {u.name?.charAt(0).toUpperCase() || 'U'}
// // // // // //                           </div>
// // // // // //                           {u.name}
// // // // // //                         </td>
// // // // // //                         <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{u.email}</td>
// // // // // //                         <td className="p-4">
// // // // // //                           <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
// // // // // //                             {u.role || 'user'}
// // // // // //                           </span>
// // // // // //                         </td>
// // // // // //                         <td className="p-4 text-sm">{userTicketCount}</td>
// // // // // //                         <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // //                           {new Date(u.createdAt).toLocaleDateString()}
// // // // // //                         </td>
// // // // // //                         <td className="p-4 text-right">
// // // // // //                           <div className="flex items-center justify-end gap-2">
// // // // // //                             <button
// // // // // //                               onClick={() => handleUpdateRole(u._id, u.role)}
// // // // // //                               className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // // // // //                               title="Toggle Role"
// // // // // //                             >
// // // // // //                               <FiEdit2 className="w-4 h-4" />
// // // // // //                             </button>
// // // // // //                             <button
// // // // // //                               onClick={() => handleDeleteUser(u._id)}
// // // // // //                               className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// // // // // //                               title="Delete"
// // // // // //                             >
// // // // // //                               <FiTrash2 className="w-4 h-4" />
// // // // // //                             </button>
// // // // // //                           </div>
// // // // // //                         </td>
// // // // // //                       </tr>
// // // // // //                     );
// // // // // //                   })}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="glass rounded-2xl overflow-hidden shadow-lg border border-[#E5E0DA] dark:border-gray-800">
// // // // // //             <div className="overflow-x-auto">
// // // // // //               <table className="w-full text-left border-collapse">
// // // // // //                 <thead>
// // // // // //                   <tr className="bg-[#FAFAFA] dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-[#E5E0DA] dark:border-gray-800">
// // // // // //                     <th className="p-4">Ticket #</th>
// // // // // //                     <th className="p-4">Subject</th>
// // // // // //                     <th className="p-4">User</th>
// // // // // //                     <th className="p-4">Category</th>
// // // // // //                     <th className="p-4">Priority</th>
// // // // // //                     <th className="p-4">Status</th>
// // // // // //                     <th className="p-4">Created</th>
// // // // // //                     <th className="p-4 text-right">Actions</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody>
// // // // // //                   {tickets.map((t) => (
// // // // // //                     <tr key={t._id} className="table-row">
// // // // // //                       <td className="p-4 font-mono text-sm font-semibold">
// // // // // //                         {t.ticketNumber}
// // // // // //                       </td>
// // // // // //                       <td className="p-4 font-medium">{t.subject}</td>
// // // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // //                         {t.createdBy?.name || 'Unknown'}
// // // // // //                       </td>
// // // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // //                         {t.category}
// // // // // //                       </td>
// // // // // //                       <td className="p-4">
// // // // // //                         <button
// // // // // //                           onClick={() => handleUpdatePriority(t._id, t.priority)}
// // // // // //                           className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity`}
// // // // // //                           title="Click to change priority"
// // // // // //                         >
// // // // // //                           {t.priority}
// // // // // //                         </button>
// // // // // //                       </td>
// // // // // //                       <td className="p-4">
// // // // // //                         <span className={getStatusBadge(t.status)}>
// // // // // //                           {t.status}
// // // // // //                         </span>
// // // // // //                       </td>
// // // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // //                         {new Date(t.createdAt).toLocaleDateString()}
// // // // // //                       </td>
// // // // // //                       <td className="p-4 text-right">
// // // // // //                         <button
// // // // // //                           onClick={() => handleUpdatePriority(t._id, t.priority)}
// // // // // //                           className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // // // // //                           title="Change Priority"
// // // // // //                         >
// // // // // //                           <FiEdit2 className="w-4 h-4" />
// // // // // //                         </button>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </motion.div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
















// // // // // import { useState, useEffect } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw } from 'react-icons/fi';
// // // // // import { MdOutlineConfirmationNumber } from 'react-icons/md';
// // // // // import API from '../services/api';
// // // // // import Swal from 'sweetalert2';

// // // // // const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
// // // // // const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

// // // // // export default function AdminPanel() {
// // // // //   const [activeTab, setActiveTab] = useState('tickets');
// // // // //   const [users, setUsers] = useState([]);
// // // // //   const [tickets, setTickets] = useState([]);
// // // // //   const [stats, setStats] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, [activeTab]);

// // // // //   const fetchData = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       if (activeTab === 'users') {
// // // // //         const res = await API.get('/admin/users');
// // // // //         setUsers(res.data.data || []);
// // // // //       } else {
// // // // //         const [ticketsRes, statsRes] = await Promise.all([
// // // // //           API.get('/admin/tickets'),
// // // // //           API.get('/admin/stats')
// // // // //         ]);
// // // // //         setTickets(ticketsRes.data.data || []);
// // // // //         setStats(statsRes.data.data);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching data:', error);
// // // // //       Swal.fire({
// // // // //         icon: 'error',
// // // // //         title: 'Error Loading Data',
// // // // //         text: error.response?.data?.message || 'Server connection error',
// // // // //         confirmButtonColor: '#8C5A32',
// // // // //       });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteUser = async (id) => {
// // // // //     const result = await Swal.fire({
// // // // //       title: 'Delete User?',
// // // // //       text: 'This will delete the user and all their tickets!',
// // // // //       icon: 'warning',
// // // // //       showCancelButton: true,
// // // // //       confirmButtonColor: '#ef4444',
// // // // //       cancelButtonColor: '#6b7280',
// // // // //       confirmButtonText: 'Yes, Delete',
// // // // //     });

// // // // //     if (result.isConfirmed) {
// // // // //       try {
// // // // //         await API.delete(`/admin/users/${id}`);
// // // // //         setUsers(users.filter((u) => u._id !== id));
// // // // //         Swal.fire({
// // // // //           icon: 'success',
// // // // //           title: 'Deleted!',
// // // // //           text: 'User deleted successfully.',
// // // // //           timer: 1500,
// // // // //           showConfirmButton: false,
// // // // //         });
// // // // //       } catch (error) {
// // // // //         Swal.fire({
// // // // //           icon: 'error',
// // // // //           title: 'Error!',
// // // // //           text: error.response?.data?.message || 'Could not delete user.',
// // // // //           confirmButtonColor: '#8C5A32',
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateRole = async (id, currentRole) => {
// // // // //     const newRole = currentRole === 'admin' ? 'user' : 'admin';
// // // // //     const result = await Swal.fire({
// // // // //       title: 'Update Role?',
// // // // //       text: `Change user role to ${newRole}?`,
// // // // //       icon: 'question',
// // // // //       showCancelButton: true,
// // // // //       confirmButtonColor: '#8C5A32',
// // // // //       cancelButtonColor: '#6b7280',
// // // // //       confirmButtonText: 'Update',
// // // // //     });

// // // // //     if (result.isConfirmed) {
// // // // //       try {
// // // // //         await API.put(`/admin/users/${id}/role`, { role: newRole });
// // // // //         setUsers(users.map((u) =>
// // // // //           u._id === id ? { ...u, role: newRole } : u
// // // // //         ));
// // // // //         Swal.fire({
// // // // //           icon: 'success',
// // // // //           title: 'Updated!',
// // // // //           text: 'User role updated successfully.',
// // // // //           timer: 1500,
// // // // //           showConfirmButton: false,
// // // // //         });
// // // // //       } catch (error) {
// // // // //         Swal.fire({
// // // // //           icon: 'error',
// // // // //           title: 'Error!',
// // // // //           text: error.response?.data?.message || 'Could not update role.',
// // // // //           confirmButtonColor: '#8C5A32',
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleUpdatePriority = async (id, currentPriority) => {
// // // // //     const currentIndex = PRIORITY_OPTIONS.indexOf(currentPriority);
// // // // //     const nextIndex = (currentIndex + 1) % PRIORITY_OPTIONS.length;
// // // // //     const newPriority = PRIORITY_OPTIONS[nextIndex];

// // // // //     const result = await Swal.fire({
// // // // //       title: 'Update Priority?',
// // // // //       text: `Change ticket priority from ${currentPriority} to ${newPriority}?`,
// // // // //       icon: 'question',
// // // // //       showCancelButton: true,
// // // // //       confirmButtonColor: '#8C5A32',
// // // // //       cancelButtonColor: '#6b7280',
// // // // //       confirmButtonText: 'Update',
// // // // //     });

// // // // //     if (result.isConfirmed) {
// // // // //       try {
// // // // //         await API.put(`/tickets/${id}/status`, { priority: newPriority });
// // // // //         setTickets(tickets.map((t) =>
// // // // //           t._id === id ? { ...t, priority: newPriority } : t
// // // // //         ));
// // // // //         Swal.fire({
// // // // //           icon: 'success',
// // // // //           title: 'Updated!',
// // // // //           text: `Priority changed to ${newPriority}`,
// // // // //           timer: 1500,
// // // // //           showConfirmButton: false,
// // // // //         });
// // // // //       } catch (error) {
// // // // //         Swal.fire({
// // // // //           icon: 'error',
// // // // //           title: 'Error!',
// // // // //           text: error.response?.data?.message || 'Could not update priority.',
// // // // //           confirmButtonColor: '#8C5A32',
// // // // //         });
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // NEW: status update, mirrors handleUpdatePriority but lets the admin pick
// // // // //   // any target status from a dropdown, and asks for a resolution note when
// // // // //   // moving to Resolved/Rejected (backend requires it).
// // // // //   const handleUpdateStatus = async (ticket) => {
// // // // //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// // // // //       return Swal.fire({
// // // // //         icon: 'warning',
// // // // //         title: 'Ticket Closed',
// // // // //         text: 'This ticket is already closed and its status can no longer be changed.',
// // // // //         confirmButtonColor: '#8C5A32',
// // // // //       });
// // // // //     }

// // // // //     const { value: newStatus } = await Swal.fire({
// // // // //       title: 'Update Status',
// // // // //       input: 'select',
// // // // //       inputLabel: `Current status: ${ticket.status}`,
// // // // //       inputOptions: STATUS_OPTIONS.reduce((acc, s) => {
// // // // //         if (s !== ticket.status) acc[s] = s;
// // // // //         return acc;
// // // // //       }, {}),
// // // // //       inputPlaceholder: 'Select new status',
// // // // //       showCancelButton: true,
// // // // //       confirmButtonColor: '#8C5A32',
// // // // //       cancelButtonColor: '#6b7280',
// // // // //       confirmButtonText: 'Next',
// // // // //       inputValidator: (value) => {
// // // // //         if (!value) return 'Please select a status';
// // // // //       },
// // // // //     });

// // // // //     if (!newStatus) return;

// // // // //     let data = { status: newStatus };

// // // // //     if (newStatus === 'Resolved' || newStatus === 'Rejected') {
// // // // //       const { value: note, isConfirmed } = await Swal.fire({
// // // // //         title: newStatus === 'Resolved' ? 'Resolve Ticket' : 'Reject Ticket',
// // // // //         input: 'textarea',
// // // // //         inputLabel: 'Resolution note (required)',
// // // // //         inputPlaceholder: newStatus === 'Resolved'
// // // // //           ? 'Describe how the issue was resolved...'
// // // // //           : 'Describe why this ticket is being rejected...',
// // // // //         showCancelButton: true,
// // // // //         confirmButtonColor: '#8C5A32',
// // // // //         cancelButtonColor: '#6b7280',
// // // // //         confirmButtonText: newStatus,
// // // // //         inputValidator: (value) => {
// // // // //           if (!value || value.trim() === '') return 'Resolution note is required!';
// // // // //         },
// // // // //       });

// // // // //       if (!isConfirmed) return;
// // // // //       data.resolutionNote = note;
// // // // //     }

// // // // //     try {
// // // // //       const res = await API.put(`/tickets/${ticket._id}/status`, data);
// // // // //       setTickets(tickets.map((t) => (t._id === ticket._id ? res.data.data : t)));
// // // // //       Swal.fire({
// // // // //         icon: 'success',
// // // // //         title: 'Updated!',
// // // // //         text: `Status changed to ${newStatus}`,
// // // // //         timer: 1500,
// // // // //         showConfirmButton: false,
// // // // //       });
// // // // //     } catch (error) {
// // // // //       Swal.fire({
// // // // //         icon: 'error',
// // // // //         title: 'Error!',
// // // // //         text: error.response?.data?.message || 'Could not update status.',
// // // // //         confirmButtonColor: '#8C5A32',
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const getPriorityBadge = (priority) => {
// // // // //     const classes = {
// // // // //       Low: 'priority-low',
// // // // //       Medium: 'priority-medium',
// // // // //       High: 'priority-high',
// // // // //       Urgent: 'priority-urgent',
// // // // //     };
// // // // //     return `px-2 py-0.5 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// // // // //   };

// // // // //   const getStatusBadge = (status) => {
// // // // //     const classes = {
// // // // //       New: 'status-new',
// // // // //       Assigned: 'status-assigned',
// // // // //       'In Progress': 'status-inprogress',
// // // // //       Resolved: 'status-resolved',
// // // // //       Rejected: 'priority-urgent',
// // // // //     };
// // // // //     return `px-2 py-0.5 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// // // // //   };

// // // // //   const StatCard = ({ title, value, icon: Icon, color }) => (
// // // // //     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
// // // // //       <div className="flex items-center justify-between">
// // // // //         <div>
// // // // //           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
// // // // //           <p className="text-2xl font-bold">{value}</p>
// // // // //         </div>
// // // // //         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
// // // // //           <Icon className={`w-6 h-6 ${color}`} />
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="page-container flex justify-center items-center">
// // // // //         <div className="spinner h-12 w-12"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="page-container">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 15 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.3 }}
// // // // //       >
// // // // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
// // // // //           <div>
// // // // //             <h1 className="text-3xl font-extrabold">
// // // // //               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
// // // // //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
// // // // //             </h1>
// // // // //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// // // // //               Manage all users and support tickets
// // // // //             </p>
// // // // //           </div>

// // // // //           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
// // // // //             <button
// // // // //               onClick={() => setActiveTab('tickets')}
// // // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // // //                 activeTab === 'tickets'
// // // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // // //               }`}
// // // // //             >
// // // // //               <MdOutlineConfirmationNumber /> All Tickets ({tickets.length})
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => setActiveTab('users')}
// // // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // // //                 activeTab === 'users'
// // // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // // //               }`}
// // // // //             >
// // // // //               <FiUsers /> All Users ({users.length})
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {activeTab === 'tickets' && stats && (
// // // // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // // //             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
// // // // //             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
// // // // //             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
// // // // //             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
// // // // //           </div>
// // // // //         )}

// // // // //         {activeTab === 'users' ? (
// // // // //           <div className="glass rounded-2xl overflow-hidden shadow-lg border border-[#E5E0DA] dark:border-gray-800">
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full text-left border-collapse">
// // // // //                 <thead>
// // // // //                   <tr className="bg-[#FAFAFA] dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-[#E5E0DA] dark:border-gray-800">
// // // // //                     <th className="p-4">User</th>
// // // // //                     <th className="p-4">Email</th>
// // // // //                     <th className="p-4">Role</th>
// // // // //                     <th className="p-4">Tickets</th>
// // // // //                     <th className="p-4">Joined</th>
// // // // //                     <th className="p-4 text-right">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody>
// // // // //                   {users.map((u) => {
// // // // //                     const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
// // // // //                     return (
// // // // //                       <tr key={u._id} className="table-row">
// // // // //                         <td className="p-4 font-semibold flex items-center gap-3">
// // // // //                           <div className="avatar-circle w-8 h-8 text-xs">
// // // // //                             {u.name?.charAt(0).toUpperCase() || 'U'}
// // // // //                           </div>
// // // // //                           {u.name}
// // // // //                         </td>
// // // // //                         <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{u.email}</td>
// // // // //                         <td className="p-4">
// // // // //                           <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
// // // // //                             {u.role || 'user'}
// // // // //                           </span>
// // // // //                         </td>
// // // // //                         <td className="p-4 text-sm">{userTicketCount}</td>
// // // // //                         <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // //                           {new Date(u.createdAt).toLocaleDateString()}
// // // // //                         </td>
// // // // //                         <td className="p-4 text-right">
// // // // //                           <div className="flex items-center justify-end gap-2">
// // // // //                             <button
// // // // //                               onClick={() => handleUpdateRole(u._id, u.role)}
// // // // //                               className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // // // //                               title="Toggle Role"
// // // // //                             >
// // // // //                               <FiEdit2 className="w-4 h-4" />
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={() => handleDeleteUser(u._id)}
// // // // //                               className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// // // // //                               title="Delete"
// // // // //                             >
// // // // //                               <FiTrash2 className="w-4 h-4" />
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     );
// // // // //                   })}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="glass rounded-2xl overflow-hidden shadow-lg border border-[#E5E0DA] dark:border-gray-800">
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full text-left border-collapse">
// // // // //                 <thead>
// // // // //                   <tr className="bg-[#FAFAFA] dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-[#E5E0DA] dark:border-gray-800">
// // // // //                     <th className="p-4">Ticket #</th>
// // // // //                     <th className="p-4">Subject</th>
// // // // //                     <th className="p-4">User</th>
// // // // //                     <th className="p-4">Category</th>
// // // // //                     <th className="p-4">Priority</th>
// // // // //                     <th className="p-4">Status</th>
// // // // //                     <th className="p-4">Created</th>
// // // // //                     <th className="p-4 text-right">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody>
// // // // //                   {tickets.map((t) => (
// // // // //                     <tr key={t._id} className="table-row">
// // // // //                       <td className="p-4 font-mono text-sm font-semibold">
// // // // //                         {t.ticketNumber}
// // // // //                       </td>
// // // // //                       <td className="p-4 font-medium">{t.subject}</td>
// // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // //                         {t.createdBy?.name || 'Unknown'}
// // // // //                       </td>
// // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // //                         {t.category}
// // // // //                       </td>
// // // // //                       <td className="p-4">
// // // // //                         <button
// // // // //                           onClick={() => handleUpdatePriority(t._id, t.priority)}
// // // // //                           disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // // // //                           className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
// // // // //                           title="Click to cycle priority"
// // // // //                         >
// // // // //                           {t.priority}
// // // // //                         </button>
// // // // //                       </td>
// // // // //                       <td className="p-4">
// // // // //                         <button
// // // // //                           onClick={() => handleUpdateStatus(t)}
// // // // //                           disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // // // //                           className={`${getStatusBadge(t.status)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
// // // // //                           title="Click to change status"
// // // // //                         >
// // // // //                           {t.status}
// // // // //                         </button>
// // // // //                       </td>
// // // // //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// // // // //                         {new Date(t.createdAt).toLocaleDateString()}
// // // // //                       </td>
// // // // //                       <td className="p-4 text-right">
// // // // //                         <button
// // // // //                           onClick={() => handleUpdateStatus(t)}
// // // // //                           disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // // // //                           className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // // // //                           title="Change Status"
// // // // //                         >
// // // // //                           <FiRefreshCw className="w-4 h-4" />
// // // // //                         </button>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // }















// // // // import { useState, useEffect } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw, FiX } from 'react-icons/fi';
// // // // import { MdOutlineConfirmationNumber } from 'react-icons/md';
// // // // import API from '../services/api';
// // // // import Swal from 'sweetalert2';

// // // // const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
// // // // const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

// // // // export default function AdminPanel() {
// // // //   const [activeTab, setActiveTab] = useState('tickets');
// // // //   const [users, setUsers] = useState([]);
// // // //   const [tickets, setTickets] = useState([]);
// // // //   const [stats, setStats] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
  
// // // //   // Modal states
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [modalTicket, setModalTicket] = useState(null);
// // // //   const [modalType, setModalType] = useState(''); // 'priority' or 'status'
// // // //   const [selectedValue, setSelectedValue] = useState('');
// // // //   const [resolutionNote, setResolutionNote] = useState('');
// // // //   const [modalLoading, setModalLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [activeTab]);

// // // //   const fetchData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       if (activeTab === 'users') {
// // // //         const res = await API.get('/admin/users');
// // // //         setUsers(res.data.data || []);
// // // //       } else {
// // // //         const [ticketsRes, statsRes] = await Promise.all([
// // // //           API.get('/admin/tickets'),
// // // //           API.get('/admin/stats')
// // // //         ]);
// // // //         setTickets(ticketsRes.data.data || []);
// // // //         setStats(statsRes.data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching data:', error);
// // // //       Swal.fire({
// // // //         icon: 'error',
// // // //         title: 'Error Loading Data',
// // // //         text: error.response?.data?.message || 'Server connection error',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDeleteUser = async (id) => {
// // // //     const result = await Swal.fire({
// // // //       title: 'Delete User?',
// // // //       text: 'This will delete the user and all their tickets!',
// // // //       icon: 'warning',
// // // //       showCancelButton: true,
// // // //       confirmButtonColor: '#ef4444',
// // // //       cancelButtonColor: '#6b7280',
// // // //       confirmButtonText: 'Yes, Delete',
// // // //     });

// // // //     if (result.isConfirmed) {
// // // //       try {
// // // //         await API.delete(`/admin/users/${id}`);
// // // //         setUsers(users.filter((u) => u._id !== id));
// // // //         Swal.fire({
// // // //           icon: 'success',
// // // //           title: 'Deleted!',
// // // //           text: 'User deleted successfully.',
// // // //           timer: 1500,
// // // //           showConfirmButton: false,
// // // //         });
// // // //       } catch (error) {
// // // //         Swal.fire({
// // // //           icon: 'error',
// // // //           title: 'Error!',
// // // //           text: error.response?.data?.message || 'Could not delete user.',
// // // //           confirmButtonColor: '#8C5A32',
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleUpdateRole = async (id, currentRole) => {
// // // //     const newRole = currentRole === 'admin' ? 'user' : 'admin';
// // // //     const result = await Swal.fire({
// // // //       title: 'Update Role?',
// // // //       text: `Change user role to ${newRole}?`,
// // // //       icon: 'question',
// // // //       showCancelButton: true,
// // // //       confirmButtonColor: '#8C5A32',
// // // //       cancelButtonColor: '#6b7280',
// // // //       confirmButtonText: 'Update',
// // // //     });

// // // //     if (result.isConfirmed) {
// // // //       try {
// // // //         await API.put(`/admin/users/${id}/role`, { role: newRole });
// // // //         setUsers(users.map((u) =>
// // // //           u._id === id ? { ...u, role: newRole } : u
// // // //         ));
// // // //         Swal.fire({
// // // //           icon: 'success',
// // // //           title: 'Updated!',
// // // //           text: 'User role updated successfully.',
// // // //           timer: 1500,
// // // //           showConfirmButton: false,
// // // //         });
// // // //       } catch (error) {
// // // //         Swal.fire({
// // // //           icon: 'error',
// // // //           title: 'Error!',
// // // //           text: error.response?.data?.message || 'Could not update role.',
// // // //           confirmButtonColor: '#8C5A32',
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   // Open modal for priority update
// // // //   const openPriorityModal = (ticket) => {
// // // //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// // // //       return Swal.fire({
// // // //         icon: 'warning',
// // // //         title: 'Ticket Closed',
// // // //         text: 'Cannot change priority of a closed ticket.',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     }
// // // //     setModalTicket(ticket);
// // // //     setModalType('priority');
// // // //     setSelectedValue(ticket.priority);
// // // //     setResolutionNote('');
// // // //     setShowModal(true);
// // // //   };

// // // //   // Open modal for status update
// // // //   const openStatusModal = (ticket) => {
// // // //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// // // //       return Swal.fire({
// // // //         icon: 'warning',
// // // //         title: 'Ticket Closed',
// // // //         text: 'Cannot change status of a closed ticket.',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     }
// // // //     setModalTicket(ticket);
// // // //     setModalType('status');
// // // //     setSelectedValue(ticket.status);
// // // //     setResolutionNote('');
// // // //     setShowModal(true);
// // // //   };

// // // //   // Handle modal submit
// // // //   const handleModalSubmit = async () => {
// // // //     if (!selectedValue) {
// // // //       return Swal.fire({
// // // //         icon: 'warning',
// // // //         title: 'Selection Required',
// // // //         text: 'Please select a value.',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     }

// // // //     const isResolvingOrRejecting = (modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected'));
    
// // // //     if (isResolvingOrRejecting && (!resolutionNote || resolutionNote.trim() === '')) {
// // // //       return Swal.fire({
// // // //         icon: 'warning',
// // // //         title: 'Note Required',
// // // //         text: 'Please provide a resolution/rejection note.',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     }

// // // //     setModalLoading(true);
// // // //     try {
// // // //       const data = {};
// // // //       if (modalType === 'priority') {
// // // //         data.priority = selectedValue;
// // // //       } else {
// // // //         data.status = selectedValue;
// // // //         if (isResolvingOrRejecting) {
// // // //           data.resolutionNote = resolutionNote.trim();
// // // //         }
// // // //       }

// // // //       const res = await API.put(`/tickets/${modalTicket._id}/status`, data);
// // // //       setTickets(tickets.map((t) => t._id === modalTicket._id ? res.data.data : t));
      
// // // //       setShowModal(false);
// // // //       Swal.fire({
// // // //         icon: 'success',
// // // //         title: 'Updated!',
// // // //         text: `${modalType === 'priority' ? 'Priority' : 'Status'} changed successfully.`,
// // // //         timer: 1500,
// // // //         showConfirmButton: false,
// // // //       });
// // // //     } catch (error) {
// // // //       Swal.fire({
// // // //         icon: 'error',
// // // //         title: 'Error!',
// // // //         text: error.response?.data?.message || 'Could not update.',
// // // //         confirmButtonColor: '#8C5A32',
// // // //       });
// // // //     } finally {
// // // //       setModalLoading(false);
// // // //     }
// // // //   };

// // // //   const getPriorityBadge = (priority) => {
// // // //     const classes = {
// // // //       Low: 'priority-low',
// // // //       Medium: 'priority-medium',
// // // //       High: 'priority-high',
// // // //       Urgent: 'priority-urgent',
// // // //     };
// // // //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// // // //   };

// // // //   const getStatusBadge = (status) => {
// // // //     const classes = {
// // // //       New: 'status-new',
// // // //       Assigned: 'status-assigned',
// // // //       'In Progress': 'status-inprogress',
// // // //       Resolved: 'status-resolved',
// // // //       Rejected: 'priority-urgent',
// // // //     };
// // // //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// // // //   };

// // // //   const StatCard = ({ title, value, icon: Icon, color }) => (
// // // //     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
// // // //       <div className="flex items-center justify-between">
// // // //         <div>
// // // //           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
// // // //           <p className="text-2xl font-bold">{value}</p>
// // // //         </div>
// // // //         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
// // // //           <Icon className={`w-6 h-6 ${color}`} />
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="page-container flex justify-center items-center">
// // // //         <div className="spinner h-12 w-12"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="page-container">
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 15 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 0.3 }}
// // // //       >
// // // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
// // // //           <div>
// // // //             <h1 className="text-3xl font-extrabold">
// // // //               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
// // // //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
// // // //             </h1>
// // // //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// // // //               Manage all users and support tickets
// // // //             </p>
// // // //           </div>

// // // //           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
// // // //             <button
// // // //               onClick={() => setActiveTab('tickets')}
// // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // //                 activeTab === 'tickets'
// // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // //               }`}
// // // //             >
// // // //               <MdOutlineConfirmationNumber /> Tickets ({tickets.length})
// // // //             </button>
// // // //             <button
// // // //               onClick={() => setActiveTab('users')}
// // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // // //                 activeTab === 'users'
// // // //                   ? 'bg-[#8C5A32] text-white shadow'
// // // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // // //               }`}
// // // //             >
// // // //               <FiUsers /> Users ({users.length})
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {activeTab === 'tickets' && stats && (
// // // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // //             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
// // // //             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
// // // //             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
// // // //             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
// // // //           </div>
// // // //         )}

// // // //         {activeTab === 'users' ? (
// // // //           // Users as Cards
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             {users.map((u) => {
// // // //               const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
// // // //               return (
// // // //                 <div key={u._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// // // //                   <div className="flex items-center gap-4 mb-4">
// // // //                     <div className="avatar-circle w-14 h-14 text-xl">
// // // //                       {u.name?.charAt(0).toUpperCase() || 'U'}
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <h3 className="font-bold text-lg truncate">{u.name}</h3>
// // // //                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex items-center justify-between text-sm">
// // // //                     <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
// // // //                       {u.role || 'user'}
// // // //                     </span>
// // // //                     <span className="text-gray-500 dark:text-gray-400">
// // // //                       {userTicketCount} tickets
// // // //                     </span>
// // // //                     <span className="text-gray-500 dark:text-gray-400">
// // // //                       {new Date(u.createdAt).toLocaleDateString()}
// // // //                     </span>
// // // //                   </div>
// // // //                   <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// // // //                     <button
// // // //                       onClick={() => handleUpdateRole(u._id, u.role)}
// // // //                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // // //                       title="Toggle Role"
// // // //                     >
// // // //                       <FiEdit2 className="w-4 h-4" />
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleDeleteUser(u._id)}
// // // //                       className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// // // //                       title="Delete"
// // // //                     >
// // // //                       <FiTrash2 className="w-4 h-4" />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         ) : (
// // // //           // Tickets as Cards
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             {tickets.map((t) => (
// // // //               <div key={t._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// // // //                 <div className="flex items-start justify-between mb-3">
// // // //                   <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
// // // //                     {t.ticketNumber}
// // // //                   </span>
// // // //                   <span className={getStatusBadge(t.status)}>{t.status}</span>
// // // //                 </div>
// // // //                 <h3 className="font-bold text-lg mb-1 line-clamp-1">{t.subject}</h3>
// // // //                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
// // // //                   {t.description}
// // // //                 </p>
// // // //                 <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
// // // //                   <span className="text-gray-500 dark:text-gray-400">By: {t.createdBy?.name || 'Unknown'}</span>
// // // //                   <span className="text-gray-400">•</span>
// // // //                   <span className="text-gray-500 dark:text-gray-400">{t.category}</span>
// // // //                 </div>
// // // //                 <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
// // // //                   <button
// // // //                     onClick={() => openPriorityModal(t)}
// // // //                     disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // // //                     className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
// // // //                     title="Click to change priority"
// // // //                   >
// // // //                     {t.priority}
// // // //                   </button>
// // // //                   <div className="flex items-center gap-2">
// // // //                     <button
// // // //                       onClick={() => openStatusModal(t)}
// // // //                       disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // // //                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // // //                       title="Change Status"
// // // //                     >
// // // //                       <FiRefreshCw className="w-4 h-4" />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="text-xs text-gray-400 mt-2">
// // // //                   {new Date(t.createdAt).toLocaleDateString()}
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </motion.div>

// // // //       {/* Modal for Priority/Status Update */}
// // // //       {showModal && (
// // // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// // // //           <motion.div
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
// // // //           >
// // // //             <div className="flex items-center justify-between mb-6">
// // // //               <h3 className="text-xl font-bold">
// // // //                 {modalType === 'priority' ? 'Update Priority' : 'Update Status'}
// // // //               </h3>
// // // //               <button
// // // //                 onClick={() => setShowModal(false)}
// // // //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
// // // //               >
// // // //                 <FiX className="w-5 h-5" />
// // // //               </button>
// // // //             </div>

// // // //             <div className="mb-4">
// // // //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // //                 Ticket: <span className="font-semibold">{modalTicket?.ticketNumber}</span>
// // // //               </p>
// // // //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
// // // //                 Subject: <span className="font-semibold">{modalTicket?.subject}</span>
// // // //               </p>
// // // //             </div>

// // // //             <div className="mb-4">
// // // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // //                 Select {modalType === 'priority' ? 'Priority' : 'Status'}
// // // //               </label>
// // // //               <select
// // // //                 value={selectedValue}
// // // //                 onChange={(e) => setSelectedValue(e.target.value)}
// // // //                 className="input-focus"
// // // //                 disabled={modalLoading}
// // // //               >
// // // //                 {(modalType === 'priority' ? PRIORITY_OPTIONS : STATUS_OPTIONS).map((option) => (
// // // //                   <option key={option} value={option}>{option}</option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>

// // // //             {(modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected')) && (
// // // //               <div className="mb-4">
// // // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // //                   {selectedValue === 'Resolved' ? 'Resolution Note' : 'Rejection Reason'} *
// // // //                 </label>
// // // //                 <textarea
// // // //                   value={resolutionNote}
// // // //                   onChange={(e) => setResolutionNote(e.target.value)}
// // // //                   placeholder={selectedValue === 'Resolved' ? 'Describe how the issue was resolved...' : 'Why is this ticket being rejected?'}
// // // //                   className="input-focus min-h-[80px] resize-y"
// // // //                   disabled={modalLoading}
// // // //                 />
// // // //               </div>
// // // //             )}

// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={() => setShowModal(false)}
// // // //                 className="flex-1 btn-outline"
// // // //                 disabled={modalLoading}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleModalSubmit}
// // // //                 disabled={modalLoading}
// // // //                 className="flex-1 btn-primary flex justify-center items-center"
// // // //               >
// // // //                 {modalLoading ? (
// // // //                   <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
// // // //                 ) : (
// // // //                   'Update'
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </motion.div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }















// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw, FiX, FiMessageCircle, FiStar } from 'react-icons/fi';
// // // import { MdOutlineConfirmationNumber } from 'react-icons/md';
// // // import API from '../services/api';
// // // import Swal from 'sweetalert2';

// // // const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
// // // const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

// // // export default function AdminPanel() {
// // //   const [activeTab, setActiveTab] = useState('tickets');
// // //   const [users, setUsers] = useState([]);
// // //   const [tickets, setTickets] = useState([]);
// // //   const [stats, setStats] = useState(null);
// // //   const [loading, setLoading] = useState(true);
  
// // //   // Modal states
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [modalTicket, setModalTicket] = useState(null);
// // //   const [modalType, setModalType] = useState(''); // 'priority' or 'status'
// // //   const [selectedValue, setSelectedValue] = useState('');
// // //   const [resolutionNote, setResolutionNote] = useState('');
// // //   const [modalLoading, setModalLoading] = useState(false);
  
// // //   // Ticket detail modal
// // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // //   const [detailTicket, setDetailTicket] = useState(null);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [activeTab]);

// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       if (activeTab === 'users') {
// // //         const res = await API.get('/admin/users');
// // //         setUsers(res.data.data || []);
// // //       } else {
// // //         const [ticketsRes, statsRes] = await Promise.all([
// // //           API.get('/admin/tickets'),
// // //           API.get('/admin/stats')
// // //         ]);
// // //         setTickets(ticketsRes.data.data || []);
// // //         setStats(statsRes.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching data:', error);
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Error Loading Data',
// // //         text: error.response?.data?.message || 'Server connection error',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteUser = async (id) => {
// // //     const result = await Swal.fire({
// // //       title: 'Delete User?',
// // //       text: 'This will delete the user and all their tickets!',
// // //       icon: 'warning',
// // //       showCancelButton: true,
// // //       confirmButtonColor: '#ef4444',
// // //       cancelButtonColor: '#6b7280',
// // //       confirmButtonText: 'Yes, Delete',
// // //     });

// // //     if (result.isConfirmed) {
// // //       try {
// // //         await API.delete(`/admin/users/${id}`);
// // //         setUsers(users.filter((u) => u._id !== id));
// // //         Swal.fire({
// // //           icon: 'success',
// // //           title: 'Deleted!',
// // //           text: 'User deleted successfully.',
// // //           timer: 1500,
// // //           showConfirmButton: false,
// // //         });
// // //       } catch (error) {
// // //         Swal.fire({
// // //           icon: 'error',
// // //           title: 'Error!',
// // //           text: error.response?.data?.message || 'Could not delete user.',
// // //           confirmButtonColor: '#8C5A32',
// // //         });
// // //       }
// // //     }
// // //   };

// // //   const handleUpdateRole = async (id, currentRole) => {
// // //     const newRole = currentRole === 'admin' ? 'user' : 'admin';
// // //     const result = await Swal.fire({
// // //       title: 'Update Role?',
// // //       text: `Change user role to ${newRole}?`,
// // //       icon: 'question',
// // //       showCancelButton: true,
// // //       confirmButtonColor: '#8C5A32',
// // //       cancelButtonColor: '#6b7280',
// // //       confirmButtonText: 'Update',
// // //     });

// // //     if (result.isConfirmed) {
// // //       try {
// // //         await API.put(`/admin/users/${id}/role`, { role: newRole });
// // //         setUsers(users.map((u) =>
// // //           u._id === id ? { ...u, role: newRole } : u
// // //         ));
// // //         Swal.fire({
// // //           icon: 'success',
// // //           title: 'Updated!',
// // //           text: 'User role updated successfully.',
// // //           timer: 1500,
// // //           showConfirmButton: false,
// // //         });
// // //       } catch (error) {
// // //         Swal.fire({
// // //           icon: 'error',
// // //           title: 'Error!',
// // //           text: error.response?.data?.message || 'Could not update role.',
// // //           confirmButtonColor: '#8C5A32',
// // //         });
// // //       }
// // //     }
// // //   };

// // //   // Open modal for priority update
// // //   const openPriorityModal = (ticket) => {
// // //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// // //       return Swal.fire({
// // //         icon: 'warning',
// // //         title: 'Ticket Closed',
// // //         text: 'Cannot change priority of a closed ticket.',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     }
// // //     setModalTicket(ticket);
// // //     setModalType('priority');
// // //     setSelectedValue(ticket.priority);
// // //     setResolutionNote('');
// // //     setShowModal(true);
// // //   };

// // //   // Open modal for status update
// // //   const openStatusModal = (ticket) => {
// // //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// // //       return Swal.fire({
// // //         icon: 'warning',
// // //         title: 'Ticket Closed',
// // //         text: 'Cannot change status of a closed ticket.',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     }
// // //     setModalTicket(ticket);
// // //     setModalType('status');
// // //     setSelectedValue(ticket.status);
// // //     setResolutionNote('');
// // //     setShowModal(true);
// // //   };

// // //   // Open detail modal
// // //   const openDetailModal = (ticket) => {
// // //     setDetailTicket(ticket);
// // //     setShowDetailModal(true);
// // //   };

// // //   // Handle modal submit
// // //   const handleModalSubmit = async () => {
// // //     if (!selectedValue) {
// // //       return Swal.fire({
// // //         icon: 'warning',
// // //         title: 'Selection Required',
// // //         text: 'Please select a value.',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     }

// // //     const isResolvingOrRejecting = (modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected'));
    
// // //     if (isResolvingOrRejecting && (!resolutionNote || resolutionNote.trim() === '')) {
// // //       return Swal.fire({
// // //         icon: 'warning',
// // //         title: 'Note Required',
// // //         text: 'Please provide a resolution/rejection note.',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     }

// // //     setModalLoading(true);
// // //     try {
// // //       const data = {};
// // //       if (modalType === 'priority') {
// // //         data.priority = selectedValue;
// // //       } else {
// // //         data.status = selectedValue;
// // //         if (isResolvingOrRejecting) {
// // //           data.resolutionNote = resolutionNote.trim();
// // //         }
// // //       }

// // //       const res = await API.put(`/tickets/${modalTicket._id}/status`, data);
// // //       setTickets(tickets.map((t) => t._id === modalTicket._id ? res.data.data : t));
      
// // //       setShowModal(false);
// // //       Swal.fire({
// // //         icon: 'success',
// // //         title: 'Updated!',
// // //         text: `${modalType === 'priority' ? 'Priority' : 'Status'} changed successfully.`,
// // //         timer: 1500,
// // //         showConfirmButton: false,
// // //       });
// // //     } catch (error) {
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Error!',
// // //         text: error.response?.data?.message || 'Could not update.',
// // //         confirmButtonColor: '#8C5A32',
// // //       });
// // //     } finally {
// // //       setModalLoading(false);
// // //     }
// // //   };

// // //   const getPriorityBadge = (priority) => {
// // //     const classes = {
// // //       Low: 'priority-low',
// // //       Medium: 'priority-medium',
// // //       High: 'priority-high',
// // //       Urgent: 'priority-urgent',
// // //     };
// // //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const classes = {
// // //       New: 'status-new',
// // //       Assigned: 'status-assigned',
// // //       'In Progress': 'status-inprogress',
// // //       Resolved: 'status-resolved',
// // //       Rejected: 'priority-urgent',
// // //     };
// // //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// // //   };

// // //   const StatCard = ({ title, value, icon: Icon, color }) => (
// // //     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
// // //       <div className="flex items-center justify-between">
// // //         <div>
// // //           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
// // //           <p className="text-2xl font-bold">{value}</p>
// // //         </div>
// // //         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
// // //           <Icon className={`w-6 h-6 ${color}`} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   if (loading) {
// // //     return (
// // //       <div className="page-container flex justify-center items-center">
// // //         <div className="spinner h-12 w-12"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="page-container">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 15 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.3 }}
// // //       >
// // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
// // //           <div>
// // //             <h1 className="text-3xl font-extrabold">
// // //               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
// // //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
// // //             </h1>
// // //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// // //               Manage all users and support tickets
// // //             </p>
// // //           </div>

// // //           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
// // //             <button
// // //               onClick={() => setActiveTab('tickets')}
// // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // //                 activeTab === 'tickets'
// // //                   ? 'bg-[#8C5A32] text-white shadow'
// // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //               }`}
// // //             >
// // //               <MdOutlineConfirmationNumber /> Tickets ({tickets.length})
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveTab('users')}
// // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// // //                 activeTab === 'users'
// // //                   ? 'bg-[#8C5A32] text-white shadow'
// // //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //               }`}
// // //             >
// // //               <FiUsers /> Users ({users.length})
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {activeTab === 'tickets' && stats && (
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // //             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
// // //             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
// // //             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
// // //             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
// // //           </div>
// // //         )}

// // //         {activeTab === 'users' ? (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {users.map((u) => {
// // //               const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
// // //               return (
// // //                 <div key={u._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// // //                   <div className="flex items-center gap-4 mb-4">
// // //                     <div className="avatar-circle w-14 h-14 text-xl">
// // //                       {u.name?.charAt(0).toUpperCase() || 'U'}
// // //                     </div>
// // //                     <div className="flex-1 min-w-0">
// // //                       <h3 className="font-bold text-lg truncate">{u.name}</h3>
// // //                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center justify-between text-sm">
// // //                     <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
// // //                       {u.role || 'user'}
// // //                     </span>
// // //                     <span className="text-gray-500 dark:text-gray-400">
// // //                       {userTicketCount} tickets
// // //                     </span>
// // //                     <span className="text-gray-500 dark:text-gray-400">
// // //                       {new Date(u.createdAt).toLocaleDateString()}
// // //                     </span>
// // //                   </div>
// // //                   <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// // //                     <button
// // //                       onClick={() => handleUpdateRole(u._id, u.role)}
// // //                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // //                       title="Toggle Role"
// // //                     >
// // //                       <FiEdit2 className="w-4 h-4" />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDeleteUser(u._id)}
// // //                       className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// // //                       title="Delete"
// // //                     >
// // //                       <FiTrash2 className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {tickets.map((t) => (
// // //               <div key={t._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// // //                 <div className="flex items-start justify-between mb-3">
// // //                   <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
// // //                     {t.ticketNumber}
// // //                   </span>
// // //                   <span className={getStatusBadge(t.status)}>{t.status}</span>
// // //                 </div>
// // //                 <h3 className="font-bold text-lg mb-1 line-clamp-1">{t.subject}</h3>
// // //                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
// // //                   {t.description}
// // //                 </p>
// // //                 <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
// // //                   <span className="text-gray-500 dark:text-gray-400">By: {t.createdBy?.name || 'Unknown'}</span>
// // //                   <span className="text-gray-400">•</span>
// // //                   <span className="text-gray-500 dark:text-gray-400">{t.category}</span>
// // //                 </div>
                
// // //                 {/* Rating Display */}
// // //                 {t.rating && t.rating.score && (
// // //                   <div className="flex items-center gap-1 mb-2 text-sm">
// // //                     <span className="text-gray-500 dark:text-gray-400">Rating:</span>
// // //                     <div className="flex items-center gap-0.5">
// // //                       {[1, 2, 3, 4, 5].map((star) => (
// // //                         <FiStar
// // //                           key={star}
// // //                           className={`w-4 h-4 ${star <= t.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
// // //                         />
// // //                       ))}
// // //                     </div>
// // //                     {t.rating.comment && (
// // //                       <span className="text-xs text-gray-400 ml-1">"</span>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //                 {t.rating?.comment && (
// // //                   <p className="text-xs text-gray-400 italic mb-2 line-clamp-1">"{t.rating.comment}"</p>
// // //                 )}

// // //                 <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
// // //                   <div className="flex items-center gap-2">
// // //                     <button
// // //                       onClick={() => openPriorityModal(t)}
// // //                       disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // //                       className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
// // //                       title="Click to change priority"
// // //                     >
// // //                       {t.priority}
// // //                     </button>
// // //                     <button
// // //                       onClick={() => openStatusModal(t)}
// // //                       disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// // //                       className="p-1 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// // //                       title="Change Status"
// // //                     >
// // //                       <FiRefreshCw className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <button
// // //                       onClick={() => openDetailModal(t)}
// // //                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// // //                       title="View Details & Messages"
// // //                     >
// // //                       <FiMessageCircle className="w-4 h-4" />
// // //                     </button>
// // //                     <span className="text-xs text-gray-400">
// // //                       {new Date(t.createdAt).toLocaleDateString()}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </motion.div>

// // //       {/* Modal for Priority/Status Update */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
// // //           >
// // //             <div className="flex items-center justify-between mb-6">
// // //               <h3 className="text-xl font-bold">
// // //                 {modalType === 'priority' ? 'Update Priority' : 'Update Status'}
// // //               </h3>
// // //               <button
// // //                 onClick={() => setShowModal(false)}
// // //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
// // //               >
// // //                 <FiX className="w-5 h-5" />
// // //               </button>
// // //             </div>

// // //             <div className="mb-4">
// // //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
// // //                 Ticket: <span className="font-semibold">{modalTicket?.ticketNumber}</span>
// // //               </p>
// // //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
// // //                 Subject: <span className="font-semibold">{modalTicket?.subject}</span>
// // //               </p>
// // //             </div>

// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                 Select {modalType === 'priority' ? 'Priority' : 'Status'}
// // //               </label>
// // //               <select
// // //                 value={selectedValue}
// // //                 onChange={(e) => setSelectedValue(e.target.value)}
// // //                 className="input-focus"
// // //                 disabled={modalLoading}
// // //               >
// // //                 {(modalType === 'priority' ? PRIORITY_OPTIONS : STATUS_OPTIONS).map((option) => (
// // //                   <option key={option} value={option}>{option}</option>
// // //                 ))}
// // //               </select>
// // //             </div>

// // //             {(modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected')) && (
// // //               <div className="mb-4">
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                   {selectedValue === 'Resolved' ? 'Resolution Note' : 'Rejection Reason'} *
// // //                 </label>
// // //                 <textarea
// // //                   value={resolutionNote}
// // //                   onChange={(e) => setResolutionNote(e.target.value)}
// // //                   placeholder={selectedValue === 'Resolved' ? 'Describe how the issue was resolved...' : 'Why is this ticket being rejected?'}
// // //                   className="input-focus min-h-[80px] resize-y"
// // //                   disabled={modalLoading}
// // //                 />
// // //               </div>
// // //             )}

// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={() => setShowModal(false)}
// // //                 className="flex-1 btn-outline"
// // //                 disabled={modalLoading}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={handleModalSubmit}
// // //                 disabled={modalLoading}
// // //                 className="flex-1 btn-primary flex justify-center items-center"
// // //               >
// // //                 {modalLoading ? (
// // //                   <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
// // //                 ) : (
// // //                   'Update'
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}

// // //       {/* Detail Modal for Messages and Rating */}
// // //       {showDetailModal && detailTicket && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
// // //           >
// // //             <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-900 pt-2 pb-4 border-b border-[#E5E0DA] dark:border-gray-800">
// // //               <div>
// // //                 <h3 className="text-xl font-bold">{detailTicket.subject}</h3>
// // //                 <p className="text-sm text-gray-500 dark:text-gray-400">
// // //                   {detailTicket.ticketNumber} • {detailTicket.category}
// // //                 </p>
// // //               </div>
// // //               <button
// // //                 onClick={() => setShowDetailModal(false)}
// // //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
// // //               >
// // //                 <FiX className="w-5 h-5" />
// // //               </button>
// // //             </div>

// // //             {/* Rating Display */}
// // //             {detailTicket.rating && detailTicket.rating.score && (
// // //               <div className="mb-4 p-4 bg-amber-soft border border-amber-soft rounded-xl">
// // //                 <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">User Rating</h4>
// // //                 <div className="flex items-center gap-2">
// // //                   <div className="flex items-center gap-0.5">
// // //                     {[1, 2, 3, 4, 5].map((star) => (
// // //                       <FiStar
// // //                         key={star}
// // //                         className={`w-5 h-5 ${star <= detailTicket.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
// // //                       />
// // //                     ))}
// // //                   </div>
// // //                   <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// // //                     {detailTicket.rating.score}/5
// // //                   </span>
// // //                 </div>
// // //                 {detailTicket.rating.comment && (
// // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
// // //                     "{detailTicket.rating.comment}"
// // //                   </p>
// // //                 )}
// // //                 <p className="text-xs text-gray-400 mt-1">
// // //                   Rated on: {new Date(detailTicket.rating.createdAt).toLocaleString()}
// // //                 </p>
// // //               </div>
// // //             )}

// // //             {/* Resolution Note */}
// // //             {detailTicket.resolutionNote && (
// // //               <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
// // //                 <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-1">Resolution Note</h4>
// // //                 <p className="text-emerald-700 dark:text-emerald-300 text-sm">{detailTicket.resolutionNote}</p>
// // //               </div>
// // //             )}

// // //             {/* Messages */}
// // //             <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
// // //               <FiMessageCircle /> Messages ({detailTicket.messages?.length || 0})
// // //             </h4>
            
// // //             <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
// // //               {detailTicket.messages && detailTicket.messages.length > 0 ? (
// // //                 detailTicket.messages.map((msg, index) => (
// // //                   <div
// // //                     key={index}
// // //                     className={`p-3 rounded-xl ${
// // //                       msg.senderRole === 'admin'
// // //                         ? 'bg-[#3D2817]/5 dark:bg-[#8C5A32]/10 border border-[#8C5A32]/20'
// // //                         : 'bg-[#FAFAFA] dark:bg-gray-800/50 border border-[#E5E0DA] dark:border-gray-700'
// // //                     }`}
// // //                   >
// // //                     <div className="flex items-center justify-between mb-1">
// // //                       <div className="flex items-center gap-2">
// // //                         <span className="font-semibold text-sm">
// // //                           {msg.sender?.name || 'Unknown'}
// // //                         </span>
// // //                         <span className={`text-xs px-2 py-0.5 rounded-full ${
// // //                           msg.senderRole === 'admin' ? 'admin-badge' : 'user-badge'
// // //                         }`}>
// // //                           {msg.senderRole}
// // //                         </span>
// // //                       </div>
// // //                       <span className="text-xs text-gray-500 dark:text-gray-400">
// // //                         {new Date(msg.timestamp).toLocaleString()}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <div className="text-center text-gray-500 dark:text-gray-400 py-4">
// // //                   No messages yet
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800 flex justify-end">
// // //               <button
// // //                 onClick={() => setShowDetailModal(false)}
// // //                 className="btn-primary px-6"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }























// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw, FiX, FiMessageCircle, FiStar, FiSend } from 'react-icons/fi';
// // import { MdOutlineConfirmationNumber } from 'react-icons/md';
// // import API from '../services/api';
// // import Swal from 'sweetalert2';

// // const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
// // const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

// // export default function AdminPanel() {
// //   const [activeTab, setActiveTab] = useState('tickets');
// //   const [users, setUsers] = useState([]);
// //   const [tickets, setTickets] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   // Modal states
// //   const [showModal, setShowModal] = useState(false);
// //   const [modalTicket, setModalTicket] = useState(null);
// //   const [modalType, setModalType] = useState(''); // 'priority' or 'status'
// //   const [selectedValue, setSelectedValue] = useState('');
// //   const [resolutionNote, setResolutionNote] = useState('');
// //   const [modalLoading, setModalLoading] = useState(false);
  
// //   // Ticket detail modal
// //   const [showDetailModal, setShowDetailModal] = useState(false);
// //   const [detailTicket, setDetailTicket] = useState(null);
// //   const [replyMessage, setReplyMessage] = useState('');
// //   const [sendingReply, setSendingReply] = useState(false);

// //   useEffect(() => {
// //     fetchData();
// //   }, [activeTab]);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       if (activeTab === 'users') {
// //         const res = await API.get('/admin/users');
// //         setUsers(res.data.data || []);
// //       } else {
// //         const [ticketsRes, statsRes] = await Promise.all([
// //           API.get('/admin/tickets'),
// //           API.get('/admin/stats')
// //         ]);
// //         setTickets(ticketsRes.data.data || []);
// //         setStats(statsRes.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error Loading Data',
// //         text: error.response?.data?.message || 'Server connection error',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteUser = async (id) => {
// //     const result = await Swal.fire({
// //       title: 'Delete User?',
// //       text: 'This will delete the user and all their tickets!',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#ef4444',
// //       cancelButtonColor: '#6b7280',
// //       confirmButtonText: 'Yes, Delete',
// //     });

// //     if (result.isConfirmed) {
// //       try {
// //         await API.delete(`/admin/users/${id}`);
// //         setUsers(users.filter((u) => u._id !== id));
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Deleted!',
// //           text: 'User deleted successfully.',
// //           timer: 1500,
// //           showConfirmButton: false,
// //         });
// //       } catch (error) {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error!',
// //           text: error.response?.data?.message || 'Could not delete user.',
// //           confirmButtonColor: '#8C5A32',
// //         });
// //       }
// //     }
// //   };

// //   const handleUpdateRole = async (id, currentRole) => {
// //     const newRole = currentRole === 'admin' ? 'user' : 'admin';
// //     const result = await Swal.fire({
// //       title: 'Update Role?',
// //       text: `Change user role to ${newRole}?`,
// //       icon: 'question',
// //       showCancelButton: true,
// //       confirmButtonColor: '#8C5A32',
// //       cancelButtonColor: '#6b7280',
// //       confirmButtonText: 'Update',
// //     });

// //     if (result.isConfirmed) {
// //       try {
// //         await API.put(`/admin/users/${id}/role`, { role: newRole });
// //         setUsers(users.map((u) =>
// //           u._id === id ? { ...u, role: newRole } : u
// //         ));
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Updated!',
// //           text: 'User role updated successfully.',
// //           timer: 1500,
// //           showConfirmButton: false,
// //         });
// //       } catch (error) {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error!',
// //           text: error.response?.data?.message || 'Could not update role.',
// //           confirmButtonColor: '#8C5A32',
// //         });
// //       }
// //     }
// //   };

// //   // Open modal for priority update
// //   const openPriorityModal = (ticket) => {
// //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// //       return Swal.fire({
// //         icon: 'warning',
// //         title: 'Ticket Closed',
// //         text: 'Cannot change priority of a closed ticket.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     }
// //     setModalTicket(ticket);
// //     setModalType('priority');
// //     setSelectedValue(ticket.priority);
// //     setResolutionNote('');
// //     setShowModal(true);
// //   };

// //   // Open modal for status update
// //   const openStatusModal = (ticket) => {
// //     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
// //       return Swal.fire({
// //         icon: 'warning',
// //         title: 'Ticket Closed',
// //         text: 'Cannot change status of a closed ticket.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     }
// //     setModalTicket(ticket);
// //     setModalType('status');
// //     setSelectedValue(ticket.status);
// //     setResolutionNote('');
// //     setShowModal(true);
// //   };

// //   // Open detail modal and fetch fresh ticket data
// //   const openDetailModal = async (ticket) => {
// //     setDetailTicket(ticket);
// //     setReplyMessage('');
// //     setShowDetailModal(true);
// //     // Fetch fresh data for messages
// //     try {
// //       const res = await API.get(`/tickets/${ticket._id}`);
// //       setDetailTicket(res.data.data);
// //       // Update the ticket in the list
// //       setTickets(tickets.map((t) => t._id === ticket._id ? res.data.data : t));
// //     } catch (error) {
// //       console.error('Error fetching ticket details:', error);
// //     }
// //   };

// //   // Handle modal submit for priority/status
// //   const handleModalSubmit = async () => {
// //     if (!selectedValue) {
// //       return Swal.fire({
// //         icon: 'warning',
// //         title: 'Selection Required',
// //         text: 'Please select a value.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     }

// //     const isResolvingOrRejecting = (modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected'));
    
// //     if (isResolvingOrRejecting && (!resolutionNote || resolutionNote.trim() === '')) {
// //       return Swal.fire({
// //         icon: 'warning',
// //         title: 'Note Required',
// //         text: 'Please provide a resolution/rejection note.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     }

// //     setModalLoading(true);
// //     try {
// //       const data = {};
// //       if (modalType === 'priority') {
// //         data.priority = selectedValue;
// //       } else {
// //         data.status = selectedValue;
// //         if (isResolvingOrRejecting) {
// //           data.resolutionNote = resolutionNote.trim();
// //         }
// //       }

// //       const res = await API.put(`/tickets/${modalTicket._id}/status`, data);
// //       setTickets(tickets.map((t) => t._id === modalTicket._id ? res.data.data : t));
      
// //       setShowModal(false);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Updated!',
// //         text: `${modalType === 'priority' ? 'Priority' : 'Status'} changed successfully.`,
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error!',
// //         text: error.response?.data?.message || 'Could not update.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     } finally {
// //       setModalLoading(false);
// //     }
// //   };

// //   // Send reply from admin
// //   const sendReply = async (e) => {
// //     e.preventDefault();
// //     if (!replyMessage.trim()) return;

// //     if (detailTicket.status === 'Resolved' || detailTicket.status === 'Rejected') {
// //       return Swal.fire({
// //         icon: 'warning',
// //         title: 'Ticket Closed',
// //         text: 'Cannot send messages to a closed ticket.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     }

// //     setSendingReply(true);
// //     try {
// //       const res = await API.post(`/tickets/${detailTicket._id}/messages`, { message: replyMessage.trim() });
// //       setDetailTicket(res.data.data);
// //       setReplyMessage('');
      
// //       // Update the ticket in the list
// //       setTickets(tickets.map((t) => t._id === detailTicket._id ? res.data.data : t));
      
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Reply Sent',
// //         text: 'Your reply has been sent to the user.',
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error!',
// //         text: error.response?.data?.message || 'Could not send reply.',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     } finally {
// //       setSendingReply(false);
// //     }
// //   };

// //   const getPriorityBadge = (priority) => {
// //     const classes = {
// //       Low: 'priority-low',
// //       Medium: 'priority-medium',
// //       High: 'priority-high',
// //       Urgent: 'priority-urgent',
// //     };
// //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// //   };

// //   const getStatusBadge = (status) => {
// //     const classes = {
// //       New: 'status-new',
// //       Assigned: 'status-assigned',
// //       'In Progress': 'status-inprogress',
// //       Resolved: 'status-resolved',
// //       Rejected: 'priority-urgent',
// //     };
// //     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// //   };

// //   const StatCard = ({ title, value, icon: Icon, color }) => (
// //     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
// //           <p className="text-2xl font-bold">{value}</p>
// //         </div>
// //         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
// //           <Icon className={`w-6 h-6 ${color}`} />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="page-container flex justify-center items-center">
// //         <div className="spinner h-12 w-12"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="page-container">
// //       <motion.div
// //         initial={{ opacity: 0, y: 15 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
// //           <div>
// //             <h1 className="text-3xl font-extrabold">
// //               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
// //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
// //             </h1>
// //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// //               Manage all users and support tickets
// //             </p>
// //           </div>

// //           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
// //             <button
// //               onClick={() => setActiveTab('tickets')}
// //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// //                 activeTab === 'tickets'
// //                   ? 'bg-[#8C5A32] text-white shadow'
// //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// //               }`}
// //             >
// //               <MdOutlineConfirmationNumber /> Tickets ({tickets.length})
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('users')}
// //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
// //                 activeTab === 'users'
// //                   ? 'bg-[#8C5A32] text-white shadow'
// //                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// //               }`}
// //             >
// //               <FiUsers /> Users ({users.length})
// //             </button>
// //           </div>
// //         </div>

// //         {activeTab === 'tickets' && stats && (
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
// //             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
// //             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
// //             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
// //           </div>
// //         )}

// //         {activeTab === 'users' ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {users.map((u) => {
// //               const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
// //               return (
// //                 <div key={u._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <div className="avatar-circle w-14 h-14 text-xl">
// //                       {u.name?.charAt(0).toUpperCase() || 'U'}
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <h3 className="font-bold text-lg truncate">{u.name}</h3>
// //                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center justify-between text-sm">
// //                     <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
// //                       {u.role || 'user'}
// //                     </span>
// //                     <span className="text-gray-500 dark:text-gray-400">
// //                       {userTicketCount} tickets
// //                     </span>
// //                     <span className="text-gray-500 dark:text-gray-400">
// //                       {new Date(u.createdAt).toLocaleDateString()}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// //                     <button
// //                       onClick={() => handleUpdateRole(u._id, u.role)}
// //                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// //                       title="Toggle Role"
// //                     >
// //                       <FiEdit2 className="w-4 h-4" />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteUser(u._id)}
// //                       className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// //                       title="Delete"
// //                     >
// //                       <FiTrash2 className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {tickets.map((t) => {
// //               const messageCount = t.messages?.length || 0;
// //               return (
// //                 <div key={t._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
// //                   <div className="flex items-start justify-between mb-3">
// //                     <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
// //                       {t.ticketNumber}
// //                     </span>
// //                     <span className={getStatusBadge(t.status)}>{t.status}</span>
// //                   </div>
// //                   <h3 className="font-bold text-lg mb-1 line-clamp-1">{t.subject}</h3>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
// //                     {t.description}
// //                   </p>
// //                   <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
// //                     <span className="text-gray-500 dark:text-gray-400">By: {t.createdBy?.name || 'Unknown'}</span>
// //                     <span className="text-gray-400">•</span>
// //                     <span className="text-gray-500 dark:text-gray-400">{t.category}</span>
// //                   </div>
                  
// //                   {/* Rating Display */}
// //                   {t.rating && t.rating.score && (
// //                     <div className="flex items-center gap-1 mb-2 text-sm">
// //                       <span className="text-gray-500 dark:text-gray-400">Rating:</span>
// //                       <div className="flex items-center gap-0.5">
// //                         {[1, 2, 3, 4, 5].map((star) => (
// //                           <FiStar
// //                             key={star}
// //                             className={`w-4 h-4 ${star <= t.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
// //                           />
// //                         ))}
// //                       </div>
// //                       {t.rating.comment && (
// //                         <span className="text-xs text-gray-400 ml-1">"</span>
// //                       )}
// //                     </div>
// //                   )}
// //                   {t.rating?.comment && (
// //                     <p className="text-xs text-gray-400 italic mb-2 line-clamp-1">"{t.rating.comment}"</p>
// //                   )}

// //                   <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => openPriorityModal(t)}
// //                         disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// //                         className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
// //                         title="Click to change priority"
// //                       >
// //                         {t.priority}
// //                       </button>
// //                       <button
// //                         onClick={() => openStatusModal(t)}
// //                         disabled={t.status === 'Resolved' || t.status === 'Rejected'}
// //                         className="p-1 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
// //                         title="Change Status"
// //                       >
// //                         <FiRefreshCw className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => openDetailModal(t)}
// //                         className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors relative"
// //                         title="View Messages"
// //                       >
// //                         <FiMessageCircle className="w-4 h-4" />
// //                         {messageCount > 0 && (
// //                           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                             {messageCount}
// //                           </span>
// //                         )}
// //                       </button>
// //                       <span className="text-xs text-gray-400">
// //                         {new Date(t.createdAt).toLocaleDateString()}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </motion.div>

// //       {/* Modal for Priority/Status Update */}
// //       {showModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
// //           >
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-xl font-bold">
// //                 {modalType === 'priority' ? 'Update Priority' : 'Update Status'}
// //               </h3>
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
// //               >
// //                 <FiX className="w-5 h-5" />
// //               </button>
// //             </div>

// //             <div className="mb-4">
// //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
// //                 Ticket: <span className="font-semibold">{modalTicket?.ticketNumber}</span>
// //               </p>
// //               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
// //                 Subject: <span className="font-semibold">{modalTicket?.subject}</span>
// //               </p>
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                 Select {modalType === 'priority' ? 'Priority' : 'Status'}
// //               </label>
// //               <select
// //                 value={selectedValue}
// //                 onChange={(e) => setSelectedValue(e.target.value)}
// //                 className="input-focus"
// //                 disabled={modalLoading}
// //               >
// //                 {(modalType === 'priority' ? PRIORITY_OPTIONS : STATUS_OPTIONS).map((option) => (
// //                   <option key={option} value={option}>{option}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {(modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected')) && (
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                   {selectedValue === 'Resolved' ? 'Resolution Note' : 'Rejection Reason'} *
// //                 </label>
// //                 <textarea
// //                   value={resolutionNote}
// //                   onChange={(e) => setResolutionNote(e.target.value)}
// //                   placeholder={selectedValue === 'Resolved' ? 'Describe how the issue was resolved...' : 'Why is this ticket being rejected?'}
// //                   className="input-focus min-h-[80px] resize-y"
// //                   disabled={modalLoading}
// //                 />
// //               </div>
// //             )}

// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="flex-1 btn-outline"
// //                 disabled={modalLoading}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleModalSubmit}
// //                 disabled={modalLoading}
// //                 className="flex-1 btn-primary flex justify-center items-center"
// //               >
// //                 {modalLoading ? (
// //                   <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
// //                 ) : (
// //                   'Update'
// //                 )}
// //               </button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}

// //       {/* Detail Modal for Messages, Rating, and Reply */}
// //       {showDetailModal && detailTicket && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
// //           >
// //             <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-900 pt-2 pb-4 border-b border-[#E5E0DA] dark:border-gray-800">
// //               <div>
// //                 <h3 className="text-xl font-bold">{detailTicket.subject}</h3>
// //                 <p className="text-sm text-gray-500 dark:text-gray-400">
// //                   {detailTicket.ticketNumber} • {detailTicket.category}
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={() => setShowDetailModal(false)}
// //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
// //               >
// //                 <FiX className="w-5 h-5" />
// //               </button>
// //             </div>

// //             {/* Status and Priority Info */}
// //             <div className="flex items-center gap-3 mb-4 flex-wrap">
// //               <span className={getStatusBadge(detailTicket.status)}>{detailTicket.status}</span>
// //               <span className={getPriorityBadge(detailTicket.priority)}>{detailTicket.priority}</span>
// //               <span className="text-sm text-gray-500 dark:text-gray-400">
// //                 By: {detailTicket.createdBy?.name || 'Unknown'}
// //               </span>
// //             </div>

// //             {/* Description */}
// //             <div className="mb-4 p-4 bg-[#FAFAFA] dark:bg-gray-800/50 rounded-xl border border-[#E5E0DA] dark:border-gray-700">
// //               <p className="text-gray-700 dark:text-gray-300 text-sm">{detailTicket.description}</p>
// //             </div>

// //             {/* Rating Display */}
// //             {detailTicket.rating && detailTicket.rating.score && (
// //               <div className="mb-4 p-4 bg-amber-soft border border-amber-soft rounded-xl">
// //                 <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">User Rating</h4>
// //                 <div className="flex items-center gap-2">
// //                   <div className="flex items-center gap-0.5">
// //                     {[1, 2, 3, 4, 5].map((star) => (
// //                       <FiStar
// //                         key={star}
// //                         className={`w-5 h-5 ${star <= detailTicket.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
// //                       />
// //                     ))}
// //                   </div>
// //                   <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// //                     {detailTicket.rating.score}/5
// //                   </span>
// //                 </div>
// //                 {detailTicket.rating.comment && (
// //                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
// //                     "{detailTicket.rating.comment}"
// //                   </p>
// //                 )}
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Rated on: {new Date(detailTicket.rating.createdAt).toLocaleString()}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Resolution Note */}
// //             {detailTicket.resolutionNote && (
// //               <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
// //                 <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-1">Resolution Note</h4>
// //                 <p className="text-emerald-700 dark:text-emerald-300 text-sm">{detailTicket.resolutionNote}</p>
// //               </div>
// //             )}

// //             {/* Messages */}
// //             <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
// //               <FiMessageCircle /> Messages ({detailTicket.messages?.length || 0})
// //             </h4>
            
// //             <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 mb-4">
// //               {detailTicket.messages && detailTicket.messages.length > 0 ? (
// //                 detailTicket.messages.map((msg, index) => (
// //                   <div
// //                     key={index}
// //                     className={`p-3 rounded-xl ${
// //                       msg.senderRole === 'admin'
// //                         ? 'bg-[#3D2817]/5 dark:bg-[#8C5A32]/10 border border-[#8C5A32]/20'
// //                         : 'bg-[#FAFAFA] dark:bg-gray-800/50 border border-[#E5E0DA] dark:border-gray-700'
// //                     }`}
// //                   >
// //                     <div className="flex items-center justify-between mb-1">
// //                       <div className="flex items-center gap-2">
// //                         <span className="font-semibold text-sm">
// //                           {msg.sender?.name || 'Unknown'}
// //                         </span>
// //                         <span className={`text-xs px-2 py-0.5 rounded-full ${
// //                           msg.senderRole === 'admin' ? 'admin-badge' : 'user-badge'
// //                         }`}>
// //                           {msg.senderRole}
// //                         </span>
// //                       </div>
// //                       <span className="text-xs text-gray-500 dark:text-gray-400">
// //                         {new Date(msg.timestamp).toLocaleString()}
// //                       </span>
// //                     </div>
// //                     <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center text-gray-500 dark:text-gray-400 py-4">
// //                   No messages yet
// //                 </div>
// //               )}
// //             </div>

// //             {/* Reply Form - Only if ticket is open */}
// //             {detailTicket.status !== 'Resolved' && detailTicket.status !== 'Rejected' && (
// //               <form onSubmit={sendReply} className="flex gap-3 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// //                 <input
// //                   type="text"
// //                   value={replyMessage}
// //                   onChange={(e) => setReplyMessage(e.target.value)}
// //                   placeholder="Type your reply to the user..."
// //                   className="input-focus flex-1"
// //                   disabled={sendingReply}
// //                   required
// //                 />
// //                 <button
// //                   type="submit"
// //                   disabled={sendingReply || !replyMessage.trim()}
// //                   className="btn-primary flex items-center gap-2 whitespace-nowrap"
// //                 >
// //                   {sendingReply ? (
// //                     <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
// //                   ) : (
// //                     <>
// //                       <FiSend /> Reply
// //                     </>
// //                   )}
// //                 </button>
// //               </form>
// //             )}

// //             {detailTicket.status === 'Resolved' && (
// //               <div className="text-center text-sm text-emerald-600 dark:text-emerald-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// //                 This ticket is resolved. No further replies can be sent.
// //               </div>
// //             )}
// //             {detailTicket.status === 'Rejected' && (
// //               <div className="text-center text-sm text-red-600 dark:text-red-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
// //                 This ticket is rejected. No further replies can be sent.
// //               </div>
// //             )}
// //           </motion.div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



















// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw, FiX, FiMessageCircle, FiStar, FiSend } from 'react-icons/fi';
// import { MdOutlineConfirmationNumber } from 'react-icons/md';
// import API from '../services/api';
// import Swal from 'sweetalert2';

// const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
// const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

// export default function AdminPanel() {
//   const [activeTab, setActiveTab] = useState('tickets');
//   const [users, setUsers] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalTicket, setModalTicket] = useState(null);
//   const [modalType, setModalType] = useState(''); // 'priority' or 'status'
//   const [selectedValue, setSelectedValue] = useState('');
//   const [resolutionNote, setResolutionNote] = useState('');
//   const [modalLoading, setModalLoading] = useState(false);
  
//   // Ticket detail modal
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [detailTicket, setDetailTicket] = useState(null);
//   const [replyMessage, setReplyMessage] = useState('');
//   const [sendingReply, setSendingReply] = useState(false);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       // Fetch both users and tickets in parallel
//       const [usersRes, ticketsRes, statsRes] = await Promise.all([
//         API.get('/admin/users'),
//         API.get('/admin/tickets'),
//         API.get('/admin/stats')
//       ]);
      
//       setUsers(usersRes.data.data || []);
//       setTickets(ticketsRes.data.data || []);
//       setStats(statsRes.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error Loading Data',
//         text: error.response?.data?.message || 'Server connection error',
//         confirmButtonColor: '#8C5A32',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'users') {
//         const res = await API.get('/admin/users');
//         setUsers(res.data.data || []);
//       } else {
//         const [ticketsRes, statsRes] = await Promise.all([
//           API.get('/admin/tickets'),
//           API.get('/admin/stats')
//         ]);
//         setTickets(ticketsRes.data.data || []);
//         setStats(statsRes.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error Loading Data',
//         text: error.response?.data?.message || 'Server connection error',
//         confirmButtonColor: '#8C5A32',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     const result = await Swal.fire({
//       title: 'Delete User?',
//       text: 'This will delete the user and all their tickets!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#ef4444',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Yes, Delete',
//     });

//     if (result.isConfirmed) {
//       try {
//         await API.delete(`/admin/users/${id}`);
//         setUsers(users.filter((u) => u._id !== id));
//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'User deleted successfully.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: error.response?.data?.message || 'Could not delete user.',
//           confirmButtonColor: '#8C5A32',
//         });
//       }
//     }
//   };

//   const handleUpdateRole = async (id, currentRole) => {
//     const newRole = currentRole === 'admin' ? 'user' : 'admin';
//     const result = await Swal.fire({
//       title: 'Update Role?',
//       text: `Change user role to ${newRole}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#8C5A32',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Update',
//     });

//     if (result.isConfirmed) {
//       try {
//         await API.put(`/admin/users/${id}/role`, { role: newRole });
//         setUsers(users.map((u) =>
//           u._id === id ? { ...u, role: newRole } : u
//         ));
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'User role updated successfully.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: error.response?.data?.message || 'Could not update role.',
//           confirmButtonColor: '#8C5A32',
//         });
//       }
//     }
//   };

//   // Open modal for priority update
//   const openPriorityModal = (ticket) => {
//     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Ticket Closed',
//         text: 'Cannot change priority of a closed ticket.',
//         confirmButtonColor: '#8C5A32',
//       });
//     }
//     setModalTicket(ticket);
//     setModalType('priority');
//     setSelectedValue(ticket.priority);
//     setResolutionNote('');
//     setShowModal(true);
//   };

//   // Open modal for status update
//   const openStatusModal = (ticket) => {
//     if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Ticket Closed',
//         text: 'Cannot change status of a closed ticket.',
//         confirmButtonColor: '#8C5A32',
//       });
//     }
//     setModalTicket(ticket);
//     setModalType('status');
//     setSelectedValue(ticket.status);
//     setResolutionNote('');
//     setShowModal(true);
//   };

//   // Open detail modal and fetch fresh ticket data
//   const openDetailModal = async (ticket) => {
//     setDetailTicket(ticket);
//     setReplyMessage('');
//     setShowDetailModal(true);
//     // Fetch fresh data for messages
//     try {
//       const res = await API.get(`/tickets/${ticket._id}`);
//       setDetailTicket(res.data.data);
//       // Update the ticket in the list
//       setTickets(tickets.map((t) => t._id === ticket._id ? res.data.data : t));
//     } catch (error) {
//       console.error('Error fetching ticket details:', error);
//     }
//   };

//   // Handle modal submit for priority/status
//   const handleModalSubmit = async () => {
//     if (!selectedValue) {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Selection Required',
//         text: 'Please select a value.',
//         confirmButtonColor: '#8C5A32',
//       });
//     }

//     const isResolvingOrRejecting = (modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected'));
    
//     if (isResolvingOrRejecting && (!resolutionNote || resolutionNote.trim() === '')) {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Note Required',
//         text: 'Please provide a resolution/rejection note.',
//         confirmButtonColor: '#8C5A32',
//       });
//     }

//     setModalLoading(true);
//     try {
//       const data = {};
//       if (modalType === 'priority') {
//         data.priority = selectedValue;
//       } else {
//         data.status = selectedValue;
//         if (isResolvingOrRejecting) {
//           data.resolutionNote = resolutionNote.trim();
//         }
//       }

//       const res = await API.put(`/tickets/${modalTicket._id}/status`, data);
//       setTickets(tickets.map((t) => t._id === modalTicket._id ? res.data.data : t));
      
//       setShowModal(false);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: `${modalType === 'priority' ? 'Priority' : 'Status'} changed successfully.`,
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: error.response?.data?.message || 'Could not update.',
//         confirmButtonColor: '#8C5A32',
//       });
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   // Send reply from admin
//   const sendReply = async (e) => {
//     e.preventDefault();
//     if (!replyMessage.trim()) return;

//     if (detailTicket.status === 'Resolved' || detailTicket.status === 'Rejected') {
//       return Swal.fire({
//         icon: 'warning',
//         title: 'Ticket Closed',
//         text: 'Cannot send messages to a closed ticket.',
//         confirmButtonColor: '#8C5A32',
//       });
//     }

//     setSendingReply(true);
//     try {
//       const res = await API.post(`/tickets/${detailTicket._id}/messages`, { message: replyMessage.trim() });
//       setDetailTicket(res.data.data);
//       setReplyMessage('');
      
//       // Update the ticket in the list
//       setTickets(tickets.map((t) => t._id === detailTicket._id ? res.data.data : t));
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Reply Sent',
//         text: 'Your reply has been sent to the user.',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: error.response?.data?.message || 'Could not send reply.',
//         confirmButtonColor: '#8C5A32',
//       });
//     } finally {
//       setSendingReply(false);
//     }
//   };

//   const getPriorityBadge = (priority) => {
//     const classes = {
//       Low: 'priority-low',
//       Medium: 'priority-medium',
//       High: 'priority-high',
//       Urgent: 'priority-urgent',
//     };
//     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
//   };

//   const getStatusBadge = (status) => {
//     const classes = {
//       New: 'status-new',
//       Assigned: 'status-assigned',
//       'In Progress': 'status-inprogress',
//       Resolved: 'status-resolved',
//       Rejected: 'priority-urgent',
//     };
//     return `px-2 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
//   };

//   const StatCard = ({ title, value, icon: Icon, color }) => (
//     <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//         <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
//           <Icon className={`w-6 h-6 ${color}`} />
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="page-container flex justify-center items-center">
//         <div className="spinner h-12 w-12"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-extrabold">
//               <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
//               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               Manage all users and support tickets
//             </p>
//           </div>

//           <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
//             <button
//               onClick={() => {
//                 setActiveTab('tickets');
//                 fetchData();
//               }}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                 activeTab === 'tickets'
//                   ? 'bg-[#8C5A32] text-white shadow'
//                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
//               }`}
//             >
//               <MdOutlineConfirmationNumber /> Tickets ({tickets.length})
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('users');
//                 fetchData();
//               }}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                 activeTab === 'users'
//                   ? 'bg-[#8C5A32] text-white shadow'
//                   : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
//               }`}
//             >
//               <FiUsers /> Users ({users.length})
//             </button>
//           </div>
//         </div>

//         {activeTab === 'tickets' && stats && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
//             <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
//             <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
//             <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
//           </div>
//         )}

//         {activeTab === 'users' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {users.length === 0 ? (
//               <div className="col-span-full text-center py-16 glass rounded-2xl">
//                 <div className="text-6xl mb-4">👤</div>
//                 <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
//                 <p className="text-gray-500 dark:text-gray-400">There are no registered users yet.</p>
//               </div>
//             ) : (
//               users.map((u) => {
//                 const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
//                 return (
//                   <div key={u._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="avatar-circle w-14 h-14 text-xl">
//                         {u.name?.charAt(0).toUpperCase() || 'U'}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-bold text-lg truncate">{u.name}</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
//                         {u.role || 'user'}
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-400">
//                         {userTicketCount} tickets
//                       </span>
//                       <span className="text-gray-500 dark:text-gray-400">
//                         {new Date(u.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
//                       <button
//                         onClick={() => handleUpdateRole(u._id, u.role)}
//                         className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
//                         title="Toggle Role"
//                       >
//                         <FiEdit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(u._id)}
//                         className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
//                         title="Delete"
//                       >
//                         <FiTrash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tickets.length === 0 ? (
//               <div className="col-span-full text-center py-16 glass rounded-2xl">
//                 <div className="text-6xl mb-4">🎫</div>
//                 <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
//                 <p className="text-gray-500 dark:text-gray-400">There are no support tickets yet.</p>
//               </div>
//             ) : (
//               tickets.map((t) => {
//                 const messageCount = t.messages?.length || 0;
//                 return (
//                   <div key={t._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
//                     <div className="flex items-start justify-between mb-3">
//                       <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
//                         {t.ticketNumber}
//                       </span>
//                       <span className={getStatusBadge(t.status)}>{t.status}</span>
//                     </div>
//                     <h3 className="font-bold text-lg mb-1 line-clamp-1">{t.subject}</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
//                       {t.description}
//                     </p>
//                     <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
//                       <span className="text-gray-500 dark:text-gray-400">By: {t.createdBy?.name || 'Unknown'}</span>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-gray-500 dark:text-gray-400">{t.category}</span>
//                     </div>
                    
//                     {/* Rating Display */}
//                     {t.rating && t.rating.score && (
//                       <div className="flex items-center gap-1 mb-2 text-sm">
//                         <span className="text-gray-500 dark:text-gray-400">Rating:</span>
//                         <div className="flex items-center gap-0.5">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <FiStar
//                               key={star}
//                               className={`w-4 h-4 ${star <= t.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
//                             />
//                           ))}
//                         </div>
//                         {t.rating.comment && (
//                           <span className="text-xs text-gray-400 ml-1">"</span>
//                         )}
//                       </div>
//                     )}
//                     {t.rating?.comment && (
//                       <p className="text-xs text-gray-400 italic mb-2 line-clamp-1">"{t.rating.comment}"</p>
//                     )}

//                     <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => openPriorityModal(t)}
//                           disabled={t.status === 'Resolved' || t.status === 'Rejected'}
//                           className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
//                           title="Click to change priority"
//                         >
//                           {t.priority}
//                         </button>
//                         <button
//                           onClick={() => openStatusModal(t)}
//                           disabled={t.status === 'Resolved' || t.status === 'Rejected'}
//                           className="p-1 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//                           title="Change Status"
//                         >
//                           <FiRefreshCw className="w-4 h-4" />
//                         </button>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => openDetailModal(t)}
//                           className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors relative"
//                           title="View Messages"
//                         >
//                           <FiMessageCircle className="w-4 h-4" />
//                           {messageCount > 0 && (
//                             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                               {messageCount}
//                             </span>
//                           )}
//                         </button>
//                         <span className="text-xs text-gray-400">
//                           {new Date(t.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </motion.div>

//       {/* Modal for Priority/Status Update */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold">
//                 {modalType === 'priority' ? 'Update Priority' : 'Update Status'}
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="mb-4">
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                 Ticket: <span className="font-semibold">{modalTicket?.ticketNumber}</span>
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                 Subject: <span className="font-semibold">{modalTicket?.subject}</span>
//               </p>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Select {modalType === 'priority' ? 'Priority' : 'Status'}
//               </label>
//               <select
//                 value={selectedValue}
//                 onChange={(e) => setSelectedValue(e.target.value)}
//                 className="input-focus"
//                 disabled={modalLoading}
//               >
//                 {(modalType === 'priority' ? PRIORITY_OPTIONS : STATUS_OPTIONS).map((option) => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>

//             {(modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected')) && (
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   {selectedValue === 'Resolved' ? 'Resolution Note' : 'Rejection Reason'} *
//                 </label>
//                 <textarea
//                   value={resolutionNote}
//                   onChange={(e) => setResolutionNote(e.target.value)}
//                   placeholder={selectedValue === 'Resolved' ? 'Describe how the issue was resolved...' : 'Why is this ticket being rejected?'}
//                   className="input-focus min-h-[80px] resize-y"
//                   disabled={modalLoading}
//                 />
//               </div>
//             )}

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 btn-outline"
//                 disabled={modalLoading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleModalSubmit}
//                 disabled={modalLoading}
//                 className="flex-1 btn-primary flex justify-center items-center"
//               >
//                 {modalLoading ? (
//                   <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
//                 ) : (
//                   'Update'
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Detail Modal for Messages, Rating, and Reply */}
//       {showDetailModal && detailTicket && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
//           >
//             <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-900 pt-2 pb-4 border-b border-[#E5E0DA] dark:border-gray-800">
//               <div>
//                 <h3 className="text-xl font-bold">{detailTicket.subject}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {detailTicket.ticketNumber} • {detailTicket.category}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowDetailModal(false)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Status and Priority Info */}
//             <div className="flex items-center gap-3 mb-4 flex-wrap">
//               <span className={getStatusBadge(detailTicket.status)}>{detailTicket.status}</span>
//               <span className={getPriorityBadge(detailTicket.priority)}>{detailTicket.priority}</span>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 By: {detailTicket.createdBy?.name || 'Unknown'}
//               </span>
//             </div>

//             {/* Description */}
//             <div className="mb-4 p-4 bg-[#FAFAFA] dark:bg-gray-800/50 rounded-xl border border-[#E5E0DA] dark:border-gray-700">
//               <p className="text-gray-700 dark:text-gray-300 text-sm">{detailTicket.description}</p>
//             </div>

//             {/* Rating Display */}
//             {detailTicket.rating && detailTicket.rating.score && (
//               <div className="mb-4 p-4 bg-amber-soft border border-amber-soft rounded-xl">
//                 <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">User Rating</h4>
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-0.5">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <FiStar
//                         key={star}
//                         className={`w-5 h-5 ${star <= detailTicket.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                     {detailTicket.rating.score}/5
//                   </span>
//                 </div>
//                 {detailTicket.rating.comment && (
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
//                     "{detailTicket.rating.comment}"
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-400 mt-1">
//                   Rated on: {new Date(detailTicket.rating.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             )}

//             {/* Resolution Note */}
//             {detailTicket.resolutionNote && (
//               <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
//                 <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-1">Resolution Note</h4>
//                 <p className="text-emerald-700 dark:text-emerald-300 text-sm">{detailTicket.resolutionNote}</p>
//               </div>
//             )}

//             {/* Messages */}
//             <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//               <FiMessageCircle /> Messages ({detailTicket.messages?.length || 0})
//             </h4>
            
//             <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 mb-4">
//               {detailTicket.messages && detailTicket.messages.length > 0 ? (
//                 detailTicket.messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 rounded-xl ${
//                       msg.senderRole === 'admin'
//                         ? 'bg-[#3D2817]/5 dark:bg-[#8C5A32]/10 border border-[#8C5A32]/20'
//                         : 'bg-[#FAFAFA] dark:bg-gray-800/50 border border-[#E5E0DA] dark:border-gray-700'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between mb-1">
//                       <div className="flex items-center gap-2">
//                         <span className="font-semibold text-sm">
//                           {msg.sender?.name || 'Unknown'}
//                         </span>
//                         <span className={`text-xs px-2 py-0.5 rounded-full ${
//                           msg.senderRole === 'admin' ? 'admin-badge' : 'user-badge'
//                         }`}>
//                           {msg.senderRole}
//                         </span>
//                       </div>
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         {new Date(msg.timestamp).toLocaleString()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-500 dark:text-gray-400 py-4">
//                   No messages yet
//                 </div>
//               )}
//             </div>

//             {/* Reply Form - Only if ticket is open */}
//             {detailTicket.status !== 'Resolved' && detailTicket.status !== 'Rejected' && (
//               <form onSubmit={sendReply} className="flex gap-3 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
//                 <input
//                   type="text"
//                   value={replyMessage}
//                   onChange={(e) => setReplyMessage(e.target.value)}
//                   placeholder="Type your reply to the user..."
//                   className="input-focus flex-1"
//                   disabled={sendingReply}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   disabled={sendingReply || !replyMessage.trim()}
//                   className="btn-primary flex items-center gap-2 whitespace-nowrap"
//                 >
//                   {sendingReply ? (
//                     <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
//                   ) : (
//                     <>
//                       <FiSend /> Reply
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}

//             {detailTicket.status === 'Resolved' && (
//               <div className="text-center text-sm text-emerald-600 dark:text-emerald-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
//                 This ticket is resolved. No further replies can be sent.
//               </div>
//             )}
//             {detailTicket.status === 'Rejected' && (
//               <div className="text-center text-sm text-red-600 dark:text-red-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
//                 This ticket is rejected. No further replies can be sent.
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

























import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiUser, FiRefreshCw, FiX, FiMessageCircle, FiStar, FiSend } from 'react-icons/fi';
import { MdOutlineConfirmationNumber } from 'react-icons/md';
import API from '../services/api';
import Swal from 'sweetalert2';

const STATUS_OPTIONS = ['New', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalTicket, setModalTicket] = useState(null);
  const [modalType, setModalType] = useState(''); // 'priority' or 'status'
  const [selectedValue, setSelectedValue] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  
  // Ticket detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailTicket, setDetailTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [usersRes, ticketsRes, statsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/tickets'),
        API.get('/admin/stats')
      ]);
      
      setUsers(usersRes.data.data || []);
      setTickets(ticketsRes.data.data || []);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Loading Data',
        text: error.response?.data?.message || 'Server connection error',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await API.get('/admin/users');
        setUsers(res.data.data || []);
      } else {
        const [ticketsRes, statsRes] = await Promise.all([
          API.get('/admin/tickets'),
          API.get('/admin/stats')
        ]);
        setTickets(ticketsRes.data.data || []);
        setStats(statsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Loading Data',
        text: error.response?.data?.message || 'Server connection error',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: 'This will delete the user and all their tickets!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/admin/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'Could not delete user.',
          confirmButtonColor: '#8C5A32',
        });
      }
    }
  };

  const handleUpdateRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const result = await Swal.fire({
      title: 'Update Role?',
      text: `Change user role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8C5A32',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Update',
    });

    if (result.isConfirmed) {
      try {
        await API.put(`/admin/users/${id}/role`, { role: newRole });
        setUsers(users.map((u) =>
          u._id === id ? { ...u, role: newRole } : u
        ));
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'User role updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'Could not update role.',
          confirmButtonColor: '#8C5A32',
        });
      }
    }
  };

  // Open modal for priority update
  const openPriorityModal = (ticket) => {
    if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
      return Swal.fire({
        icon: 'warning',
        title: 'Ticket Closed',
        text: 'Cannot change priority of a closed ticket.',
        confirmButtonColor: '#8C5A32',
      });
    }
    setModalTicket(ticket);
    setModalType('priority');
    setSelectedValue(ticket.priority);
    setResolutionNote('');
    setShowModal(true);
  };

  // Open modal for status update
  const openStatusModal = (ticket) => {
    if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
      return Swal.fire({
        icon: 'warning',
        title: 'Ticket Closed',
        text: 'Cannot change status of a closed ticket.',
        confirmButtonColor: '#8C5A32',
      });
    }
    setModalTicket(ticket);
    setModalType('status');
    setSelectedValue(ticket.status);
    setResolutionNote('');
    setShowModal(true);
  };

  // Open detail modal and fetch fresh ticket data
  const openDetailModal = async (ticket) => {
    setDetailTicket(ticket);
    setReplyMessage('');
    setShowDetailModal(true);
    try {
      const res = await API.get(`/tickets/${ticket._id}`);
      setDetailTicket(res.data.data);
      setTickets(tickets.map((t) => t._id === ticket._id ? res.data.data : t));
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  // Handle modal submit for priority/status
  const handleModalSubmit = async () => {
    if (!selectedValue) {
      return Swal.fire({
        icon: 'warning',
        title: 'Selection Required',
        text: 'Please select a value.',
        confirmButtonColor: '#8C5A32',
      });
    }

    const isResolvingOrRejecting = (modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected'));
    
    if (isResolvingOrRejecting && (!resolutionNote || resolutionNote.trim() === '')) {
      return Swal.fire({
        icon: 'warning',
        title: 'Note Required',
        text: 'Please provide a resolution/rejection note.',
        confirmButtonColor: '#8C5A32',
      });
    }

    setModalLoading(true);
    try {
      const data = {};
      if (modalType === 'priority') {
        data.priority = selectedValue;
      } else {
        data.status = selectedValue;
        if (isResolvingOrRejecting) {
          data.resolutionNote = resolutionNote.trim();
        }
      }

      const res = await API.put(`/tickets/${modalTicket._id}/status`, data);
      setTickets(tickets.map((t) => t._id === modalTicket._id ? res.data.data : t));
      
      setShowModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${modalType === 'priority' ? 'Priority' : 'Status'} changed successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Could not update.',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setModalLoading(false);
    }
  };

  // Send reply from admin
  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    if (detailTicket.status === 'Resolved' || detailTicket.status === 'Rejected') {
      return Swal.fire({
        icon: 'warning',
        title: 'Ticket Closed',
        text: 'Cannot send messages to a closed ticket.',
        confirmButtonColor: '#8C5A32',
      });
    }

    setSendingReply(true);
    try {
      const res = await API.post(`/tickets/${detailTicket._id}/messages`, { message: replyMessage.trim() });
      setDetailTicket(res.data.data);
      setReplyMessage('');
      
      // Update the ticket in the list
      setTickets(tickets.map((t) => t._id === detailTicket._id ? res.data.data : t));
      
      Swal.fire({
        icon: 'success',
        title: 'Reply Sent',
        text: 'Your reply has been sent to the user.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Could not send reply.',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setSendingReply(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      Low: 'priority-low',
      Medium: 'priority-medium',
      High: 'priority-high',
      Urgent: 'priority-urgent',
    };
    return `px-2 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
  };

  const getStatusBadge = (status) => {
    const classes = {
      New: 'status-new',
      Assigned: 'status-assigned',
      'In Progress': 'status-inprogress',
      Resolved: 'status-resolved',
      Rejected: 'priority-urgent',
    };
    return `px-2 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass p-6 rounded-xl border border-[#E5E0DA] dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  // Check if there are unread messages (messages from user that admin hasn't replied to)
  const hasUnreadMessages = (ticket) => {
    if (!ticket.messages || ticket.messages.length === 0) return false;
    // Check if the last message is from user and admin hasn't replied after it
    const lastMessage = ticket.messages[ticket.messages.length - 1];
    return lastMessage.senderRole === 'user';
  };

  // Get message count for display
  const getMessageCount = (ticket) => {
    return ticket.messages?.length || 0;
  };

  if (loading) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">
              <span className="text-[#3D2817] dark:text-[#8C5A32]">Admin</span>
              <span className="text-[#8C5A32] dark:text-[#D4A574]"> Dashboard</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Manage all users and support tickets
            </p>
          </div>

          <div className="flex p-1 rounded-xl glass border border-[#E5E0DA] dark:border-gray-800">
            <button
              onClick={() => {
                setActiveTab('tickets');
                fetchData();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'tickets'
                  ? 'bg-[#8C5A32] text-white shadow'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <MdOutlineConfirmationNumber /> Tickets ({tickets.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('users');
                fetchData();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'users'
                  ? 'bg-[#8C5A32] text-white shadow'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiUsers /> Users ({users.length})
            </button>
          </div>
        </div>

        {activeTab === 'tickets' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Tickets" value={stats.totalTickets || 0} icon={MdOutlineConfirmationNumber} color="text-[#8C5A32]" />
            <StatCard title="New" value={stats.newTickets || 0} icon={FiClock} color="text-blue-500" />
            <StatCard title="In Progress" value={stats.inProgressTickets || 0} icon={FiEdit2} color="text-indigo-500" />
            <StatCard title="Resolved" value={stats.resolvedTickets || 0} icon={FiCheckCircle} color="text-emerald-500" />
          </div>
        )}

        {activeTab === 'users' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length === 0 ? (
              <div className="col-span-full text-center py-16 glass rounded-2xl">
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
                <p className="text-gray-500 dark:text-gray-400">There are no registered users yet.</p>
              </div>
            ) : (
              users.map((u) => {
                const userTicketCount = tickets.filter(t => t.createdBy?._id === u._id).length;
                return (
                  <div key={u._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar-circle w-14 h-14 text-xl">
                        {u.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">{u.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
                        {u.role || 'user'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {userTicketCount} tickets
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
                      <button
                        onClick={() => handleUpdateRole(u._id, u.role)}
                        className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
                        title="Toggle Role"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <div className="col-span-full text-center py-16 glass rounded-2xl">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
                <p className="text-gray-500 dark:text-gray-400">There are no support tickets yet.</p>
              </div>
            ) : (
              tickets.map((t) => {
                const messageCount = getMessageCount(t);
                const isClosed = t.status === 'Resolved' || t.status === 'Rejected';
                const hasUnread = hasUnreadMessages(t);
                
                return (
                  <div key={t._id} className={`glass rounded-2xl p-6 card-hover border ${isClosed ? 'border-emerald-200 dark:border-emerald-800' : 'border-[#E5E0DA] dark:border-gray-800'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
                        {t.ticketNumber}
                      </span>
                      <span className={getStatusBadge(t.status)}>{t.status}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{t.subject}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {t.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                      <span className="text-gray-500 dark:text-gray-400">By: {t.createdBy?.name || 'Unknown'}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-400">{t.category}</span>
                    </div>
                    
                    {/* Rating Display */}
                    {t.rating && t.rating.score && (
                      <div className="flex items-center gap-1 mb-2 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={`w-4 h-4 ${star <= t.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                          ))}
                        </div>
                        {t.rating.comment && (
                          <span className="text-xs text-gray-400 ml-1">"</span>
                        )}
                      </div>
                    )}
                    {t.rating?.comment && (
                      <p className="text-xs text-gray-400 italic mb-2 line-clamp-1">"{t.rating.comment}"</p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPriorityModal(t)}
                          disabled={isClosed}
                          className={`${getPriorityBadge(t.priority)} cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
                          title="Click to change priority"
                        >
                          {t.priority}
                        </button>
                        <button
                          onClick={() => openStatusModal(t)}
                          disabled={isClosed}
                          className="p-1 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Change Status"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailModal(t)}
                          className={`p-2 rounded-lg transition-colors relative ${
                            hasUnread && !isClosed
                              ? 'text-blue-500 hover:bg-blue-500/10 animate-pulse'
                              : isClosed
                              ? 'text-emerald-500 hover:bg-emerald-500/10'
                              : 'text-[#8C5A32] hover:bg-[#8C5A32]/10'
                          }`}
                          title={isClosed ? 'View Messages (Closed)' : hasUnread ? 'New messages from user!' : 'View Messages'}
                        >
                          <FiMessageCircle className="w-4 h-4" />
                          {messageCount > 0 && (
                            <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                              isClosed ? 'bg-emerald-500' : 'bg-red-500'
                            }`}>
                              {messageCount}
                            </span>
                          )}
                          {hasUnread && !isClosed && (
                            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
                          )}
                        </button>
                        <span className="text-xs text-gray-400">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Last message indicator */}
                    {messageCount > 0 && (
                      <div className="mt-2 text-xs text-gray-400">
                        Last message: {new Date(t.messages[t.messages.length - 1].timestamp).toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </motion.div>

      {/* Modal for Priority/Status Update */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {modalType === 'priority' ? 'Update Priority' : 'Update Status'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Ticket: <span className="font-semibold">{modalTicket?.ticketNumber}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Subject: <span className="font-semibold">{modalTicket?.subject}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select {modalType === 'priority' ? 'Priority' : 'Status'}
              </label>
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="input-focus"
                disabled={modalLoading}
              >
                {(modalType === 'priority' ? PRIORITY_OPTIONS : STATUS_OPTIONS).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {(modalType === 'status' && (selectedValue === 'Resolved' || selectedValue === 'Rejected')) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {selectedValue === 'Resolved' ? 'Resolution Note' : 'Rejection Reason'} *
                </label>
                <textarea
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder={selectedValue === 'Resolved' ? 'Describe how the issue was resolved...' : 'Why is this ticket being rejected?'}
                  className="input-focus min-h-[80px] resize-y"
                  disabled={modalLoading}
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-outline"
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                disabled={modalLoading}
                className="flex-1 btn-primary flex justify-center items-center"
              >
                {modalLoading ? (
                  <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Detail Modal for Messages, Rating, and Reply */}
      {showDetailModal && detailTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0DA] dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-900 pt-2 pb-4 border-b border-[#E5E0DA] dark:border-gray-800">
              <div>
                <h3 className="text-xl font-bold">{detailTicket.subject}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {detailTicket.ticketNumber} • {detailTicket.category}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Status and Priority Info */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={getStatusBadge(detailTicket.status)}>{detailTicket.status}</span>
              <span className={getPriorityBadge(detailTicket.priority)}>{detailTicket.priority}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                By: {detailTicket.createdBy?.name || 'Unknown'}
              </span>
            </div>

            {/* Description */}
            <div className="mb-4 p-4 bg-[#FAFAFA] dark:bg-gray-800/50 rounded-xl border border-[#E5E0DA] dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 text-sm">{detailTicket.description}</p>
            </div>

            {/* Rating Display */}
            {detailTicket.rating && detailTicket.rating.score && (
              <div className="mb-4 p-4 bg-amber-soft border border-amber-soft rounded-xl">
                <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">User Rating</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`w-5 h-5 ${star <= detailTicket.rating.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {detailTicket.rating.score}/5
                  </span>
                </div>
                {detailTicket.rating.comment && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                    "{detailTicket.rating.comment}"
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Rated on: {new Date(detailTicket.rating.createdAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* Resolution Note */}
            {detailTicket.resolutionNote && (
              <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-1">Resolution Note</h4>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">{detailTicket.resolutionNote}</p>
              </div>
            )}

            {/* Messages */}
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <FiMessageCircle /> Messages ({detailTicket.messages?.length || 0})
            </h4>
            
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 mb-4">
              {detailTicket.messages && detailTicket.messages.length > 0 ? (
                detailTicket.messages.map((msg, index) => {
                  const isLastUserMessage = index === detailTicket.messages.length - 1 && msg.senderRole === 'user';
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-xl ${
                        msg.senderRole === 'admin'
                          ? 'bg-[#3D2817]/5 dark:bg-[#8C5A32]/10 border border-[#8C5A32]/20'
                          : 'bg-[#FAFAFA] dark:bg-gray-800/50 border border-[#E5E0DA] dark:border-gray-700'
                      } ${isLastUserMessage ? 'border-l-4 border-l-blue-500' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {msg.sender?.name || 'Unknown'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            msg.senderRole === 'admin' ? 'admin-badge' : 'user-badge'
                          }`}>
                            {msg.senderRole}
                          </span>
                          {isLastUserMessage && (
                            <span className="text-xs text-blue-500 font-semibold animate-pulse">● New</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No messages yet
                </div>
              )}
            </div>

            {/* Reply Form - Only if ticket is open */}
            {detailTicket.status !== 'Resolved' && detailTicket.status !== 'Rejected' && (
              <form onSubmit={sendReply} className="flex gap-3 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply to the user..."
                  className="input-focus flex-1"
                  disabled={sendingReply}
                  required
                />
                <button
                  type="submit"
                  disabled={sendingReply || !replyMessage.trim()}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  {sendingReply ? (
                    <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <FiSend /> Reply
                    </>
                  )}
                </button>
              </form>
            )}

            {detailTicket.status === 'Resolved' && (
              <div className="text-center text-sm text-emerald-600 dark:text-emerald-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
                 This ticket is resolved. No further replies can be sent.
              </div>
            )}
            {detailTicket.status === 'Rejected' && (
              <div className="text-center text-sm text-red-600 dark:text-red-400 pt-4 border-t border-[#E5E0DA] dark:border-gray-800">
                 This ticket is rejected. No further replies can be sent.
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}