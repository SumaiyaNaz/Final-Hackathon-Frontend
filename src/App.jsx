import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import MyTickets from './pages/MyTickets';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="about" element={<About />} />

              <Route element={<ProtectedRoute />}>
                <Route path="home" element={<Home />} />
                <Route path="my-tickets" element={<MyTickets />} />
                <Route path="create-ticket" element={<CreateTicket />} />
                <Route path="ticket/:id" element={<TicketDetail />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="admin" element={<AdminPanel />} />
              </Route>

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;