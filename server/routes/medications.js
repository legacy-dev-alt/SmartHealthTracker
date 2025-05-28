import express from 'express';
import Medication from '../models/Medication.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all medications
router.get('/', auth, async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.user.id })
      .sort({ time: 1 });
    
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get today's medications
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const medications = await Medication.find({
      user: req.user.id,
      startDate: { $lte: today },
      $or: [
        { endDate: { $gte: today } },
        { endDate: { $exists: false } },
        { endDate: null },
      ],
    }).sort({ time: 1 });
    
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get medication by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const medication = await Medication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new medication
router.post('/', auth, async (req, res) => {
  try {
    const { name, dosage, schedule, time, startDate, endDate, notes } = req.body;
    
    const newMedication = new Medication({
      user: req.user.id,
      name,
      dosage,
      schedule,
      time,
      startDate,
      endDate,
      notes,
      taken: false,
    });
    
    const medication = await newMedication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update medication
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, dosage, schedule, time, startDate, endDate, notes, taken } = req.body;
    
    // Check if medication exists
    let medication = await Medication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Update fields
    medication.name = name || medication.name;
    medication.dosage = dosage || medication.dosage;
    medication.schedule = schedule || medication.schedule;
    medication.time = time || medication.time;
    medication.startDate = startDate || medication.startDate;
    medication.endDate = endDate !== undefined ? endDate : medication.endDate;
    medication.notes = notes !== undefined ? notes : medication.notes;
    medication.taken = taken !== undefined ? taken : medication.taken;
    
    await medication.save();
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle medication taken status
router.put('/:id/toggle', auth, async (req, res) => {
  try {
    const medication = await Medication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    medication.taken = !medication.taken;
    await medication.save();
    
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete medication
router.delete('/:id', auth, async (req, res) => {
  try {
    const medication = await Medication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    await medication.remove();
    res.json({ message: 'Medication removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;