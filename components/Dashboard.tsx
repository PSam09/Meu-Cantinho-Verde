import React from 'react';
import { Plant } from '../types';
import PlantCard from './PlantCard';
import { LeafIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface DashboardProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onWaterPlant: (plantId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plants, onSelectPlant, onWaterPlant }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-800">{t('dashboard.title')}</h2>
        <p className="text-stone-600">{t('dashboard.subtitle')}</p>
      </div>

      {plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plants.map(plant => (
            <PlantCard 
              key={plant.id} 
              plant={plant} 
              onSelect={onSelectPlant}
              onWater={onWaterPlant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm border border-dashed border-stone-300">
          <LeafIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-stone-700">{t('dashboard.emptyStateTitle')}</h3>
          <p className="text-stone-500 mt-1">{t('dashboard.emptyStateSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;