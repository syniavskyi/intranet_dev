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
                            <div class="advItem" v-for="(advert, index) in userAdverts" :key="advert.Id" :id="advert.Id">  
                                <textarea class="n-textarea" disabled v-model="advert.Message"/> 
                                <v-date-picker class="cd-range" popoverDirection="bottom" is-expanded mode="single" v-model="advert.ValidTo"  :min-date="new Date()">
                                    <!-- <input class="cd-range" v-model="advert.ValidTo" value="advert.ValidTo"/> -->
                                    <input v-model="advert.ValidTo" value="advert.ValidTo"/>
                                </v-date-picker>
                                <div class="advBtns">
                                    <button class="clear-btn" @click="editAdvert(index)">edytuj</button> 
                                    <button class="oclear-btn" @click="removeAdvert(index)">X</button>
                                </div>
                                <button @click="nextSlide(-1)" class="advLeft">&#8249;</button>
                                <button @click="nextSlide(1)" class="advRight">&#8250;</button>
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
                            <div v-for="(event, index) in events" :key='index' class="single-event"> 
                                <div>{{event.EventTypeName}} </div>
                                <div>{{ event.EventName }}</div>
                                <div>{{setDateTo(event)}} </div>
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
import axios from "axios";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import i18n from "../../lang/lang";
import moment from "moment";
import Toast from "../dialogs/Toast"
import NewMessageDialog from "../dialogs/NewMessageDialog"
export default {
    data() {
        return {
            newAdvert: null,
            slideIndex: 1,
            repeatSlider: true,
            interval: "",
            stop: "Zatrzymaj slider",
            start: "Uruchom slider",
            sliderToast: "Zatrzymano slider"
        }
    },
    mounted() {
        this.$nextTick(()=> { 
            this.runCarosuel(this.slideIndex)
            this.interval = setInterval(() => {this.slideIndex+=1; this.runCarosuel(this.slideIndex)}, 4000) }) 
            this.$store.commit("SET_DISPLAY_LOADER", false)
    },
    beforeCreate() {
        this.$store.dispatch("geoLoc");
        this.$store.dispatch("getNews")
    },
    created() {
        this.getToday()
        // this.getNews()
    },
    destroyed() {
        clearInterval(this.interval);
    },
    components: {
        "app-menu": Menu,
        "toast": Toast,
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
            userAdverts: "userAdverts",
            displayMenu: "getShowMenu",
            displayOverlay: "getShowMenuOverlay",
            events: "getEvents",
            showToast: "getDisplayToast",
            showNewMessage: "getShowNewMessageDialog",
            userAdverts: "getAdverts" }),
    },
    methods: {
        ...mapActions(["geoLoc", "getWeatherData", "getToday", "getNews", "xmlToJson", "getArticles"]),
        setDateTo(event) {
            if(event.DateTo <= event.DateFrom) {
                return  moment(event.DateFrom).format("DD-MM-YYYY");
            } else {
                return moment(event.DateFrom).format("DD-MM-YYYY") + ' - ' + moment(event.DateTo).format("DD-MM-YYYY");
            }
        },
        showMenu(event) {
            let obj = {window, event}
            this.$store.dispatch("setSideMenu", obj);
        },
        newMessage() {
            this.$store.commit("SET_SHOW_NEW_MESSAGE_DIALOG", true)
        },
        /* Slides */
        nextSlide(n) {
            this.runCarosuel(this.slideIndex += n)
        },
        currentSlide(n) {
            this.runCarosuel(this.slideIndex = n)
        },
        runCarosuel(n) {
            var slides = document.getElementsByClassName("advItem");  
            if (n > slides.length) { this.slideIndex = 1 }
            if (n < 1) { this.slideIndex = slides.length } 
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; 
            }  
            slides[this.slideIndex - 1].style.display = "flex";
        },
        startStopSlider(evt) {
            // this.repeatSlider = false;
            if (evt.target.innerText === this.start) { 
                evt.target.innerText = this.stop
                this.sliderToast = "Uruchomiono slider"
                this.interval = setInterval(() => {this.slideIndex+=1; this.runCarosuel(this.slideIndex)}, 4000)
            } else { 
                evt.target.innerText = this.start
                this.sliderToast = "Zatrzymano slider"
                clearInterval(this.interval)
            }
            
            this.$store.dispatch("displayToast");
        }
    }
}
</script>

<style scoped>

</style>
