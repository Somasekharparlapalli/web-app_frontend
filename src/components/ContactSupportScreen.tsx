import { ArrowLeft, Mail, Phone, Clock, MessageSquare, Send, Headphones, Globe, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactSupportScreenProps {
  onNavigate: (screen: string) => void;
}

export function ContactSupportScreen({ onNavigate }: ContactSupportScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!subject) {
      setError('Please select a subject');
      return;
    }

    if (!message.trim()) {
      setError('Please enter your message');
      return;
    }

    setSuccess(true);
    
    // Navigate back after showing success message
    setTimeout(() => {
      onNavigate('settings');
    }, 600);
  };

  const handleLiveChat = () => {
    alert('💬 Live Chat\n\nConnecting you to our support team...\n\nEstimated wait time: 2-3 minutes\n\nOffice Hours:\nMon-Fri: 9AM - 6PM EST\nSat: 10AM - 4PM EST\nSun: Closed');
  };

  const handleCallSupport = () => {
    alert('📞 Call Support\n\nPhone: +1 (555) 123-4567\n\nOffice Hours:\nMon-Fri: 9AM - 6PM EST\nSat: 10AM - 4PM EST\nSun: Closed\n\nAverage wait time: 5-10 minutes\n\nTip: Call early morning for shorter wait times!');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate('settings')}
          className="mb-4 p-2 hover:bg-blue-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Headphones className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-xl text-white mb-1">Contact Support</h2>
          <p className="text-sm text-blue-100">We're here to help you</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-green-800 font-medium">Support Request Submitted!</p>
                <p className="text-xs text-green-600">We'll respond to {email} within 24 hours. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !success && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Contact Options */}
        <h3 className="text-sm text-gray-700 mb-3">Quick Contact</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleLiveChat}
            className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-gray-800 text-center">Live Chat</p>
            <p className="text-xs text-green-600 text-center mt-1">Available Now</p>
          </button>

          <button
            onClick={handleCallSupport}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-gray-800 text-center">Call Us</p>
            <p className="text-xs text-blue-600 text-center mt-1">+1 (555) 123-4567</p>
          </button>
        </div>

        {/* Contact Information */}
        <h3 className="text-sm text-gray-700 mb-3">Contact Information</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Email Support</p>
                <p className="text-xs text-gray-600">support@dentalcare-ai.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Office Hours</p>
                <p className="text-xs text-gray-600">Mon-Fri: 9AM - 6PM EST</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Help Center</p>
                <p className="text-xs text-gray-600">help.dentalcare-ai.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <h3 className="text-sm text-gray-700 mb-3">Send Us a Message</h3>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Your Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-1 block">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-1 block">Subject *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select a topic</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Help</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-1 block">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={success}
              className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                success
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="text-sm">{success ? 'Message Sent' : 'Send Message'}</span>
            </button>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Response Time</p>
              <p className="text-xs text-gray-600">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}