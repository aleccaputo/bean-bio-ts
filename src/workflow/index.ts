import {User} from '../ducks/userDuck';
import {Preferences} from '../ducks/preferencesDuck';

export enum WorkflowTypeEnum {
    NEW_USER = '/welcome',
    INITIAL_PREFERENCES = '/new-user-preferences',
    HOME = '/',
    NEW_COFFEE = '/new-coffee',
    MY_COFFEES = '/my-coffees',
    PROFILE = '/profile'
}

export const isNewUser = (user: User, preferences: Preferences) => {
    return !user.firstName || !user.lastName || !preferences.roastLevel || !preferences.brewMethod || !preferences.company || !preferences.origin

};