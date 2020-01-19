import {User} from "../ducks/userDuck";
import db from '../db';

export const fetchUser = async (id: string | number): Promise<User> => {
    const dbUser = await db.table('user').get(1);
    return {
        firstName: (dbUser || {}).firstName || null,
        lastName: (dbUser || {}).lastName || null,
        state: (dbUser || {}).state || null,
        city: (dbUser || {}).city || null,
        id: 1
    }
};

export const saveUser = async (user: User): Promise<void> => {
    const dbUser = {...user, id: 1};
    return db.table('user').put(dbUser);
};