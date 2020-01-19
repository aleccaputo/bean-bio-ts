import {Coffee} from '../ducks/coffeesDuck';
import db from '../db'

export const fetchCoffees = async (userId: number): Promise<Coffee[]> => {
    const coffees = await db.table('coffees').toArray();
    return (coffees || []).map((coffee: Coffee): Coffee => ({
        id: coffee.id,
        rating: coffee.rating,
        brewMethod: coffee.brewMethod,
        flavorProfile: coffee.flavorProfile,
        otherObservations: coffee.otherObservations,
        company: coffee.company,
        name: coffee.name,
        userId: coffee.userId
    }));
};

export const saveCoffees = async (coffee: Coffee): Promise<void> => db.table('coffees').add(coffee);

export const deleteCoffee = async (coffeeId: number): Promise<void> => db.table('coffees').delete(coffeeId);