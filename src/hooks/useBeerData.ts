// src/hooks/useBeerData.ts
import { useState, useEffect } from 'react';
import { BeerMenuItemProps } from '../components/BeerMenuItem/BeerMenuItem.types';

// 開発用モックデータ
const mockData = [
  {
    number: 1,
    name: "かぶせ茶ホワイトエール",
    name_en: "Kabuse Tea White Ale",
    brewery: "Kyoto Beer Lab",
    location: "京都/Kyoto",
    tags: "柑橘系,フローラル,フルーティ",
    abv: 3,
    ibu: 22,
    pint_price: 1500,
    half_price: 900,
    sold_out: false,
    is_house_beer: true,
    switch_flag: false
  },
  {
    number: 2,
    name: "デフォルトアイピーエー",
    name_en: "DEFAULT IPA",
    brewery: "Kyoto Beer Lab",
    location: "京都/Kyoto",
    tags: "コーヒー,黒ビール",
    abv: 4,
    ibu: 23,
    pint_price: 1500,
    half_price: 900,
    sold_out: false,
    is_house_beer: false,
    switch_flag: false
  }
];

export const useBeerData = () => {
  const [beers, setBeers] = useState<BeerMenuItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 開発環境ではモックデータを使用
    try {
      const formattedData = mockData.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : item.tags.split(',').map(tag => tag.trim()),
        abv: Number(item.abv),
        ibu: Number(item.ibu),
        pint_price: Number(item.pint_price),
        half_price: Number(item.half_price),
        sold_out: Boolean(item.sold_out),
        is_house_beer: Boolean(item.is_house_beer),
        switch_flag: Boolean(item.switch_flag)
      }));

      setBeers(formattedData);
      setError(null);
    } catch (err) {
      console.error('Error processing beer data:', err);
      setError('Failed to fetch beer data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { beers, loading, error };
};