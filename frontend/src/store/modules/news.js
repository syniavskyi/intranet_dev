import axios from 'axios'
import router from '@/router/index.js'
import i18n from '../../lang/lang';

const state = {
    geoLoca: {
        lat: null,
        len: null
    },
    weather: {
        lat: '',
        lon: '',
        town: '',
        celcius: '',
        description: '',
        icon: '',
        clouds: '',
        wind: '',
        humidity: ''
    },
    todayDate: {
        today: null,
        dayDesc: null
    }
}

const mutations = {
    SET_LOCATION(state, data) {
        state.geoLoca = data;
    },
    ADD_WEATHER_DATA(state, data) {
        state.weather = data;
    },
    ADD_TODAY(state, data) {
        state.todayDate = data;
    } 
}

const actions = {
    geoLoc({commit, state, dispatch}) {
        var geo = navigator.geolocation;
        if(geo) {
          geo.getCurrentPosition(function(location) {
            var geoLocat = {
                lat: 0,
                len: 0
            }
            geoLocat.lat = (location.coords.latitude.toFixed(2));
            geoLocat.len = (location.coords.longitude.toFixed(2));
            console.log('szerokość ' + geoLocat.lat);
            console.log('długość ' + geoLocat.len);
            commit('SET_LOCATION', geoLocat);
            if(geoLocat) {
                dispatch("getWeatherData");
            }
          });   
        }
        else {
          console.log("nie");
          // jak nie, to wrocław
        }
      },
    getWeatherData({commit, state}) {
        var URL2 = 'http://api.openweathermap.org/data/2.5/weather?lat='+state.geoLoca.lat+'&lon='+state.geoLoca.len+'&appid=fd3f4877eb8823c22505c4b89a434e2b&units=metric'
         axios.get(URL2).then(res => {
         console.log(res)
         const data = res.data
         const weather = {}
         weather.lon = data.coord.lon
         weather.lat = data.coord.lat
         weather.town = data.name
         weather.celcius = data.main.temp
        //  weather.description = data.weather[0].description /opis po ang
         weather.icon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
         weather.clouds = data.clouds.all
         weather.wind = ((data.wind.speed) * (3,6)).toFixed(2)
         weather.humidity = data.main.humidity
         commit('ADD_WEATHER_DATA', weather);
         })
      },
      getToday({commit, state}){
          var todayDate= {};
          todayDate.today = new Date();
          var today3 = todayDate.today.getDate();
          var month = (todayDate.today.getMonth() + 1);
          if(month<10){
              month = "0"+ month;
          }
          var year = todayDate.today.getFullYear();
          var today2 = todayDate.today.getDay();
          todayDate.dayDesc = "";
          switch(today2) {
              case 0: todayDate.dayDesc = i18n.t("news.sunday"); break;
              case 1: todayDate.dayDesc = i18n.t("news.monday"); break;
              case 2: todayDate.dayDesc = i18n.t("news.tuesday"); break;
              case 3: todayDate.dayDesc = i18n.t("news.wednesday"); break;
              case 4: todayDate.dayDesc = i18n.t("news.thursday"); break;
              case 5: todayDate.dayDesc = i18n.t("news.friday"); break;
              case 6: todayDate.dayDesc = i18n.t("news.saturday"); break;
          }
          todayDate.today = today3+"."+month+"."+year;
          commit('ADD_TODAY', todayDate);
      }
}

const getters = {
    geoLocation2: state => {
        return state.geoLoca;
    },
     weatherData: state => {
         return state.weather;
     },
     today: state => {
        return state.todayDate;
     }
}

export default {
    state,
    getters,
    mutations,
    actions,
}