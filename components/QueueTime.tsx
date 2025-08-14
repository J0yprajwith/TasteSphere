
import React from 'react';
import { Card } from './ui/Card';
import { ClockIcon } from './icons/ClockIcon';

const QueueTime: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Live Kitchen Status</Card.Title>
        <Card.Description>Estimated wait time</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center justify-center space-x-4">
          <ClockIcon className="w-12 h-12 text-teal-400" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white">12-15 min</p>
            <p className="text-gray-400">Order Prep Time</p>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default QueueTime;
