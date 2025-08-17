import React from 'react';
import { SparklesIcon, XCircleIcon, LeafIcon, HeartIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface UpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-stone-400 hover:text-stone-600">
          <XCircleIcon className="w-8 h-8" />
        </button>
        
        <SparklesIcon className="w-16 h-16 mx-auto text-amber-500" />
        
        <h2 className="text-2xl font-bold text-teal-800 mt-4">{t('upgradeModal.title')}</h2>
        <p className="text-stone-600 mt-2">{t('upgradeModal.subtitle')}</p>

        <ul className="text-left space-y-3 mt-6">
          <li className="flex items-start">
            <LeafIcon className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
            <span><span className="font-semibold">{t('upgradeModal.feature1Title')}</span> {t('upgradeModal.feature1Description')}</span>
          </li>
          <li className="flex items-start">
            <HeartIcon className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
            <span><span className="font-semibold">{t('upgradeModal.feature2Title')}</span> {t('upgradeModal.feature2Description')}</span>
          </li>
        </ul>

        <button 
          onClick={onUpgrade} 
          className="w-full mt-8 bg-amber-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-amber-600 transition-transform transform hover:scale-105"
        >
          {t('upgradeModal.upgradeButton')}
        </button>
        <button onClick={onClose} className="w-full mt-3 text-sm text-stone-500 hover:text-stone-700">
          {t('upgradeModal.maybeLater')}
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;