import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import BloodPressure from './pages/health/BloodPressure';
import Medications from './pages/health/Medications';
import Activities from './pages/health/Activities';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard\" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blood-pressure" element={<BloodPressure />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;