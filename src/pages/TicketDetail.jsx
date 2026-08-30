import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar, FiClock, FiSend, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { MdMessage } from 'react-icons/md';
import API from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [showRating, setShowRating] = useState(false);

  // Edit form state (owner-only)
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ subject: '', description: '', category: '' });
  const [savingEdit, setSavingEdit] = useState(false);

  const categories = ['General', 'Technical', 'Billing', 'Account', 'Product', 'Shipping', 'Returns', 'Other'];

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/tickets/${id}`);
      setTicket(res.data.data);
      setEditForm({
        subject: res.data.data.subject,
        description: res.data.data.description,
        category: res.data.data.category,
      });
      if (res.data.data.status === 'Resolved' && !res.data.data.rating?.score) {
        setShowRating(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to load ticket',
        confirmButtonColor: '#8C5A32',
      });
      navigate('/my-tickets');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const res = await API.post(`/tickets/${id}/messages`, { message: message.trim() });
      setTicket(res.data.data);
      setMessage('');
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'Your message has been sent successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send message',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setSending(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (ticket.status === 'Resolved' || ticket.status === 'Rejected') {
      return Swal.fire({
        icon: 'warning',
        title: 'Ticket Closed',
        text: 'This ticket is already closed and cannot be changed.',
        confirmButtonColor: '#8C5A32',
      });
    }

    let data = { status: newStatus };

    if (newStatus === 'Resolved' || newStatus === 'Rejected') {
      const result = await Swal.fire({
        title: newStatus === 'Resolved' ? 'Resolve Ticket' : 'Reject Ticket',
        text: 'Please provide a resolution note:',
        input: 'textarea',
        inputPlaceholder: 'Describe how the issue was resolved / why it was rejected...',
        showCancelButton: true,
        confirmButtonColor: '#8C5A32',
        cancelButtonColor: '#6b7280',
        confirmButtonText: newStatus,
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return 'Resolution note is required!';
          }
        },
      });

      if (!result.isConfirmed) return;
      data.resolutionNote = result.value;
    }

    try {
      const res = await API.put(`/tickets/${id}/status`, data);
      setTicket(res.data.data);
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Ticket status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
      if (newStatus === 'Resolved') {
        setShowRating(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update status',
        confirmButtonColor: '#8C5A32',
      });
    }
  };

  const submitRating = async () => {
    if (rating === 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Rating Required',
        text: 'Please select a rating (1-5 stars).',
        confirmButtonColor: '#8C5A32',
      });
    }

    try {
      await API.post(`/tickets/${id}/rate`, { score: rating, comment: ratingComment });
      setShowRating(false);
      await fetchTicket();
      Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Your rating has been submitted.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit rating',
        confirmButtonColor: '#8C5A32',
      });
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (editForm.subject.trim().length < 3) {
      return Swal.fire({
        icon: 'warning',
        title: 'Subject Too Short',
        text: 'Subject must be at least 3 characters long.',
        confirmButtonColor: '#8C5A32',
      });
    }
    if (editForm.description.trim().length < 10) {
      return Swal.fire({
        icon: 'warning',
        title: 'Description Too Short',
        text: 'Please provide more details about your issue.',
        confirmButtonColor: '#8C5A32',
      });
    }

    setSavingEdit(true);
    try {
      const res = await API.put(`/tickets/${id}`, editForm);
      setTicket(res.data.data);
      setIsEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Ticket Updated',
        text: 'Your changes have been saved.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update ticket',
        confirmButtonColor: '#8C5A32',
      });
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
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
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Ticket deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/my-tickets');
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
    return `px-3 py-1 rounded-full text-xs font-semibold ${classes[priority] || 'priority-medium'}`;
  };

  const getStatusBadge = (status) => {
    const classes = {
      New: 'status-new',
      Assigned: 'status-assigned',
      'In Progress': 'status-inprogress',
      Resolved: 'status-resolved',
    };
    return `px-3 py-1 rounded-full text-xs font-semibold ${classes[status] || 'status-new'}`;
  };

  const isAdmin = user?.role === 'admin';
  const isOwner = ticket?.createdBy?._id === user?._id;
  // Ticket is "open" (still actionable) only while it isn't closed out
  const isOpen = ticket?.status !== 'Resolved' && ticket?.status !== 'Rejected';
  const canOwnerModify = !isAdmin && isOwner && isOpen;

  if (loading) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="page-container max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate(isAdmin ? '/admin' : '/my-tickets')}
          className="flex items-center gap-2 text-[#8C5A32] hover:text-[#3D2817] dark:hover:text-[#D4A574] transition-colors mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        {ticket && (
          <>
            <div className="glass rounded-2xl p-8 shadow-lg border border-[#E5E0DA] dark:border-gray-800 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    {isEditing ? (
                      <input
                        type="text"
                        name="subject"
                        value={editForm.subject}
                        onChange={handleEditChange}
                        className="input-focus text-xl font-bold"
                        disabled={savingEdit}
                      />
                    ) : (
                      <h1 className="text-2xl font-bold">{ticket.subject}</h1>
                    )}
                    <span className="font-mono text-sm bg-[#FAFAFA] dark:bg-gray-800 px-3 py-1 rounded-lg border border-[#E5E0DA] dark:border-gray-700">
                      {ticket.ticketNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={getPriorityBadge(ticket.priority)}>
                      {ticket.priority} Priority
                    </span>
                    <span className={getStatusBadge(ticket.status)}>
                      {ticket.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {ticket.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                    <div>Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                    {ticket.assignedTo && (
                      <div>Assigned to: {ticket.assignedTo.name}</div>
                    )}
                  </div>

                  {/* Modify options: owner only, and only while ticket is still open */}
                  {canOwnerModify && !isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-[#8C5A32] hover:bg-[#8C5A32]/10 rounded-lg transition-colors"
                        title="Edit Ticket"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Ticket"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {canOwnerModify && isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={savingEdit}
                        className="p-2 text-emerald-600 hover:bg-emerald-500/10 rounded-lg transition-colors"
                        title="Save"
                      >
                        <FiSave className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            subject: ticket.subject,
                            description: ticket.description,
                            category: ticket.category,
                          });
                        }}
                        disabled={savingEdit}
                        className="p-2 text-gray-500 hover:bg-gray-500/10 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-3 mb-4">
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="input-focus min-h-[120px] resize-y"
                    disabled={savingEdit}
                  />
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="input-focus"
                    disabled={savingEdit}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="bg-[#FAFAFA] dark:bg-gray-800/50 rounded-xl p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
                </div>
              )}

              {ticket.suggestions && ticket.suggestions.length > 0 && (
                <div className="bg-amber-soft border border-amber-soft rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">Suggestions</h4>
                  <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    {ticket.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ticket.resolutionNote && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-400">Resolution Note</h4>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm mt-1">{ticket.resolutionNote}</p>
                </div>
              )}
            </div>

            {showRating && (
              <div className="glass rounded-2xl p-8 shadow-lg border border-[#E5E0DA] dark:border-gray-800 mb-6">
                <h3 className="text-xl font-bold mb-4">Rate Your Experience</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Any additional comments about your experience?"
                  className="input-focus min-h-[80px] mb-4"
                />
                <button onClick={submitRating} className="btn-primary">
                  Submit Rating
                </button>
              </div>
            )}

            {/* Status controls: ADMIN ONLY, and only while ticket is still open */}
            {isAdmin && isOpen && (
              <div className="glass rounded-2xl p-8 shadow-lg border border-[#E5E0DA] dark:border-gray-800 mb-6">
                <h3 className="text-xl font-bold mb-4">Update Status</h3>
                <div className="flex flex-wrap gap-3">
                  {ticket.status !== 'Assigned' && (
                    <button
                      onClick={() => updateStatus('Assigned')}
                      className="btn-outline"
                    >
                      Assign to Me
                    </button>
                  )}
                  <button
                    onClick={() => updateStatus('In Progress')}
                    className="btn-secondary"
                  >
                    Mark as In Progress
                  </button>
                  <button
                    onClick={() => updateStatus('Resolved')}
                    className="btn-secondary"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={() => updateStatus('Rejected')}
                    className="px-4 py-2.5 rounded-xl font-medium bg-red-600 hover:bg-red-700 text-white transition-all active:scale-95"
                  >
                    Reject Ticket
                  </button>
                </div>
              </div>
            )}

            <div className="glass rounded-2xl p-8 shadow-lg border border-[#E5E0DA] dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MdMessage /> Messages
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({ticket.messages?.length || 0})
                </span>
              </h3>

              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                {ticket.messages && ticket.messages.length > 0 ? (
                  ticket.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl ${
                        msg.senderRole === 'admin'
                          ? 'bg-[#3D2817]/5 dark:bg-[#8C5A32]/10 border border-[#8C5A32]/20'
                          : 'bg-[#FAFAFA] dark:bg-gray-800/50 border border-[#E5E0DA] dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {msg.sender?.name || 'Unknown'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            msg.senderRole === 'admin' ? 'admin-badge' : 'user-badge'
                          }`}>
                            {msg.senderRole}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No messages yet
                  </div>
                )}
              </div>

              {isOpen ? (
                <form onSubmit={sendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-focus flex-1"
                    disabled={sending}
                    required
                  />
                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                  >
                    {sending ? (
                      <div className="spinner h-5 w-5 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <FiSend /> Send
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                  This ticket is {ticket.status.toLowerCase()} — no further changes or messages are allowed.
                </p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}