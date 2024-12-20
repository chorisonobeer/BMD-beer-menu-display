import React from 'react';
import { BeerMenuItem } from '../BeerMenuItem/BeerMenuItem';
import { BeerMenuProps } from './BeerMenu.types';

export const BeerMenu: React.FC<BeerMenuProps> = ({ beers }) => {
  const leftColumnBeers = beers.filter(beer => beer.number <= 5);
  const rightColumnBeers = beers.filter(beer => beer.number > 5);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* モバイルでは1列、タブレット以上で2列 */}
      <div className="w-full md:w-1/2 flex flex-col">
        {leftColumnBeers.map((beer) => (
          <div key={beer.number} className="flex-1 min-h-0">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        {rightColumnBeers.map((beer) => (
          <div key={beer.number} className="flex-1 min-h-0">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
    </div>
  );
};