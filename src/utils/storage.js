// AsyncStorage helper functions
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@couples_widget_data';

const defaultData = {
    startDate: '2023-01-01', // Default date, user should update
    partnerName: 'Aşkım',
    song: {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v',
        albumCover: null,
    },
    specialDates: [
        { id: '1', title: 'İlk Buluşma', date: '2023-01-01', emoji: '💕' },
        { id: '2', title: 'Yıldönümü', date: '2023-01-15', emoji: '💍' },
    ],
    photo: null,
};

export const saveData = async (data) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
};

export const loadData = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        return defaultData;
    } catch (error) {
        console.error('Error loading data:', error);
        return defaultData;
    }
};

export const clearData = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
};

export { defaultData };
