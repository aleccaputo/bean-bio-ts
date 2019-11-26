import type {Coffee} from '../ducks/coffeesDuck';
import db from '../db/index'

export const fetchCoffees = async (userId): Promise<Coffee> => {
    const coffees = await db.coffees.where({userId: 1});
    return (coffees || []).map((coffee: Coffee): Coffee => ({
        rating: coffee.rating,
        brewMethod: coffee.brewMethod,
        flavorProfile: coffee.flavorProfile,
        otherObservations: coffee.otherObservations,
        userId: coffee.userId
    }));
};

export const saveCoffees = async (coffee: Coffee): Promise<void> => db.coffees.add(coffee);