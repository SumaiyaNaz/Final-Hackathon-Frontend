// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useTheme } from '../contexts/ThemeContext';
// import { FiLogOut, FiHome, FiInfo, FiShield, FiPlus, FiList, FiSun, FiMoon } from 'react-icons/fi';

// export default function Layout() {
//   const { user, isAuthenticated, isAdmin, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   // Debug logging
//   console.log('Layout - isAdmin:', isAdmin);
//   console.log('Layout - user role:', user?.role);

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
//       <nav className="sticky top-0 z-50 glass shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link to="/home" className="flex items-center space-x-2 font-bold text-xl">
//               <span className="text-[#3D2817] dark:text-[#8C5A32]">Support</span>
//               <span className="text-[#8C5A32] dark:text-[#D4A574]">Flow</span>
//             </Link>

//             <div className="flex items-center space-x-6">
//               {isAuthenticated && (
//                 <div className="hidden md:flex items-center space-x-4">
//                   <Link to="/home" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
//                     <FiHome /> Home
//                   </Link>
                  
//                   {/* Show these only for regular users (NOT admin) */}
//                   {user?.role !== 'admin' && (
//                     <>
//                       <Link to="/my-tickets" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
//                         <FiList /> My Tickets
//                       </Link>
//                       <Link to="/create-ticket" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
//                         <FiPlus /> New Ticket
//                       </Link>
//                     </>
//                   )}
                  
//                   <Link to="/about" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
//                     <FiInfo /> About
//                   </Link>
                  
//                   {/* Show Admin link only for admin users */}
//                   {user?.role === 'admin' && (
//                     <Link to="/admin" className="flex items-center gap-1.5 text-[#8C5A32] font-semibold hover:text-[#3D2817] dark:hover:text-[#D4A574] transition-colors border-l pl-4 border-[#E5E0DA] dark:border-gray-700">
//                       <FiShield /> Admin Panel
//                     </Link>
//                   )}
//                 </div>
//               )}

//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={toggleTheme}
//                   className="p-2 rounded-lg hover:bg-[#E5E0DA] dark:hover:bg-gray-800 transition-colors"
//                 >
//                   {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
//                 </button>

//                 {isAuthenticated && (
//                   <div className="flex items-center space-x-3 border-l pl-3 border-[#E5E0DA] dark:border-gray-700">
//                     <div className="avatar-circle w-9 h-9 text-sm">
//                       {user?.name?.charAt(0).toUpperCase() || 'U'}
//                     </div>
//                     <div className="hidden sm:block">
//                       <p className="text-xs font-semibold leading-tight">{user?.name}</p>
//                       <span className={user?.role === 'admin' ? 'admin-badge' : 'user-badge'}>
//                         {user?.role === 'admin' ? 'Admin' : 'User'}
//                       </span>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="p-2 text-gray-500 hover:text-red-500 transition-colors"
//                       title="Logout"
//                     >
//                       <FiLogOut className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }















import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiLogOut, FiHome, FiInfo, FiShield, FiPlus, FiList, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function Layout() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  // Debug logging
  console.log('Layout - isAdmin:', isAdmin);
  console.log('Layout - user role:', user?.role);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="sticky top-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center space-x-2 font-bold text-xl" onClick={closeMenu}>
              <span className="text-[#3D2817] dark:text-[#8C5A32]">Support</span>
              <span className="text-[#8C5A32] dark:text-[#D4A574]">Flow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated && (
                <div className="flex items-center space-x-4">
                  <Link to="/home" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
                    <FiHome /> Home
                  </Link>
                  
                  {user?.role !== 'admin' && (
                    <>
                      <Link to="/my-tickets" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
                        <FiList /> My Tickets
                      </Link>
                      <Link to="/create-ticket" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
                        <FiPlus /> New Ticket
                      </Link>
                    </>
                  )}
                  
                  <Link to="/about" className="flex items-center gap-1.5 text-[#3D2817] dark:text-gray-300 hover:text-[#8C5A32] dark:hover:text-[#8C5A32] transition-colors">
                    <FiInfo /> About
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="flex items-center gap-1.5 text-[#8C5A32] font-semibold hover:text-[#3D2817] dark:hover:text-[#D4A574] transition-colors border-l pl-4 border-[#E5E0DA] dark:border-gray-700">
                      <FiShield /> Admin Panel
                    </Link>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-[#E5E0DA] dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
                </button>

                {isAuthenticated && (
                  <div className="flex items-center space-x-3 border-l pl-3 border-[#E5E0DA] dark:border-gray-700">
                    <div className="avatar-circle w-9 h-9 text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-semibold leading-tight">{user?.name}</p>
                      <span className={user?.role === 'admin' ? 'admin-badge' : 'user-badge'}>
                        {user?.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <FiLogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[#E5E0DA] dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-[#E5E0DA] dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && (
          <div className="md:hidden glass border-t border-[#E5E0DA] dark:border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {/* User info in mobile */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#E5E0DA] dark:border-gray-700">
                <div className="avatar-circle w-10 h-10 text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <span className={user?.role === 'admin' ? 'admin-badge' : 'user-badge'}>
                    {user?.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <Link
                to="/home"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-gray-800 transition-colors"
                onClick={closeMenu}
              >
                <FiHome className="w-5 h-5 text-[#8C5A32]" />
                <span>Home</span>
              </Link>

              {user?.role !== 'admin' && (
                <>
                  <Link
                    to="/my-tickets"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                  >
                    <FiList className="w-5 h-5 text-[#8C5A32]" />
                    <span>My Tickets</span>
                  </Link>
                  <Link
                    to="/create-ticket"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                  >
                    <FiPlus className="w-5 h-5 text-[#8C5A32]" />
                    <span>New Ticket</span>
                  </Link>
                </>
              )}

              <Link
                to="/about"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-gray-800 transition-colors"
                onClick={closeMenu}
              >
                <FiInfo className="w-5 h-5 text-[#8C5A32]" />
                <span>About</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#8C5A32]/10 text-[#8C5A32] font-semibold hover:bg-[#8C5A32]/20 transition-colors"
                  onClick={closeMenu}
                >
                  <FiShield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-[#E5E0DA] dark:border-gray-700 pt-3 mt-1"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}