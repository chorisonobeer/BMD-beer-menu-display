import React from 'react';
import { BeerMenuItem } from '../BeerMenuItem/BeerMenuItem';
import { BeerMenuProps } from './BeerMenu.types';

export const BeerMenu: React.FC<BeerMenuProps> = ({ beers }) => {
  // beersを左右の列に分割（番号に基づいて）
  const leftColumnBeers = beers.filter(beer => beer.number <= 5);
  const rightColumnBeers = beers.filter(beer => beer.number > 5);

  return (
    <div className="grid grid-cols-2 bg-beer-bg w-full">
      {/* 左列 - 1から5 */}
      <div className="flex flex-col">
        {leftColumnBeers.map((beer) => (
          <div key={beer.number} className="h-[20vh]">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
      {/* 右列 - 6から10 */}
      <div className="flex flex-col">
        {rightColumnBeers.map((beer) => (
          <div key={beer.number} className="h-[20vh]">
            <BeerMenuItem {...beer} />
          </div>
        ))}
      </div>
    </div>
  );
};