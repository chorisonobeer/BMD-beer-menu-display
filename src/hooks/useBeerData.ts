import { useState, useEffect } from 'react';
import { BeerMenuItemProps } from '../components/BeerMenuItem/BeerMenuItem.types';

export const useBeerData = () => {
  const [beers, setBeers] = useState<BeerMenuItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        console.log('Fetching beers...');
        const response = await fetch(process.env.NEXT_PUBLIC_GAS_DEPLOY_URL!);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Raw data:', data);

        // データの整形と初期値の設定
        const formattedData = data.map((item: any) => ({
          number: Number(item.number) || 0,
          name: item.name || '',
          name_en: item.name_en || '',
          brewery: item.brewery || '',
          location: item.location || '',
          tags: item.tags ? item.tags.split(',').map((t: string) => t.trim()) : [],
          abv: Number(item.abv) || 0,
          ibu: Number(item.ibu) || 0,
          pint_price: Number(item.pint_price) || 1500,
          half_price: Number(item.half_price) || 900,
          sold_out: item.sold_out === 'TRUE',
          is_house_beer: item.is_house_beer === 'TRUE',
          switch_flag: item.switch_flag === 'TRUE',
          active: item.active !== 'FALSE'  // デフォルトでtrue
        }));

        console.log('Formatted data:', formattedData);
        setBeers(formattedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  return { beers, loading, error };
};