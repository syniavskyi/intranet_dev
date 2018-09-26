<template>
    <div>
        <h1>{{ $t("message.confirmPageLeaving") }}</h1>
        <p>{{ $t("message.unsavedData") }}</p>
        <button @click="setSelectedAction('leave')">{{ $t("button.yes") }}</button>
        <button @click="$emit('close')">{{ $t("button.close") }}</button>
    </div>
</template>
<script>
export default {
    methods: {
        setSelectedAction(action) {
            this.$emit('action-selected', action)
        }
    }
}
</script>