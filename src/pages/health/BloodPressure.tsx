import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Plus, Trash2, Edit } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, parseISO } from 'date-fns';

// Mock data
const initialReadings = [
  { id: 1, date: '2025-04-01', time: '08:30', systolic: 120, diastolic: 80, pulse: 72, notes: 'Morning reading' },
  { id: 2, date: '2025-04-02', time: '08:45', systolic: 122, diastolic: 78, pulse: 70, notes: 'After coffee' },
  { id: 3, date: '2025-04-03', time: '08:15', systolic: 118, diastolic: 76, pulse: 68, notes: 'Feeling good' },
  { id: 4, date: '2025-04-04', time: '08:30', systolic: 125, diastolic: 82, pulse: 75, notes: 'Stressed at work' },
  { id: 5, date: '2025-04-05', time: '08:30', systolic: 121, diastolic: 79, pulse: 71, notes: '' },
  { id: 6, date: '2025-04-06', time: '09:00', systolic: 119, diastolic: 77, pulse: 69, notes: 'After exercise' },
  { id: 7, date: '2025-04-07', time: '08:30', systolic: 120, diastolic: 80, pulse: 72, notes: '' },
];

interface Reading {
  id: number;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  notes: string;
}

const BloodPressure: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>(initialReadings);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Reading>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    systolic: undefined,
    diastolic: undefined,
    pulse: undefined,
    notes: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing reading
      setReadings(readings.map(reading => 
        reading.id === editingId 
          ? { ...formData, id: editingId } as Reading 
          : reading
      ));
      setEditingId(null);
    } else {
      // Add new reading
      const newReading = {
        ...formData,
        id: Date.now(),
      } as Reading;
      
      setReadings([...readings, newReading]);
    }
    
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
      systolic: undefined,
      diastolic: undefined,
      pulse: undefined,
      notes: '',
    });
    
    setShowForm(false);
  };
  
  const handleEdit = (reading: Reading) => {
    setFormData(reading);
    setEditingId(reading.id);
    setShowForm(true);
  };
  
  const handleDelete = (id: number) => {
    setReadings(readings.filter(reading => reading.id !== id));
  };
  
  const chartData = readings.map(reading => ({
    date: format(parseISO(reading.date), 'MMM d'),
    Systolic: reading.systolic,
    Diastolic: reading.diastolic,
    Pulse: reading.pulse,
  }));
  
  const getBPCategory = (systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80) return { label: 'Normal', color: 'text-green-600' };
    if ((systolic >= 120 && systolic <= 129) && diastolic < 80) return { label: 'Elevated', color: 'text-yellow-600' };
    if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return { label: 'Stage 1', color: 'text-orange-600' };
    if (systolic >= 140 || diastolic >= 90) return { label: 'Stage 2', color: 'text-red-600' };
    if (systolic > 180 || diastolic > 120) return { label: 'Crisis', color: 'text-red-800 font-bold' };
    return { label: 'Unknown', color: 'text-gray-600' };
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Blood Pressure Tracker</h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              date: format(new Date(), 'yyyy-MM-dd'),
              time: format(new Date(), 'HH:mm'),
              systolic: undefined,
              diastolic: undefined,
              pulse: undefined,
              notes: '',
            });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reading
        </Button>
      </div>
      
      {/* Chart */}
      <Card title="Blood Pressure Trends">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Systolic" stroke="#3b82f6" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Diastolic" stroke="#0d9488" />
              <Line type="monotone" dataKey="Pulse" stroke="#ef4444" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Form */}
      {showForm && (
        <Card title={editingId ? "Edit Reading" : "Add New Reading"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Systolic (mmHg)"
                type="number"
                name="systolic"
                value={formData.systolic?.toString() || ''}
                onChange={handleInputChange}
                required
                min="70"
                max="220"
              />
              
              <Input
                label="Diastolic (mmHg)"
                type="number"
                name="diastolic"
                value={formData.diastolic?.toString() || ''}
                onChange={handleInputChange}
                required
                min="40"
                max="140"
              />
              
              <Input
                label="Pulse (bpm)"
                type="number"
                name="pulse"
                value={formData.pulse?.toString() || ''}
                onChange={handleInputChange}
                required
                min="40"
                max="220"
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update' : 'Save'} Reading
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Readings Table */}
      <Card title="Blood Pressure History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systolic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diastolic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pulse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {readings.slice().reverse().map((reading) => {
                const category = getBPCategory(reading.systolic, reading.diastolic);
                return (
                  <tr key={reading.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(reading.date), 'MMM d, yyyy')} at {reading.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.systolic} mmHg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.diastolic} mmHg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.pulse} bpm
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${category.color}`}>{category.label}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {reading.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(reading)}
                        className="text-secondary-600 hover:text-secondary-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(reading.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BloodPressure;