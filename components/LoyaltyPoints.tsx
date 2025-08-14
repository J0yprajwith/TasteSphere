
import React from 'react';
import { Card } from './ui/Card';

const LoyaltyPoints: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Loyalty Points</Card.Title>
        <Card.Description>Earn points with every order!</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="text-center">
          <p className="text-5xl font-bold text-amber-400">1,250</p>
          <p className="text-gray-400 mt-2">Points</p>
        </div>
        <div className="mt-4 text-sm text-gray-400 space-y-1">
          <p>+10 points for every $1 spent.</p>
          <p>+50 bonus points for trying a new brand.</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default LoyaltyPoints;
