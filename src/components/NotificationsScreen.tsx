import { ArrowLeft, Bell, Calendar, FileText, Shield, CheckCircle, BookOpen, FlaskConical, Award, Microscope } from 'lucide-react';
import { useState } from 'react';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
}

interface Notification {
  id: number;
  icon: any;
  color: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  navigateTo: string;
}

export function NotificationsScreen({ onNavigate, userRole }: NotificationsScreenProps) {
  // Define different notifications based on user role
  const doctorNotifications: Notification[] = [
    {
      id: 1,
      icon: FileText,
      color: 'blue',
      title: 'Scan Report Ready',
      message: 'Your dental scan analysis is complete',
      time: '2 hours ago',
      unread: true,
      navigateTo: 'report-details'
    },
    {
      id: 2,
      icon: Calendar,
      color: 'green',
      title: 'Appointment Reminder',
      message: 'Checkup scheduled for Feb 15, 2026',
      time: '1 day ago',
      unread: true,
      navigateTo: 'home'
    },
    {
      id: 3,
      icon: Shield,
      color: 'purple',
      title: 'Treatment Update',
      message: 'Varnish application recommended',
      time: '2 days ago',
      unread: false,
      navigateTo: 'varnish'
    },
    {
      id: 4,
      icon: CheckCircle,
      color: 'green',
      title: 'Health Improvement',
      message: 'Your oral health score improved by 15%',
      time: '3 days ago',
      unread: false,
      navigateTo: 'history'
    }
  ];

  const studentNotifications: Notification[] = [
    {
      id: 1,
      icon: BookOpen,
      color: 'blue',
      title: 'New Case Study Published',
      message: 'Pediatric Caries Prevention in Early Childhood available now',
      time: '1 hour ago',
      unread: true,
      navigateTo: 'case-studies'
    },
    {
      id: 2,
      icon: FlaskConical,
      color: 'green',
      title: 'AI Analysis Complete',
      message: 'Your teeth scan analysis results are ready to view',
      time: '3 hours ago',
      unread: true,
      navigateTo: 'history'
    },
    {
      id: 3,
      icon: Microscope,
      color: 'purple',
      title: 'Research Update',
      message: 'New findings on LL-37 peptide efficacy published',
      time: '1 day ago',
      unread: false,
      navigateTo: 'peptide-types'
    },
    {
      id: 4,
      icon: Award,
      color: 'amber',
      title: 'Learning Resource Added',
      message: 'Advanced Antimicrobial Peptides course now available',
      time: '2 days ago',
      unread: false,
      navigateTo: 'resources'
    },
    {
      id: 5,
      icon: BookOpen,
      color: 'green',
      title: 'Case Study Review',
      message: 'Your submitted case study received peer feedback',
      time: '3 days ago',
      unread: false,
      navigateTo: 'case-studies'
    },
    {
      id: 6,
      icon: FileText,
      color: 'blue',
      title: 'Database Update',
      message: '15 new research papers added to the library',
      time: '4 days ago',
      unread: false,
      navigateTo: 'resources'
    }
  ];

  const [notifications, setNotifications] = useState<Notification[]>(
    userRole === 'student' ? studentNotifications : doctorNotifications
  );

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      unread: false
    })));
  };

  const handleNotificationClick = (notif: Notification) => {
    // Mark notification as read
    setNotifications(notifications.map(n =>
      n.id === notif.id ? { ...n, unread: false } : n
    ));
    // Navigate to the relevant screen
    onNavigate(notif.navigateTo);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate(userRole === 'student' ? 'student-home' : 'home')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-xl text-gray-800">Notifications</h2>
              <p className="text-xs text-gray-500">{unreadCount} unread messages</p>
            </div>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <h3 className="text-sm text-gray-700 mb-3">Today</h3>
        <div className="space-y-3 mb-6">
          {notifications.slice(0, 2).map((notif) => (
            <button
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`w-full text-left bg-white border rounded-xl p-4 transition-colors ${notif.unread ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-${notif.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <notif.icon className={`w-5 h-5 text-${notif.color}-500`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm text-gray-800">{notif.title}</p>
                    {notif.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <h3 className="text-sm text-gray-700 mb-3">Earlier</h3>
        <div className="space-y-3">
          {notifications.slice(2).map((notif) => (
            <button
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-${notif.color}-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <notif.icon className={`w-5 h-5 text-${notif.color}-500`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-1">{notif.title}</p>
                  <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}