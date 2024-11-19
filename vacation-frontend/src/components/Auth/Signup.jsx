import React, { useState } from 'react';
import { 
  TextField, Button, Container, Typography, Select, MenuItem, InputLabel, 
  FormControl, Snackbar, Alert 
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [salary, setSalary] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos del formulario
    if (!username || !password || !firstName || !lastName || !department || !position || !startDate || !salary) {
      setSnackbarMessage('Please fill in all the fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Enviar datos al backend para registrar al usuario
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        username,
        password,
        role,
        firstName,
        lastName,
        department,
        position,
        startDate,
        salary,
      });

      if (response.status === 201) {
        setSnackbarMessage('Signup successful!');
        setSnackbarSeverity('success');
        
        // Redirigir según el rol
        if (role === 'Admin') {
          navigate('/admin');
        } else if (role === 'Employee') {
          navigate('/employee');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      const errorMessage = error.response?.data?.error || 'Signup failed';
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Department"
          variant="outlined"
          fullWidth
          margin="normal"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="Salary"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
