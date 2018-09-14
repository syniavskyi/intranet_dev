import axios from 'axios'
import moment from 'moment'
import odata from 'odata';

let utils = require('../../utils');


const state = {
  priorityColor: '',
  selectedDate: null,
  addEvent: {
    EventName: '',
    EventTime: null,
    DateFrom: null,
    DateTo:  null,
    Description:  '',
    Priority:  '',
    EventType:  '',
    TargetGroup:  [],
    EventPrivacy:  '',
    color: '',
    EventTypeName: '' ,
    Employee: []
  },
  clearedFilters: {
    branch: null,
    department: null,
    employee: null
  },
  // event: {},
  aEvents: [],
  aPriority: [],
  aEventType: [],
  editedData: {}
};

const mutations = {
  SET_COLOR_PRIORITY(state, data) {
    state.priorityColor = data;
  },
//   SET_EVENT(state, data) {
//     state.event = data;
// },
  SET_EVENTS(state, data) {
    state.aEvents = data;
  },
  SET_PRIORITY(state, data) {
    state.aPriority = data;
  },
  SET_EVENT_TYPE(state, data) {
    state.aEventType = data;
  },
  SET_DATE_FROM(state, data) {
    state.selectedDate = data;
  },
  CLEAR_DATA(state, data) {
    state.addEvent = data;
  },
  SET_CLEARED_FILTERS(state, data) {
    state.clearedFilters = data;
  }
}

const actions = {
  setColorPriority({getters, commit}) {
    let color = '';
    let prior = getters.addEvent.Priority;

    switch(prior) {
      case 'L':
        color = '#fde997';
        break;
      case 'M':
        color = '#fc9354';
        break;
      case 'H':
        color = '#ff6666';
        break;
      default:
        color: 'blue';
    }
    commit('SET_COLOR_PRIORITY', color);
  },
//   getEvent({commit}) {
//     axios({
//       method: 'GET',
//       url: 'Events' + '(' + "'006'" + ')',
//       auth: {
//         username: 'psy',
//         password: 'ides01'
//       },
//       headers: {
//         "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
//       }
//     }).then(res => {
//       let oEvent = res.data.d.results;
//       oEvent.EventTime = oEvent.slice(2, 4) + ':' + oEvent.slice(5, 7) + ':' + oEvent.slice(8, 10)
//       commit('SET_EVENT', oEvent);
//     }).catch(error => { 
//       console.log(error);
//      })
// },
getEvents({commit, dispatch, getters}) {
  let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: 'Events' + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oEvents = res.data.d.results;
      commit('SET_EVENTS', oEvents);
      dispatch('formatToArray', oEvents);
      dispatch('convertDate');
      dispatch('setColor')
    }).catch(error => { 
      console.log(error);
    })
},
convertDate({getters, commit}) {
  let oEvents = getters.events;
  for(let i = 0; i<oEvents.length; i++) {
      oEvents[i].DateFrom = utils.dateStringToObj(oEvents[i].DateFrom);
      oEvents[i].DateTo = oEvents[i].DateTo ? utils.dateStringToObj(oEvents[i].DateTo) : oEvents[i].DateFrom
      oEvents[i].EventTime = utils.formatTimeForCalendar(oEvents[i].EventTime);
  }
  commit('SET_EVENTS', oEvents);
},
setColor({commit, getters}){
     const aEvents = getters.events;
     for(let i = 0; i<aEvents.length; i++) {
        if(aEvents[i].Priority == "L") {
            aEvents[i].color = '#fde997';
          } else if (aEvents[i].Priority == "M") {
            aEvents[i].color =='#fc9354';
          } else {
             aEvents[i].color = '#ff6666';
          }
        }
     commit('SET_EVENTS', aEvents);
  },
  addNewEvent({getters, dispatch}) {
     const eventData = getters.addEvent
     
     eventData.DateFrom = utils.formatDateForBackend(getters.getSelectedDate);
     eventData.DateTo = !eventData.DateTo ? eventData.DateFrom : utils.formatDateForBackend(eventData.DateTo)
     eventData.EventTime = utils.formatTimeForBackend(eventData.EventTime);
    
    dispatch('setColorPriority');
    dispatch('formatToString', eventData);
    
    odata('Events' + getters.getUrlQuery).post(eventData).save(function (data) {
      console.log("Working");
    }, function (status) {
      console.error(status);
    });

     state.addEvent.color = state.priorityColor
     state.aEvents.push(eventData);
      
  },
  editEvent({commit, getters, dispatch}) {
    let eventData = getters.addEvent;
    let aEvents = getters.events;
    let pos = aEvents.findIndex(x => x.EventId === eventData.EventId);
    //aEvents[pos] = eventData;
    eventData.DateFrom = utils.formatDateForBackend(eventData.DateFrom);
    eventData.DateTo = utils.formatDateForBackend(eventData.DateTo);

    if(eventData.EventTime) {
      eventData.EventTime = utils.formatTimeForBackend(eventData.EventTime);
    }
    //dispatch('getEvents');
    dispatch('formatToString', eventData);
    commit('SET_EVENTS', aEvents);
    let query = getters.getUrlQuery
    const url = 'Events' + '(' + "EventId='"+ eventData.EventId + "')" + query
    odata(url).put(eventData).save(function (data) {
      //  tak miałam, zobaczę jak będą działać zapytania
       // i co dalej
    //   // let aPriority = res.data.d.results;
    //   // dispatch('getEvents')
    //   // commit('SET_PRIORITY', aPriority);
      console.log("changed");
    }, function (status) {
      console.error(status);
    });
  },
  removeEvent({commit, state, dispatch}) {
    let eventData = state.addEvent,
        aEvents = state.aEvents, 
        query = getters.getUrlQuery,
        pos = aEvents.findIndex(x => x.EventId === eventData.EventId),
        url = 'Events' + '(' + "EventId='"+ eventData.EventId + "')" + query

    odata(url).remove().save(function (data) {
      aEvents.splice(pos, 1);
      commit('SET_EVENTS', aEvents);
    }, function (status) {
      console.error(status);
    })
  },
  clearForm({commit}) {
    let clearForm = {
          EventName: null,
          EventTime: null,
          DateFrom: null,
          DateTo:  null,
          Description: null,
          Priority: null,
          EventType: null,
          TargetGroup: null,
          EventPrivacy: null,
          color: null
         };
  commit('CLEAR_DATA', clearForm);
  },
clearFilters({commit}) {
  let aFilters = {
        branch: null,
        department: null,
        employee: null
    }
   commit('SET_CLEARED_FILTERS', aFilters);
  },
  formatToString({commit}, data) {
    let formattedData = {};
    for(let key in data) {
      if(data[key]) {
        if(data[key].constructor === Array) {
          formattedData[key] = "";
          for(let i = 0; i < data[key].length; i++) {
                if(data[key].length <= 1) {
                    formattedData[key] = data[key][i]
                }
                else {
                    formattedData[key] += data[key][i] + '||';
                }
              } 
           if(formattedData[key].includes('||')) {
                formattedData[key] = formattedData[key].slice(0, formattedData[key].length-2);
            }
            data[key] = formattedData[key];
          }
      }
    }
 },
 formatToArray({commit}, data) {
  let dataSet = data[0].__metadata.type;
  let index, string;
  let array = [];

  for(let i = 0; i < data.length; i++) {
    delete data[i].__metadata;
    for(let key in data[i]) { 
      if(data[i][key].includes('||')) {
        while(data[i][key].length > 1) {
          index = data[i][key].indexOf('||');
          if(index > 0) {
              string = data[i][key].slice(0, index);
              array.push(string);
              index += 2;
              data[i][key] = data[i][key].substr(index, data[i][key].length);
          } 
          else {
              array.push(data[i][key]);
               data[i][key] = "";
          }
        }
         data[i][key] = array;
         array = [];
      } else {
           if(dataSet == 'ZGW_INTRANET_SRV.UserSkills' && key != "UserAlias" && key != "Language") {
              array.push(data[i][key]);
              data[i][key] = array;
              array = [];
      }
      }
    }
  }  
  if(dataSet == 'ZGW_INTRANET_SRV.UserSkills') {
    commit('SET_USER_SKILLS', data[0]);
  }
 }
};

const getters = {
  priorityColor() {
    return state.priorityColor;
  },  
  event(state) {
    return state.event;
},
  events(state) { 
    return state.aEvents;
 },
 priorities(state) {
   return state.aPriority;
 },
 eventTypes(state) {
   return state.aEventType;
 },
 addEvent(state) {
   return state.addEvent;
 },
 clearedFilters(state) {
   return state.clearedFilters;
 },
 getSelectedDate(state){
   return state.selectedDate
 }
};

export default {
  state,
  mutations,
  actions,
  getters
};
