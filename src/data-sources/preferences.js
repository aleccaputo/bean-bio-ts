import type {Preferences} from '../ducks/preferencesDuck';
import db from '../db/index'

export const fetchPreferences = async (userId): Promise<Preferences> => {
    const preferences = await db.preferences.where({userId: 1}).first();
    return {
        roastLevel: (preferences || {}).roastLevel,
        origin: (preferences || {}).origin,
        company: (preferences || {}).company,
        brewMethod: (preferences || {}).brewMethod,
        userId: (preferences || {}).userId
    }
};

export const savePreferences = async (preferences: Preferences): Promise<void> => db.preferences.put(preferences);