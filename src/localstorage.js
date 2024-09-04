// localstorage.js
export function saveTrips(trips) {
    localStorage.setItem('trips', JSON.stringify(trips));
}

export function getTrips() {
    const trips = localStorage.getItem('trips');
    return trips ? JSON.parse(trips) : [];
}

export function saveTrip(trip) {
    const trips = getTrips();
    trips.push(trip);
    saveTrips(trips);
}

