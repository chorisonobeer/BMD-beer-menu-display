import React from 'react';
import { BeerMenuItemProps } from './BeerMenuItem.types';

export const BeerMenuItem: React.FC<BeerMenuItemProps> = ({
  number,
  name,
  name_en,
  brewery,
  location,
  tags,
  abv,
  ibu,
  srm,
  imageUrl,
  pint_price,
  half_price,
  sold_out,
  is_house_beer
}) => {
  const defaultImagePath = `/images/srm/${number}.png`;

  return (
    <div className={`relative w-full h-full bg-gradient-to-b from-beer-card to-black border-b border-r border-beer-border p-4
      ${sold_out ? 'opacity-75' : ''}`}>
      {sold_out && (
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/40 flex items-center justify-center">
          <div className="text-red-500 text-4xl md:text-5xl font-bold transform -rotate-12 drop-shadow-lg">
            SOLD OUT
          </div>
        </div>
      )}

      <div className={`h-full flex ${sold_out ? 'filter saturate-50' : ''}`}>
        <div className="absolute top-0 left-2">
          <span className="text-white text-[min(4vw,2.5rem)] font-bold">
            {number}
          </span>
          {is_house_beer && (
            <span className="bg-beer-accent-pink/85 px-1.5 py-0.5 rounded-full text-[10px] whitespace-nowrap ml-2">
              House Beer
            </span>
          )}
        </div>

        <div className="w-[8%] sm:w-[12%] md:w-[10%] flex flex-col justify-end">
          <div className="flex flex-col justify-end h-[70%]">
          <img
              src={imageUrl || defaultImagePath}
              alt={`Beer Glass ${number}`}
              className="w-[85%] max-h-[70px] object-contain object-bottom mx-auto"
              onError={(e) => {
                console.log('Image load error, falling back to default image');
                const img = e.target as HTMLImageElement;
                img.src = defaultImagePath;
              }}
            />
          </div>
        </div>

        <div className="flex-1 ml-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 truncate">
              {name}
            </h2>
            <p className="text-sm text-gray-400 truncate">{name_en}</p>
            <p className="text-sm text-emerald-500 truncate">{brewery} {location}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 border border-white/20 px-2 py-0.5 rounded-lg text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-[25%] sm:w-[30%] md:w-[28%] flex flex-col justify-between items-end">
          <div className="flex gap-4 sm:gap-2 md:gap-3 lg:gap-6">
            <div className="text-center">
              <div className="text-beer-accent-pink text-sm leading-none mb-0.5">ABV</div>
              <div className="text-beer-accent-pink leading-none">
                <span className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl">{abv}</span>
                <span className="text-sm">%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-beer-accent-cyan text-sm leading-none mb-0.5">IBU</div>
              <div className="text-beer-accent-cyan font-bold text-xl sm:text-lg md:text-xl lg:text-2xl leading-none">
                {ibu}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-[3.5rem_4.5rem] sm:grid-cols-[3rem_4rem] md:grid-cols-[3.5rem_4.5rem] gap-y-0.5">
            <div className="text-sm text-left">Pint</div>
            <div className="text-lg sm:text-base md:text-lg lg:text-xl font-medium text-right">
              ¥{pint_price.toLocaleString()}
            </div>
            <div className="text-sm text-left">Half</div>
            <div className="text-lg sm:text-base md:text-lg lg:text-xl font-medium text-right">
              ¥{half_price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};