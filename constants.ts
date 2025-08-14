import { Brand, BrandInfo, ForecastData } from './types';
import { PizzaIcon } from './components/icons/PizzaIcon';
import { ChickenIcon } from './components/icons/ChickenIcon';
import { DonutIcon } from './components/icons/DonutIcon';

export const BRANDS: Record<Brand, BrandInfo> = {
  [Brand.DOMINOS]: {
    name: Brand.DOMINOS,
    logo: PizzaIcon,
    color: 'blue-500',
    slogan: "It's what we do.",
    menuPrompt: 'Suggest some pizzas and sides from Domino\'s.',
    itemImage: 'https://picsum.photos/seed/pizza/400/300'
  },
  [Brand.POPEYES]: {
    name: Brand.POPEYES,
    logo: ChickenIcon,
    color: 'red-600',
    slogan: 'Love that chicken.',
    menuPrompt: 'Suggest some spicy chicken meals and biscuits from Popeyes.',
    itemImage: 'https://picsum.photos/seed/chicken/400/300'
  },
  [Brand.DUNKIN]: {
    name: Brand.DUNKIN,
    logo: DonutIcon,
    color: 'pink-500',
    slogan: 'America runs on Dunkin\'.',
    menuPrompt: 'Suggest some coffee and donut combinations from Dunkin\'.',
    itemImage: 'https://picsum.photos/seed/donut/400/300'
  },
};

export const FORECAST_DATA: Record<Brand, ForecastData[]> = {
  [Brand.DOMINOS]: [
    { time: '12pm', orders: 65 },
    { time: '1pm', orders: 80 },
    { time: '6pm', orders: 120 },
    { time: '7pm', orders: 150 },
    { time: '8pm', orders: 130 },
  ],
  [Brand.POPEYES]: [
    { time: '12pm', orders: 70 },
    { time: '1pm', orders: 95 },
    { time: '6pm', orders: 110 },
    { time: '7pm', orders: 140 },
    { time: '8pm', orders: 115 },
  ],
  [Brand.DUNKIN]: [
    { time: '7am', orders: 130 },
    { time: '8am', orders: 180 },
    { time: '9am', orders: 160 },
    { time: '3pm', orders: 90 },
    { time: '4pm', orders: 85 },
  ],
};