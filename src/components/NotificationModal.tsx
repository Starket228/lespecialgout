
import { X, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Bienvenue !',
      message: 'Bienvenue sur Le Spécial Goût. Découvrez nos délicieuses spécialités.',
      time: 'Maintenant',
      isRead: false
    },
    {
      id: '2',
      title: 'Promotion',
      message: 'Profitez de -20% sur tous les plats togolais ce week-end !',
      time: '2 heures',
      isRead: false
    },
    {
      id: '3',
      title: 'Livraison gratuite',
      message: 'Pour toute commande de plus de 15000 FCFA, la livraison est offerte.',
      time: '1 jour',
      isRead: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-[1001] flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      <div className={cn(
        "relative bg-white shadow-xl max-w-md w-full mt-16 mx-4 rounded-lg transform transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Tout marquer comme lu
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-4 hover:bg-gray-50 relative",
                    !notification.isRead && "bg-primary/5"
                  )}
                >
                  {!notification.isRead && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                  )}
                  <div className="flex justify-between items-start">
                    <div className="pl-3">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">{notification.time}</span>
                    </div>
                    <button 
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
