<template>
    <div @click="closeConfirmDialog">
        <div class="modal-overlay"/>
        <div class="modal-new-xs" @click.stop>
            <header class="modal-header-new">
                <h1 class="modal-title-new"><slot name="modal-title"></slot></h1>
                <button @click="closeConfirmDialog" class="modal-close">&#10006;</button>
            </header>
            <div class="modal-content-new">
                <div class="del-modal-section">
                    <slot name="modal-text"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closeConfirmDialog() {
            this.$store.commit("SET_DIALOG_CONFIRM", false);
            this.$store.commit("SET_REGISTER_DEF_DATA");
        }
    }
}
</script>
