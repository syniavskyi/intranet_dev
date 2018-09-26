<template>
    <div> 
        <div class="modal-overlay"></div>
        <div class="modal-new-s">
            <div class="modal-header-new">
                <h1 class="modal-title-new">{{ $t("label.addNewMessage") }}</h1>
                <div @click="close" class="modal-exit-new">&#10006;</div>
            </div>
            <div class="modal-content-new">
                <div class="m-wrap">
                    <div class="cd-for-input">
                        <textarea v-model="newAdvert" required class="cd-textarea ta-height"></textarea>
                        <span class="cd-span"></span>
                        <label class="cd-label">{{ $t("label.newMessage") }}</label>
                    </div>
                    <button :disabled="newAdvert === null || newAdvert === '' " class="button">{{ $t("button.add") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newAdvert: null
        }
    },
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
