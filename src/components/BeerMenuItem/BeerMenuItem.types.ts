export interface BeerMenuItemProps {
  number: number;
  name: string;
  name_en: string;
  brewery: string;
  location: string;
  tags: string[];
  abv: number;
  ibu: number;
  srm: number;
  imageUrl?: string;
  pint_price: number;
  half_price: number;
  sold_out: boolean;
  is_house_beer: boolean;
  switch_flag: boolean;
}