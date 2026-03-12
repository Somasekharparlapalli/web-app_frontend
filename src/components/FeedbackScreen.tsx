import { ArrowLeft, Star, Send, ThumbsUp, ThumbsDown, MessageSquare, Smile, Meh, Frown, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface FeedbackScreenProps {
  onNavigate: (screen: string) => void;
}

export function FeedbackScreen({ onNavigate }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setError('');
    
    if (!category) {
      setError('Please select a feedback category');
      return;
    }
    if (!feedback.trim()) {
      setError('Please enter your feedback message');
      return;
    }

    setSuccess(true);
    
    // Navigate back after showing success message
    setTimeout(() => {
      onNavigate('settings');
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate('settings')}
          className="mb-4 p-2 hover:bg-purple-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-xl text-white mb-1">Share Your Feedback</h2>
          <p className="text-sm text-purple-100">Help us improve your experience</p>
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
                <p className="text-sm text-green-800 font-medium">Feedback Submitted Successfully!</p>
                <p className="text-xs text-green-600">Thank you for helping us improve. Redirecting...</p>
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

        {/* Overall Satisfaction */}
        <h3 className="text-sm text-gray-700 mb-3">How satisfied are you?</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setSatisfaction('unhappy')}
            className={`p-4 rounded-xl border-2 transition-all ${
              satisfaction === 'unhappy'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white hover:border-red-300'
            }`}
          >
            <Frown className={`w-8 h-8 mx-auto mb-2 ${satisfaction === 'unhappy' ? 'text-red-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600 text-center">Unhappy</p>
          </button>

          <button
            onClick={() => setSatisfaction('neutral')}
            className={`p-4 rounded-xl border-2 transition-all ${
              satisfaction === 'neutral'
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 bg-white hover:border-amber-300'
            }`}
          >
            <Meh className={`w-8 h-8 mx-auto mb-2 ${satisfaction === 'neutral' ? 'text-amber-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600 text-center">Neutral</p>
          </button>

          <button
            onClick={() => setSatisfaction('happy')}
            className={`p-4 rounded-xl border-2 transition-all ${
              satisfaction === 'happy'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <Smile className={`w-8 h-8 mx-auto mb-2 ${satisfaction === 'happy' ? 'text-green-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600 text-center">Happy</p>
          </button>
        </div>

        {/* Star Rating */}
        <h3 className="text-sm text-gray-700 mb-3">Rate Your Experience</h3>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            {rating === 0 && 'Tap to rate'}
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </p>
        </div>

        {/* Feedback Category */}
        <h3 className="text-sm text-gray-700 mb-3">What's your feedback about? *</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setCategory('Features')}
            className={`p-3 rounded-xl border-2 transition-all ${
              category === 'Features'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <ThumbsUp className={`w-6 h-6 mx-auto mb-1 ${category === 'Features' ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-700 text-center">Features</p>
          </button>

          <button
            onClick={() => setCategory('Usability')}
            className={`p-3 rounded-xl border-2 transition-all ${
              category === 'Usability'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <Smile className={`w-6 h-6 mx-auto mb-1 ${category === 'Usability' ? 'text-green-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-700 text-center">Usability</p>
          </button>

          <button
            onClick={() => setCategory('Performance')}
            className={`p-3 rounded-xl border-2 transition-all ${
              category === 'Performance'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <Star className={`w-6 h-6 mx-auto mb-1 ${category === 'Performance' ? 'text-purple-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-700 text-center">Performance</p>
          </button>

          <button
            onClick={() => setCategory('Bug Report')}
            className={`p-3 rounded-xl border-2 transition-all ${
              category === 'Bug Report'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white hover:border-red-300'
            }`}
          >
            <ThumbsDown className={`w-6 h-6 mx-auto mb-1 ${category === 'Bug Report' ? 'text-red-500' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-700 text-center">Bug Report</p>
          </button>
        </div>

        {/* Feedback Message */}
        <h3 className="text-sm text-gray-700 mb-3">Tell us more *</h3>
        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts, suggestions, or report an issue..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
          ></textarea>
          <p className="text-xs text-gray-500 mt-2">{feedback.length} / 500 characters</p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Your Voice Matters</p>
              <p className="text-xs text-gray-600">
                Every piece of feedback helps us improve DentalCare AI. We review all submissions and use them to enhance your experience.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={success}
          className={`w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${
            success
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          <Send className="w-5 h-5" />
          <span>{success ? 'Submitted' : 'Submit Feedback'}</span>
        </button>
      </div>
    </div>
  );
}