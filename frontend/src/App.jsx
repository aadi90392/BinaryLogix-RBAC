import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import UserDashboard from './pages/UserDashboard';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token && role) {
    return <Navigate to={`/${role.toLowerCase()}`} replace />;
  }
  return children;
};

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/manager" element={
          <ProtectedRoute allowedRole="Manager">
            <ManagerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/user" element={
          <ProtectedRoute allowedRole="User">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;