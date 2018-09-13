<template>
<div>
    <div class="modal-new-s">
        <div class="modal-header-new">
            <h1 class="modal-title-new">Zatwierdzenie delegacji</h1>
            <div @click="hideDialog" class="modal-exit-new">&#10006;</div>
        </div>
        <div class="modal-content-new">
            <div class="del-modal-section">
                <h3 class="del-modal-h3" v-if="!isSuccess">Pomyślnie zapisano dane delegacji</h3>
                <h2 class="del-modal-h2">Czy chcesz zatwierdzić delegację? Upewnij się, że wprowadzone dane są prawidłowe.</h2>
                
                <p v-if="isSuccess">Niepowodzenie podczas zapisu numeru delegacji</p>
                <div class="del-modal-btns">
                    <button class="clear-btn" @click="saveDelegationNumber">Tak, zatwierdzam</button>
                    <button class="oclear-btn" @click="hideDialog">Nie, chcę wprowadzić zmiany</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-overlay"></div> 
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            newDelegation: 'getNewDelegation',
            isSuccess: 'getCreateDelegSuccess'
        })
    },
    methods: {
        ...mapActions(['saveDelegationNumber']),
        hideDialog() {
            this.$store.commit('SET_SHOW_CONFIRM_DELEG', false)
        }
    }
}
</script>

