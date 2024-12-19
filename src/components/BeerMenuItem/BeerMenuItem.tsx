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
  pint_price,
  half_price,
  sold_out,
  is_house_beer
}) => {
  return (
    <div className="relative bg-gradient-to-b from-beer-card to-black border-b border-r border-beer-border h-[20vh] p-5">
      {sold_out && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="text-red-500 text-5xl font-bold transform -rotate-12">
            SOLD OUT
          </div>
        </div>
      )}

      {/* 番号を左上に配置 */}
      <div className="absolute top-1.5 left-2">
        <span className="text-white text-[3vmin] lg:text-[3.5vmin] font-bold">{number}</span>
      </div>

      <div className="h-full flex">
        {/* 左側：グラス画像 */}
        <div className="w-[8%] flex flex-col justify-end">
          <div className="flex flex-col justify-end h-[70%]">
            <img
              src={`/images/srm/${number}.png`}
              alt="Beer Glass"
              className="w-[85%] object-contain object-bottom mx-auto"
            />
          </div>
        </div>

        {/* 中央：ビール情報 */}
        <div className="flex-1 ml-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2 mb-1">
              {name}
              {is_house_beer && (
                <span className="bg-beer-accent-pink px-2 py-0.5 rounded-full text-xs">
                  House Beer
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-400">{name_en}</p>
            <p className="text-sm text-emerald-500">{brewery} {location}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 右側：スペックと価格 */}
        <div className="w-[25%] flex flex-col justify-between items-end">
          {/* ABVとIBUを上寄せで横並びに */}
          <div className="flex gap-6 self-start">
            <div className="text-center">
              <div className="text-beer-accent-pink text-sm leading-none mb-0.5">ABV</div>
              <div className="text-beer-accent-pink leading-none">
                <span className="font-bold text-xl md:text-2xl lg:text-3xl">{abv}</span>
                <span className="text-sm">%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-beer-accent-cyan text-sm leading-none mb-0.5">IBU</div>
              <div className="text-beer-accent-cyan font-bold text-xl md:text-2xl lg:text-3xl leading-none">
                {ibu}
              </div>
            </div>
          </div>
          
          {/* 価格 - 下寄せグリッド */}
          <div className="grid grid-cols-[4rem_5.5rem] gap-y-0.5 self-end">
            <div className="text-sm text-left">Pint</div>
            <div className="text-lg md:text-xl lg:text-2xl font-medium text-right">
              ¥{pint_price.toLocaleString()}
            </div>
            <div className="text-sm text-left">Half</div>
            <div className="text-lg md:text-xl lg:text-2xl font-medium text-right">
              ¥{half_price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};