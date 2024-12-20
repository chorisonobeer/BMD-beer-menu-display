import React from 'react';
import { BeerMenuItem } from '../BeerMenuItem/BeerMenuItem';
import { BeerMenuProps } from './BeerMenu.types';

export const BeerMenu: React.FC<BeerMenuProps> = ({ beers }) => {
  const leftColumnBeers = beers.filter(beer => beer.number <= 5);
  const rightColumnBeers = beers.filter(beer => beer.number > 5);

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col">
        {leftColumnBeers.map((beer) => (
          <div key={beer.number} className="flex-1">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col">
        {rightColumnBeers.map((beer) => (
          <div key={beer.number} className="flex-1">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
    </div>
  );
};