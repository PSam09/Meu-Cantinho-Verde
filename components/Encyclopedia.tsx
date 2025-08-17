import React, { useState } from 'react';
import { getEncyclopediaPlantDetails } from '../services/geminiService';
import { EncyclopediaPlant } from '../types';
import Spinner from './Spinner';
import { XCircleIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';
import EmptyEncyclopedia from './EmptyEncyclopedia';

const Encyclopedia: React.FC = () => {
  const { t, language } = useTranslation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plantData, setPlantData] = useState<EncyclopediaPlant | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setIsLoading(true);
    setError(null);
    setPlantData(null);
    try {
      const result = await getEncyclopediaPlantDetails(query, language);
      setPlantData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPlantData = () => {
    if (!plantData) return null;
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 animate-fade-in">
        <h3 className="text-2xl font-bold text-teal-800">{plantData.commonName}</h3>
        <p className="italic text-stone-500 mb-4">{plantData.scientificName}</p>
        
        <p className="text-stone-700 mb-4">{plantData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div className="bg-stone-100 p-3 rounded-lg"><strong>☀️ {t('encyclopedia.light')}:</strong> {plantData.light}</div>
            <div className="bg-stone-100 p-3 rounded-lg"><strong>💧 {t('encyclopedia.humidity')}:</strong> {plantData.humidity}</div>
            <div className="bg-stone-100 p-3 rounded-lg"><strong>🪴 {t('encyclopedia.soil')}:</strong> {plantData.soil}</div>
            <div className={`${plantData.isToxic ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} p-3 rounded-lg`}>
                <strong>☠️ {t('encyclopedia.toxicity')}:</strong> {plantData.isToxic ? t('encyclopedia.toxic') : t('encyclopedia.notToxic')}
            </div>
        </div>
        
        <div className="bg-teal-50 p-3 rounded-lg">
            <p className="font-semibold text-teal-900">🤓 {t('encyclopedia.funFact')}:</p>
            <p className="text-teal-800 text-sm">{plantData.funFact}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-teal-800">{t('encyclopedia.title')}</h2>
        <p className="text-stone-600">{t('encyclopedia.subtitle')}</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('encyclopedia.searchPlaceholder')}
          className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
        <button type="submit" disabled={isLoading} className="bg-teal-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-teal-700 transition disabled:bg-stone-400">
          {isLoading ? '...' : t('common.search')}
        </button>
      </form>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">{t('common.oops')} </strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}><XCircleIcon className="w-6 h-6 text-red-500 cursor-pointer"/></span>
      </div>}
      
      {isLoading && <div className="text-center py-8"><Spinner /></div>}

      {!isLoading && !plantData && !error && (
        <EmptyEncyclopedia />
      )}
      
      {renderPlantData()}
    </div>
  );
};

export default Encyclopedia;