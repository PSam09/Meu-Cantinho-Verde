import React, { useState, useRef } from 'react';
import { diagnosePlantProblem } from '../services/geminiService';
import { Diagnosis, WeatherData } from '../types';
import Spinner from './Spinner';
import { CameraIcon, SparklesIcon, XCircleIcon, HeartIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface PlantDoctorProps {
  userPlan: 'free' | 'pro';
  onUpgrade: () => void;
  weatherData: WeatherData | null;
}

const PlantDoctor: React.FC<PlantDoctorProps> = ({ userPlan, onUpgrade, weatherData }) => {
  const { t, language } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDiagnosis(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDiagnose = async () => {
    if (!imageBase64 || !imageFile) return;
    setIsLoading(true);
    setError(null);
    setDiagnosis(null);
    try {
      const result = await diagnosePlantProblem(imageBase64, imageFile.type, language, weatherData);
      setDiagnosis(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setImageFile(null);
    setImageBase64('');
    setDiagnosis(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  if (userPlan === 'free') {
    return (
        <div className="space-y-6 text-center">
            <div>
                <h2 className="text-2xl font-bold text-emerald-800">{t('plantDoctor.title')}</h2>
                <p className="text-stone-600">{t('plantDoctor.proFeature')}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-dashed border-stone-300 p-8">
                <HeartIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-stone-700">{t('plantDoctor.upgradeTitle')}</h3>
                <p className="text-stone-500 mt-2">{t('plantDoctor.upgradeSubtitle')}</p>
                <button onClick={onUpgrade} className="mt-6 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors">
                    {t('plantDoctor.upgradeButton')}
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-800">{t('plantDoctor.title')}</h2>
        <p className="text-stone-600">{t('plantDoctor.subtitle')}</p>
      </div>

      <div className="bg-stone-100 p-6 rounded-xl shadow-md">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">{t('common.oops')} </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}><XCircleIcon className="w-6 h-6 text-red-500 cursor-pointer"/></span>
        </div>}

        <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="w-full h-48 bg-white border-2 border-dashed border-emerald-400 rounded-xl flex flex-col justify-center items-center text-emerald-600 hover:bg-emerald-50 transition mb-4">
          {imageBase64 ? <img src={`data:${imageFile?.type};base64,${imageBase64}`} alt="preview" className="w-full h-full object-cover rounded-xl" /> : <><CameraIcon className="w-12 h-12 mb-2" /><span className="font-semibold">{t('plantDoctor.uploadButton')}</span></>}
        </button>

        {imageBase64 && !diagnosis && (
            <div className="flex space-x-2">
                <button onClick={reset} className="w-1/3 bg-stone-200 text-stone-700 font-bold py-3 px-4 rounded-lg hover:bg-stone-300 transition">{t('common.cancel')}</button>
                <button onClick={handleDiagnose} disabled={isLoading || !imageBase64} className="w-2/3 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition disabled:bg-stone-400 flex items-center justify-center">
                    {isLoading ? <Spinner/> : <><SparklesIcon className="w-5 h-5 mr-2"/>{t('plantDoctor.diagnoseButton')}</>}
                </button>
            </div>
        )}

        {isLoading && !diagnosis && (
          <div className="text-center py-8">
            <Spinner />
            <p className="mt-4 text-stone-600 font-semibold animate-pulse">{t('plantDoctor.loading')}</p>
          </div>
        )}

        {diagnosis && (
          <div className="bg-white p-4 rounded-lg mt-4 animate-fade-in">
            <h3 className="text-xl font-bold text-emerald-800">{t('plantDoctor.diagnosisResult')}</h3>
            <p className="bg-emerald-100/70 p-3 rounded-md mt-2 text-emerald-900 font-semibold">{diagnosis.diagnosis}</p>
            
            <h3 className="text-xl font-bold text-emerald-800 mt-4">{t('plantDoctor.treatmentPlan')}</h3>
            <ul className="list-decimal list-inside space-y-2 mt-2 text-stone-700">
              {diagnosis.treatmentPlan.map((step, index) => (
                <li key={index} className="p-2 bg-stone-50 rounded">{step}</li>
              ))}
            </ul>
            <button onClick={reset} className="w-full mt-6 bg-stone-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-stone-600 transition">
                {t('plantDoctor.anotherDiagnosisButton')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDoctor;