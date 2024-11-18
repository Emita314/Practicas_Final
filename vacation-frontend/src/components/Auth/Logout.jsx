import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:4000/auth/logout', {}, { withCredentials: true });
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    logout();
  }, [navigate]);

  return null; // Simple redirect or loading component.
};

export default Logout;
