import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Bell, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface ScheduleAppointmentScreenProps {
  onNavigate: (screen: string) => void;
}

export function ScheduleAppointmentScreen({ onNavigate }: ScheduleAppointmentScreenProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('1-day');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const availableSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
  ];

  const upcomingDates = [
    { date: '2026-03-11', day: 'Wed', slots: 5 },
    { date: '2026-03-12', day: 'Thu', slots: 3 },
    { date: '2026-03-13', day: 'Fri', slots: 4 },
    { date: '2026-03-16', day: 'Mon', slots: 6 },
    { date: '2026-03-17', day: 'Tue', slots: 2 },
  ];

  const handleSchedule = () => {
    setError('');

    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }

    setSuccess(true);

    // After confirm appointment it has to go back to home screen
    setTimeout(() => {
      onNavigate('home');
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-12 rounded-b-[32px] md:rounded-b-[48px] shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">Schedule Appointment</h1>
              <p className="text-blue-50/80 text-sm mt-0.5">Book your follow-up checkup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto -mt-6">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-0 md:py-0 pb-12">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800 font-bold">Appointment Confirmed!</p>
                  <p className="text-xs text-green-600">Redirecting to home screen...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-800 font-bold">Incomplete Information</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">1. Select Date</h3>
            <div className="space-y-3">
              {upcomingDates.map((dateInfo) => (
                <button
                  key={dateInfo.date}
                  onClick={() => setSelectedDate(dateInfo.date)}
                  className={`w-full border-2 rounded-2xl p-4 transition-all duration-200 ${selectedDate === dateInfo.date
                      ? 'bg-blue-50 border-[#3A8DFF] shadow-sm'
                      : 'bg-white border-gray-50 hover:border-blue-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${selectedDate === dateInfo.date ? 'bg-gradient-to-br from-[#3A8DFF] to-[#1C5DFF] shadow-lg shadow-blue-200' : 'bg-gray-50'
                        }`}>
                        <span className={`text-[10px] font-bold uppercase ${selectedDate === dateInfo.date ? 'text-blue-50' : 'text-gray-400'}`}>
                          {dateInfo.day}
                        </span>
                        <span className={`text-lg font-bold ${selectedDate === dateInfo.date ? 'text-white' : 'text-gray-700'}`}>
                          {new Date(dateInfo.date).getDate()}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-bold ${selectedDate === dateInfo.date ? 'text-gray-900' : 'text-gray-800'}`}>
                          {new Date(dateInfo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">{dateInfo.slots} slots available today</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedDate === dateInfo.date ? 'bg-blue-100 text-[#3A8DFF]' : 'bg-gray-50 text-gray-300'
                      }`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 mb-6 animate-slide-up">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">2. Available Time Slots</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-4 rounded-2xl transition-all duration-200 border-2 ${!slot.available
                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                        : selectedTime === slot.time
                          ? 'bg-gradient-to-br from-[#3A8DFF] to-[#1C5DFF] text-white border-transparent shadow-lg shadow-blue-200 transform scale-105'
                          : 'bg-white border-gray-50 hover:border-blue-200 text-gray-600'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Clock className={`w-4 h-4 ${selectedTime === slot.time ? 'text-white' : 'text-blue-400'}`} />
                      <span className="text-sm font-bold">{slot.time}</span>
                      {!slot.available && <span className="text-[10px] font-bold">Booked</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 animate-slide-up">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">3. Summary & Reminders</h3>

              <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-5 mb-6 border border-blue-50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Appointment Date</span>
                    <span className="text-sm text-gray-800 font-bold">
                      {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Scheduled Time</span>
                    <span className="text-sm text-gray-800 font-bold">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-blue-100/50 pt-3">
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Primary Doctor</span>
                    <span className="text-sm text-gray-800 font-bold">Dr. Smith Johnson</span>
                  </div>
                </div>
              </div>

              {/* Reminder Toggle */}
              <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Email Reminder</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Notification service</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={reminderEnabled}
                    onChange={(e) => setReminderEnabled(e.target.checked)}
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 shadow-inner"></div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Confirm Button */}
      <div className="px-6 py-6 border-t border-gray-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSchedule}
            disabled={success || !selectedDate || !selectedTime}
            className={`w-full py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 ${success || !selectedDate || !selectedTime
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white hover:opacity-90 hover:shadow-lg'
              }`}
          >
            {success ? 'Appointment Confirmed ✓' : 'Confirm Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
