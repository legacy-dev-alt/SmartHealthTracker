import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Pill, 
  TrendingUp, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder data (this would come from API)
const mockData = {
  bloodPressure: [
    { date: '2025-04-01', systolic: 120, diastolic: 80 },
    { date: '2025-04-02', systolic: 122, diastolic: 78 },
    { date: '2025-04-03', systolic: 118, diastolic: 76 },
    { date: '2025-04-04', systolic: 125, diastolic: 82 },
    { date: '2025-04-05', systolic: 121, diastolic: 79 },
    { date: '2025-04-06', systolic: 119, diastolic: 77 },
    { date: '2025-04-07', systolic: 120, diastolic: 80 },
  ],
  medications: [
    { id: 1, name: 'Vitamin D', dosage: '1000 IU', schedule: 'Daily', time: '08:00' },
    { id: 2, name: 'Multivitamin', dosage: '1 tablet', schedule: 'Daily', time: '08:00' },
    { id: 3, name: 'Omega-3', dosage: '1000mg', schedule: 'Daily', time: '18:00' },
  ],
  activities: [
    { date: '2025-04-01', type: 'Walking', duration: 30, calories: 150 },
    { date: '2025-04-03', type: 'Running', duration: 45, calories: 350 },
    { date: '2025-04-05', type: 'Cycling', duration: 60, calories: 400 },
    { date: '2025-04-07', type: 'Swimming', duration: 40, calories: 300 },
  ]
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [todayMeds, setTodayMeds] = useState(mockData.medications);
  const [chartData, setChartData] = useState(
    mockData.bloodPressure.map(bp => ({
      date: format(new Date(bp.date), 'MMM d'),
      Systolic: bp.systolic,
      Diastolic: bp.diastolic
    }))
  );
  
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">{today}</div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-primary-100">Latest Blood Pressure</p>
              <h3 className="text-2xl font-semibold mt-1">120/80</h3>
              <p className="text-sm mt-1 text-primary-100">Normal</p>
            </div>
            <Heart className="h-10 w-10 text-primary-100" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary-100">Medication</p>
              <h3 className="text-2xl font-semibold mt-1">3</h3>
              <p className="text-sm mt-1 text-secondary-100">Due today</p>
            </div>
            <Pill className="h-10 w-10 text-secondary-100" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-amber-100">Activity</p>
              <h3 className="text-2xl font-semibold mt-1">4</h3>
              <p className="text-sm mt-1 text-amber-100">Sessions this week</p>
            </div>
            <Activity className="h-10 w-10 text-amber-100" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100">Health Score</p>
              <h3 className="text-2xl font-semibold mt-1">85/100</h3>
              <p className="text-sm mt-1 text-emerald-100">Good</p>
            </div>
            <TrendingUp className="h-10 w-10 text-emerald-100" />
          </div>
        </Card>
      </div>
      
      {/* Health Trends */}
      <Card title="Blood Pressure Trends">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Systolic" fill="#3b82f6" />
              <Bar dataKey="Diastolic" fill="#0d9488" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-right">
          <Button
            variant="outline"
            onClick={() => navigate('/blood-pressure')}
          >
            View Details
          </Button>
        </div>
      </Card>
      
      {/* Today's Medications */}
      <Card title="Today's Medications">
        {todayMeds.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {todayMeds.map((med) => (
              <div key={med.id} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{med.name}</h4>
                  <p className="text-sm text-gray-500">{med.dosage} - {med.schedule} at {med.time}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Mark as taken logic would go here
                    }}
                  >
                    Mark as taken
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            <Pill className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No medications for today</h3>
            <p className="mt-1 text-sm text-gray-500">Add your medications to keep track of them.</p>
            <div className="mt-6">
              <Button 
                variant="primary"
                onClick={() => navigate('/medications')}
              >
                Add Medication
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* Reminders */}
      <Card title="Reminders">
        <div className="flex items-center p-4 bg-amber-50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-amber-400" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-amber-800">Time to check your blood pressure</h4>
            <p className="text-sm text-amber-700">It's been 2 days since your last reading</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-primary-50 rounded-lg mt-3">
          <Calendar className="h-8 w-8 text-primary-400" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-primary-800">Doctor's appointment</h4>
            <p className="text-sm text-primary-700">Tomorrow at 10:00 AM with Dr. Johnson</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;