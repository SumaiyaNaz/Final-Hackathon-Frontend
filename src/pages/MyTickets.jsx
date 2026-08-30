// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import { FiPlus, FiEye, FiTrash2, FiMessageCircle, FiClock } from 'react-icons/fi';
// // import API from '../services/api';
// // import Swal from 'sweetalert2';
// // import { useAuth } from '../contexts/AuthContext';

// // export default function MyTickets() {
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     fetchTickets();
// //   }, []);

// //   const fetchTickets = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await API.get('/tickets/my');
// //       setTickets(res.data.data || []);
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: error.response?.data?.message || 'Failed to load tickets',
// //         confirmButtonColor: '#8C5A32',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     const result = await Swal.fire({
// //       title: 'Delete Ticket?',
// //       text: 'This action cannot be undone!',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#ef4444',
// //       cancelButtonColor: '#6b7280',
// //       confirmButtonText: 'Yes, Delete',
// //     });

// //     if (result.isConfirmed) {
// //       try {
// //         await API.delete(`/tickets/${id}`);
// //         setTickets(tickets.filter((t) => t._id !== id));
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Deleted!',
// //           text: 'Ticket deleted successfully.',
// //           timer: 1500,
// //           showConfirmButton: false,
// //         });
// //       } catch (error) {
// //         Swal.fire({
// //           icon: 'error',
// //           title: 'Error!',
// //           text: error.response?.data?.message || 'Could not delete ticket.',
// //           confirmButtonColor: '#8C5A32',
// //         });
// //       }
// //     }
// //   };

// //   const getPriorityBadge = (priority) => {
// //     const classes = {
// //       Low: 'priority-low',
// //       Medium: 'priority-medium',
// //       High: 'priority-high',
// //       Urgent: 'priority-urgent',
// //     };
// //     return `px-3 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
// //   };

// //   const getStatusBadge = (status) => {
// //     const classes = {
// //       New: 'status-new',
// //       Assigned: 'status-assigned',
// //       'In Progress': 'status-inprogress',
// //       Resolved: 'status-resolved',
// //     };
// //     return `px-3 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
// //   };

// //   const getStatusIcon = (status) => {
// //     if (status === 'Resolved') {
// //       return <FiCheckCircle className="w-4 h-4" />;
// //     }
// //     return <FiClock className="w-4 h-4" />;
// //   };

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
// //               <span className="text-[#3D2817] dark:text-[#8C5A32]">My</span>
// //               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Tickets</span>
// //             </h1>
// //             <p className="text-gray-500 dark:text-gray-400 text-sm">
// //               View and manage all your support tickets
// //             </p>
// //           </div>
// //           <Link to="/create-ticket" className="btn-primary flex items-center gap-2">
// //             <FiPlus /> New Ticket
// //           </Link>
// //         </div>

// //         {tickets.length === 0 ? (
// //           <div className="text-center py-16 glass rounded-2xl">
// //             <div className="text-6xl mb-4">🎫</div>
// //             <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
// //             <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any tickets yet.</p>
// //             <Link to="/create-ticket" className="btn-primary inline-flex items-center gap-2">
// //               <FiPlus /> Create Your First Ticket
// //             </Link>
// //           </div>
// //         ) : (
// //           <div className="glass rounded-2xl overflow-hidden shadow-lg border border-[#E5E0DA] dark:border-gray-800">
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-left border-collapse">
// //                 <thead>
// //                   <tr className="bg-[#FAFAFA] dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-[#E5E0DA] dark:border-gray-800">
// //                     <th className="p-4">Ticket #</th>
// //                     <th className="p-4">Subject</th>
// //                     <th className="p-4">Category</th>
// //                     <th className="p-4">Priority</th>
// //                     <th className="p-4">Status</th>
// //                     <th className="p-4">Created</th>
// //                     <th className="p-4 text-right">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {tickets.map((ticket) => (
// //                     <tr key={ticket._id} className="table-row">
// //                       <td className="p-4 font-mono text-sm font-semibold">
// //                         {ticket.ticketNumber}
// //                       </td>
// //                       <td className="p-4 font-medium">{ticket.subject}</td>
// //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// //                         {ticket.category}
// //                       </td>
// //                       <td className="p-4">
// //                         <span className={getPriorityBadge(ticket.priority)}>
// //                           {ticket.priority}
// //                         </span>
// //                       </td>
// //                       <td className="p-4">
// //                         <span className={`${getStatusBadge(ticket.status)} flex items-center gap-1.5`}>
// //                           {getStatusIcon(ticket.status)}
// //                           {ticket.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
// //                         {new Date(ticket.createdAt).toLocaleDateString()}
// //                       </td>
// //                       <td className="p-4 text-right">
// //                         <div className="flex items-center justify-end gap-2">
// //                           <Link
// //                             to={`/ticket/${ticket._id}`}
// //                             className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
// //                             title="View Details"
// //                           >
// //                             <FiEye className="w-4 h-4" />
// //                           </Link>
// //                           <button
// //                             onClick={() => handleDelete(ticket._id)}
// //                             className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
// //                             title="Delete"
// //                           >
// //                             <FiTrash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}
// //       </motion.div>
// //     </div>
// //   );
// // }














// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiEye, FiTrash2, FiMessageCircle, FiClock, FiCheckCircle } from 'react-icons/fi';
// import API from '../services/api';
// import Swal from 'sweetalert2';
// import { useAuth } from '../contexts/AuthContext';

// export default function MyTickets() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get('/tickets/my');
//       setTickets(res.data.data || []);
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to load tickets',
//         confirmButtonColor: '#8C5A32',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Delete Ticket?',
//       text: 'This action cannot be undone!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#ef4444',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Yes, Delete',
//     });

//     if (result.isConfirmed) {
//       try {
//         await API.delete(`/tickets/${id}`);
//         setTickets(tickets.filter((t) => t._id !== id));
//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: 'Ticket deleted successfully.',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: error.response?.data?.message || 'Could not delete ticket.',
//           confirmButtonColor: '#8C5A32',
//         });
//       }
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

//   const getStatusIcon = (status) => {
//     if (status === 'Resolved') {
//       return <FiCheckCircle className="w-4 h-4" />;
//     }
//     if (status === 'Rejected') {
//       return <FiX className="w-4 h-4" />;
//     }
//     return <FiClock className="w-4 h-4" />;
//   };

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
//               <span className="text-[#3D2817] dark:text-[#8C5A32]">My</span>
//               <span className="text-[#8C5A32] dark:text-[#D4A574]"> Tickets</span>
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               View and manage all your support tickets
//             </p>
//           </div>
//           <Link to="/create-ticket" className="btn-primary flex items-center gap-2">
//             <FiPlus /> New Ticket
//           </Link>
//         </div>

//         {tickets.length === 0 ? (
//           <div className="text-center py-16 glass rounded-2xl">
//             <div className="text-6xl mb-4">🎫</div>
//             <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any tickets yet.</p>
//             <Link to="/create-ticket" className="btn-primary inline-flex items-center gap-2">
//               <FiPlus /> Create Your First Ticket
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tickets.map((ticket) => (
//               <div key={ticket._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
//                 <div className="flex items-start justify-between mb-3">
//                   <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
//                     {ticket.ticketNumber}
//                   </span>
//                   <span className={getStatusBadge(ticket.status)}>
//                     {ticket.status}
//                   </span>
//                 </div>
//                 <h3 className="font-bold text-lg mb-1 line-clamp-1">{ticket.subject}</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
//                   {ticket.description}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
//                   <span className="text-gray-500 dark:text-gray-400">{ticket.category}</span>
//                   <span className="text-gray-400">•</span>
//                   <span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span>
//                 </div>
//                 <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
//                   <span className="text-xs text-gray-400">
//                     {new Date(ticket.createdAt).toLocaleDateString()}
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <Link
//                       to={`/ticket/${ticket._id}`}
//                       className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
//                       title="View Details"
//                     >
//                       <FiEye className="w-4 h-4" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(ticket._id)}
//                       className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
//                       title="Delete"
//                     >
//                       <FiTrash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }













import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye, FiTrash2, FiMessageCircle, FiClock, FiCheckCircle, FiX } from 'react-icons/fi';
import API from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await API.get('/tickets/my');
      setTickets(res.data.data || []);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to load tickets',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Ticket?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/tickets/${id}`);
        setTickets(tickets.filter((t) => t._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Ticket deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'Could not delete ticket.',
          confirmButtonColor: '#8C5A32',
        });
      }
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

  const getStatusIcon = (status) => {
    if (status === 'Resolved') {
      return <FiCheckCircle className="w-4 h-4" />;
    }
    if (status === 'Rejected') {
      return <FiX className="w-4 h-4" />;
    }
    return <FiClock className="w-4 h-4" />;
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
              <span className="text-[#3D2817] dark:text-[#8C5A32]">My</span>
              <span className="text-[#8C5A32] dark:text-[#D4A574]"> Tickets</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              View and manage all your support tickets
            </p>
          </div>
          <Link to="/create-ticket" className="btn-primary flex items-center gap-2">
            <FiPlus /> New Ticket
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any tickets yet.</p>
            <Link to="/create-ticket" className="btn-primary inline-flex items-center gap-2">
              <FiPlus /> Create Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="glass rounded-2xl p-6 card-hover border border-[#E5E0DA] dark:border-gray-800">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-sm font-semibold bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg">
                    {ticket.ticketNumber}
                  </span>
                  <span className={getStatusBadge(ticket.status)}>
                    {ticket.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{ticket.subject}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {ticket.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <span className="text-gray-500 dark:text-gray-400">{ticket.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className={getPriorityBadge(ticket.priority)}>{ticket.priority}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E0DA] dark:border-gray-800">
                  <span className="text-xs text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/ticket/${ticket._id}`}
                      className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FiEye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}