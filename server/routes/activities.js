import express from 'express';
import Activity from '../models/Activity.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all activities
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ date: -1 });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get activity by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new activity
router.post('/', auth, async (req, res) => {
  try {
    const { date, type, duration, distance, calories, notes } = req.body;
    
    const newActivity = new Activity({
      user: req.user.id,
      date,
      type,
      duration,
      distance,
      calories,
      notes,
    });
    
    const activity = await newActivity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update activity
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, type, duration, distance, calories, notes } = req.body;
    
    // Check if activity exists
    let activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    // Update fields
    activity.date = date || activity.date;
    activity.type = type || activity.type;
    activity.duration = duration || activity.duration;
    activity.distance = distance !== undefined ? distance : activity.distance;
    activity.calories = calories !== undefined ? calories : activity.calories;
    activity.notes = notes !== undefined ? notes : activity.notes;
    
    await activity.save();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete activity
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    await activity.remove();
    res.json({ message: 'Activity removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;