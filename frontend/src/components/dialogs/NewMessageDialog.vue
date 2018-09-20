<template>
    <div> 
        <div class="modal-overlay"></div>
        <div class="modal-new-s">
            <div class="modal-header-new">
                <h1 class="modal-title-new">Dodaj nową wiadomość</h1>
                <div @click="close" class="modal-exit-new">&#10006;</div>
            </div>
            <div class="modal-content-new">
                <div class="m-wrap">
                    <div class="cd-for-input">
                        <textarea v-model="newAdvert" required class="cd-textarea ta-height"></textarea>
                        <span class="cd-span"></span>
                        <label class="cd-label">Nowa wiadomość</label>
                    </div>
                    <button class="button">Dodaj</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$store.commit("SET_SHOW_NEW_MESSAGE_DIALOG", false)
        }
    }
}
</script>

<style scoped>
.ta-height {
    max-height: 10rem;
}

.m-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: space-around;
}
</style>
