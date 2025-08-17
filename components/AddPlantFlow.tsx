import React, { useState, useRef } from 'react';
import { identifyPlant, generateCarePlan } from '../services/geminiService';
import { CarePlan, Plant, WeatherData } from '../types';
import Spinner from './Spinner';
import { CameraIcon, SparklesIcon, XCircleIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface AddPlantFlowProps {
  onPlantAdded: (plant: Plant) => void;
  plantCount: number;
  userPlan: 'free' | 'pro';
  onUpgrade: () => void;
  weatherData: WeatherData | null;
}

const AddPlantFlow: React.FC<AddPlantFlowProps> = ({ onPlantAdded, plantCount, userPlan, onUpgrade, weatherData }) => {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  
  const [identifiedPlant, setIdentifiedPlant] = useState<{ commonName: string, scientificName: string } | null>(null);
  const [plantDetails, setPlantDetails] = useState({ nickname: '', location: '' });
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!imageBase64 || !imageFile) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await identifyPlant(imageBase64, imageFile.type, language);
      setIdentifiedPlant(result);
      setPlantDetails({ nickname: result.commonName, location: '' });
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!identifiedPlant || !plantDetails.nickname || !plantDetails.location) {
      setError(t('addPlantFlow.errorFillFields'));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateCarePlan(identifiedPlant.scientificName, plantDetails.location, language, weatherData);
      setCarePlan(plan);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToGarden = () => {
    if (userPlan === 'free' && plantCount >= 3) {
      onUpgrade();
      return;
    }
    if (!identifiedPlant || !carePlan) return;
    const now = new Date().toISOString();
    const newPlant: Plant = {
      id: now,
      commonName: identifiedPlant.commonName,
      scientificName: identifiedPlant.scientificName,
      nickname: plantDetails.nickname,
      location: plantDetails.location,
      imageBase64: `data:${imageFile?.type};base64,${imageBase64}`,
      carePlan,
      addedDate: now,
      lastWateredDate: now,
      growthLog: [],
    };
    onPlantAdded(newPlant);
    resetFlow();
  };

  const resetFlow = () => {
    setStep(1);
    setIsLoading(false);
    setError(null);
    setImageFile(null);
    setImageBase64('');
    setIdentifiedPlant(null);
    setPlantDetails({ nickname: '', location: '' });
    setCarePlan(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{t('addPlantFlow.step1.title')}</h2>
            <p className="text-stone-600 mb-6">{t('addPlantFlow.step1.subtitle')}</p>
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="w-full h-48 bg-white border-2 border-dashed border-emerald-400 rounded-xl flex flex-col justify-center items-center text-emerald-600 hover:bg-emerald-50 transition">
              {imageBase64 ? <img src={`data:${imageFile?.type};base64,${imageBase64}`} alt="preview" className="w-full h-full object-cover rounded-xl" /> : <><CameraIcon className="w-12 h-12 mb-2" /><span className="font-semibold">{t('addPlantFlow.step1.uploadButton')}</span></>}
            </button>
            {imageBase64 && (
                <div className="mt-4 flex space-x-2">
                    <button onClick={resetFlow} className="w-1/3 bg-stone-200 text-stone-700 font-bold py-3 px-4 rounded-lg hover:bg-stone-300 transition">{t('common.change')}</button>
                    <button onClick={handleIdentify} disabled={isLoading || !imageBase64} className="w-2/3 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition disabled:bg-stone-400 flex items-center justify-center">
                        {isLoading ? <Spinner/> : <><SparklesIcon className="w-5 h-5 mr-2"/> {t('addPlantFlow.step1.identifyButton')}</>}
                    </button>
                </div>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-1">{t('addPlantFlow.step2.title')}</h2>
            <p className="text-stone-600 mb-6">{t('addPlantFlow.step2.subtitle')}</p>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="font-bold text-lg">{identifiedPlant?.commonName}</p>
              <p className="text-sm italic text-stone-500">{identifiedPlant?.scientificName}</p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder={t('addPlantFlow.step2.nicknamePlaceholder')} value={plantDetails.nickname} onChange={(e) => setPlantDetails(prev => ({...prev, nickname: e.target.value}))} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input type="text" placeholder={t('addPlantFlow.step2.locationPlaceholder')} value={plantDetails.location} onChange={(e) => setPlantDetails(prev => ({...prev, location: e.target.value}))} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <button onClick={handleGeneratePlan} disabled={isLoading} className="w-full mt-6 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition disabled:bg-stone-400">
              {isLoading ? <Spinner/> : t('addPlantFlow.step2.generatePlanButton')}
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-1">{t('addPlantFlow.step3.title')}</h2>
            <p className="text-stone-600 mb-6" dangerouslySetInnerHTML={{ __html: t('addPlantFlow.step3.subtitle', { nickname: `<span class="font-bold">${plantDetails.nickname}</span>` }) }} />
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-stone-700">💧 {t('addPlantFlow.step3.watering')}:</span>
                <span className="font-bold text-lg text-emerald-700">{carePlan?.wateringDays} {t('addPlantFlow.step3.days')}</span>
              </div>
              <p className="text-xs text-stone-500 -mt-2">{carePlan?.wateringSeasonality}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-stone-700">🌱 {t('addPlantFlow.step3.fertilizing')}:</span>
                <span className="font-bold text-lg text-emerald-700">{carePlan?.fertilizingMonths} {t('addPlantFlow.step3.months')}</span>
              </div>
               <div className="pt-2 border-t">
                <p className="font-semibold text-stone-700">{t('addPlantFlow.step3.proTip')}:</p>
                <p className="text-stone-600 text-sm">{carePlan?.tip}</p>
              </div>
            </div>
            <button onClick={handleAddToGarden} className="w-full mt-6 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition">
              {t('addPlantFlow.step3.addToGardenButton')}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-stone-100 p-6 rounded-xl shadow-md">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
        <strong className="font-bold">{t('common.oops')} </strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}><XCircleIcon className="w-6 h-6 text-red-500 cursor-pointer"/></span>
      </div>}
      {renderStep()}
    </div>
  );
};

export default AddPlantFlow;