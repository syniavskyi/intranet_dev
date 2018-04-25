<template>
  <div>
        <div class="plane-dashboard-parent">
            <div class="plane-dashboard">
                <div class="plane-dashboard-nav-and-content">
                    <div class="dashboard-content">
                        <div class="dashboard-header">
                            <div class="dashboard-header-title-and-menu">
                                <!-- <img src="../../images/nav/if_menu-32.png" class="dashboard-header-menu"> -->
                                <p class="dashboard-header-title">HOME</p>
                            </div>
                            <div class="search">
                                <input class="dashboard-input dashboard-search" placeholder="szukaj">
                                <!-- <img class="search-icon" src="../../images/nav/if_search_64.png"> -->
                            </div>
                        </div>
                        
                        <div class="dashboard-news dashboard-tile">
                            <div class="dashboard-tile-header" @click="goToNews">
                                <p class="dash-tile-title">Newsy</p>
                                <p class="dash-tile-exit">&#10006;</p>
                            </div>
                            <div class="dashboard-tile-content">
                                <div class="news-tile">
                                    <h2 class="news-tile-title">Impreza u Krzyśka</h2>
                                </div>
                                <div class="news-tile">
                                    <h2 class="news-tile-title">Impreza u Krzyśka</h2>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-content-row">
                            <div class="dashboard-incoming-events dashboard-tile">
                                <div class="dashboard-tile-header">
                                    <p class="dash-tile-title">Nadchodzące wydarzenia</p>
                                    <p class="dash-tile-exit">&#10006;</p>
                                </div>
                                <div class="dashboard-tile-content"></div>
                            </div>
                            <div class="dashboard-weather dashboard-tile">
                                <div class="dashboard-tile-header">
                                    <p class="dash-tile-title">Pogoda</p>
<!--                                    <p class="dash-tile-exit">&#10006;</p>-->
                                    <!-- <img class="dash-title-exit" height="20px" src="../../images/nav/if_Collapse.png"> -->
                                </div>
                                <div class="dashboard-tile-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
  </div>
</template>


<script>

   import router from '@/router/index.js'
import { mapGetters } from 'vuex';

	export default {
    data() {
      return {
        
      }
    },
    computed: {
        ...mapGetters([
            'showMenu'
        ])
    },
    beforeCreate() {
        if (this.showMenu === false) {
            this.$store.commit('DISPLAY_MENU', true)
        }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      goToNews() {
          router.replace("/news")
      }
    }
  }
</script>
<style>

</style>
