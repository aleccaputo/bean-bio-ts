// @flow
import Dexie from "dexie";

const db = new Dexie('beanBio');

db.version(1).stores({
    user: 'id, firstName, lastName',
    preferences: 'userId, roastLevel, brewMethod, origin, company',
    coffees: '++id, userId, name, brewMethod, flavorProfile, rating, otherObservations, company'
});

export type BeanBioSchema = {
    user: Object,
    preferences: Object,
    coffees: Object
};
export default db;