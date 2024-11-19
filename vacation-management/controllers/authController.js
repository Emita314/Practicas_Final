const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { username, password, role, firstName, lastName, department, position, startDate, salary } = req.body;

  console.log('Request body:', req.body); // Inspecciona el contenido del request

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      Username: username, 
      Password: hashedPassword, 
      Role: role, 
      FirstName: firstName, 
      LastName: lastName, 
      Department: department, 
      Position: position, 
      StartDate: startDate, 
      Salary: salary 
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ where: { Username: username } });
    console.log('User found:', user);  // Esto ayudará a verificar si el usuario existe.
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.UserID, role: user.Role }, my_super_secret_key_that_is_very_difficult_to_gues, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
