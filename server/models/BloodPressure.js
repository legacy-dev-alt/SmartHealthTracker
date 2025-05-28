import mongoose from 'mongoose';

const bloodPressureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    systolic: {
      type: Number,
      required: true,
      min: 70,
      max: 220,
    },
    diastolic: {
      type: Number,
      required: true,
      min: 40,
      max: 140,
    },
    pulse: {
      type: Number,
      required: true,
      min: 40,
      max: 220,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const BloodPressure = mongoose.model('BloodPressure', bloodPressureSchema);

export default BloodPressure;