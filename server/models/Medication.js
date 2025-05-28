import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: String,
      required: true,
      enum: ['Daily', 'Twice Daily', 'Three Times Daily', 'Weekly', 'As Needed'],
    },
    time: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    taken: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;