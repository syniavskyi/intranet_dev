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
            <div style="display: flex; flex-direction:column">
              <div class="calendar">
                <v-date-picker mode='single' :min-date="new Date()" v-model="selectedValue" :attributes="attributes" is-inline @dayclick='dayClicked'>
                </v-date-picker>
              </div>
              <div class="filters">
                <div class="ava-div-select-cool">
                  <select required class="ava-select-cool" v-model="filters.branch">
                    <option v-for="branch in branchList" :key="branch.Key" :value="branch.Key">{{ branch.Value }}</option>
                  </select>
                  <label class="ava-select-label-cool">{{ $t("label.branch") }}</label>
                </div>
                <div class="ava-div-select-cool">
                  <select required class="ava-select-cool" v-model="filters.department">
                    <option v-for="department in departmentList" :key="department.Key" :value="department.Key">{{ department.Value }}</option>
                  </select>
                  <label class="ava-select-label-cool">{{ $t("label.department") }}</label>
                </div>
                <div class="ava-div-select-cool">
                  <select required class="ava-select-cool" v-model="filters.employee">
                    <option v-for="user in usersList" :value="user.UserAlias" :key="user.UserAlias">
                      {{ user.Fullname }}
                    </option>
                  </select>
                  <label class="ava-select-label-cool">{{ $t("label.employee") }}</label>
                  <button @click="clearFilters">{{ $t("button.clear") }}</button>
                </div>
              </div>
            </div>
            <div class="calendar-tile">
              <div v-if='selectedDay' class="selectedDay">
                <div class="add-event-header">
                  <h3>{{ selectedDay.date.toLocaleDateString() }}</h3>
                  <button @click="openDialog" class="button modal-button add-button">{{ $t("button.add") }}</button>
                </div>
                <ul class="ul-event">
                  <li v-for='attr in selectedDay.attributes' :key='attr.customData.EventId' class="delegations-inputs-section li-event">
                    <div class="low-prio-event" v-if="attr.customData.Priority=='L'"> </div>
                    <div class="medium-prio-event" v-if="attr.customData.Priority=='M'"> </div>
                    <div class="high-prio-event" v-if="attr.customData.Priority=='H'"> </div>
                    <div class="event-attr">
                      <div class="event-time">
                        <div> {{ $t("label.shortTime")}} {{ formatTime(attr.customData.EventTime)}} </div>
                        <div> {{ formatDate(attr.customData) }} </div>
                      </div>
                      <div class="event-attr-header">  {{ attr.customData.EventName }} </div>
                      <div> {{ attr.customData.Description}} </div>
                      <div> {{ attr.customData.EventTypeName }} </div>
                      <div> {{ attr.customData.EventPrivacy }} </div>
                    </div>
                    <div class="events-buttons">
                      <button class="button edit-button" :disabled="attr.customData.CreatedBy !== loginAlias && authType !== '*'" @click="editEventClick(attr.customData, $t)">{{ $t("button.edit") }}</button>
                      <button class="button edit-button" :disabled="attr.customData.CreatedBy !== loginAlias && authType !== '*'" @click="deleteEvent(attr.customData, $t)">{{ $t("button.delete") }}</button>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Modal for add event -->
              <div class="backdrop" v-if="dialogEvent"></div>
              <div class="modal-new-m " v-if="dialogEvent">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title">{{ $t("header.addNewEvent") }}</h1>
                    <button class="modal-exit" @click="performDialog">&#10006;</button>
                  </div>
                  <div class="modal-calendar">
                    <div class="prof-input2">
                      <input required class="inputEdit2 inputProfile2 input-active" v-model="addEvent.EventName" @blur="$v.addEvent.EventName.$touch()">
                      <span class="prof-div-bar"></span>
                      <label class="label-profile2">{{ $t("label.eventTitle") }}</label>
                    </div>
                    <div class="prof-input2">
                      <input required class="inputEdit2 inputProfile2 input-active" type="time" v-model="addEvent.EventTime">
                      <label class="label-profile2">{{ $t("label.eventTime") }}</label>
                    </div>
                    <div class="prof-input2">
                      <v-date-picker required class="delegations-input-date inputProfile2 calendar-modal-date input-active" popoverDirection="" is-expanded mode="single" v-model="addEvent.DateTo" :min-date="this.selectedDay.date">
                        <input value="addEvent.DateTo"/>
                      </v-date-picker>
                      <label class="delegations-label-cool-select">{{ $t("label.endDate") }} </label>
                      <!-- <span class="prof-div-bar"></span> -->
                      <!-- <label class="label-profile2">{{ $t("label.endDate") }}</label> -->
                    </div>
                    <div class="prof-input2">
                      <input required class="inputEdit2 inputProfile2 input-active" v-model="addEvent.Description">
                      <span class="prof-div-bar"></span>
                      <label class="label-profile2">{{ $t("label.eventDescription") }}</label>
                    </div>
                    <div class="prof-input2">
                      <select required class="ava-select-cool marginForm input-active"  v-model="addEvent.Priority" @blur="$v.addEvent.Priority.$touch()">
                        <option v-for="priority in priorities" :value="priority.Key" :key="priority.Key">
                          {{ priority.Value }}
                        </option>
                      </select>
                      <label class="label-profile2">{{ $t("label.priority") }}</label>
                    </div>
                    <div class="prof-input2">
                      <select required class="marginForm ava-select-cool input-active" v-model="addEvent.EventType" @blur="$v.addEvent.EventType.$touch()">
                        <option v-for="eventType in eventTypes" :value="eventType.Key" :key="eventType.Key">
                          {{ eventType.Value }}
                        </option>
                      </select>
                      <label class="label-profile2">{{ $t("label.eventType") }}</label>
                    </div>
                    <div class="prof-input2">
                      <p class="click-paragraph">{{ $t("button.click") }}</p>
                      <button class="privacy-button marginForm" type="button" @click="isSelected = !isSelected"></button>
                      <label class="label-profile2 target-group-btn">{{ $t("label.targetGroup") }}</label>
                      <label v-if="addEvent.TargetGroup.length !== 0 || addEvent.Employee.length !== 0" class="label-profile2">{{ $t("label.selected") }}</label>
                    </div>
                    <div class="department" v-if="isSelected">
                      <label class="event-select-error" v-if="!selectedGroup && !selectedUser">{{ $t("label.selectInfo") }}</label>
                      <button class="privacy-button marginForm select-button" type="button" @click="selectedUser = !selectedUser && selectedGroup === false">{{ $t("button.selectUser") }}</button>
                      <select multiple="true" class="user-list" v-if="selectedUser" v-model="addEvent.Employee">
                        <option v-for="user in usersList" :value="user.UserAlias" :key="user.UserAlias">
                          {{ user.Fullname }}
                        </option>
                      </select>
                      <button class="privacy-button marginForm select-button" type="button" @click="selectedGroup = !selectedGroup && selectedUser === false">{{ $t("button.selectGroup") }}</button>
                        <select multiple="true" required class="user-list" v-if="selectedGroup" v-model="addEvent.TargetGroup">
                          <option v-for="group in targetGroup" :value="group.Key" :key="group.Key">
                            {{ group.Value }}
                            </option>
                        </select>
                      <button class="save-button" type="button" @click="isSelected = !isSelected">{{ $t("button.save") }}</button>
                      <button class="save-button clear-button" type="button" @click="backToModal">{{ $t("button.back") }}</button>
                    </div>
                    <div class="event-feature event-visibility">
                      <label class="modal-label">{{ $t("label.visibility") }}</label>
                      <input class="input-active" type="radio" id="prv" value="PRV" v-model="addEvent.EventPrivacy" :checked="addEvent.EventPrivacy == 'PRV'" @blur="$v.addEvent.EventPrivacy.$touch()">
                      <label for="prv">{{ $t("label.private") }}</label>
                      <input class="input-active" type="radio" id="pbl" value="PBL" v-model="addEvent.EventPrivacy" :checked="addEvent.EventPrivacy == 'PBL'" @blur="$v.addEvent.EventPrivacy.$touch()">
                      <label for="pbl">{{ $t("label.public") }}</label>
                    </div>
                  </div>
                  <div class="form-buttons">
                    <button class="button modal-button" :disabled="$v.$invalid" type="button" @click="addNewEventBtn(addEvent)" v-if="displayButton"><span class="span-arrow">{{ $t("button.addEvent") }}</span></button>
                    <button class="button modal-button" :disabled="disabledButton" @click="editForm(addEvent)">{{ $t("button.edit") }}</button>
                  </div>
                </div>
              </div>
              <!-- End modal for add event -->
            </div>
          </div>
          <!-- koniec rowa -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { required } from "vuelidate/lib/validators";
import i18n from "../../lang/lang";
import Menu from "../Menu.vue";
import { mapGetters, mapActions } from "vuex";
const utils = require("../../utils");

export default {
  data() {
    return {
      selectedValue: null,
      selectedDay: null,
      dialogEvent: false,
      isSelected: false,
      selectedUser: false,
      selectedGroup: false,
      checkedNames: "",
      disabledButton: true,
      displayButton: true,
      permission: false,
      loginAlias: this.$store.getters.getLoginAlias || localStorage.getItem("id")
    };
  },
  validations: {
    addEvent: {
      EventName: {
        required
      },
      Priority: {
        required
      },
      EventType: {
        required
      },
      EventPrivacy: {
        required
      }
    }
  },
  created() {
    let oStore = this.$store;
      oStore.commit('SET_PROMISE_TO_READ', oStore.getters.getEventsToRead);
      oStore.dispatch('getData', null);
  },
  computed: {
    ...mapGetters({
      departmentList: "getTargetGroup",
      branchList: "getBranchList",
      eventTypes: "getEventTypes",
      priorities: "getPriorities",
      events: "getAllEvents",
      addEvent: "getEventToChange",
      usersList: "usersList",
      targetGroup: "getTargetGroup",
      displayMenu: "getShowMenu",
      displayOverlay: "getShowMenuOverlay",
      filters: "getClearedFilters",
      userData: "getUserInfo",
      authType: "getCalendarAuth",
      permissionToEditEvent: "getPermissionToEditEvent"
    }),
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
              oItem.Department.includes(aFilters.department) &&
              oItem.Branch.includes(aFilters.branch) &&
              oItem.Employee.includes(aFilters.employee)
            );
          };
        } else if (aFilters.department && aFilters.branch) {
          fnFilter = function(oItem) {
            return (
              oItem.Department.includes(aFilters.department) &&
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
            return oItem.Department.includes(aFilters.department);
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
  },
  components: {
    "app-menu": Menu
  },
  methods: {
    ...mapActions([
      "clearForm",
      "addNewEvent",
      "clearFilters",
      "editEvent",
      "formatToArray"
    ]),

    showMenu(event) {
      let obj = { window, event };
      this.$store.dispatch("setSideMenu", obj);
    },
    // trigger function from js to adjust data for backend
    editForm(data) {
      data.Action = 'U';
      this.editEvent(data);
      this.editEventClick(data);
      let pos = this.selectedDay["attributes"].findIndex(x => x.customData.EventId === data.EventId);
      this.selectedDay["attributes"][pos].customData = data;
    },
    dayClicked(day) {
      this.selectedDay = day;
    },
    // modal for new event
    openDialog() {
      this.clearForm();
      this.performDialog();
      this.displayButton = true;
    },
    performDialog() {
      this.dialogEvent = !this.dialogEvent;
    },
    //open modal and assign data in edited event
    editEventClick(data) {
      this.performDialog();
      let editedData = data;
      // this.$store.commit('SET_CLEARED_DATA', utils.createClone(editedData));
      Object.assign(this.addEvent, editedData);
      this.disabledButton = false;
      this.displayButton = false;
    },
    deleteEvent(data) {
      let editedData = data;
      editedData.Action = 'D'
      Object.assign(this.addEvent, editedData);
      this.editEvent(editedData);
      let pos = this.selectedDay["attributes"].findIndex(x => x.customData.EventId === data.EventId);
      this.selectedDay["attributes"].splice(pos, 1)
    },
    addNewEventBtn(data) {
      this.$store.commit("SET_DATE_FROM", this.selectedValue);
      this.addNewEvent(data);
      this.performDialog();
      let pos = this.selectedDay.attributes.length;
      // this.selectedDay.attributes[pos] = { customData: { data }};
    },
    // permision to filter calendar
    backToModal() {
      this.isSelected = !this.isSelected;
      this.addEvent.Employee = [];
      this.addEvent.TargetGroup = [];
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
};
</script>

<style scoped>
.calendar {
  display: flex;
}

.selected-day {
  margin-left: 10px;
}

/* .selected-day ul li:first-child {
  margin-top: 10px;
} */

/* .selected-day ul li {
  margin-bottom: 10px;
} */
</style>
