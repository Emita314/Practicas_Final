import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Grid, Box } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EmployeeDashboard = () => {
  const [vacationHistory, setVacationHistory] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysRequested, setDaysRequested] = useState(0);
  const [error, setError] = useState(null);

  // Cargar el historial de vacaciones
  useEffect(() => {
    const fetchVacationHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/vacation/history', { withCredentials: true });
        setVacationHistory(response.data);
      } catch (error) {
        console.error('Error fetching vacation history:', error);
      }
    };
    fetchVacationHistory();
  }, []);

  // Calcular los días solicitados
  const handleDateChange = (start, end) => {
    if (start && end) {
      const diffTime = Math.abs(new Date(end) - new Date(start));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRequested(diffDays + 1); // Incluir el día de inicio
    }
  };

  // Enviar la solicitud de vacaciones
  const handleSubmit = async () => {
    if (!startDate || !endDate || daysRequested <= 0 || daysRequested > 28) {
      setError('Por favor ingresa fechas válidas y asegúrate de que los días solicitados sean entre 1 y 28.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/vacation/request', {
        startDate,
        endDate,
        daysRequested,
      }, { withCredentials: true });
      setError(null);
      alert('Solicitud de vacaciones enviada');
      setStartDate(null);
      setEndDate(null);
      setDaysRequested(0);
    } catch (error) {
      console.error('Error submitting vacation request:', error);
      setError('Hubo un problema al enviar la solicitud. Intenta de nuevo.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Employee Dashboard</Typography>
      
      {/* Formulario de solicitud de vacaciones */}
      <Box mb={3} p={3} border={1} borderColor="grey.300" borderRadius={2}>
        <Typography variant="h6">Request Vacation</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  handleDateChange(newValue, endDate);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  handleDateChange(startDate, newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        
        <Typography variant="body1" mt={2}>
          Days Requested: {daysRequested} {daysRequested > 0 && daysRequested <= 28 ? '(Valid)' : '(Invalid)'}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Vacation Request
        </Button>
      </Box>

      {/* Historial de Vacaciones */}
      <Typography variant="h6" gutterBottom>Your Vacation History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Days Requested</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacationHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No vacation history available</TableCell>
            </TableRow>
          ) : (
            vacationHistory.map((vacation) => (
              <TableRow key={vacation.VacationID}>
                <TableCell>{vacation.StartDate}</TableCell>
                <TableCell>{vacation.EndDate}</TableCell>
                <TableCell>{vacation.DaysRequested}</TableCell>
                <TableCell>{vacation.Status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EmployeeDashboard;
