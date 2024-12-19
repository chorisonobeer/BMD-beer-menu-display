import React, { useEffect, useMemo } from 'react';
import { BeerMenuItemProps } from './BeerMenuItem.types';  // 新しい正しいパス

export const BeerMenuItem: React.FC<BeerMenuItemProps> = React.memo(({ 
  number,
  name,
  name_en,
  brewery,
  location,
  tags,
  abv,
  ibu,
  pint_price,
  half_price,
  sold_out,
  is_house_beer
}) => {
  // 画像のプリロード
  const imageUrl = `/images/srm/${number}.png`;
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, [imageUrl]);

  // 価格のフォーマット処理をメモ化
  const formattedPintPrice = useMemo(() => 
    pint_price.toLocaleString(), [pint_price]);
  const formattedHalfPrice = useMemo(() => 
    half_price.toLocaleString(), [half_price]);

  return (
    <div className="relative w-1/2 h-[20vh] bg-beer-primary border border-gray-700 p-4 grid grid-cols-[10%_1fr_25%] gap-4">
      {sold_out && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="text-red-500 text-5xl font-bold transform -rotate-12">
            SOLD OUT
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl opacity-80">{number}</span>
        <img 
          src={imageUrl}
          alt="Beer Glass" 
          className="h-24 object-contain"
        />
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold truncate m-0">{name}</h2>
          {is_house_beer && (
            <span className="bg-beer-accent-pink px-2 py-0.5 rounded-full text-xs">
              House Beer
            </span>
          )}
        </div>
        <p className="text-sm opacity-70 truncate mt-1">{name_en}</p>
        <p className="text-sm text-green-500 truncate">
          {brewery} {location}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-beer-secondary px-2 py-0.5 rounded-full text-xs whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-70">ABV</span>
            <span className="text-beer-accent-pink font-bold">
              {abv}%
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs opacity-70">IBU</span>
            <span className="text-beer-accent-cyan font-bold">
              {ibu}
            </span>
          </div>
        </div>
        <div className="text-right text-sm">
          <div>Pint ¥{formattedPintPrice}</div>
          <div>Half ¥{formattedHalfPrice}</div>
        </div>
      </div>
    </div>
  );
});

BeerMenuItem.displayName = 'BeerMenuItem';