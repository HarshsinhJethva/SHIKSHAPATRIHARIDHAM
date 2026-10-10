export interface LastReadData {
  shlokaId: number;
  shlokaIndex: number;
  chapterId: number;
  chapterTitle: string;
  isDhyan?: boolean;
  updatedAt: number;
}

const LAST_READ_KEY = '@shikshapatri_last_read_shloka';

let inMemoryLastRead: LastReadData | null = null;

/**
 * Safely get AsyncStorage instance without throwing if native module is not linked
 */
const getAsyncStorage = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storageModule = require('@react-native-async-storage/async-storage');
    return storageModule?.default || storageModule;
  } catch (_e) {
    return null;
  }
};

/**
 * Save the last viewed shloka position
 */
export const saveLastReadShloka = async (
  data: Omit<LastReadData, 'updatedAt'>
): Promise<void> => {
  const payload: LastReadData = {
    ...data,
    updatedAt: Date.now(),
  };
  inMemoryLastRead = payload;

  try {
    const storage = getAsyncStorage();
    if (storage && typeof storage.setItem === 'function') {
      await storage.setItem(LAST_READ_KEY, JSON.stringify(payload));
    }
  } catch (_error) {
    // In-memory fallback handles state seamlessly if native module hasn't been rebuilt yet
  }
};

/**
 * Retrieve the last viewed shloka position
 */
export const getLastReadShloka = async (): Promise<LastReadData | null> => {
  try {
    const storage = getAsyncStorage();
    if (storage && typeof storage.getItem === 'function') {
      const raw = await storage.getItem(LAST_READ_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LastReadData;
        inMemoryLastRead = parsed;
        return parsed;
      }
    }
  } catch (_error) {
    // Fallback to inMemoryLastRead
  }
  return inMemoryLastRead;
};

/**
 * Clear the last viewed shloka position
 */
export const clearLastReadShloka = async (): Promise<void> => {
  inMemoryLastRead = null;
  try {
    const storage = getAsyncStorage();
    if (storage && typeof storage.removeItem === 'function') {
      await storage.removeItem(LAST_READ_KEY);
    }
  } catch (_error) {
    // Handled in-memory
  }
};

export default {
  saveLastReadShloka,
  getLastReadShloka,
  clearLastReadShloka,
};
