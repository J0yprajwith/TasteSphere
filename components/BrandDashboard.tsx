import React, { useEffect, useRef } from 'react';
import { BrandInfo } from '../types';
import RecommendationEngine from './RecommendationEngine';
import OrderForecastChart from './OrderForecastChart';
import LoyaltyPoints from './LoyaltyPoints';
import QueueTime from './QueueTime';
import { Card } from './ui/Card';
import { generateDynamicOffer } from '../services/geminiService';

interface BrandDashboardProps {
  brandInfo: BrandInfo;
  setShowOffer: (show: boolean) => void;
  setOfferContent: (content: { title: string, description: string }) => void;
  setIsOfferLoading: (loading: boolean) => void;
  resetIdleTimerKey: number;
}

const BrandDashboard: React.FC<BrandDashboardProps> = ({ brandInfo, setShowOffer, setOfferContent, setIsOfferLoading, resetIdleTimerKey }) => {
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleIdle = async () => {
      setShowOffer(true);
      setIsOfferLoading(true);
      const offer = await generateDynamicOffer(brandInfo.name);
      setOfferContent(offer);
      setIsOfferLoading(false);
    };

    const resetTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(handleIdle, 15000); // 15-second idle timer
    };

    resetTimer();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [brandInfo.name, setShowOffer, setOfferContent, setIsOfferLoading, resetIdleTimerKey]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{brandInfo.name}</h2>
        <p className="mt-2 text-lg text-gray-400">{brandInfo.slogan}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <RecommendationEngine brandInfo={brandInfo} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <Card>
            <Card.Header>
              <Card.Title>Today's Order Forecast</Card.Title>
              <Card.Description>Predicted peak times</Card.Description>
            </Card.Header>
            <Card.Content>
              <OrderForecastChart brand={brandInfo.name} />
            </Card.Content>
          </Card>
          <LoyaltyPoints />
          <QueueTime />
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;
