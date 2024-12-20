import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { BeerMenuItemProps } from '../components/BeerMenuItem/BeerMenuItem.types';

export const useBeerData = () => {
  const [beers, setBeers] = useState<BeerMenuItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const beersRef = ref(database, 'beers');

    const unsubscribe = onValue(beersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          console.log('Raw data from Firebase:', data);
          const formattedData = Object.values(data).map((item: any) => ({
            number: Number(item.number) || 0,
            name: item.name || '',
            name_en: item.name_en || '',
            brewery: item.brewery || '',
            location: item.location || '',
            tags: Array.isArray(item.tags) ? item.tags : 
                  (item.tags ? item.tags.split(',').map((t: string) => t.trim()) : []),
            abv: Number(item.abv) || 0,
            ibu: Number(item.ibu) || 0,
            srm: Number(item.srm) || 0,
            imageUrl: item.imageUrl || null,
            pint_price: Number(item.pint_price) || 1500,
            half_price: Number(item.half_price) || 900,
            sold_out: String(item.sold_out).toLowerCase() === 'true',
            is_house_beer: String(item.is_house_beer).toLowerCase() === 'true',
            switch_flag: String(item.switch_flag).toLowerCase() === 'true'
          }));
          console.log('Formatted data:', formattedData);
          setBeers(formattedData);
        }
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error processing data:', err);
        setError('データの処理に失敗しました');
        setLoading(false);
      }
    }, (error) => {
      console.error('Database error:', error);
      setError('データベースの接続に失敗しました');
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { beers, loading: loading && beers.length === 0, error };
};