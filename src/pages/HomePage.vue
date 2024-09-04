<script>
import { RouterLink } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import { getTrips, saveTrips } from '../localstorage';
export default {
    data() {
        return {
            trips: [],
        };
    },
    components: {
        AppHeader,
    },
    methods: {
        loadTrips() {
            this.trips = getTrips(); // Recupera i viaggi dal localStorage
        },
        updateTrips(newTrip) {
            this.trips.push(newTrip); // Aggiunge il nuovo viaggio alla lista
        },
        removeTrip(index) {
            this.trips.splice(index, 1); // Rimuove il viaggio dall'array
            saveTrips(this.trips); // Salva l'array aggiornato nel localStorage
        }        
    },
    mounted() {
        this.loadTrips(); // Carica i viaggi quando il componente è montato
    }
}
</script>

<template>
    <AppHeader :onTripSaved="updateTrips"></AppHeader>
    <div class="container-fluid">
        <h1>Home Page</h1>

        <h2>Viaggi Salvati:</h2>
        <div class="row">
            <router-link
                v-for="(trip, index) in trips"
                :key="index"
                :to="{ path: `/trip/${index}` }"
                class="col-2 box"
            >
                <div></div>
                <div class="text-center">{{ trip.tripName }}</div>
                <div class="text-center">{{ trip.startDestination }} {{ trip.startDate }}</div>
                <div class="text-center">{{ trip.endDestination }} - {{ trip.endDate }}</div>
                <div class="btn btn-danger" @click.stop="removeTrip(index)">x</div>
            </router-link>
        </div>
    </div>
</template>

<style lang ="scss" scoped>
.box {
    border: 1px solid black;
    margin: 5px;
}
</style>
