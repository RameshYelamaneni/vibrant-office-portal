
const express = require('express');
const { getPool, sql } = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Helper function to calculate total hours
const calculateTotalHours = (startTime, endTime, breakDuration) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  const totalMinutes = endMinutes - startMinutes - breakDuration;
  return Math.max(0, totalMinutes / 60);
};

// Get all timesheets
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .query(`
        SELECT t.*, e.first_name + ' ' + e.last_name as employee_name
        FROM timesheets t
        LEFT JOIN employees e ON t.employee_id = e.id
        ORDER BY t.date DESC, t.created_at DESC
      `);

    const timesheets = result.recordset.map(ts => ({
      ...ts,
      employeeName: ts.employee_name,
      employeeId: ts.employee_id,
      startTime: ts.start_time,
      endTime: ts.end_time,
      breakDuration: ts.break_duration,
      totalHours: ts.total_hours
    }));

    res.json(timesheets);
  } catch (error) {
    console.error('Get timesheets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new timesheet
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { employeeId, date, startTime, endTime, breakDuration, notes, status } = req.body;

    if (!employeeId || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Employee ID, date, start time, and end time are required' });
    }

    const totalHours = calculateTotalHours(startTime, endTime, breakDuration || 0);

    const pool = getPool();
    const result = await pool.request()
      .input('employee_id', sql.Int, employeeId)
      .input('date', sql.Date, date)
      .input('start_time', sql.Time, startTime)
      .input('end_time', sql.Time, endTime)
      .input('break_duration', sql.Int, breakDuration || 0)
      .input('total_hours', sql.Decimal(4, 2), totalHours)
      .input('notes', sql.Text, notes || null)
      .input('status', sql.VarChar, status || 'Draft')
      .query(`
        INSERT INTO timesheets (employee_id, date, start_time, end_time, break_duration, total_hours, notes, status)
        OUTPUT INSERTED.*
        VALUES (@employee_id, @date, @start_time, @end_time, @break_duration, @total_hours, @notes, @status)
      `);

    const newTimesheet = result.recordset[0];
    res.status(201).json({
      ...newTimesheet,
      employeeId: newTimesheet.employee_id,
      startTime: newTimesheet.start_time,
      endTime: newTimesheet.end_time,
      breakDuration: newTimesheet.break_duration,
      totalHours: newTimesheet.total_hours
    });
  } catch (error) {
    console.error('Add timesheet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update timesheet status
router.patch('/:id/status', authenticateToken, authorize(['Admin', 'Manager', 'HR']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Draft', 'Submitted', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.VarChar, status)
      .query(`
        UPDATE timesheets 
        SET status = @status, updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Update timesheet status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
