
import { mapGetters } from 'vuex';
<template>
    <div>
        <button @click="selectAllCvElements">Zaznacz wszystkie</button>
        <button @click="deselectAllCvElements">Odznacz wszystkie</button>
        <button @click="close">Zamknij</button>
        <div>
            <input type="checkbox" name="name" v-model="cvElements.name">
            <label>Imię i nazwisko</label>
        </div>
        <div>
            <input type="checkbox" name="photo" v-model="cvElements.photo">
            <label>Zdjęcie</label>
        </div>
        <div>
            <input type="checkbox" name="address" v-model="cvElements.address">
            <label>Adres email</label>
        </div>
        <div>
            <input type="checkbox" name="phone" v-model="cvElements.phone">
            <label>Numer telefonu</label>
        </div>
        <div>
            <input type="checkbox" name="date" v-model="cvElements.date">
            <label>Data urodzenia</label>
        </div>
        <button @click="showCv">Zobacz podgląd</button>
    </div>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            cvElements: 'getCvElements'
        })
    },
    methods: {
        ...mapActions([
            'selectAllCvElements', 'deselectAllCvElements'
        ]),
        close(){

        },
        showCv(){            
            this.$store.commit('SET_CV_ELEMENTS', this.cvElements)
            let routeData = this.$router.resolve({name: 'CV'});
            window.open(routeData.href, '_blank');
        }
    }
}
</script>

<style>

</style>

