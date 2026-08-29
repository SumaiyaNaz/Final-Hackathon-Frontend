import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLogOut, FiHome, FiInfo, FiShield } from 'react-icons/fi';

export default function Layout() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center space-x-2 font-bold text-xl gradient-text">
              <span>MyApp</span>
            </Link>

            <div className="flex items-center space-x-6">
              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/home" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
                    <FiHome /> Home
                  </Link>
                  <Link to="/about" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
                    <FiInfo /> About
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
                      <FiShield /> Admin
                    </Link>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-3">
                {isAuthenticated && (
                  <div className="flex items-center space-x-3 border-l pl-3 border-gray-200 dark:border-gray-700">
                    <div className="avatar-circle w-9 h-9 text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-semibold leading-tight">{user?.name}</p>
                      <span className={isAdmin ? 'admin-badge' : 'user-badge'}>
                        {user?.role || 'user'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-500 hover:text-rose-500 transition-colors"
                      title="Logout"
                    >
                      <FiLogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}