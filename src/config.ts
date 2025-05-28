// Configuration file for the application
// In a real production application, these would be environment variables

export const API_URL = 'http://localhost:3001/api'; // Backend API URL

export const APP_NAME = 'SmartHealth Tracker';

export const BP_RANGES = {
  normal: { max: { systolic: 120, diastolic: 80 }, label: 'Normal' },
  elevated: { max: { systolic: 129, diastolic: 80 }, label: 'Elevated' },
  hypertension1: { max: { systolic: 139, diastolic: 89 }, label: 'Stage 1 Hypertension' },
  hypertension2: { max: { systolic: 180, diastolic: 120 }, label: 'Stage 2 Hypertension' },
  crisis: { min: { systolic: 180, diastolic: 120 }, label: 'Hypertensive Crisis' },
};