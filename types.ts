import React from 'react';

export enum Brand {
  DOMINOS = 'Dominos',
  POPEYES = 'Popeyes',
  DUNKIN = 'Dunkin',
}

export interface BrandInfo {
  name: Brand;
  logo: React.ComponentType<{ className?: string }>;
  color: string;
  slogan: string;
  menuPrompt: string;
  itemImage: string;
}

export interface Recommendation {
  name: string;
  description: string;
  price: number;
}

export interface ForecastData {
  time: string;
  orders: number;
}