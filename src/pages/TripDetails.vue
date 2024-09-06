<script>
import { getTrips, saveTrips } from '../localstorage';

export default {
    data() {
        return {
            trip: null,
            mapUrl: '',
            isModalOpen: false,
            isStopDetailModalOpen: false,
            newStop: {
                name: '',
                date: '',
                notes: '',
                type: '',
                rating: 0,
            },
            selectedStop: null
        };
    },
    created() {
        const tripId = this.$route.params.id;
        const trips = getTrips();
        this.trip = trips[tripId]; // Trova il viaggio usando l'ID

        // Aggiorna la mappa all'inizio
        this.updateMapUrl();
    },
    methods: {
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
        },
        toggleStopDetailModal(stop) {
        this.selectedStop = stop;
        this.isStopDetailModalOpen = !this.isStopDetailModalOpen;
        },
        addStop() {
            if (!this.newStop.name || !this.newStop.date) return;

            // Aggiungi la nuova tappa al viaggio
            this.trip.stops = this.trip.stops || [];
            this.trip.stops.push({
                name: this.newStop.name,
                date: this.newStop.date,
                notes: this.newStop.notes,
                type: this.newStop.type,
                rating: this.newStop.rating
            });

            // Salva i viaggi aggiornati
            const trips = getTrips();
            trips[this.$route.params.id] = this.trip;
            saveTrips(trips);

            // Aggiorna l'URL della mappa
            this.updateMapUrl();

            // Resetta il modulo e chiudi la modale
            this.newStop = { name: '', date: '', notes:'', type: '', rating: 0 };
            this.toggleModal();
        },
        removeStop(index) {
            // Rimuovi la tappa dall'array
            this.trip.stops.splice(index, 1);

            // Salva i viaggi aggiornati
            const trips = getTrips();
            trips[this.$route.params.id] = this.trip;
            saveTrips(trips);

            // Aggiorna l'URL della mappa
            this.updateMapUrl();
        },
        updateMapUrl() {
            // Base URL per Google Maps Directions
            const baseUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDTGRmjaJ2EXbTfRqS8kd3MuVP23kqH4gE`;
            
            // Aggiungi origine e destinazione
            let url = `${baseUrl}&origin=${encodeURIComponent(this.trip.startDestination)}&destination=${encodeURIComponent(this.trip.endDestination)}`;
            
            // Se ci sono tappe, aggiungile come waypoints
            if (this.trip.stops && this.trip.stops.length > 0) {
                const waypoints = this.trip.stops.map(stop => stop.name).join('|');
                url += `&waypoints=${encodeURIComponent(waypoints)}`;
            }

            // Aggiorna l'URL della mappa
            this.mapUrl = url;
        },
        saveStopDetails() {
        const trips = getTrips();
        const tripId = this.$route.params.id;

        // Salva le modifiche al viaggio attuale
        trips[tripId] = this.trip;
        saveTrips(trips);
    }
    }
}
</script>

<template>
    <div class="container-fluid header d-flex align-items-center">
        <RouterLink  :to="{ path: `/` }">
            <div class="button">HomePage</div>
        </RouterLink>
        <div class="btn button" @click="toggleModal">Open Modal</div>
    </div>
    <div>
        <div class="map-container">
            <iframe
                :src="mapUrl"
                style="border:0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <!-- Modale per aggiungere una tappa -->
        <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
            <div class="modal-content" @click.stop>
                <h2>Add New Stop</h2>
                <form @submit.prevent="addStop">
                    <div class="form-group">
                        <label for="stopName">Stop Name:</label>
                        <input
                            type="text"
                            id="stopName"
                            v-model="newStop.name"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="stopDate">Date:</label>
                        <input
                            type="date"
                            id="stopDate"
                            v-model="newStop.date"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="stopNotes">Notes:</label>
                        <textarea
                            id="stopNotes"
                            v-model="newStop.notes"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="stopType">Type:</label>
                        <select v-model="newStop.type">
                            <option value="">Select Type</option>
                            <option value="sightseeing">Sightseeing</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="hotel">Hotel</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="stopRating">Rating:</label>
                        <input
                            type="number"
                            id="stopRating"
                            v-model.number="newStop.rating"
                            min="0"
                            max="5"
                        />
                    </div>
                    <button type="submit">Add Stop</button>
                </form>
                <h3>Existing Stops:</h3>
                <div v-if="trip.stops && trip.stops.length" class="stops-list">
                    
                    <ul>
                        <li v-for="(stop, index) in trip.stops" :key="index">
                            <strong>{{ stop.name }}</strong> - {{ stop.date }}
                            <button @click="toggleStopDetailModal(stop)">Details</button>
                            <button @click="removeStop(index)">X</button>
                        </li>
                    </ul>
                </div>
                <button @click="toggleModal" class="mt-3">Close Modal</button>
            </div>
        </div>
        <!-- Modale per dettagli della tappa -->
        <div v-if="isStopDetailModalOpen" class="modal-overlay2" @click="toggleStopDetailModal(null)">
            <div class="modal-content2" @click.stop>
                <h2>Stop Details</h2>
                <div v-if="selectedStop">
                    <p><strong>Name:</strong> {{ selectedStop.name }}</p>
                    <p><strong>Date:</strong> {{ selectedStop.date }}</p>
                    <p><strong>Notes:</strong> {{ selectedStop.notes }}</p>
                    <p><strong>Type:</strong> {{ selectedStop.type }}</p>
                    <div class="d-flex align-items-center">
                        <p><strong>Rating:</strong> {{ selectedStop.rating }}</p>
                        <input type="number" v-model.number="selectedStop.rating" min="0" max="5" class="mb-3 ms-2"/>
                        <button class="btn btn-sm mb-3 ms-2" @click="saveStopDetails">Save</button>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="toggleStopDetailModal(null)">Close Details</button>
                </div>
                
            </div>
        </div>
    </div>
</template>




<style scoped>

html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
}

.header {
    top: 0;
    left: 0;
    width: 100%;
    height: 70px; /* Altezza fissa dell'header */
    z-index: 1000;
    background-color: red;
}


.map-container {
    position: absolute;
    overflow: hidden;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100% - 70px);
}

iframe {
    width: 100%;
    height: 100%;
    border: 0;
}

.modal-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px; /* Larghezza della modale */
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    max-width: 250px; /* Larghezza massima della modale */
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"], input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.modal-overlay2 {
    position: fixed;
    bottom: 0;
    right: 300px;
    width: 300px; /* Larghezza della modale */
    height: 50%;
    background: rgba(0, 0, 0, 0.7);
    border: 5px solid white;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content2 {
    max-width: 400px; /* Può essere più largo rispetto alla modale di aggiunta */
}
.stops-list {
    max-height: 200px; /* Altezza massima, regolabile secondo le tue esigenze */
    overflow-y: auto; /* Aggiunge una barra di scorrimento verticale se il contenuto supera l'altezza */
}
</style>

