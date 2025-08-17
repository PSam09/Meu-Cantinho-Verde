export type Language = 'pt' | 'en' | 'es';

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  season: 'Summer' | 'Autumn' | 'Winter' | 'Spring';
}

export interface GrowthLogEntry {
  date: string;
  imageBase64: string;
  notes?: string;
}

export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  nickname: string;
  location: string;
  imageBase64: string; 
  carePlan: CarePlan;
  addedDate: string;
  lastWateredDate: string;
  growthLog: GrowthLogEntry[];
}

export interface CarePlan {
  wateringDays: number;
  wateringSeasonality: string;
  fertilizingMonths: number;
  fertilizingSeasonality: string;
  pruningInfo: string;
  rotatingInfo: string;
  tip: string;
}

export interface Diagnosis {
  diagnosis: string;
  treatmentPlan: string[];
}

export type AchievementID = 'FIRST_PLANT' | 'SURVIVOR' | 'GROWING_FAMILY' | 'URBAN_JUNGLE' | 'PHOTOGRAPHER';

export interface Achievement {
  id: AchievementID;
  name: string;
  description: string;
  icon: string; 
  unlocked: boolean;
}

export interface EncyclopediaPlant {
    commonName: string;
    scientificName: string;
    description: string;
    light: string;
    humidity: string;
    soil: string;
    isToxic: boolean;
    funFact: string;
}