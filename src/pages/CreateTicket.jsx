import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import { MdLightbulb } from 'react-icons/md';
import API from '../services/api';
import Swal from 'sweetalert2';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'General',
  });
  const [suggestions, setSuggestions] = useState([]);

  const categories = ['General', 'Technical', 'Billing', 'Account', 'Product', 'Shipping', 'Returns', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.subject.length < 3) {
      return Swal.fire({
        icon: 'warning',
        title: 'Subject Too Short',
        text: 'Subject must be at least 3 characters long.',
        confirmButtonColor: '#8C5A32',
      });
    }

    if (formData.description.length < 10) {
      return Swal.fire({
        icon: 'warning',
        title: 'Description Too Short',
        text: 'Please provide more details about your issue.',
        confirmButtonColor: '#8C5A32',
      });
    }

    setLoading(true);
    try {
      const res = await API.post('/tickets', formData);
      
      if (res.data.data.suggestions) {
        setSuggestions(res.data.data.suggestions);
      }

      Swal.fire({
        icon: 'success',
        title: 'Ticket Created!',
        text: `Your ticket #${res.data.data.ticket.ticketNumber} has been created. An admin will review it and set the priority.`,
        confirmButtonColor: '#8C5A32',
      });

      navigate('/my-tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create ticket.',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate('/my-tickets')}
          className="flex items-center gap-2 text-[#8C5A32] hover:text-[#3D2817] dark:hover:text-[#D4A574] transition-colors mb-6"
        >
          <FiArrowLeft /> Back to My Tickets
        </button>

        <div className="glass rounded-2xl p-8 shadow-lg border border-[#E5E0DA] dark:border-gray-800">
          <h1 className="text-3xl font-extrabold mb-2">
            <span className="text-[#3D2817] dark:text-[#8C5A32]">Create</span>
            <span className="text-[#8C5A32] dark:text-[#D4A574]"> New Ticket</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Submit a new support request. An admin will review it and set the priority.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief summary of your issue"
                className="input-focus"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide detailed information about your issue..."
                className="input-focus min-h-[150px] resize-y"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-focus"
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {suggestions.length > 0 && (
              <div className="bg-amber-soft border border-amber-soft rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MdLightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-400">Smart Suggestions</h4>
                    <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300 space-y-1 mt-1">
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
              ) : (
                <>
                  <FiSend /> Submit Ticket
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}