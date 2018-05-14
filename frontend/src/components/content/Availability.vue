<<template>
    <div>
        <p>Dysp</p>
    </div>
</template>

<script>

export default {
    data() {
      return {
 
      }
    },
    beforeCreate() {
        if (this.showMenu === false) {
            this.$store.commit('DISPLAY_MENU', true)
        }
    },
    created() {

	},
    methods: {
      
    }
  }
</script>
<style>

</style>
