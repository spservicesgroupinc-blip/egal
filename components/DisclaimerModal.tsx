import React, { useState } from 'react';

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 border-t-4 border-yellow-600">
        <h2 className="text-2xl font-serif font-bold text-legal-900 mb-4">Legal Disclaimer</h2>
        <div className="prose prose-sm text-gray-600 mb-6 max-h-60 overflow-y-auto pr-2">
          <p className="mb-2"><strong>HoosierLaw AI is NOT a lawyer.</strong></p>
          <p className="mb-2">
            This application uses artificial intelligence to provide legal information, research, and drafting assistance based on Indiana law. It does not provide legal advice, and no attorney-client relationship is formed by using this app.
          </p>
          <p className="mb-2">
            Family law is complex and fact-specific. While this tool aims for high accuracy using advanced reasoning models, AI can make mistakes ("hallucinations"). You should always verify citations and generated documents with a qualified attorney licensed in Indiana before filing anything with a court.
          </p>
          <p>
            By continuing, you acknowledge that you are using this tool at your own risk and agree to the Terms of Service.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-legal-900 text-white font-bold py-3 rounded-lg hover:bg-legal-800 transition-colors"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;