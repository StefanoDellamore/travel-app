// localstorage.js
export function saveTrips(trips) {
    console.log('Saving trips:', trips);
    localStorage.setItem('trips', JSON.stringify(trips));
}

export function getTrips() {
    const trips = localStorage.getItem('trips');
    const parsedTrips = trips ? JSON.parse(trips) : [];
    console.log('Parsed trips:', parsedTrips); // Aggiungi questo per debug
    return Array.isArray(parsedTrips) ? parsedTrips : [];
}

export function saveTrip(trip) {
    const trips = getTrips();
    trips.push(trip);
    saveTrips(trips);
}

