import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ActivityIcon, 
  PillIcon, 
  HeartPulse, 
  LayoutDashboard, 
  Settings, 
  X 
} from 'lucide-react';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const navigation: NavItem[] = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="h-6 w-6" /> },
    { name: 'Blood Pressure', to: '/blood-pressure', icon: <HeartPulse className="h-6 w-6" /> },
    { name: 'Medications', to: '/medications', icon: <PillIcon className="h-6 w-6" /> },
    { name: 'Activities', to: '/activities', icon: <ActivityIcon className="h-6 w-6" /> },
    { name: 'Profile', to: '/profile', icon: <Settings className="h-6 w-6" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-between h-16 flex-shrink-0 px-4">
        <div className="flex items-center">
          <HeartPulse className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">SmartHealth</span>
        </div>
        {mobile && onClose && (
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>
        )}
      </div>
      
      <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-3 text-base font-medium rounded-md transition-colors`
              }
              onClick={mobile && onClose ? onClose : undefined}
            >
              <div className="mr-4 flex-shrink-0 text-gray-500">{item.icon}</div>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} SmartHealth Tracker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;