<script>
import { routerKey, RouterLink } from 'vue-router';
import { getTrips } from '../localstorage';
import AppHeader from '../components/AppHeader.vue';

export default {
    data() {
        return {
            trip: null,
            mapUrl: '',
            isModalOpen: false
        };
    },
    components: AppHeader,
    created() {
        const tripId = this.$route.params.id;
        const trips = getTrips();
        this.trip = trips[tripId]; // Trova il viaggio usando l'ID

       // Costruisci l'URL per l'iframe della mappa
       if (this.trip && this.trip.startDestination) {
        this.mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDTGRmjaJ2EXbTfRqS8kd3MuVP23kqH4gE&origin=${encodeURIComponent(this.trip.startDestination)}&destination=${encodeURIComponent(this.trip.endDestination)}`;
        } else {
            console.error("Invalid trip data");
        }
    },
    methods: {
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
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
        <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
            <div class="modal-content" @click.stop>
                <h2>Modal Title</h2>
                <p>Here is some content for the modal.</p>
                <button @click="toggleModal">Close Modal</button>
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

</style>

