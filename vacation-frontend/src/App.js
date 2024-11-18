import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import VacationRequest from './components/VacationRequest';
import axios from 'axios';

const App = () => {
  const [role, setRole] = useState(null);

  // Al montar el componente, verificamos el estado de autenticación
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/status', { withCredentials: true });
        setRole(response.data.role);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {role === 'Admin' ? (
          <Route path="/admin" element={<AdminDashboard />} />
        ) : (
          <Route path="/employee" element={<EmployeeDashboard />} />
        )}
        <Route path="/vacation/request" element={<VacationRequest />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
