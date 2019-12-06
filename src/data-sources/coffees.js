import type {Coffee} from '../ducks/coffeesDuck';
import db from '../db/index'

export const fetchCoffees = async (userId): Promise<Coffee> => {
    const coffees = await db.coffees.toArray();
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

export const saveCoffees = async (coffee: Coffee): Promise<void> => db.coffees.add(coffee);

export const deleteCoffee = async (coffeeId: number): Promise<void> => db.coffees.delete(coffeeId);