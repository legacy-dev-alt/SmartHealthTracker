import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { User, Key, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: '35',
    gender: 'Male',
    height: '175',
    weight: '70',
    bloodType: 'O+',
    allergies: 'None',
    emergencyContact: 'John Doe',
    emergencyPhone: '+1 123-456-7890',
  });
  
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  
  const updatePersonalInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the user's information
    setSuccessMessage('Personal information updated successfully.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password.new !== password.confirm) {
      setErrorMessage('New passwords do not match.');
      return;
    }
    
    // In a real app, this would make an API call to change the password
    setPassword({ current: '', new: '', confirm: '' });
    setSuccessMessage('Password updated successfully.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
      </div>
      
      {successMessage && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <Card title="Personal Information">
        <form onSubmit={updatePersonalInfo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
              disabled
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Age"
              type="number"
              name="age"
              value={personalInfo.age}
              onChange={handlePersonalInfoChange}
              min="1"
              max="120"
            />
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={personalInfo.bloodType}
                onChange={handlePersonalInfoChange}
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
                <option>Unknown</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Height (cm)"
              type="number"
              name="height"
              value={personalInfo.height}
              onChange={handlePersonalInfoChange}
              min="50"
              max="300"
            />
            
            <Input
              label="Weight (kg)"
              type="number"
              name="weight"
              value={personalInfo.weight}
              onChange={handlePersonalInfoChange}
              min="1"
              max="500"
              step="0.1"
            />
          </div>
          
          <div>
            <Input
              label="Allergies"
              type="text"
              name="allergies"
              value={personalInfo.allergies}
              onChange={handlePersonalInfoChange}
              placeholder="List any allergies or 'None'"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact"
              type="text"
              name="emergencyContact"
              value={personalInfo.emergencyContact}
              onChange={handlePersonalInfoChange}
              placeholder="Name of emergency contact"
            />
            
            <Input
              label="Emergency Phone"
              type="text"
              name="emergencyPhone"
              value={personalInfo.emergencyPhone}
              onChange={handlePersonalInfoChange}
              placeholder="Phone number of emergency contact"
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
      
      <Card title="Change Password">
        <form onSubmit={changePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            name="current"
            value={password.current}
            onChange={handlePasswordChange}
            required
          />
          
          <Input
            label="New Password"
            type="password"
            name="new"
            value={password.new}
            onChange={handlePasswordChange}
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            name="confirm"
            value={password.confirm}
            onChange={handlePasswordChange}
            required
          />
          
          <div className="pt-4">
            <Button type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
      
      <Card title="Notification Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Medication Reminders</h4>
              <p className="text-sm text-gray-500">Receive notifications when it's time to take medication</p>
            </div>
            <div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-primary-600">
                  <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Health Alerts</h4>
              <p className="text-sm text-gray-500">Get alerts when your readings are outside normal ranges</p>
            </div>
            <div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-primary-600">
                  <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
              <p className="text-sm text-gray-500">Receive a weekly summary of your health data</p>
            </div>
            <div>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-primary-600">
                  <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;