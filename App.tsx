import React, { useState, useCallback, useEffect } from 'react';
import { Plant, WeatherData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import BottomNav, { View } from './components/BottomNav';
import Dashboard from './components/Dashboard';
import AddPlantFlow from './components/AddPlantFlow';
import PlantDoctor from './components/PlantDoctor';
import { LeafIcon, TrophyIcon, SparklesIcon, LocationMarkerIcon } from './components/icons';
import UpgradeModal from './components/UpgradeModal';
import PlantDetail from './components/PlantDetail';
import Encyclopedia from './components/Encyclopedia';
import Community from './components/Community';
import Achievements from './components/Achievements';
import { useTranslation } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

const getSeason = (date: Date): 'Summer' | 'Autumn' | 'Winter' | 'Spring' => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Autumn';
  if (month >= 5 && month <= 7) return 'Winter';
  if (month >= 8 && month <= 10) return 'Spring';
  return 'Summer';
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [plants, setPlants] = useLocalStorage<Plant[]>('plants', []);
  const [userPlan, setUserPlan] = useLocalStorage<'free' | 'pro'>('userPlan', 'free');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use position.coords.latitude and position.coords.longitude
          // to call a real weather API. Here, we'll simulate it.
          const mockWeatherData: WeatherData = {
            city: "São Paulo",
            temperature: 22,
            humidity: 75,
            season: getSeason(new Date()),
          };
          setWeatherData(mockWeatherData);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
          // Handle error or do nothing
        }
      );
    }
  }, []);

  const updatePlant = useCallback((updatedPlant: Plant) => {
    setPlants(prevPlants => prevPlants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
  }, [setPlants]);

  const addPlant = useCallback((plant: Plant) => {
    setPlants(prevPlants => [...prevPlants, plant]);
    setView('dashboard');
  }, [setPlants]);
  
  const handleWaterPlant = useCallback((plantId: string) => {
    setPlants(prevPlants => prevPlants.map(p => p.id === plantId ? { ...p, lastWateredDate: new Date().toISOString() } : p));
  }, [setPlants]);

  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setView('plant_detail');
  };

  const handleBackToDashboard = () => {
    setSelectedPlant(null);
    setView('dashboard');
  };

  const renderHeader = () => (
    <header className="p-4 flex items-center justify-between bg-stone-50/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <LeafIcon className="w-8 h-8 text-teal-600" />
        <div>
            <h1 className="text-2xl font-bold text-teal-800 leading-tight">{t('header.title')}</h1>
            {weatherData && (
                <div className="flex items-center text-xs text-stone-500">
                    <LocationMarkerIcon className="w-3 h-3 mr-1" />
                    <span>{weatherData.city} {weatherData.temperature}°C</span>
                </div>
            )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
         {userPlan === 'free' && (
            <button onClick={() => setShowUpgradeModal(true)} className="flex items-center text-xs font-bold bg-amber-400 text-amber-900 px-3 py-2 rounded-lg hover:bg-amber-500 transition-colors">
              <SparklesIcon className="w-4 h-4 mr-1"/>
              <span>{t('header.upgrade')}</span>
            </button>
        )}
         <button onClick={() => setView('achievements')} className="p-2 rounded-full hover:bg-stone-200 transition-colors" aria-label={t('header.achievementsAriaLabel')}>
            <TrophyIcon className="w-6 h-6 text-amber-600" />
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );

  const renderView = () => {
    switch (view) {
      case 'add_plant':
        return <AddPlantFlow onPlantAdded={addPlant} plantCount={plants.length} userPlan={userPlan} onUpgrade={() => setShowUpgradeModal(true)} weatherData={weatherData} />;
      case 'plant_doctor':
        return <PlantDoctor userPlan={userPlan} onUpgrade={() => setShowUpgradeModal(true)} weatherData={weatherData} />;
      case 'plant_detail':
        return selectedPlant ? <PlantDetail plant={selectedPlant} onUpdatePlant={updatePlant} onBack={handleBackToDashboard} /> : <Dashboard plants={plants} onSelectPlant={handleSelectPlant} onWaterPlant={handleWaterPlant} />;
      case 'encyclopedia':
        return <Encyclopedia />;
      case 'community':
        return <Community />;
      case 'achievements':
        return <Achievements plants={plants} onBack={() => setView('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard plants={plants} onSelectPlant={handleSelectPlant} onWaterPlant={handleWaterPlant} />;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800">
      <div className="max-w-lg mx-auto pb-28">
        {renderHeader()}
        <main className="p-4">
          {renderView()}
        </main>
      </div>
      <BottomNav activeView={view} setView={setView} />
      {showUpgradeModal && <UpgradeModal onUpgrade={() => {setUserPlan('pro'); setShowUpgradeModal(false)}} onClose={() => setShowUpgradeModal(false)} />}
    </div>
  );
};

export default App;