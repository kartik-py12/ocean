import React from 'react';
import { Notification } from '../hooks/useNotifications';

interface NotificationCenterProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-400 text-green-300';
      case 'error':
        return 'bg-red-500/20 border-red-400 text-red-300';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-400 text-yellow-300';
      default:
        return 'bg-blue-500/20 border-blue-400 text-blue-300';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[10000] space-y-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getNotificationStyles(notification.type)} backdrop-blur-md border rounded-xl px-6 py-4 shadow-lg flex items-center space-x-4 animate-slide-in`}
        >
          <div className="flex-1">
            <p className="font-semibold">{notification.message}</p>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="text-current hover:opacity-70 text-xl leading-none"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

