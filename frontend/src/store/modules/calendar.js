import axios from 'axios'
import odata from 'odata';

let utils = require('../../utils');

const state = {
  priorityColor: '',
  selectedDate: null,
  addEvent: {
    EventName: '',
    EventTime: null,
    DateFrom: null,
    DateTo: null,
    Description: '',
    Priority: '',
    EventType: '',
    TargetGroup: [],
    EventPrivacy: '',
    color: '',
    EventTypeName: '',
    Employee: []
  },
  clearedFilters: {
    branch: null,
    department: null,
    employee: null
  },
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
  SET_CLEARED_DATA(state, data) {
    state.addEvent = data;
  },
  SET_CLEARED_FILTERS(state, data) {
    state.clearedFilters = data;
  }
}

const actions = {
  // set color for new event
  setColorPriority({
    getters,
    commit
  }) {
    let color = '';
    let prior = getters.getEventToChange.Priority;

    switch (prior) {
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
  getEvents({
    commit,
    dispatch,
    getters
  }) {
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
      oEvents = utils.formatToArray(oEvents)
      dispatch('convertDate');
      dispatch('setColor')
    }).catch(error => {
      console.log(error);
    })
  },
  convertDate({
    getters,
    commit
  }) {
    let oEvents = getters.getEvents;
    for (let i = 0; i < oEvents.length; i++) {
      oEvents[i].DateFrom = utils.dateStringToObj(oEvents[i].DateFrom);
      oEvents[i].DateTo = oEvents[i].DateTo ? utils.dateStringToObj(oEvents[i].DateTo) : oEvents[i].DateFrom
      oEvents[i].EventTime = utils.formatTimeForCalendar(oEvents[i].EventTime);
    }
    commit('SET_EVENTS', oEvents);
  },
  // set colors for downloaded data
  setColor({
    commit,
    getters
  }) {
    const aEvents = getters.getEvents;
    for (let i = 0; i < aEvents.length; i++) {
      if (aEvents[i].Priority == "L") {
        aEvents[i].color = '#fde997';
      } else if (aEvents[i].Priority == "M") {
        aEvents[i].color = '#fc9354';
      } else {
        aEvents[i].color = '#ff6666';
      }
    }
    commit('SET_EVENTS', aEvents);
  },
  addNewEvent({
    getters,
    dispatch
  }) {
    //  const eventData = getters.getEventToChange;

    //  this.$store.commit('SET_CLEARED_DATA', utils.createClone(editedData))
    let eventData = utils.createClone(editedData);
    eventData.DateFrom = utils.formatDateForBackend(getters.getSelectedDate);
    eventData.DateTo = !eventData.DateTo ? eventData.DateFrom : utils.formatDateForBackend(eventData.DateTo)
    eventData.EventTime = utils.formatTimeForBackend(eventData.EventTime);

    dispatch('setColorPriority');
    eventData = utils.formatToString(eventData);
    // jeszcze URL
    odata('Events').post(eventData).save(function (data) {
      console.log("Working");
    }, function (status) {
      console.error(status);
    });

    state.addEvent.color = state.priorityColor
    state.aEvents.push(eventData);

  },
  editEvent({
    commit,
    getters
  }) {
    // let eventData = getters.getEventToChange;

    let eventData = utils.createClone(getters.getEventToChange);

    let aEvents = getters.getEvents;
    let pos = aEvents.findIndex(x => x.EventId === eventData.EventId);
    //aEvents[pos] = eventData;
    eventData.DateFrom = utils.formatDateForBackend(eventData.DateFrom);
    eventData.DateTo = utils.formatDateForBackend(eventData.DateTo);

    if (eventData.EventTime) {
      eventData.EventTime = utils.formatTimeForBackend(eventData.EventTime);
    }
    //dispatch('getEvents');
    eventData = utils.formatToString(eventData);
    commit('SET_EVENTS', aEvents);
    let query = getters.getUrlQuery
    const url = 'Events' + '(' + "EventId='" + eventData.EventId + "')" + query
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
  removeEvent({
    commit,
    state,
    dispatch
  }) {
    let eventData = state.addEvent,
      aEvents = state.aEvents,
      query = getters.getUrlQuery,
      pos = aEvents.findIndex(x => x.EventId === eventData.EventId),
      url = 'Events' + '(' + "EventId='" + eventData.EventId + "')" + query

    odata(url).remove().save(function (data) {
      aEvents.splice(pos, 1);
      commit('SET_EVENTS', aEvents);
    }, function (status) {
      console.error(status);
    })
  },
  clearForm({
    commit
  }) {
    let clearForm = {
      EventName: null,
      EventTime: null,
      DateFrom: null,
      DateTo: null,
      Description: null,
      Priority: null,
      EventType: null,
      TargetGroup: [],
      Employee: [],
      EventPrivacy: null,
      color: null
    };
    commit('SET_CLEARED_DATA', clearForm);
  },
  clearFilters({
    commit
  }) {
    let aFilters = {
      branch: null,
      department: null,
      employee: null
    }
    commit('SET_CLEARED_FILTERS', aFilters);
  },
};

const getters = {
  priorityColor() {
    return state.priorityColor;
  },
  getEvents(state) {
    return state.aEvents;
  },
  getPriorities(state) {
    return state.aPriority;
  },
  getEventTypes(state) {
    return state.aEventType;
  },
  getEventToChange(state) {
    return state.addEvent;
  },
  getClearedFilters(state) {
    return state.clearedFilters;
  },
  getSelectedDate(state) {
    return state.selectedDate
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
