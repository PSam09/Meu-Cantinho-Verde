import React, { useRef } from 'react';
import { Plant, GrowthLogEntry } from '../types';
import { ArrowLeftIcon, CameraIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
  onUpdatePlant: (plant: Plant) => void;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant, onBack, onUpdatePlant }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newLogEntry: GrowthLogEntry = {
        date: new Date().toISOString(),
        imageBase64: reader.result as string,
      };
      const updatedPlant = {
        ...plant,
        growthLog: [newLogEntry, ...plant.growthLog],
      };
      onUpdatePlant(updatedPlant);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-stone-200 mr-2">
          <ArrowLeftIcon className="w-6 h-6 text-stone-700" />
        </button>
        <div>
            <h2 className="text-2xl font-bold text-teal-800">{plant.nickname}</h2>
            <p className="text-stone-600 italic">{plant.commonName}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <img className="w-full h-48 object-cover" src={plant.imageBase64} alt={plant.nickname} />
        <div className="p-4">
            <h3 className="font-bold text-lg mb-2 text-teal-900">{t('plantDetail.carePlanTitle')}</h3>
            <div className="space-y-3 text-sm">
                <p><strong>💧 {t('plantDetail.watering')}:</strong> {t('plantDetail.every')} {plant.carePlan.wateringDays} {t('plantDetail.days')}. <span className="text-stone-500">{plant.carePlan.wateringSeasonality}.</span></p>
                <p><strong>🌱 {t('plantDetail.fertilizing')}:</strong> {t('plantDetail.every')} {plant.carePlan.fertilizingMonths} {t('plantDetail.months')}. <span className="text-stone-500">{plant.carePlan.fertilizingSeasonality}.</span></p>
                <p><strong>✂️ {t('plantDetail.pruning')}:</strong> {plant.carePlan.pruningInfo}</p>
                <p><strong>🔄 {t('plantDetail.rotating')}:</strong> {plant.carePlan.rotatingInfo}</p>
                <p><strong>✨ {t('plantDetail.tip')}:</strong> {plant.carePlan.tip}</p>
            </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-bold text-lg mb-4 text-teal-900">{t('plantDetail.growthLogTitle')}</h3>
        <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleAddPhoto} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition flex items-center justify-center mb-4">
            <CameraIcon className="w-5 h-5 mr-2" /> {t('plantDetail.addPhotoButton')}
        </button>

        {plant.growthLog.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {plant.growthLog.map(entry => (
              <div key={entry.date} className="relative rounded-lg overflow-hidden aspect-square">
                <img src={entry.imageBase64} alt={`Log em ${entry.date}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-stone-500 py-4">{t('plantDetail.emptyLog')}</p>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;