import {Location} from "../ducks/locationDuck";

/*
const getNearbyShops = async (location: Position): Promise<Array<Location>> => {
    const {coords} = location;
    const long = coords.longitude;
    const lat = coords.latitude;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=MY_KEY&location=${long},${lat}1&radius=300&keyword=coffee`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    (data.results || []).map((result): Location => ({
        name: result.name,
        mapUrl: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`,
        //imageUrl:
    }))
}*/
