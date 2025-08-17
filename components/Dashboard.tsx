import React from 'react';
import { Plant } from '../types';
import PlantCard from './PlantCard';
import { useTranslation } from '../contexts/LanguageContext';
import EmptyGarden from './EmptyGarden';

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
        <h2 className="text-2xl font-bold text-teal-800">{t('dashboard.title')}</h2>
        <p className="text-stone-600">{t('dashboard.subtitle')}</p>
      </div>

      {plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plants.map((plant, index) => (
            <PlantCard 
              key={plant.id} 
              plant={plant} 
              onSelect={onSelectPlant}
              onWater={onWaterPlant}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      ) : (
        <EmptyGarden />
      )}
    </div>
  );
};

export default Dashboard;