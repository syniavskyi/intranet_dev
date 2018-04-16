<template>
  <div>
      <p>dashboard</p>
      <button class="button login-button"  @click="logout"><span class="span-arrow">Wyloguj (test)</span></button>
      
  </div>
</template>


<script>

   

	export default {
    data() {
      return {
        
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>