import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      bloodType,
      allergies,
      emergencyContact,
      emergencyPhone,
    } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    
    // Update profile fields
    user.profile = {
      ...user.profile,
      age: age || user.profile?.age,
      gender: gender || user.profile?.gender,
      height: height || user.profile?.height,
      weight: weight || user.profile?.weight,
      bloodType: bloodType || user.profile?.bloodType,
      allergies: allergies || user.profile?.allergies,
      emergencyContact: emergencyContact || user.profile?.emergencyContact,
      emergencyPhone: emergencyPhone || user.profile?.emergencyPhone,
    };
    
    await user.save();
    
    // Return user without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      preferences: user.preferences,
    };
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const { medicationReminders, healthAlerts, weeklyReports } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.preferences = {
      ...user.preferences,
      medicationReminders: medicationReminders !== undefined ? medicationReminders : user.preferences.medicationReminders,
      healthAlerts: healthAlerts !== undefined ? healthAlerts : user.preferences.healthAlerts,
      weeklyReports: weeklyReports !== undefined ? weeklyReports : user.preferences.weeklyReports,
    };
    
    await user.save();
    
    res.json({ preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;