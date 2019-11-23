import type {User} from "../ducks/userDuck";

export const fetchUser = async (id: string, db: any): Promise<User> => {
    const dbUser = await db.user.get(1);
    return {
        firstName: (dbUser || {}).firstName || null,
        lastName: (dbUser || {}).lastName || null
    }
};

export const saveUser = async (user: User, db: any): Promise<void> => {
    const dbUser = {...user, id: 1};
    return db.user.put(dbUser);
};