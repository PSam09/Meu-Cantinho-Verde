import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const EmptyEncyclopedia: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-12 px-4 bg-teal-50/50 rounded-2xl border-2 border-dashed border-teal-200/80">
      <div className="inline-block">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H12" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 19.5V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H13C13.5304 5 14.0391 5.21071 14.4142 5.58579C14.7893 5.96086 15 6.46957 15 7V17" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 17C15 17 18 17 18 14C18 11 15 11.5 15 11.5" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 14C19.5 14 20 12.5 20 11.5C20 10.5 19.5 9 18 9C16.5 9 15.5 10 15.5 11" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-teal-800 mt-4">{t('encyclopedia.emptyStateTitle')}</h3>
      <p className="text-stone-500 mt-1">{t('encyclopedia.emptyStateSubtitle')}</p>
    </div>
  );
};

export default EmptyEncyclopedia;
