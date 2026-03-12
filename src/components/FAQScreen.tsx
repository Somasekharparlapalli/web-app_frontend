import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { AIChatButton } from './AIChatButton';

interface FAQScreenProps {
  onNavigate: (screen: string) => void;
}

export function FAQScreen({ onNavigate }: FAQScreenProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is antimicrobial peptide varnish?',
      answer: 'Antimicrobial peptide varnish is a dental treatment that uses naturally occurring peptides to prevent and fight dental caries. It creates a protective barrier while actively combating harmful bacteria.'
    },
    {
      question: 'How does AI detect dental caries?',
      answer: 'Our AI system analyzes tooth images using machine learning algorithms trained on thousands of dental scans. It can detect early signs of caries with high accuracy, often before visible symptoms appear.'
    },
    {
      question: 'Is the varnish application painful?',
      answer: 'No, the varnish application is completely painless. It is simply brushed onto the teeth and takes only a few minutes. No drilling or anesthesia is required.'
    },
    {
      question: 'How often should I get my teeth scanned?',
      answer: 'We recommend scanning every 3-6 months for regular monitoring, or as advised by your dental professional based on your individual oral health needs.'
    },
    {
      question: 'Can children use this treatment?',
      answer: 'Yes, antimicrobial peptide varnish is safe for children and adults. In fact, early prevention in children can be particularly beneficial for long-term oral health.'
    },
    {
      question: 'How long does the varnish last?',
      answer: 'The protective effects of the varnish typically last 3-6 months. Your dentist will recommend a schedule based on your specific risk level and oral health condition.'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">FAQs</h2>
            <p className="text-xs text-gray-500">Frequently Asked Questions</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm text-gray-800 mb-1">Need More Help?</h3>
            <p className="text-xs text-gray-600">
              If you can't find the answer you're looking for, please contact our support team.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-800 text-left pr-2">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="text-sm text-gray-800 mb-2">Still Have Questions?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Our support team is here to help you with any questions about the app or treatment.
          </p>
          <button
            onClick={() => onNavigate('contactSupport')}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Contact Support
          </button>
        </div>
      </div>
      
      <AIChatButton context="faq" />
    </div>
  );
}