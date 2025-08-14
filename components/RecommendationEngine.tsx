
import React, { useState, useCallback } from 'react';
import { BrandInfo, Recommendation } from '../types';
import { generateRecommendations } from '../services/geminiService';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';
import { WeatherIcon } from './icons/WeatherIcon';

const RecommendationEngine: React.FC<{ brandInfo: BrandInfo }> = ({ brandInfo }) => {
  const [weather, setWeather] = useState('sunny');
  const [mood, setMood] = useState('adventurous');
  const [lastOrder, setLastOrder] = useState('a salad');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateRecommendations(brandInfo.name, weather, mood, lastOrder);
      if (result && result.length > 0) {
        setRecommendations(result);
      } else {
        setError('No recommendations found. Try different criteria.');
        setRecommendations([]);
      }
    } catch (e) {
      setError('Failed to fetch recommendations from AI. Please check your API key and try again.');
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }, [brandInfo.name, weather, mood, lastOrder]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Personalized Menu Recommendations</Card.Title>
        <Card.Description>Tell us a bit about your cravings, and our AI will do the rest!</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="weather" className="block text-sm font-medium text-gray-300 mb-1">Weather</label>
            <select id="weather" value={weather} onChange={(e) => setWeather(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white">
              <option>Sunny</option>
              <option>Cloudy</option>
              <option>Rainy</option>
              <option>Cold</option>
            </select>
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-300 mb-1">Your Mood</label>
            <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white">
              <option>Adventurous</option>
              <option>Comfort</option>
              <option>Healthy</option>
              <option>In a rush</option>
            </select>
          </div>
          <div>
            <label htmlFor="last-order" className="block text-sm font-medium text-gray-300 mb-1">What did you eat last?</label>
            <input type="text" id="last-order" value={lastOrder} onChange={(e) => setLastOrder(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
          </div>
        </div>
        <Button onClick={getRecommendations} disabled={isLoading} className="w-full flex justify-center items-center">
          {isLoading ? <><Spinner /> Generating...</> : 'Get AI Recommendations'}
        </Button>

        {error && <p className="text-center text-red-400">{error}</p>}
        
        <div className="space-y-4 pt-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="bg-gray-800/50 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
               <img src={`${brandInfo.itemImage}&random=${index}`} alt={rec.name} className="w-full sm:w-32 h-32 object-cover rounded-md" />
               <div className="flex-1">
                <Card.Header className="p-0">
                  <div className="flex justify-between items-start">
                    <Card.Title className={`text-lg text-${brandInfo.color}`}>{rec.name}</Card.Title>
                    <span className="font-bold text-lg text-green-400">${rec.price.toFixed(2)}</span>
                  </div>
                </Card.Header>
                <Card.Content className="p-0 mt-2">
                  <p className="text-gray-400">{rec.description}</p>
                </Card.Content>
              </div>
            </Card>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default RecommendationEngine;
