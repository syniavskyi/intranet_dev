<template>
<div class="plane-component">
    <div class="component-nav-and-content">
        <app-menu v-show="displayMenu"></app-menu>
        <div class="modal-overlay" v-show="displayOverlay"></div>
            <div class="component-content">
                <div class="content-header">
                    <div class="content-header-title-and-menu">
                        <!-- <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="content-header-menu"> -->
                        <div @click="showMenu" class="content-header-menu">&#9776;</div>
                        <p class="content-header-title">Strona główna</p>
                    </div>
                </div>
                <div class="content-body">
                    <div class="news-tile">
                        <div class="tile-head">
                            <div class="tile-head-row">
                                <h2 class="tile-head-title">Wiadomości</h2>
                                <button @click="newMessage" class="func-btn"><span class="nfb-span">&#43;</span><span class="nfbm-span">Nowa wiadomość</span></button>
                            </div>
                            <div class="tile-underscore"/>
                        </div>
                        <div class="tile-content tile-ncnt">
                            <div class="advItem" v-for="(advert, index) in advertsList" :key="advert.Id" :id="advert.Id">
                                <textarea @input="validateAdvert(advert)" :disabled="!editMode" class="n-textarea" v-model="advert.Message"/>
                                <p class="table-p">{{formatAuthorName(advert.CreatedBy)}}</p>
                                <p class="table-p" v-if="!editMode"> Wiadomość aktualna do {{ formatDate(advert.ValidTo) }} </p>
                                <v-date-picker @input="validateAdvert(advert)" v-if="editMode" class="cd-range" popoverDirection="bottom" is-expanded mode="single" v-model="advert.ValidTo"  :min-date="new Date()">
                                    <!-- <input class="cd-range" v-model="advert.ValidTo" value="advert.ValidTo"/> -->
                                    <input v-model="advert.ValidTo" value="advert.ValidTo"/>
                                </v-date-picker>
                                <div class="advBtns" >
                                    <button  class="clear-btn" @click="editAdvert(advert)">edytuj</button>
                                    <button  class="clear-btn" @click="saveAdvert(advert)" :disabled="!isAdvertValid">zapisz</button>
                                    <button  class="clear-btn" @click="cancelEditing(index)">anuluj</button>
                                    <button class="oclear-btn" @click="removeAdvert(advert.AdvertId)">X</button>
                                </div>
                                <button v-show="isMoreThanOneAdvert" @click="nextSlide(-1)" class="advLeft">&#8249;</button>
                                <button v-show="isMoreThanOneAdvert" @click="nextSlide(1)" class="advRight">&#8250;</button>
                            </div>
                            <button class="oclear-btn btn-s" @click="startStopSlider">{{stop}}</button>
                            <!-- <div class="advControls">
                                <a class="control-button">•</a>
                                <a class="control-button">•</a>
                                <a class="control-button">•</a>
                            </div> -->
                        </div>
                    </div>
                    <div class="api">
                        <div class="content-event">
                            <div class="tile-head">
                                <div class="tile-head-row">
                                    <h2 class="tile-head-title">{{ $t("news.upcomingEvents") }}</h2>
                                </div>
                                <div class="tile-underscore"/>
                            </div>
                            <div class="tile-content">
                                <div v-for="(event, index) in eventsSrt" :key='index' class="single-event">
                                    <div class="event-date">{{setDateTo(event)}}</div>
                                    <div class="event-title">{{ event.EventName }}</div>
                                    <div class="event-type">{{event.EventTypeName}}</div>
                                </div>
                            </div>
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
                                <div class="weather-header"></div>
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
                                <p>{{ today.dayDesc }}, {{ today.today }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="content-news">
                        <div id="articles"></div>
                    </div>
                </div>
            </div>
        </div>
        <toast ref="toast" v-if="showToast">{{sliderToast}}</toast>
        <new-message v-if="showNewMessage"></new-message>
    </div>
</template>

<script>
import Menu from "../Menu.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import i18n from "../../lang/lang";
import moment from "moment";
import Toast from "../dialogs/Toast";
import NewMessageDialog from "../dialogs/NewMessageDialog";

let utils = require("../../utils");

export default {
  data() {
    return {
      newAdvert: null,
      slideIndex: 1,
      repeatSlider: true,
      interval: "",
      editMode: false,
      beforeEditingCache: null,
      stop: "Zatrzymaj slider",
      start: "Uruchom slider",
      sliderToast: "Zatrzymano slider",
      isAdvertValid: false,
      isMoreThanOneAdvert: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.runCarosuel(this.slideIndex);
      this.interval = setInterval(() => {
        this.slideIndex += 1;
        this.runCarosuel(this.slideIndex);
      }, 4000);
    });
    this.$store.commit("SET_DISPLAY_LOADER", false);
    this.isMoreThanOneAdvert = this.advertsList.length > 1 ? true : false;
  },
  beforeCreate() {
    this.$store.dispatch("geoLoc");
    // this.$store.dispatch("getNews");
  },
  created() {
    this.getToday();
    this.getNews()
  },
  destroyed() {
    clearInterval(this.interval);
  },
  components: {
    "app-menu": Menu,
    toast: Toast,
    "new-message": NewMessageDialog
  },
  computed: {
    ...mapGetters({
      geoLocation2: "geoLocation2",
      weatherData: "weatherData",
      today: "today",
      articlesRaw: "articlesRaw",
      articlesJson: "articlesJson",
      rticles: "articles",
      displayMenu: "getShowMenu",
      displayOverlay: "getShowMenuOverlay",
      events: "getEvents",
      showToast: "getDisplayToast",
      showNewMessage: "getShowNewMessageDialog",
      advertsList: "getAdverts",
      usersList: "usersList"
    }),
    eventsSrt: function() {
     this.events.sort((a,b) => (a.DateFrom > b.DateFrom) ? 1 : ((b.DateFrom > a.DateFrom) ? -1 : 0)); 

    let addDays = function(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
          }

    let filteredEvents = this.events.filter(function(oItem){
        return oItem.DateFrom > new Date() && oItem.DateFrom < addDays(new Date(), 7);
      });

  return filteredEvents;
    }
  },
  methods: {
    ...mapActions([
      "geoLoc",
      "getWeatherData",
      "getToday",
      "getNews",
      "xmlToJson",
      "getArticles",
      "updateAdvert"
    ]),
    setDateTo(event) {
      if (event.DateTo <= event.DateFrom) {
        return moment(event.DateFrom).format("DD-MM-YYYY");
      } else {
        return (
          moment(event.DateFrom).format("DD-MM-YYYY") +
          " - " +
          moment(event.DateTo).format("DD-MM-YYYY")
        );
      }
    },
    showMenu(event) {
      let obj = { window, event };
      this.$store.dispatch("setSideMenu", obj);
    },
    newMessage() {
      this.$store.commit("SET_SHOW_NEW_MESSAGE_DIALOG", true);
    },
    editAdvert(advert) {
      this.beforeEditingCache = utils.createClone(advert);
      this.editMode = true;
    },
    saveAdvert(index) {
      this.editMode = false;
      this.$store.dispatch("updateAdvert", index)
      // this.updateAdvert();
    },
    removeAdvert(advertId) {
      this.$store.dispatch('removeAdvert', advertId)
      // this.advertsList.splice(index, 1);
       this.editMode = false;
    },
    cancelEditing(index) {
      this.advertsList[index] = this.beforeEditingCache;
      this.beforeEditingCache = {};
      this.editMode = false;
    },
    validateAdvert(advert) {
      this.isAdvertValid =
        advert.Message === "" || advert.ValidTo === null ? false : true;
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("DD.MM.YYYY")
        : "-";
    },
    checkAuthor(author) {
      let isAuthor = localStorage.getItem("id") === author ? true : false;
      return isAuthor;
    },
    formatAuthorName(authorId) {
      for (let i = 0; i < this.usersList.length; i++) {
        if (authorId === this.usersList[i].UserAlias) {
          return this.usersList[i].Fullname;
        }
      }
    },
    /* Slides */
    nextSlide(n) {
      this.editMode = false;
      this.runCarosuel((this.slideIndex += n));
    },
    currentSlide(n) {
      this.runCarosuel((this.slideIndex = n));
    },
    runCarosuel(n) {
      var slides = document.getElementsByClassName("advItem");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[this.slideIndex - 1].style.display = "flex";
    },
    startStopSlider(evt) {
      // this.repeatSlider = false;
      if (evt.target.innerText === this.start) {
        evt.target.innerText = this.stop;
        this.sliderToast = "Uruchomiono slider";
        this.interval = setInterval(() => {
          this.slideIndex += 1;
          this.runCarosuel(this.slideIndex);
        }, 4000);
      } else {
        evt.target.innerText = this.start;
        this.sliderToast = "Zatrzymano slider";
        clearInterval(this.interval);
      }

      this.$store.dispatch("displayToast");
    }
  }
};
</script>

<style scoped>
</style>
