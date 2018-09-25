<template>
  <!-- <div id="app"> -->
  <div class="display-row">
    <!-- <app-menu v-show="showMenu"/> -->
    <loader v-if="showLoader"></loader>
      <!-- <transition name="slide-top" mode="out-in"> -->
         <router-view/>
      <!-- </transition> -->
  </div>
  <!-- </div> -->
</template>

<script>
import Menu from './components/Menu.vue'
import Loader from './components/dialogs/Loader.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    'app-menu': Menu,
    'loader': Loader
  },

  created() {
    window.addEventListener("resize", this.showMenu)
  },
  destroyed() {
    window.removeEventListener("resize", this.showMenu)
  },
  mounted() {
    this.$nextTick(() => {
      this.showMenu();
    })
  },
  methods: {
    showMenu(event) {
      let obj = {window, event}
      this.$store.dispatch("setSideMenu", obj);
    }
  },
  computed: {
    ...mapGetters({
      showLoader: 'getDisplayLoader'
    })
  }

}
</script>

<style>
.display-row {
  display: flex;
  width: 100%;
  height: 100%;
}
.slide-top-enter-active {
  transition: all .3s ease;

}

.slide-top-leave-active {
  transition: all .2s ease;
}
.slide-top-enter { 
  transform: translateY(-50px);
  opacity: 0;
}
.slide-top-leave-to {
 transform: translateY(-50px);
  opacity: 0; 
}

.menu-popover-enter,
.menu-popover-leave-to {
  opacity: 0;
  transform: rotateY(50deg);
}
.menu-popover-enter-to,
.menu-popover-leave {
  opacity: 1;
  transform: rotateY(0deg);
}
.menu-popover-enter-active,
.menu-popover-leave-active {
  transition: opacity, transform 200ms ease-out;
}


</style>
