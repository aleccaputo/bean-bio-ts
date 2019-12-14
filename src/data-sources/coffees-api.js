export const fetchRoasters = async (state = 'vt') => {
    const response = await fetch(`https://wrapapi.com/use/aleccaputo/coffees/states/0.0.1?wrapAPIKey=gt2PxFHAx5j26mqxMJFASUNou0lExaUm&state=${state}`, {
        method: 'POST'
    });
    if(!response.ok) {
        throw new Error('Bad request');
    }
    const {data} = await response.json();
    if(!data) {
        throw new Error('Bad request');
    }
    return (data || {}).roasters;
};