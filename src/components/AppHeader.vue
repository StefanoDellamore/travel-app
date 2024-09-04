<script>
import {saveTrip, getTrips} from '../localstorage'
export default {
    props: {
        onTripSaved: {
            type: Function,
            required: false,
        }
    },
    data() {
        return {
            showModal: false,
            tripName: '',
            startDestination: '',
            endDestination: '',
            startDate: '',
            endDate: '',
        };
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },
        submitForm() {
            // Crea un oggetto con i dati del form
            const newTrip = {
                tripName: this.tripName,
                startDestination: this.startDestination,
                endDestination: this.endDestination,
                startDate: this.startDate,
                endDate: this.endDate
            };
            // Salva il viaggio nel localStorage
            saveTrip(newTrip);
            
            if (this.onTripSaved) {
                this.onTripSaved(newTrip); // Chiama solo se la prop è passata
            }

            // Resetta i campi del form
            this.tripName = '';
            this.startDestination = '';
            this.endDestination = '';
            this.startDate = '';
            this.endDate = '';
                    
            // Chiudi la modale dopo l'invio del form
            this.toggleModal();
        }
    }
}
</script>

<template>
    <header>
        <div class="container-fluid">     
            <div class="row d-flex justify-content-around nav">
                <div class="col-4">Logo</div>
                <div class="col-4 text-end">
                    <div class="btn btn-primary" @click="toggleModal">Nuovo viaggio</div>
                </div>
            </div>
        </div>
    </header>
    <!-- Modale -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
            <h2>Nuovo Viaggio</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="tripName">Nome Viaggio:</label>
                    <input type="text" id="tripName" v-model="tripName" required class="form-control">
                </div>
                <div class="form-group">
                    <label for="startDestination">Partenza:</label>
                    <input type="text" id="startDestination" v-model="startDestination" required class="form-control">
                </div>
                <div class="form-group">
                    <label for="endDestination">Arrivo:</label>
                    <input type="text" id="endDestination" v-model="endDestination" required class="form-control">
                </div>
                <div class="form-group">
                    <label for="startDate">Data di Inizio:</label>
                    <input type="date" id="startDate" v-model="startDate" required class="form-control">
                </div>
                <div class="form-group">
                    <label for="endDate">Data di Fine:</label>
                    <input type="date" id="endDate" v-model="endDate" required class="form-control">
                </div>
                <div class="form-group mt-3">
                    <button type="submit" class="btn btn-primary">Salva</button>
                    <button type="button" class="btn btn-secondary" @click="toggleModal">Annulla</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang ="scss" scoped>
.nav {
    border: 1px solid black;
    height: 70px;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
}
</style>
