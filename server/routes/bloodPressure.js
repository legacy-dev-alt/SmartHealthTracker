import express from 'express';
import BloodPressure from '../models/BloodPressure.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all blood pressure readings
router.get('/', auth, async (req, res) => {
  try {
    const readings = await BloodPressure.find({ user: req.user.id })
      .sort({ date: -1, time: -1 });
    
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get blood pressure reading by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const reading = await BloodPressure.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }
    
    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new blood pressure reading
router.post('/', auth, async (req, res) => {
  try {
    const { date, time, systolic, diastolic, pulse, notes } = req.body;
    
    const newReading = new BloodPressure({
      user: req.user.id,
      date,
      time,
      systolic,
      diastolic,
      pulse,
      notes,
    });
    
    const reading = await newReading.save();
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update blood pressure reading
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, time, systolic, diastolic, pulse, notes } = req.body;
    
    // Check if reading exists
    let reading = await BloodPressure.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }
    
    // Update fields
    reading.date = date || reading.date;
    reading.time = time || reading.time;
    reading.systolic = systolic || reading.systolic;
    reading.diastolic = diastolic || reading.diastolic;
    reading.pulse = pulse || reading.pulse;
    reading.notes = notes !== undefined ? notes : reading.notes;
    
    await reading.save();
    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete blood pressure reading
router.delete('/:id', auth, async (req, res) => {
  try {
    const reading = await BloodPressure.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }
    
    await reading.remove();
    res.json({ message: 'Reading removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;