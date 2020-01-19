import {Preferences} from '../ducks/preferencesDuck';
import db from '../db'

export const fetchPreferences = async (userId: number): Promise<Preferences> => {
    const preferences = await db.table('preferences').where({userId: 1}).first();
    return {
        roastLevel: (preferences || {}).roastLevel,
        origin: (preferences || {}).origin,
        company: (preferences || {}).company,
        brewMethod: (preferences || {}).brewMethod,
        userId: (preferences || {}).userId
    }
};

export const savePreferences = async (preferences: Preferences): Promise<void> => db.table('preferences').put(preferences);