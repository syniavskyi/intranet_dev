<template>
    <div>
        <div :class="messageLog.warning">
            <p>{{messageLog.mesage}}</p>
        </div>
    </div>
</template>

<script>
export default {
     data() {
        return {
        }
    },
    computed: Object.assign(mapGetters({
        messageLog: 'getMessageLog'
        }))
}
</script>
