
import React from 'react';
import { Spinner } from './ui/Spinner';

interface DynamicOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  isLoading: boolean;
  brandColor: string;
}

const DynamicOfferModal: React.FC<DynamicOfferModalProps> = ({ isOpen, onClose, title, description, isLoading, brandColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-95 hover:scale-100 border-t-4"
        style={{ borderColor: `var(--tw-color-${brandColor})` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48">
                    <Spinner className="w-12 h-12" />
                    <p className="mt-4 text-lg text-gray-300">Cooking up a special offer for you...</p>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 mb-6">{description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            className={`w-full bg-${brandColor} text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105`}
                        >
                            Claim Offer
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full bg-gray-700 text-gray-300 font-bold py-3 px-4 rounded-lg transition-colors hover:bg-gray-600"
                        >
                            No Thanks
                        </button>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default DynamicOfferModal;
