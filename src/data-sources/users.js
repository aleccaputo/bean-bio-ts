import type {User} from "../ducks/userDuck";
import db from '../db/index';

export const fetchUser = async (id: string): Promise<User> => {
    const dbUser = await db.user.get(1);
    return {
        firstName: (dbUser || {}).firstName || null,
        lastName: (dbUser || {}).lastName || null
    }
};

export const saveUser = async (user: User): Promise<void> => {
    const dbUser = {...user, id: 1};
    return db.user.put(dbUser);
};