import { useState, useEffect, useRef, useCallback } from 'react';
import { BeerMenuItemProps } from '../components/BeerMenuItem/BeerMenuItem.types';

const POLLING_INTERVAL = 30000; // 30秒ごとにポーリング

export const useBeerData = () => {
  const [beers, setBeers] = useState<BeerMenuItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousDataRef = useRef<BeerMenuItemProps[]>([]);

  const formatBeerData = useCallback((rawData: any[]): BeerMenuItemProps[] => {
    return rawData.map(item => ({
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
      sold_out: String(item.sold_out).toLowerCase() === 'true',
      is_house_beer: String(item.is_house_beer).toLowerCase() === 'true',
      switch_flag: String(item.switch_flag).toLowerCase() === 'true'
    }));
  }, []);

  const fetchBeers = useCallback(async (isInitialLoad: boolean = false) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GAS_DEPLOY_URL!);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const rawData = await response.json();
      const formattedData = formatBeerData(rawData);

      // データの差分を検出
      const hasChanges = JSON.stringify(formattedData) !== JSON.stringify(previousDataRef.current);

      if (hasChanges) {
        previousDataRef.current = formattedData;
        setBeers(formattedData);
      }

      if (isInitialLoad) {
        setLoading(false);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (isInitialLoad) {
        setError('データの取得に失敗しました');
        setLoading(false);
      }
    }
  }, [formatBeerData]);

  useEffect(() => {
    fetchBeers(true);

    const intervalId = setInterval(() => {
      fetchBeers(false);
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchBeers]);

  return {
    beers,
    loading: loading && beers.length === 0,
    error
  };
};