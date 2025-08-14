
import React, { useState, useCallback } from 'react';
import { Brand } from './types';
import { BRANDS } from './constants';
import Header from './components/Header';
import BrandDashboard from './components/BrandDashboard';
import DynamicOfferModal from './components/DynamicOfferModal';

const App: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<Brand>(Brand.DOMINOS);
  const [showOffer, setShowOffer] = useState(false);
  const [offerContent, setOfferContent] = useState({ title: '', description: '' });
  const [isOfferLoading, setIsOfferLoading] = useState(false);
  const [resetIdleTimer, setResetIdleTimer] = useState(0);

  const handleBrandSelect = useCallback((brand: Brand) => {
    setActiveBrand(brand);
    setShowOffer(false); // Close offer modal on brand switch
    setResetIdleTimer(prev => prev + 1); // Reset idle timer
  }, []);

  const handleActivity = useCallback(() => {
    setResetIdleTimer(prev => prev + 1);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased" onClick={handleActivity} onMouseMove={handleActivity} onKeyPress={handleActivity}>
      <Header activeBrand={activeBrand} onBrandSelect={handleBrandSelect} />
      <main className="p-4 sm:p-6 md:p-8">
        <BrandDashboard 
          key={activeBrand} 
          brandInfo={BRANDS[activeBrand]} 
          setShowOffer={setShowOffer} 
          setOfferContent={setOfferContent} 
          setIsOfferLoading={setIsOfferLoading}
          resetIdleTimerKey={resetIdleTimer}
        />
      </main>
      <DynamicOfferModal 
        isOpen={showOffer} 
        onClose={() => setShowOffer(false)}
        title={offerContent.title}
        description={offerContent.description}
        isLoading={isOfferLoading}
        brandColor={BRANDS[activeBrand].color}
      />
    </div>
  );
};

export default App;
