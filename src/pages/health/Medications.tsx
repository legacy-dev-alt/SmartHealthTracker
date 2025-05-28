import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Plus, Clock, AlertCircle, Trash2, Edit, Check } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  schedule: string;
  time: string;
  startDate: string;
  endDate?: string;
  notes: string;
  taken: boolean;
}

// Mock data
const initialMedications: Medication[] = [
  { 
    id: 1, 
    name: 'Vitamin D', 
    dosage: '1000 IU', 
    schedule: 'Daily', 
    time: '08:00', 
    startDate: '2025-03-01', 
    endDate: '', 
    notes: 'Take with food', 
    taken: false 
  },
  { 
    id: 2, 
    name: 'Multivitamin', 
    dosage: '1 tablet', 
    schedule: 'Daily', 
    time: '08:00', 
    startDate: '2025-03-01', 
    endDate: '', 
    notes: 'Take with breakfast', 
    taken: true 
  },
  { 
    id: 3, 
    name: 'Omega-3', 
    dosage: '1000mg', 
    schedule: 'Daily', 
    time: '18:00', 
    startDate: '2025-03-15', 
    endDate: '2025-06-15', 
    notes: 'Take with dinner', 
    taken: false 
  },
];

const Medications: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    schedule: 'Daily',
    time: '08:00',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
    taken: false,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const scheduleOptions = ['Daily', 'Twice Daily', 'Three Times Daily', 'Weekly', 'As Needed'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing medication
      setMedications(medications.map(med => 
        med.id === editingId 
          ? { ...formData, id: editingId, taken: med.taken } as Medication 
          : med
      ));
      setEditingId(null);
    } else {
      // Add new medication
      const newMedication = {
        ...formData,
        id: Date.now(),
        taken: false,
      } as Medication;
      
      setMedications([...medications, newMedication]);
    }
    
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      schedule: 'Daily',
      time: '08:00',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: '',
      taken: false,
    });
    setShowForm(false);
  };
  
  const handleEdit = (medication: Medication) => {
    setFormData(medication);
    setEditingId(medication.id);
    setShowForm(true);
  };
  
  const handleDelete = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  const toggleTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id 
        ? { ...med, taken: !med.taken } 
        : med
    ));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Medication Tracker</h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>
      
      {/* Today's Medications */}
      <Card title="Today's Medications">
        {medications.filter(med => !med.taken).length > 0 ? (
          <div className="divide-y divide-gray-200">
            {medications.filter(med => !med.taken).map((medication) => (
              <div key={medication.id} className="py-4 flex items-center justify-between">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-900">{medication.name}</h4>
                    <p className="text-sm text-gray-500">{medication.dosage} - {medication.schedule} at {medication.time}</p>
                    {medication.notes && (
                      <p className="text-xs text-gray-500 mt-1">{medication.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => toggleTaken(medication.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark as taken
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Check className="h-12 w-12 text-green-500 mx-auto" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">All done for today!</h3>
            <p className="mt-1 text-sm text-gray-500">You've taken all your scheduled medications.</p>
          </div>
        )}
      </Card>
      
      {/* Form */}
      {showForm && (
        <Card title={editingId ? "Edit Medication" : "Add New Medication"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Medication Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Dosage"
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleInputChange}
                required
                placeholder="e.g., 500mg, 2 tablets"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <select
                  id="schedule"
                  name="schedule"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  required
                >
                  {scheduleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="End Date (Optional)"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
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
                {editingId ? 'Update' : 'Save'} Medication
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* All Medications */}
      <Card title="All Medications">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medications.map((medication) => (
                <tr key={medication.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medication.dosage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medication.schedule}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medication.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {medication.taken ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Taken
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Due
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(medication)}
                      className="text-secondary-600 hover:text-secondary-900 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(medication.id)}
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

export default Medications;