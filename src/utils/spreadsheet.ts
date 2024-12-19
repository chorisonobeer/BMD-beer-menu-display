// スプレッドシートのデータを型安全に扱うための型定義
export interface SpreadsheetRow {
    number: string;
    name: string;
    name_en: string;
    brewery: string;
    location: string;
    tags: string;
    abv: string;
    ibu: string;
    pint_price: string;
    half_price: string;
    sold_out: string;
    is_house_beer: string;
    switch_flag: string;
  }
  
  // スプレッドシートのデータを整形するヘルパー関数
  export const formatSpreadsheetData = (row: SpreadsheetRow) => {
    return {
      number: parseInt(row.number),
      name: row.name,
      name_en: row.name_en,
      brewery: row.brewery,
      location: row.location,
      tags: row.tags.split(',').map(tag => tag.trim()),
      abv: parseFloat(row.abv),
      ibu: parseInt(row.ibu),
      pint_price: parseInt(row.pint_price),
      half_price: parseInt(row.half_price),
      sold_out: row.sold_out.toLowerCase() === 'true',
      is_house_beer: row.is_house_beer.toLowerCase() === 'true',
      switch_flag: row.switch_flag.toLowerCase() === 'true'
    };
  };
  
  // エラーハンドリング用のカスタムエラー
  export class SpreadsheetError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'SpreadsheetError';
    }
  }