import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const EmptyGarden: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-12 px-4 bg-teal-50/50 rounded-2xl border-2 border-dashed border-teal-200/80">
      <div className="inline-block">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.25 18.25H6.75C6.33579 18.25 6 17.9142 6 17.5V16C6 14.8954 6.89543 14 8 14H16C17.1046 14 18 14.8954 18 16V17.5C18 17.9142 17.6642 18.25 17.25 18.25Z" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14V11.5" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11.5C13.5 11.5 15 10.5 15 8.5C15 6.5 12 3.5 12 3.5C12 3.5 9 6.5 9 8.5C9 10.5 10.5 11.5 12 11.5Z" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-teal-800 mt-4">{t('dashboard.emptyStateTitle')}</h3>
      <p className="text-stone-500 mt-1">{t('dashboard.emptyStateSubtitle')}</p>
    </div>
  );
};

export default EmptyGarden;
