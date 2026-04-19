import { STORAGE_KEY } from '../constants/config';

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures in private mode
  }
};

export const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};
