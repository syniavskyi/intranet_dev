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
            <p class="content-header-title">{{ $t("header.calendar") }}</p>
          </div>
        </div>
        <div class="calendar-tiles">
          <div class="calendar-in-row">
            <div class="cal-and-fils">
              <div>
                <v-date-picker mode='single' :min-date="new Date()" v-model="selectedValue" :attributes="attributes" is-inline @dayclick='dayClicked'/>
              </div>
              <div class="cal-filters">
                <div class="cd-for-select">
                  <select required class="cd-select" v-model="filters.branch">
                    <option v-for="branch in branchList" :key="branch.Key" :value="branch.Key">{{ branch.Value }}</option>
                  </select>
                  <label class="cd-slabel">{{ $t("label.branch") }}</label>
                </div>
                <div class="cd-for-select">
                  <select required class="cd-select" v-model="filters.department">
                    <option v-for="department in departmentList" :key="department.Key" :value="department.Key">{{ department.Value }}</option>
                  </select>
                  <label class="cd-slabel">{{ $t("label.department") }}</label>
                </div>
                <div class="cd-for-select">
                  <select required class="cd-select" v-model="filters.employee">
                    <option v-for="user in usersList" :value="user.UserAlias" :key="user.UserAlias">
                      {{ user.Fullname }}
                    </option>
                  </select>
                  <label class="cd-slabel">{{ $t("label.employee") }}</label>
                  <button class="func-btn cal-btn" @click="clearFilters">{{ $t("button.clear") }}</button>
                </div>
              </div>
            </div>
            <div v-if='selectedDay' class="calendar-tile">
              <div class="add-event-header">
                <h3 class="add-event-title">{{ selectedDay.date.toLocaleDateString() }}</h3>
                <button @click="openDialog" class="button add-button">{{ $t("button.add") }}</button>
              </div>
              <div class="add-event-content">
                <ul class="selected-day">
                  <li v-for='attr in filterEventForDay' :key='attr.EventId' class="li-event">
                    <div class="low-prio-event" v-if="attr.Priority=='L'"> </div>
                    <div class="medium-prio-event" v-if="attr.Priority=='M'"> </div>
                    <div class="high-prio-event" v-if="attr.Priority=='H'"> </div>
                    <div class="event-attr">
                      <div class="event-time">
                        <div class="evt-desc"> {{ $t("label.shortTime")}} {{ formatTime(attr.EventTime)}} </div>
                        <div class="evt-desc"> {{ formatDate(attr) }} </div>
                      </div>
                      <div class="event-attr-header">{{ attr.EventName }}</div>
                      <div class="evt-desc"> {{ attr.Description}} </div>
                      <div class="evt-type"> {{ attr.EventTypeName }} </div>
                      <div class="evt-priv"> {{ attr.EventPrivacy }} </div>
                    </div>
                    <div class="events-buttons">
                      <button class="cal-btn-edit" :disabled="attr.CreatedBy !== loginAlias && authType !== '*'" @click="editEventClick(attr, $t)">{{ $t("button.edit") }}</button>
                      <button class="cal-btn-del" :disabled="attr.CreatedBy !== loginAlias && authType !== '*'" @click="deleteEvent(attr, $t)">{{ $t("button.delete") }}</button>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Modal for add event -->
            <event-form v-if="dialogEvent" :selected-value="selectedValue" :display-save-button="displaySaveButton"></event-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import i18n from "../../lang/lang";
import Menu from "../Menu.vue";
import Form from "../dialogs/EventFormDialog";
import { mapGetters, mapActions } from "vuex";
import Modal from '../dialogs/MessageLogDialog';
const utils = require("../../utils");

export default {
  data() {
    return {
      selectedValue: null,
      selectedDay: null,
      isSelected: false,
      selectedUser: false,
      selectedGroup: false,
      displaySaveButton: true,
      loginAlias: this.$store.getters.getLoginAlias || localStorage.getItem("id")
    };
  },
  created() {
    let oStore = this.$store;
      oStore.commit('SET_PROMISE_TO_READ', oStore.getters.getEventsToRead);
      oStore.dispatch('getData', null);
      utils.checkAuthLink(this.$router, oStore.getters.getUserAuth.ZMENU);
  },
  computed: Object.assign(
    mapGetters({
      departmentList: "getTargetGroup",
      branchList: "getBranchList",
      events: "getAllEvents",
      addEvent: "getEventToChange",
      usersList: "usersList",
      displayMenu: "getShowMenu",
      displayOverlay: "getShowMenuOverlay",
      filters: "getClearedFilters",
      userData: "getUserInfo",
      authType: "getCalendarAuth",
      dialogEvent: "getDialogEvent"
    }), {
      filteredEvents() {
      let aEvents = this.events,
        aFilters = this.filters;
      let aFilteredEvents = [];
      if (
        aFilters.branch === null &&
        aFilters.department === null &&
        aFilters.employee === null
      ) {
        return aEvents;
      } else {
        let fnFilter;
        if (aFilters.department && aFilters.branch && aFilters.employee) {
          fnFilter = function(oItem) {
            return (
              oItem.TargetGroup.includes(aFilters.department) &&
              oItem.Branch.includes(aFilters.branch) &&
              oItem.Employee.includes(aFilters.employee)
            );
          };
        } else if (aFilters.department && aFilters.branch) {
          fnFilter = function(oItem) {
            return (
              oItem.TargetGroup.includes(aFilters.department) &&
              oItem.Branch.includes(aFilters.branch)
            );
          };
        } else if (aFilters.branch && aFilters.employee) {
          fnFilter = function(oItem) {
            return (
              oItem.Branch.includes(aFilters.branch) &&
              oItem.Employee.includes(aFilters.employee)
            );
          };
        } else if (aFilters.branch) {
          fnFilter = function(oItem) {
            return oItem.Branch.includes(aFilters.branch);
          };
        } else if (aFilters.department) {
          fnFilter = function(oItem) {
            return oItem.TargetGroup.includes(aFilters.department);
          };
        } else if (aFilters.employee) {
          fnFilter = function(oItem) {
            return oItem.Employee.includes(aFilters.employee);
          };
        }
        if (fnFilter) {
          aEvents = aEvents.filter(fnFilter);
        }
      }
      return aEvents;
    },
    // events filter by clicked day
    filterEventForDay() {
      let aEvents = this.events;
      let fnFilter;
      let day = this.selectedDay.date;

        fnFilter = function(oItem) {
            return oItem.DateFrom <= day.setHours(1) && day.setHours(1) <= oItem.DateTo;
          };
      return aEvents = aEvents.filter(fnFilter)   
    },
    // calendar attributes
    attributes() {
      return this.filteredEvents.map(t => ({
        dot: {
          backgroundColor: t.color
        },
        highlight: {
          backgroundColor: t.color
        },
        dates: {
          start: t.DateFrom,
          end: t.DateTo
        },
        customData: t,
        popover: {
          label: t.EventName
        }
      }));
    }
    }
  ),
  components: {
    "app-menu": Menu,
    "modal": Modal,
    "event-form": Form
  },
  methods: Object.assign(
    mapActions([
      "clearForm",
      "clearFilters",
      "editEvent",
      "performDialog"
    ]), {
      showMenu(event) {
      let obj = { window, event };
      this.$store.dispatch("setSideMenu", obj);
    },
    // day cklicked on v-calendar
    dayClicked(day) {
      this.selectedDay = day;
    },
    // modal for new event
    openDialog() {
      this.clearForm();
      this.performDialog();
      this.displaySaveButton = true;
    },
    //open modal and assign data in edited event
    editEventClick(data) {
      this.performDialog();
      let editedData = data;
      Object.assign(this.addEvent, editedData);
      this.displaySaveButton = false;
    },
    deleteEvent(data) {
      let editedData = data;
      editedData.Action = 'D'
      Object.assign(this.addEvent, editedData);
      this.editEvent(editedData);
    },
    formatDate(event) {
      if (event.DateTo <= event.DateFrom) {
        return moment(event.DateFrom).format("DD.MM");
      } else {
        return (
          moment(event.DateFrom).format("DD.MM") +
          " - " +
          moment(event.DateTo).format("DD.MM")
        );
      }
    },
    formatTime(time) {
      return time.slice(0, 5);
    }
  }
  )
};
</script>