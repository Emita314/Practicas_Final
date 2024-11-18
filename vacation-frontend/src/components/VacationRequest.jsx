import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const VacationRequest = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysRequested, setDaysRequested] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/vacation/request', {
        StartDate: startDate,
        EndDate: endDate,
        DaysRequested: daysRequested,
      }, { withCredentials: true });

      if (response.status === 201) {
        alert('Vacation request submitted');
      }
    } catch (error) {
      console.error('Error requesting vacation:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Request Vacation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Start Date" type="date" fullWidth margin="normal" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <TextField label="End Date" type="date" fullWidth margin="normal" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <TextField label="Days Requested" type="number" fullWidth margin="normal" value={daysRequested} onChange={(e) => setDaysRequested(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Submit Request</Button>
      </form>
    </Container>
  );
};

export default VacationRequest;
