import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebase';

const AdminPage = () => {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URLからスプレッドシートIDを抽出する関数
  const extractSpreadsheetId = (url: string) => {
    try {
      const matches = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (matches && matches[1]) {
        setSpreadsheetId(matches[1]);
        setError(null);
      } else {
        setError('有効なスプレッドシートURLを入力してください');
      }
    } catch (err) {
      setError('URLの解析に失敗しました');
    }
  };

  // 現在の設定を読み込む
  const loadCurrentConfig = async () => {
    try {
      const configRef = ref(database, 'config');
      const snapshot = await get(configRef);
      if (snapshot.exists()) {
        const config = snapshot.val();
        setSpreadsheetId(config.spreadsheetId || '');
      }
    } catch (err) {
      console.error('Error loading config:', err);
      setError('設定の読み込みに失敗しました');
    }
  };

  // 設定を保存
  const saveConfig = async () => {
    if (!spreadsheetId.trim()) {
      setError('スプレッドシートIDを入力してください');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const configRef = ref(database, 'config');
      await set(configRef, {
        spreadsheetId: spreadsheetId.trim(),
        updatedAt: new Date().toISOString()
      });
      alert('設定を保存しました');
    } catch (err) {
      console.error('Error saving config:', err);
      setError('設定の保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントのマウント時に現在の設定を読み込む
  React.useEffect(() => {
    loadCurrentConfig();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">管理画面</h1>
        <div className="space-y-4">
          {/* URL入力フィールド */}
          <div>
            <label className="block text-sm font-medium mb-1">
              スプレッドシートURL
            </label>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => extractSpreadsheetId(e.target.value)}
              placeholder="スプレッドシートのURLを貼り付けてください"
              className="w-full p-2 border rounded mb-2 text-black"
            />
          </div>

          {/* ID入力フィールド */}
          <div>
            <label className="block text-sm font-medium mb-1">
              スプレッドシートID
            </label>
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpreadsheetId(e.target.value)}
              placeholder="スプレッドシートIDが自動で入力されます"
              className="w-full p-2 border rounded text-black"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">
              上記のURLフィールドにスプレッドシートのURLを貼り付けると、自動的にIDが抽出されます
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button 
            onClick={saveConfig} 
            disabled={loading || !spreadsheetId}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '保存中...' : '設定を保存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;