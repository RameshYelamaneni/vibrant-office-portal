
const express = require('express');
const { getPool, sql } = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all employees
router.get('/', authenticateToken, authorize(['Admin', 'Manager', 'HR']), async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .query(`
        SELECT id, first_name, last_name, email, position, department, 
               status, join_date, profile_photo, created_at, updated_at
        FROM employees
        ORDER BY created_at DESC
      `);

    const employees = result.recordset.map(emp => ({
      ...emp,
      name: `${emp.first_name} ${emp.last_name}`,
      firstName: emp.first_name,
      lastName: emp.last_name,
      joinDate: emp.join_date
    }));

    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new employee
router.post('/', authenticateToken, authorize(['Admin', 'Manager', 'HR']), async (req, res) => {
  try {
    const { firstName, lastName, email, position, department, joinDate, profilePhoto } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }

    const pool = getPool();
    
    // Check if employee already exists
    const existingEmployee = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM employees WHERE email = @email');

    if (existingEmployee.recordset.length > 0) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }

    const result = await pool.request()
      .input('first_name', sql.VarChar, firstName)
      .input('last_name', sql.VarChar, lastName)
      .input('email', sql.VarChar, email)
      .input('position', sql.VarChar, position || null)
      .input('department', sql.VarChar, department || null)
      .input('join_date', sql.Date, joinDate || null)
      .input('profile_photo', sql.VarChar, profilePhoto || null)
      .query(`
        INSERT INTO employees (first_name, last_name, email, position, department, join_date, profile_photo)
        OUTPUT INSERTED.*
        VALUES (@first_name, @last_name, @email, @position, @department, @join_date, @profile_photo)
      `);

    const newEmployee = result.recordset[0];
    res.status(201).json({
      ...newEmployee,
      name: `${newEmployee.first_name} ${newEmployee.last_name}`,
      firstName: newEmployee.first_name,
      lastName: newEmployee.last_name,
      joinDate: newEmployee.join_date
    });
  } catch (error) {
    console.error('Add employee error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update employee
router.put('/:id', authenticateToken, authorize(['Admin', 'Manager', 'HR']), async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, position, department, status, joinDate, profilePhoto } = req.body;

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('first_name', sql.VarChar, firstName)
      .input('last_name', sql.VarChar, lastName)
      .input('email', sql.VarChar, email)
      .input('position', sql.VarChar, position)
      .input('department', sql.VarChar, department)
      .input('status', sql.VarChar, status)
      .input('join_date', sql.Date, joinDate)
      .input('profile_photo', sql.VarChar, profilePhoto)
      .query(`
        UPDATE employees 
        SET first_name = @first_name, last_name = @last_name, email = @email, 
            position = @position, department = @department, status = @status,
            join_date = @join_date, profile_photo = @profile_photo,
            updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const updatedEmployee = result.recordset[0];
    res.json({
      ...updatedEmployee,
      name: `${updatedEmployee.first_name} ${updatedEmployee.last_name}`,
      firstName: updatedEmployee.first_name,
      lastName: updatedEmployee.last_name,
      joinDate: updatedEmployee.join_date
    });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete employee
router.delete('/:id', authenticateToken, authorize(['Admin', 'Manager', 'HR']), async (req, res) => {
  try {
    const { id } = req.params;

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM employees WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
