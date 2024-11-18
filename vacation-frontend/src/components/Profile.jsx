import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/profile', { withCredentials: true });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Typography><strong>Name:</strong> {profile.FirstName} {profile.LastName}</Typography>
      <Typography><strong>Username:</strong> {profile.Username}</Typography>
      <Typography><strong>Role:</strong> {profile.Role}</Typography>
      <Typography><strong>Salary:</strong> {profile.Salary}</Typography>
    </Container>
  );
};

export default Profile;
