import { ArrowLeft, BookOpen, CheckCircle, Clock, BarChart3, Calendar, TrendingUp, FileText } from 'lucide-react';

interface NavigationHistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export function NavigationHistoryScreen({ onNavigate }: NavigationHistoryScreenProps) {
  // Statistics
  const stats = [
    {
      label: 'Total Case Studies',
      value: '24',
      icon: BookOpen,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: '15',
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-600',
    },
    {
      label: 'In Progress',
      value: '9',
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      iconColor: 'text-amber-600',
    },
  ];

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      type: 'Case Study',
      title: 'Pediatric Caries Prevention - Patient Age 8',
      status: 'Completed',
      date: 'Feb 1, 2026',
      statusColor: 'green',
      peptide: 'Histatin-5',
    },
    {
      id: 2,
      type: 'Case Study',
      title: 'Geriatric Severe Caries - Patient Age 72',
      status: 'In Progress',
      date: 'Jan 31, 2026',
      statusColor: 'amber',
      peptide: 'Nisin + Cecropin',
    },
    {
      id: 3,
      type: 'Case Study',
      title: 'Middle-Aged Moderate Risk - Patient Age 45',
      status: 'Completed',
      date: 'Jan 30, 2026',
      statusColor: 'green',
      peptide: 'KSL-W + LL-37',
    },
    {
      id: 4,
      type: 'Case Study',
      title: 'Pediatric Mild Risk - Patient Age 12',
      status: 'In Progress',
      date: 'Jan 29, 2026',
      statusColor: 'amber',
      peptide: 'Histatin-5',
    },
    {
      id: 5,
      type: 'Case Study',
      title: 'Geriatric High Risk - Patient Age 68',
      status: 'Completed',
      date: 'Jan 28, 2026',
      statusColor: 'green',
      peptide: 'Nisin + Cecropin',
    },
    {
      id: 6,
      type: 'Case Study',
      title: 'Adult Moderate Risk - Patient Age 35',
      status: 'In Progress',
      date: 'Jan 27, 2026',
      statusColor: 'amber',
      peptide: 'KSL-W + LL-37',
    },
    {
      id: 7,
      type: 'Case Study',
      title: 'Pediatric Prevention - Patient Age 6',
      status: 'Completed',
      date: 'Jan 26, 2026',
      statusColor: 'green',
      peptide: 'Histatin-5',
    },
    {
      id: 8,
      type: 'Case Study',
      title: 'Middle-Aged High Risk - Patient Age 52',
      status: 'In Progress',
      date: 'Jan 25, 2026',
      statusColor: 'amber',
      peptide: 'KSL-W + LL-37',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Progress') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('student-home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl text-gray-800">Navigation History</h1>
            <p className="text-sm text-gray-600">Your learning progress and activity</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-4 border border-gray-200`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <p className={`text-2xl ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base text-gray-800">Recent Activity</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span>Last 7 days</span>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-800 mb-1">{activity.title}</h3>
                      <p className="text-xs text-gray-500">{activity.type}</p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(activity.status)} whitespace-nowrap ml-2`}
                    >
                      {activity.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      <span>{activity.peptide}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base text-gray-800 mb-2">Progress Summary</h3>
              <p className="text-sm text-gray-600 mb-3">
                You've completed 15 out of 24 case studies. Keep up the great work!
              </p>
              <div className="w-full bg-white rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">62.5% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
