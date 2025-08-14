
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Brand } from '../types';
import { FORECAST_DATA } from '../constants';
import { BRANDS } from '../constants';

const OrderForecastChart: React.FC<{ brand: Brand }> = ({ brand }) => {
    // This is a fix for a hydration mismatch issue with recharts and server-side rendering or strict mode.
    // By delaying the render until the component has mounted, we ensure it only runs on the client.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="w-full h-48 bg-gray-800 rounded-md animate-pulse"></div>;
    }
    
    const data = FORECAST_DATA[brand];
    const brandColor = BRANDS[brand].color.split('-')[0]; // e.g., 'blue' from 'blue-500'

    const colorMap: { [key: string]: string } = {
        blue: '#3b82f6',
        red: '#ef4444',
        pink: '#ec4899',
    };
    
    const fillColor = colorMap[brandColor] || '#8884d8';

  return (
    <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                        borderColor: '#4b5563',
                        borderRadius: '0.5rem'
                    }} 
                    labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="orders" fill={fillColor} radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default OrderForecastChart;
