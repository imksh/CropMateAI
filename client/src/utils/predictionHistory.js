const STORAGE_KEY = "cropmateai:prediction-history";
const MAX_HISTORY_ITEMS = 25;

const readHistory = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const writeHistory = (history) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getPredictionHistory = () => readHistory();

export const recordPrediction = ({ input, result }) => {
  const entry = {
    id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
    createdAt: new Date().toISOString(),
    input,
    result,
  };

  const nextHistory = [entry, ...readHistory()].slice(0, MAX_HISTORY_ITEMS);
  writeHistory(nextHistory);
  return entry;
};

export const clearPredictionHistory = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};
