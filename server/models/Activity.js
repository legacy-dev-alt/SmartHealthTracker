import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      enum: ['Walking', 'Running', 'Cycling', 'Swimming', 'Yoga', 'Strength Training', 'Cardio', 'Other'],
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    distance: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;