import { ProfileData } from '../types';
import { DEFAULT_PROFILE } from '../constants';

const STORAGE_KEY = 'nafeesath_portfolio_data';

export const saveProfile = (data: ProfileData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
};

export const loadProfile = (): ProfileData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load from local storage", error);
  }
  return DEFAULT_PROFILE;
};

export const resetProfile = (): ProfileData => {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_PROFILE;
};