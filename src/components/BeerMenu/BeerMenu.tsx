import React from 'react';
import { BeerMenuItem } from '../BeerMenuItem/BeerMenuItem';  // パスを修正
import { BeerMenuProps } from './BeerMenu.types';  // パスを修正

export const BeerMenu: React.FC<BeerMenuProps> = ({ beers }) => {
  return (
    <div className="flex flex-wrap w-screen min-h-screen bg-black">
      {beers.map((beer) => (
        <BeerMenuItem key={beer.number} {...beer} />
      ))}
    </div>
  );
};