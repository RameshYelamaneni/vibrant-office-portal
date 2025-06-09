
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool, sql } = require('../config/database');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id, email, password_hash, name, role FROM users WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.recordset[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint (admin only)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pool = getPool();
    
    // Check if user already exists
    const existingUser = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM users WHERE email = @email');

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password_hash', sql.VarChar, hashedPassword)
      .input('name', sql.VarChar, name)
      .input('role', sql.VarChar, role)
      .query(`
        INSERT INTO users (email, password_hash, name, role)
        OUTPUT INSERTED.id, INSERTED.email, INSERTED.name, INSERTED.role
        VALUES (@email, @password_hash, @name, @role)
      `);

    const newUser = result.recordset[0];
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
