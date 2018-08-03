import axios from 'axios'
import router from '@/router/index.js'
import { stat } from 'fs';

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
    TargetGroup:  '',
    EventPrivacy:  '',
    color: '',
    EventTypeName: '' 
  },
  event: {},
  aEvents: [],
  aFilters: [],
  // todos: [],
  aPriority: [],
  aEventType: [],
  editedData: {}
  // attributes: null
};

const mutations = {
  SET_COLOR_PRIORITY(state, data) {
    state.priorityColor = data;
  },
  GET_EVENT(state, data) {
    state.event = data;
},
  GET_EVENTS(state, data) {
    state.aEvents = data;
  },
  SET_EVENTS(state, data) {
    state.aEvents = data;
  },
  GET_PRIORITY(state, data) {
    state.aPriority = data;
  },
  GET_EVENT_TYPE(state, data) {
    state.aEventType = data;
  },
  GET_NEW_EVENT(state, data) {
    state.events = data;
  },
  GET_EDITED_DATA(state, data) {
    state.editedData = data;
  },
  SET_DATE_FROM(state, data) {
    state.selectedDate = data;
  },
  CLEAR_DATA(state, data) {
    state.addEvent = data;
  }
  // GET_BRANCH(state, data) {
  //   state.aBranch = data;
  // },
  // GET_DEPARTMENT(state, data) {
  //   state.aDepartment = data;
  // },
  // SET_ATTRIBUTES(state, data) {
  //   state.attributes = data;
  // }
}

const actions = {
  setColorPriority({state, commit}) {
    let color = '';
    let prior = state.addEvent.Priority;

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
  getEvent({commit}) {
    axios({
      method: 'GET',
      url: 'Events' + '(' + "'006'" + ')',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oEvent = res.data.d.results;
      oEvent.EventTime = oEvent.slice(2, 4) + ':' + oEvent.slice(5, 7) + ':' + oEvent.slice(8, 10)
      commit('GET_EVENT', oEvent);
    }).catch(error => { 
      console.log(error);
     })
},
getEvents({commit, dispatch}) {
    axios({
      method: 'GET',
      url: 'Events',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oEvents = res.data.d.results;
      commit('GET_EVENTS', oEvents);
      dispatch('convertDate');
      dispatch('setColor')
    }).catch(error => { 
      console.log(error);
    })
},
convertDate({state, commit}) {
  let oEvents = state.aEvents;
  for(let i = 0; i<oEvents.length; i++) {
    let milisc = parseInt(oEvents[i].DateFrom.slice(6, 19));
    oEvents[i].DateFrom = new Date(milisc);
    oEvents[i].EventTime = oEvents[i].EventTime.slice(2, 4) + ':' + oEvents[i].EventTime.slice(5, 7) + ':' + oEvents[i].EventTime.slice(8, 10);
    if(oEvents[i].DateTo) {
    let miliscTo = parseInt(oEvents[i].DateTo.slice(6, 19));
      oEvents[i].DateTo = new Date(miliscTo);
    }
    commit('SET_EVENTS', oEvents);
  }
},
setColor({commit, state}){
     const aEvents = state.aEvents;
     for(let i = 0; i<aEvents.length; i++) {
        if(aEvents[i].Priority == "L") {
            aEvents[i].color = '#fde997';
          } else if (aEvents[i].Priority == "M") {
            aEvents[i].color =='#fc9354';
          } else {
             aEvents[i].color = '#ff6666';
          }
        }
     commit('SET_EVENTS', aEvents)
  },
  addNewEvent({state, dispatch}) {
     state.addEvent.DateFrom = state.selectedDate;
     dispatch('setColorPriority');
    let newData = new Object(state.addEvent);
    if(!newData.DateTo) {
       newData.DateTo = newData.DateFrom;
     } 
     let bodyFormData = new FormData();
     bodyFormData.set('CreatedBy', newData.CreatedBy)
    axios({
      method: 'POST',
      url: 'Events',
      // auth: {
      //   username: 'psy',
      //   password: 'ides01'
      // },

      // CreatedBy: newData.CreatedBy,
      // DateFrom: newData.DateFrom, 
      // EventPrivacy: newData.EventPrivacy,
      // Branch: newData.Branch,
      // Description: newData.Description,
      // Department: newData.Department,
      // EventName: newData.EventName,
      // DateTo: newData.DateTo,
      // Employee: newData.Employee,
      // EventTime: newData.EventTime,
      // Priority: newData.Priority,
      // EventType: newData.EventType

      // headers: {
      //   "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      //   "X-CSRF-Token":"Fetch",
      //   'X-Custom-Header': 'foobar',
      //   'X-My-Custom-Header': 'foo',
      //   // 'Content-Type': 'application/json;charset=UTF-8',
      //   "Access-Control-Allow-Origin": "*",
      // },
      data: {
        bodyFormData
      },
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(res => {
      let c = res.config;
    }).catch(error => { 
      console.log(error);
    })
     state.addEvent.color = state.priorityColor
     state.aEvents.push(newData);
      
  },
  editEvent({commit, state}) {
    let editedData = state.addEvent;
    axios({
      method: 'PUT',
      url: 'Events' + "('" + editedData.EventId + "')",
      //  auth: {
      //   username: 'psy',
      //   password: 'ides01'
      // }
      // CreatedBy: editedData.CreatedBy,
      // DateFrom: editedData.DateFrom, 
      // EventPrivacy: editedData.EventPrivacy,
      // EventId: editedData.EventId,
      // Branch: editedData.Branch,
      // Description: editedData.Description,
      // Department: editedData.Department,
      // EventName: editedData.EventName,
      // DateTo: editedData.DateTo,
      // Employee: editedData.Employee,
      // EventTime: editedData.EventTime,
      // Priority: editedData.Priority,
      // EventType: editedData.EventType,
      // auth: {
      //   username: 'psy',
      //   password: 'ides01'
      // },
      // headers: {
      //   "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      // }
    }).then(res => {
      // i co dalej
      // let aPriority = res.data.d.results;
      // commit('GET_PRIORITY', aPriority);
    }).catch(error => { 
      console.log(error);
    })

  },
  removeEvent({commit, state}) {
    let editedData = state.addEvent;
    let aEvents = state.aEvents;
    let pos = aEvents.findIndex(x => x.EventId === editedData.EventId);
    let pos2 = aEvents.find(x => x.EventId === editedData.EventId).foo;
    axios({
      method: 'DELETE',
      url: 'Events' + "('" + editedData.EventId + "')",
      // auth: {
      //   username: 'psy',
      //   password: 'ides01'
      // },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
        state.aEvents.splice(pos, 1)
    }).catch(error => { 
      console.log(error);
    })
  },
  clearForm({commit, state}) {
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
  getPriority({commit}) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq 'ZINTRANET_PRIORITY'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let aPriority = res.data.d.results;
      commit('GET_PRIORITY', aPriority);
    }).catch(error => { 
      console.log(error);
    })
  },
  getEventType({commit}) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq 'ZINTRANET_EVENT_TYPE'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let aEventType = res.data.d.results;
      console.log(res.data.d.results);
      commit('GET_EVENT_TYPE', aEventType);
    }).catch(error => { 
      console.log(error);
    })
  },
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
 attributes(state) {
    return state.attributes;
 },
 priorities(state) {
   return state.aPriority;
 },
 eventTypes(state) {
   return state.aEventType;
 },
 addEvent(state) {
   return state.addEvent;
 }
//  branches(state) {
//    return state.aBranch;
//  },
//  departments(state) {
//    return state.aDepartment;
//  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
