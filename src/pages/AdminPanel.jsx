import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiImage, FiTrash2 } from 'react-icons/fi';
import API from '../services/api';
import Swal from 'sweetalert2';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await API.get('/admin/users');
        setUsers(res.data.data || []);
      } else {
        const res = await API.get('/admin/images');
        setImages(res.data.data || []);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Loading Data',
        text: error.response?.data?.message || 'Server connection error',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: 'This action cannot be undone!',
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
          confirmButtonColor: '#6366f1',
        });
      }
    }
  };

  const handleDeleteImage = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Image?',
      text: 'This action will permanently delete the image.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/admin/images/${id}`);
        setImages(images.filter((img) => img._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Image deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'Could not delete image.',
          confirmButtonColor: '#6366f1',
        });
      }
    }
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold gradient-text">Admin Panel</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Manage users and uploaded content
            </p>
          </div>

          <div className="flex p-1 rounded-xl glass">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'users'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiUsers /> Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'images'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FiImage /> Images ({images.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="spinner h-10 w-10"></div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="glass rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 dark:bg-gray-800/50 text-xs uppercase font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="table-row">
                      <td className="p-4 font-semibold flex items-center gap-3">
                        <div className="avatar-circle w-8 h-8 text-xs">
                          {u.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{u.email}</td>
                      <td className="p-4">
                        <span className={u.role === 'admin' ? 'admin-badge' : 'user-badge'}>
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img._id} className="glass rounded-2xl overflow-hidden card-hover">
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{img.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {img.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-400">
                      By: {img.uploadedBy?.name || 'Unknown'}
                    </span>
                    <button
                      onClick={() => handleDeleteImage(img._id)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
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