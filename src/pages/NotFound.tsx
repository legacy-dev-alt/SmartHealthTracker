import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { HeartPulse } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <HeartPulse className="h-24 w-24 text-primary-600 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or you may not have access to it.
      </p>
      <Link to="/dashboard">
        <Button>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;