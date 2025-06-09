
const express = require('express');
const { getPool, sql } = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all marketing candidates
router.get('/candidates', authenticateToken, authorize(['Admin', 'Manager', 'Marketing Associate']), async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .query(`
        SELECT id, name, email, phone, position, source, status, 
               submissions, interviews, last_contact, notes, created_at, updated_at
        FROM marketing_candidates
        ORDER BY created_at DESC
      `);

    const candidates = result.recordset.map(candidate => ({
      ...candidate,
      lastContact: candidate.last_contact
    }));

    res.json(candidates);
  } catch (error) {
    console.error('Get marketing candidates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new marketing candidate
router.post('/candidates', authenticateToken, authorize(['Admin', 'Manager', 'Marketing Associate']), async (req, res) => {
  try {
    const { name, email, phone, position, source, status, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const pool = getPool();
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, phone || null)
      .input('position', sql.VarChar, position || null)
      .input('source', sql.VarChar, source || null)
      .input('status', sql.VarChar, status || 'First Contact')
      .input('notes', sql.Text, notes || null)
      .input('last_contact', sql.Date, new Date().toISOString().split('T')[0])
      .query(`
        INSERT INTO marketing_candidates (name, email, phone, position, source, status, notes, last_contact)
        OUTPUT INSERTED.*
        VALUES (@name, @email, @phone, @position, @source, @status, @notes, @last_contact)
      `);

    const newCandidate = result.recordset[0];
    res.status(201).json({
      ...newCandidate,
      lastContact: newCandidate.last_contact
    });
  } catch (error) {
    console.error('Add marketing candidate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update marketing candidate
router.put('/candidates/:id', authenticateToken, authorize(['Admin', 'Manager', 'Marketing Associate']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, position, source, status, submissions, interviews, notes } = req.body;

    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, phone)
      .input('position', sql.VarChar, position)
      .input('source', sql.VarChar, source)
      .input('status', sql.VarChar, status)
      .input('submissions', sql.Int, submissions || 0)
      .input('interviews', sql.Int, interviews || 0)
      .input('notes', sql.Text, notes)
      .input('last_contact', sql.Date, new Date().toISOString().split('T')[0])
      .query(`
        UPDATE marketing_candidates 
        SET name = @name, email = @email, phone = @phone, position = @position,
            source = @source, status = @status, submissions = @submissions,
            interviews = @interviews, notes = @notes, last_contact = @last_contact,
            updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({
      ...result.recordset[0],
      lastContact: result.recordset[0].last_contact
    });
  } catch (error) {
    console.error('Update marketing candidate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
