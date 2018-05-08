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
                                        <span class="temp">{{weather.temp}}&deg;</span><br/>
				                            Low: {{weather.tempLow}}&deg; High: {{weather.tempHigh}}&deg;<br/>
				                            {{weather.desc}}
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
import axios from 'axios'

	export default {
    data() {
      return {
        weather: {
            location: '',
            tempLow: '',
            tempHigh: '',
            rain: '',
            desc: '',
            temp: ''
        }
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
    created() {

		navigator.geolocation.getCurrentPosition(pos => {
			console.log('got coordinates', pos.coords);
			this.lat = pos.coords.latitude;
			this.lon = pos.coords.longitude;
			this.loadWeather();
		});

	},
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      goToNews() {
          router.replace("/news")
      },
      loadWeather() {
  	axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(${this.lat}%2C${this.lon})%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
			.then(res => {
				let weather = res.data.query.results.channel;
				console.log('response',weather);
				
				this.weather.location = weather.location.city + ", " + weather.location.region;
				this.weather.temp = weather.item.condition.temp;
				this.weather.tempLow = weather.item.forecast[0].low;
				this.weather.tempHigh = weather.item.forecast[0].high;
				this.weather.desc = weather.item.condition.text;
		
			})
			.catch(e => {
				console.error(e);
			});
				
		}
    }
  }
</script>
<style>

</style>
