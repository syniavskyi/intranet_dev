
import { mapGetters } from 'vuex';
<template>
    <div class="modal-new">
        <div class="modal-content">
            <div class="cv-modal-header">
                <h1 class="cv-modal-h1">Generuj CV</h1>
                <button class="cv-modal-close" @click="close">&#x2716;</button>
            </div>
            <div class="cv-modal-content"> 
                <div class="cv-modal-tbuttons">
                    <button class="cv-modal-btn-bclear" @click="selectAllCvElements">Zaznacz wszystkie</button>
                    <button class="cv-modal-btn-bclear" @click="deselectAllCvElements">Odznacz wszystkie</button>
                </div>
                <div class="cv-modal-middle">
                    <div class="cv-modal-chkbxs">
                        <label class="checkbox-wrap cv-chkbx">
                            <input type="checkbox" name="name" v-model="cvElements.name">
                            <div class="checkbox-in"></div>
                            <p class="checkbox-label">Imię i nazwisko</p>
                        </label>
                        <label class="checkbox-wrap cv-chkbx">
                            <input type="checkbox" name="photo" v-model="cvElements.photo">
                            <div class="checkbox-in"></div>
                            <p class="checkbox-label">Zdjęcie</p>
                        </label>
                        <label class="checkbox-wrap cv-chkbx">
                            <input type="checkbox" name="address" v-model="cvElements.address">
                            <div class="checkbox-in"></div>
                            <p class="checkbox-label">Adres email</p>
                        </label>
                    </div>
                    <div class="cv-modal-chkbxs">
                        <label class="checkbox-wrap cv-chkbx">
                            <input type="checkbox" name="phone" v-model="cvElements.phone">
                            <div class="checkbox-in"></div>
                            <p class="checkbox-label">Numer telefonu</p>
                        </label>
                        <label class="checkbox-wrap cv-chkbx">
                            <input type="checkbox" name="date" v-model="cvElements.date">
                            <div class="checkbox-in"></div>
                            <p class="checkbox-label">Data urodzenia</p>
                        </label>
                    </div>
                </div>
            </div>
            <div class="cv-modal-bbuttons">
                <button class="cv-modal-btn" @click="showCv">Zobacz podgląd</button>
                <button class="cv-modal-btn-clear" @click="close">Zamknij</button>
            </div>
        </div>
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
            this.$parent._data.showSelectCv = false
        },
        showCv(){            
            this.$store.commit('SET_CV_ELEMENTS', this.cvElements)
            localStorage.setItem('Object', JSON.stringify(this.cvElements));
            let routeData = this.$router.resolve({name: 'CV'});
            window.open(routeData.href, '_blank');
        }
    }
}
</script>

<style>

.cv-modal-header {
    display: flex;
    justify-content: space-between;
}

.cv-modal-h1 {
    margin-left: 1rem;
    color: #333;
}

.cv-modal-close {
    font-size: 1.5rem;
    background: transparent;
    color: #ccc;
    font-weight: bold;
    height: 1.2rem;
    border: 0;
    margin: .5rem;
    transition: color 0.2s ease;
    cursor:pointer;
}

.cv-modal-close:hover {
    color: grey;
}

.cv-modal-content {
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: space-around;
}
.cv-modal-tbuttons {
    display: flex;
    align-self: center;
    width: 80%;
    justify-content: space-around;
}
.cv-modal-middle {
    display: flex;
    align-self: center;
    align-items: flex-start;
    width: 80%;
    height: 60%;
    justify-content: space-around;
}

.cv-modal-chkbxs {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: space-between
}
.cv-chkbx {
    display: flex;
    align-self: flex-start;
    margin-bottom: 1rem;
}

.cv-modal-btn,
.cv-modal-btn-clear,
.cv-modal-btn-bclear {
    display: flex;
    cursor: pointer;
    color: #333;
    text-transform: capitalize;
    border: 0;
    border-radius: 4px;
    transition: all 0.2s ease;
    justify-content: center;
    align-items: center;
    margin: .2rem;
    outline: none;
    font-size: .85rem;
}
.cv-modal-btn:first-letter {
    font-weight: bold;
}
.cv-modal-btn {
    padding: .5rem .7rem;
    background: #ccc;
    box-shadow: 0 3px 3px -2px gray;
}

.cv-modal-btn-clear {
    padding: .5rem .7rem;
}

.cv-modal-btn-bclear {
    background: transparent;
    /* text-transform: uppercase; */
    border: 2px solid rgb(61, 61, 61);
    padding: .6rem .8rem;
}

.cv-modal-btn-bclear:hover {
    box-shadow:0 0 8px #333;
    background: #333;
    color: white;
}

.cv-ballot-box {
    display: flex;
    /* font-weight: bold; */
    font-size: 1rem;
}

.cv-modal-btn-clear {
    background: white;
}

.cv-modal-btn-clear:hover {
    color: orange;
}

.cv-modal-btn:hover {
    background: rgb(156, 156, 156);
}

.cv-modal-bbuttons {
    display: flex;
    align-self: flex-end;
    align-items: center;
    margin: 1rem;
}

</style>