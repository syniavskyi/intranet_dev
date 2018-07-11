<template>
<div class="plane-component">
    <div class="component-nav-and-content">
      <app-menu></app-menu>
      <div class="component-content">
        <div class="content-header">
          <div class="content-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="content-header-menu">
            <p class="content-header-title">Newsy</p>
          </div>
        </div>
        <div class="content-body">
          <div class="api">
          <div class="content-event">
            <p>Events API</p>
           </div>
            <div class="content-weather"  :class="today.isDay ? 'weatherDay' : 'weatherNight' ">
              <div class="intro">
                <div class="town">
                    <p> {{weatherData.town}} </p>
                </div>
                <div class="icon">
                  <img :src="weatherData.icon" alt="icon" height="64px">
                </div>
              </div>
              <div class="info">
                <div class="weather-header">
                </div> 
                <div class="temp">
                  <!-- <img src="../../assets/images/weather/temps.png" height="46px" class="iconTemp"/> -->
                  <p> {{ weatherData.celcius }} <sup>o</sup>C </p> 
                </div>
              </div> 
              <!-- <div class="description">
                    <p> {{weatherData.description}} </p> 
              </div> -->
              <div class="additional">
                <div class="weatherDesc">
                    <img src="../../assets/images/weather/winds.png" class="iconWeather"/>
                    <p> {{weatherData.wind}} km/h</p>
                </div>
                <div class="weatherDesc">
                    <img src="../../assets/images/weather/clouds.png"  class="iconWeather"/>
                    <p> {{weatherData.clouds}}%</p>
                </div>
                <div class="weatherDesc">
                    <img src="../../assets/images/weather/humiditys.png" class="iconWeather"/>
                    <p> {{weatherData.humidity}}%</p>
                </div>
              </div> 
              <div class="date">
                <p> {{ today.dayDesc }}, {{ today.today }} </p>  
              </div>
            </div>
          </div>
          <div class="content-news">
            <div id="articles">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../Menu.vue"
import axios from "axios"
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
import i18n from "../../lang/lang"
export default {
  beforeCreate() {
    this.$store.dispatch("geoLoc");
    this.$store.dispatch("getNews")
  },
  created() {
    this.getToday()
    // this.getNews()
  },
 
  components: {
    "app-menu": Menu
  },
  computed: {
    ...mapGetters(["geoLocation2", "weatherData", "today", "articlesRaw", "articlesJson", "articles"]),
  },
  methods: {
    ...mapActions(["geoLoc", "getWeatherData", "getToday", "getNews", "xmlToJson", "getArticles"]),
    }
  }
</script>


<style scoped>
.weatherDay {
  background-image: url("../../assets/images/weather/day.png")
}

.weatherNight {
  background-image: url("../../assets/images/weather/night.png")
}
</style>
