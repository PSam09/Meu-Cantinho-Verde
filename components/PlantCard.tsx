import React from 'react';
import { Plant } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
  onWater: (plantId: string) => void;
}

const getNextWateringDays = (plant: Plant): number => {
    const lastWatered = new Date(plant.lastWateredDate);
    const today = new Date();
    const diffTime = today.getTime() - lastWatered.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const daysUntilNextWatering = Math.max(0, plant.carePlan.wateringDays - diffDays);
    return daysUntilNextWatering;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, onSelect, onWater }) => {
    const { t } = useTranslation();
    const daysUntilWatering = getNextWateringDays(plant);

    const handleWaterClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onWater(plant.id);
    };

  return (
    <div onClick={() => onSelect(plant)} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group">
      <div className="relative">
        <img className="w-full h-40 object-cover" src={plant.imageBase64} alt={plant.nickname} />
        <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full">{plant.location}</div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-emerald-900">{plant.nickname}</h3>
        <p className="text-sm text-stone-500 italic truncate group-hover:whitespace-normal">{plant.commonName}</p>
        <div className="mt-4 flex items-center justify-between space-x-2">
            <div className="bg-emerald-100/70 rounded-lg p-3 text-center flex-grow">
                <p className="text-sm font-semibold text-emerald-800">{t('plantCard.nextWatering')}</p>
                <p className="text-2xl font-bold text-emerald-600">{daysUntilWatering} {daysUntilWatering === 1 ? t('plantCard.day') : t('plantCard.days')}</p>
            </div>
            <button onClick={handleWaterClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition-colors h-full flex flex-col items-center justify-center">
                <span className="text-2xl">💧</span>
                <span className="text-xs mt-1">{t('plantCard.water')}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;