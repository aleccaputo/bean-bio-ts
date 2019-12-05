import type {User} from '../ducks/userDuck';
import type {Preferences} from '../ducks/preferencesDuck';

export const NEW_USER = '/welcome';
export const INITIAL_PREFERENCES = '/new-user-preferences';
export const HOME = '/';
export const NEW_COFFEE = '/new-coffee';
export const MY_COFFEES = '/my-coffees';
export const PROFILE = '/profile';

export const isNewUser = (user: User, preferences: Preferences) => {
    return !user.firstName || !user.lastName || !preferences.roastLevel || !preferences.brewMethod || !preferences.company || !preferences.origin

};