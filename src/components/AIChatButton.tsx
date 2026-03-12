import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

interface AIChatButtonProps {
  context?: string;
}

export function AIChatButton({ context = 'general' }: AIChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([
    {
      type: 'ai',
      text: context === 'detection' 
        ? 'Hello! I can help you understand your caries detection results and answer any questions about your oral health.'
        : context === 'recommendation'
        ? 'Hi! I can explain the AI recommendations and help you understand the varnish treatment options.'
        : context === 'upload'
        ? 'Hello! I can guide you through the tooth scanning process and answer any questions.'
        : 'Hello! How can I assist you with your oral health today?'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', text: message }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          text: 'Thank you for your question. As an AI assistant for dental health, I recommend consulting with your dentist for personalized advice. I can provide general information about caries prevention and antimicrobial varnish treatments.'
        }]);
      }, 1000);
      
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-white">AI Assistant</p>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
