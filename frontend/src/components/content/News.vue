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
            <div class="content-weather">
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
                  <img src="../../assets/images/weather/temps.png" height="32px" class="iconTemp"/>
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
            <p>news</p>
            <div id="articles"></div>
          <!-- halo -->
           <!-- <script type="text/javascript" language="javascript" >
            <a href="https://www.rssdog.com/index.php?url=http%3A%2F%2Ffakty.interia.pl%2Ffeed&amp;mode=javascript&amp;showonly=&amp;maxitems=7&amp;showdescs=1&amp;desctrim=0&amp;descmax=0&amp;tabwidth=100%25&amp;excltitle=1&amp;xmlbtn=1&amp;linktarget=_blank&amp;textsize=inherit&amp;bordercol=%23d4d0c8&amp;headbgcol=%23FFB05C&amp;headtxtcol=%23ffffff&amp;titlebgcol=%23f1eded&amp;titletxtcol=%23000000&amp;itembgcol=&amp;itemtxtcol=%23000000&amp;ctl=0"></a>
       </script>   halo -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../Menu.vue';
import axios from 'axios';
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import i18n from '../../lang/lang';
  export default { 
     beforeCreate(){
      this.$store.dispatch("geoLoc");
     },
     created() {
        this.getToday();
        this.xmlToJson("https://www.tvn24.pl/najnowsze.xml");
     },
    components: {
    'app-menu': Menu,
  },
    computed: {
      ...mapGetters([
        'geoLocation2',
        'weatherData',
        'today'
      ]),
    },
    methods: {
     ...mapActions([
       'geoLoc',
       'getWeatherData',
       'getToday'
     ]),

      xmlToJson(xmlTxt) {
  // Create the return object
  var URL3 = 'http://fakty.interia.pl/feed'
  var URL4 = 'https://www.tvn24.pl/najnowsze.xml'
     axios.get('http://www.polsatnews.pl/rss/wszystkie.xml').then(res => {
        console.log(res)
        const data = res.data
        });
// https://www.tvn24.pl/najnowsze.xml
// http://fakty.interia.pl/feed

	//   var obj = {};
  //   var xml = new DOMParser().parseFromString(xmlTxt, 'text/xml');

  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(xmlTxt, 'text/xml');

	// if (xml.nodeType == 1) { // element
	// 	// do attributes
	// 	if (xml.attributes.length > 0) {
	// 	obj["@attributes"] = {};
	// 		for (var j = 0; j < xml.attributes.length; j++) {
	// 			var attribute = xml.attributes.item(j);
	// 			obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
	// 		}
	// 	}
	// } else if (xml.nodeType == 3) { // text
	// 	obj = xml.nodeValue;
	// }

	// // do children
	// // If just one text node inside
	// if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
	// 	obj = xml.childNodes[0].nodeValue;
	// }
	// else if (xml.hasChildNodes()) {
	// 	for(var i = 0; i < xml.childNodes.length; i++) {
	// 		var item = xml.childNodes.item(i);
	// 		var nodeName = item.nodeName;
	// 		if (typeof(obj[nodeName]) == "undefined") {
	// 			obj[nodeName] = xmlToJson(item);
	// 		} else {
	// 			if (typeof(obj[nodeName].push) == "undefined") {
	// 				var old = obj[nodeName];
	// 				obj[nodeName] = [];
	// 				obj[nodeName].push(old);
	// 			}
	// 			obj[nodeName].push(xmlToJson(item));
	// 		}
	// 	}
	// }
	// return obj;
}
    },
  }
</script>


<style>
</style>
