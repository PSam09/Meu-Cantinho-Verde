import React from 'react';
import { LeafIcon, PlusIcon, HeartIcon, UsersIcon, BookOpenIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

export type View = 'dashboard' | 'add_plant' | 'plant_doctor' | 'community' | 'encyclopedia' | 'plant_detail' | 'achievements';

interface BottomNavProps {
  activeView: View;
  setView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-teal-600' : 'text-stone-500 hover:text-teal-500'}`}
    aria-label={label}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/90 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-stone-200 z-50">
      <div className="relative flex justify-around items-center h-16">
        <NavButton
          label={t('nav.garden')}
          icon={<LeafIcon className="w-6 h-6 mb-1" />}
          isActive={activeView === 'dashboard'}
          onClick={() => setView('dashboard')}
        />
        <NavButton
          label={t('nav.community')}
          icon={<UsersIcon className="w-6 h-6 mb-1" />}
          isActive={activeView === 'community'}
          onClick={() => setView('community')}
        />
        
        {/* Placeholder for the central button to maintain spacing */}
        <div className="w-full" /> 
        
        <NavButton
          label={t('nav.encyclopedia')}
          icon={<BookOpenIcon className="w-6 h-6 mb-1" />}
          isActive={activeView === 'encyclopedia'}
          onClick={() => setView('encyclopedia')}
        />
        <NavButton
          label={t('nav.doctor')}
          icon={<HeartIcon className="w-6 h-6 mb-1" />}
          isActive={activeView === 'plant_doctor'}
          onClick={() => setView('plant_doctor')}
        />

        {/* Absolutely positioned central button */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
             <button onClick={() => setView('add_plant')} className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition transform hover:scale-110" aria-label={t('nav.addPlantAriaLabel')}>
                <PlusIcon className="w-8 h-8"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;