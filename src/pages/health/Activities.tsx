import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Plus, Trash2, Edit, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

// Mock data
const initialActivities = [
  { id: 1, date: '2025-04-01', type: 'Walking', duration: 30, distance: 2.5, calories: 150, notes: 'Morning walk' },
  { id: 2, date: '2025-04-03', type: 'Running', duration: 45, distance: 5.0, calories: 350, notes: 'Felt great' },
  { id: 3, date: '2025-04-05', type: 'Cycling', duration: 60, distance: 15.0, calories: 400, notes: 'Hilly terrain' },
  { id: 4, date: '2025-04-07', type: 'Swimming', duration: 40, distance: 1.0, calories: 300, notes: 'Pool laps' },
];

interface ActivityRecord {
  id: number;
  date: string;
  type: string;
  duration: number;
  distance: number;
  calories: number;
  notes: string;
}

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<ActivityRecord[]>(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<ActivityRecord>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'Walking',
    duration: undefined,
    distance: undefined,
    calories: undefined,
    notes: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const activityTypes = ['Walking', 'Running', 'Cycling', 'Swimming', 'Yoga', 'Strength Training', 'Cardio', 'Other'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing activity
      setActivities(activities.map(activity => 
        activity.id === editingId 
          ? { ...formData, id: editingId } as ActivityRecord 
          : activity
      ));
      setEditingId(null);
    } else {
      // Add new activity
      const newActivity = {
        ...formData,
        id: Date.now(),
      } as ActivityRecord;
      
      setActivities([...activities, newActivity]);
    }
    
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'Walking',
      duration: undefined,
      distance: undefined,
      calories: undefined,
      notes: '',
    });
    setShowForm(false);
  };
  
  const handleEdit = (activity: ActivityRecord) => {
    setFormData(activity);
    setEditingId(activity.id);
    setShowForm(true);
  };
  
  const handleDelete = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };
  
  // Prepare data for charts
  const caloriesByType = activityTypes.map(type => {
    const totalCalories = activities
      .filter(a => a.type === type)
      .reduce((sum, activity) => sum + activity.calories, 0);
      
    return { type, calories: totalCalories };
  }).filter(item => item.calories > 0);
  
  const activitiesByDate = activities.map(activity => ({
    date: format(parseISO(activity.date), 'MMM d'),
    calories: activity.calories,
    duration: activity.duration,
    type: activity.type,
  }));
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Activity Tracker</h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Activity
        </Button>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Calories Burned by Activity Type">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caloriesByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#3b82f6" name="Calories Burned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Activity History">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activitiesByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#0d9488" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="calories" fill="#3b82f6" name="Calories" />
                <Bar yAxisId="right" dataKey="duration" fill="#0d9488" name="Duration (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Form */}
      {showForm && (
        <Card title={editingId ? "Edit Activity" : "Log New Activity"}>
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
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Activity Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Duration (minutes)"
                type="number"
                name="duration"
                value={formData.duration?.toString() || ''}
                onChange={handleInputChange}
                required
                min="1"
                max="600"
              />
              
              <Input
                label="Distance (km)"
                type="number"
                name="distance"
                value={formData.distance?.toString() || ''}
                onChange={handleInputChange}
                step="0.1"
                min="0"
              />
              
              <Input
                label="Calories Burned"
                type="number"
                name="calories"
                value={formData.calories?.toString() || ''}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes (Optional)
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
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update' : 'Save'} Activity
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Activity History */}
      <Card title="Activity History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.slice().reverse().map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(activity.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.distance} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.calories} cal
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {activity.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="text-secondary-600 hover:text-secondary-900 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Activities;