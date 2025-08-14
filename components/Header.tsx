import React from 'react';
import { Brand } from '../types';
import { BRANDS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
  activeBrand: Brand;
  onBrandSelect: (brand: Brand) => void;
}

const Header: React.FC<HeaderProps> = ({ activeBrand, onBrandSelect }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">CraveIQ</h1>
          </div>
        </div>
        <nav className="flex items-center space-x-2 sm:space-x-4 border-t border-gray-700 pt-3">
          {Object.values(Brand).map((brand) => {
            const brandInfo = BRANDS[brand];
            const isActive = activeBrand === brand;
            const activeClasses = `bg-${brandInfo.color} text-white`;
            const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';
            const LogoComponent = brandInfo.logo;
            return (
              <button
                key={brand}
                onClick={() => onBrandSelect(brand)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
              >
                <LogoComponent className="w-5 h-5" />
                <span>{brand}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;