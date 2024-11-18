import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [vacationRequests, setVacationRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/vacation/requests', { withCredentials: true });
        setVacationRequests(response.data);
      } catch (error) {
        console.error('Error fetching vacation requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (vacationID) => {
    try {
      await axios.patch(`http://localhost:4000/vacation/approve/${vacationID}`, {}, { withCredentials: true });
      setVacationRequests(vacationRequests.filter((req) => req.VacationID !== vacationID)); // Remove approved request
    } catch (error) {
      console.error('Error approving vacation request:', error);
    }
  };

  const handleReject = async (vacationID) => {
    try {
      await axios.patch(`http://localhost:4000/vacation/reject/${vacationID}`, {}, { withCredentials: true });
      setVacationRequests(vacationRequests.filter((req) => req.VacationID !== vacationID)); // Remove rejected request
    } catch (error) {
      console.error('Error rejecting vacation request:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Days Requested</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacationRequests.map((request) => (
            <TableRow key={request.VacationID}>
              <TableCell>{request.EmployeeName}</TableCell>
              <TableCell>{request.StartDate}</TableCell>
              <TableCell>{request.EndDate}</TableCell>
              <TableCell>{request.DaysRequested}</TableCell>
              <TableCell>{request.Status}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={() => handleApprove(request.VacationID)}>Approve</Button>
                <Button variant="contained" color="error" onClick={() => handleReject(request.VacationID)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
