import type {Preferences} from '../ducks/preferencesDuck';

export const fetchPreferences = async (userId, db): Promise<Preferences> => {
    const preferences = await db.preferences.where({userId: 1}).first();
    return {
        roastLevel: (preferences || {}).roastLevel,
        origin: (preferences || {}).origin,
        company: (preferences || {}).company,
        brewMethod: (preferences || {}).brewMethod,
        userId: (preferences || {}).userId
    }
};

export const savePreferences = async (preferences: Preferences, db): Promise<void> => db.preferences.put(preferences);