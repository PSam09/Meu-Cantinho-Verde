import React from 'react';
import { Plant, Achievement, AchievementID } from '../types';
import { ArrowLeftIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface AchievementsProps {
  plants: Plant[];
  onBack: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ plants, onBack }) => {
  const { t } = useTranslation();

  const allAchievements: Omit<Achievement, 'unlocked'>[] = [
    { id: 'FIRST_PLANT', name: t('achievements.FIRST_PLANT.name'), description: t('achievements.FIRST_PLANT.description'), icon: '🌱' },
    { id: 'SURVIVOR', name: t('achievements.SURVIVOR.name'), description: t('achievements.SURVIVOR.description'), icon: '💪' },
    { id: 'GROWING_FAMILY', name: t('achievements.GROWING_FAMILY.name'), description: t('achievements.GROWING_FAMILY.description'), icon: '👨‍👩‍👧‍👦' },
    { id: 'URBAN_JUNGLE', name: t('achievements.URBAN_JUNGLE.name'), description: t('achievements.URBAN_JUNGLE.description'), icon: '🌳' },
    { id: 'PHOTOGRAPHER', name: t('achievements.PHOTOGRAPHER.name'), description: t('achievements.PHOTOGRAPHER.description'), icon: '📸' },
  ];
  
  const unlockedAchievements: Set<AchievementID> = new Set();
  
  if (plants.length >= 1) unlockedAchievements.add('FIRST_PLANT');
  if (plants.length >= 5) unlockedAchievements.add('GROWING_FAMILY');
  if (plants.length >= 10) unlockedAchievements.add('URBAN_JUNGLE');

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  if (plants.some(p => new Date(p.addedDate) <= thirtyDaysAgo)) {
    unlockedAchievements.add('SURVIVOR');
  }

  if (plants.some(p => p.growthLog.length >= 3)) {
    unlockedAchievements.add('PHOTOGRAPHER');
  }

  const achievements: Achievement[] = allAchievements.map(ach => ({
    ...ach,
    unlocked: unlockedAchievements.has(ach.id),
  }));

  return (
    <div className="animate-fade-in">
        <div className="flex items-center mb-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-stone-200 mr-2">
            <ArrowLeftIcon className="w-6 h-6 text-stone-700" />
            </button>
            <div>
                <h2 className="text-2xl font-bold text-emerald-800">{t('achievements.title')}</h2>
                <p className="text-stone-600">{t('achievements.subtitle')}</p>
            </div>
      </div>
      
      <div className="space-y-3">
        {achievements.map(ach => (
          <div key={ach.id} className={`bg-white p-4 rounded-lg flex items-center space-x-4 shadow-sm transition-opacity ${ach.unlocked ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`text-4xl p-3 rounded-full ${ach.unlocked ? 'bg-amber-100' : 'bg-stone-100'}`}>
              {ach.icon}
            </div>
            <div>
              <h3 className={`font-bold ${ach.unlocked ? 'text-amber-800' : 'text-stone-700'}`}>{ach.name}</h3>
              <p className="text-sm text-stone-500">{ach.description}</p>
            </div>
            {ach.unlocked && (
              <div className={`text-4xl p-2 rounded-full ml-auto ${ach.unlocked ? 'bg-amber-400' : ''}`}>
                 🏆
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;