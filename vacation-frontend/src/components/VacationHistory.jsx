import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const VacationHistory = () => {
  const [vacationHistory, setVacationHistory] = useState([]);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Vacation History</Typography>
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
          {vacationHistory.map((vacation) => (
            <TableRow key={vacation.VacationID}>
              <TableCell>{vacation.StartDate}</TableCell>
              <TableCell>{vacation.EndDate}</TableCell>
              <TableCell>{vacation.DaysRequested}</TableCell>
              <TableCell>{vacation.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default VacationHistory;
