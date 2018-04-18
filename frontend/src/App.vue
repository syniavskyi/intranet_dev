<template>
  <!-- <div id="app"> -->
  <transition name="page" mode="out-in">
    <router-view/>
  </transition>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .10s;
}

.fade-enter-active {
  transition-delay: .01s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.page-enter-active, .page-leave-active {
  
  transition: opacity .15s, transform .15s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
