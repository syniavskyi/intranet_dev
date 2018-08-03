<template>
  <div class="plane-calendar">
    <div class="calendar-nav-and-content">
      <app-menu></app-menu>
      <div class="calendar-content">
        <div class="calendar-header">
            <div class="calendar-header-title-and-menu">
              <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="calendar-header-menu">
              <p class="calendar-header-title">Kalendarz</p>
            </div>
        </div>
        <div class="calendar-tiles">
          <div class="calendar-tile">
            <div class="calendar">
              <v-date-picker mode='single' :min-date="new Date()" v-model="selectedValue" :attributes="attributes" is-inline @dayclick='dayClicked'>

              </v-date-picker>
              <div v-if='selectedDay' class='selected-day'>
                <h3>{{ selectedDay.date.toDateString() }}</h3>
                <button @click="openDialog">+</button>
                <ul>
                  <li v-for='attr in selectedDay.attributes' :key='attr.customData.EventId'>
                      {{ attr.customData.EventName }}, 
                      {{ attr.customData.EventTypeName }}
                      {{ attr.customData.EventPrivacy }}
                      {{ attr.customData.CreatedBy}}
                      <button @click="editEvent(attr.customData, $t)">Edytuj</button>
                      <button @click="deleteEvent(attr.customData, $t)">Usuń</button>
                  </li>            
                </ul>
              </div>
            </div>
             <div class="filters" v-if="permition">
                <div class="ava-div-select-cool">
                    <select required class="ava-select-cool" v-model="branch">        
                         <option v-for="branch in branches" :key="branch.Key" :value="branch.Key">{{ branch.Value }}</option>
                   </select>
                     <label class="ava-select-label-cool">{{ $t("label.branch") }}</label>
                </div>
                <div class="ava-div-select-cool">
                    <select required class="ava-select-cool" v-model="departments">
                        <option v-for="department in departmentList" :key="department.Key" :value="department.Key">{{ department.Value }}</option>
                    </select>
                      <label class="ava-select-label-cool">{{ $t("label.department") }}</label>
                </div>
                <div class="ava-div-select-cool">
                    <select required class="ava-select-cool" v-model="employee">
                      <option>Wysoki</option>
                      <option>Średni</option>
                      <option>Niski</option>
                    </select>
                    <label class="ava-select-label-cool">{{ $t("label.employee") }}</label>
                </div>
             </div>
            <!-- Modal for add event -->
              <!-- <transition name="slide-backdrop"> -->
                <div class="backdrop" v-if="dialogEvent"></div>
              <!-- </transition> -->
              <!-- <transition name="slide"> -->
                <div class="modal-new-m " v-if="dialogEvent">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title">{{ $t("header.addNewEvent") }}</h1>
                    <button class="modal-exit" @click="performDialog">&#10006;</button>
                  </div>
                  <div class="modal-calendar">
                    <div class="event-feature">
                        <label class="modal-label">{{ $t("label.eventTitle") }}</label>
                        <input class="input modal-input input-event" v-model="addEvent.EventName" >
                        <!-- @blur="$v.eventName.$touch()" -->
                    </div>
                   <div class="event-feature">
                      <label class="modal-label">{{ $t("label.eventTime") }}</label>
                        <input class="modal-input input-active" type="time" v-model="addEvent.EventTime" @blur="$v.eventTime.$touch()">
                  </div>
                  <div class="event-feature">
                       <label class="modal-label">{{ $t("label.endDate") }}</label>
                        <!-- <input class="modal-input input-active" type="date" v-model="addEvent.DateTo" @blur="$v.dateTo2.$touch()"> -->
                        <v-date-picker class="calendar-modal-date" popoverDirection="" is-expanded mode="single" v-model="addEvent.DateTo" :min-date="this.selectedDay.date">
                                            <input  value="addEvent.DateTo"/>
                                        </v-date-picker>
                  </div>
                  <div class="event-feature">
                     <label class="modal-label">{{ $t("label.eventDescription") }}</label>
                     <input class="input modal-input input-event" v-model="addEvent.Description">
                  </div>
                  <div class="event-feature">
                    <label class="modal-label">{{ $t("label.priority") }}</label>
                    <select class="event-select"  v-model="addEvent.Priority" @blur="$v.priority.$touch()">
                      <!-- @change="checkPriority" -->
                      <option v-for="priority in priorities" :value="priority.Key" :key="priority.Key">
                          {{ priority.Value }}
                      </option>
                    </select>
                    </div>
                    <div class="event-feature">
                    <label class="modal-label">Typ wydarzenia</label>
                    <select class="event-select" v-model="addEvent.EventType">
                         <option v-for="eventType in eventTypes" :value="eventType.Key" :key="eventType.Key">
                           {{ eventType.Value }}
                        </option>
                    </select>
                    </div>
                     <div class="event-feature">
                    <label class="modal-label">{{ $t("label.targetGroup") }}</label>
                    <button class="privacy-button" type="button" @click="isSelected = !isSelected">Wybierz</button>
                    </div>
                    <div class="department" v-if="isSelected">
                    <!-- <select multiple="true" >
                     <option>Wysoki</option>
                      <option>Średni</option>
                      <option>Niski</option>
                    </select> -->

<input  type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <br>
    <br>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <br>
    <br>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
    <br>
  <input type="checkbox" id="jacek" value="Jack" v-model="checkedNames">
  <label for="jacek">Jacek</label>
  <br>
    <br>
  <input type="checkbox" id="johns" value="John" v-model="checkedNames">
  <label for="johns">Johns</label>
  <br>
    <br>
  <input type="checkbox" id="mikel" value="Mike" v-model="checkedNames">
  <label for="mikel">Mike</label>

                    <button class="save-button" type="button" @click="isSelected = !isSelected">Wróć</button>
                    </div>
                    <div class="event-feature event-visibility">
                    <label class="modal-label">{{ $t("label.visibility") }}</label>
                    <input type="radio" id="prv" value="priv" v-model="addEvent.EventPrivacy">
                    <label for="prv">Private</label>
                    <input type="radio" id="pbl" value="public" v-model="addEvent.EventPrivacy">
                    <label for="pbl">Public</label>   
                    <button @click="editForm()">edit</button>      
                  <!--  <option v-for="department in departments" :value="department"></option> -->
                  </div>
                  </div>
                  <button class="button modal-button"  type="button" @click="addNewEvent"><span class="span-arrow">{{ $t("button.addEvent") }}</span></button>
              <!-- :disabled="$v.$invalid" -->
                </div>
                </div>
              <!-- </transition> -->
            <!-- End modal for add event -->
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { required } from "vuelidate/lib/validators";
import i18n from "../../lang/lang";
import Menu from '../Menu.vue'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedValue: null,
      selectedDay: null,
      selectedDay2: null,
      dialogEvent: false,
      branch: {},
      department: {},
      departments: [],
      employee: {},
      isSelected: false,
      permition: false,
      checkedNames: '',
    };
  },
  validations: {
    eventName: {
      required
    },
    // eventTime: {
    //   required
    // },
    priority: {
      required
    },
    eventType: {
      required
    },
    privacy: {
      required
    }
  },
  beforeCreate() {
    if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
        }
    //  this.showBranchSelect = (localStorage.getItem('role') === 'leader') ? false : true;   
     this.$store.dispatch('getEvents');
  },
  created() {
    this.checkRole();
    this.$store.dispatch('getPriority');
    this.$store.dispatch('getEventType');
    // this.$store.dispatch('getBranch')
    // this.$store.dispatch('getDepartment')
  },
  computed: {
    ...mapGetters({
      departmentList: 'depList',
      branches: 'branches'
      // usersList: 'usersList',
 }),
    events() {
        return this.$store.getters.events;
    },
    priorities() {
        return this.$store.getters.priorities;
      },
    eventTypes() {
        return this.$store.getters.eventTypes;
    },
    addEvent() {
        return this.$store.getters.addEvent;
    },
    // branches() {
    //     return this.$store.getters.branches;
    // },
    attributes() {
      return this.$store.getters.events.map(t => ({
        dot: {
          backgroundColor: t.color
        },
        highlight: {
           backgroundColor: t.color
        },
        dates: {
          start: t.DateFrom, end: t.DateTo
        },
        customData: t,
        popover: {
          label: t.EventName
        },
      }));
    },
    // eventColor() {
    //   return this.$store.getters.priorityColor;
    // } 
  },
  components: {
        'app-menu': Menu
    },
  methods: {
    editForm() {
        this.$store.getters.addEvent;
        this.$store.dispatch('editEvent');
    },
    dayClicked(day) {
      this.selectedDay = day;
    },
    openDialog() {
      this.$store.dispatch('clearForm');
      this.performDialog();
    },
    performDialog() {
      this.dialogEvent = !this.dialogEvent;
    },
    editEvent(data) {
      this.performDialog();
      let editedData = data;
      Object.assign(this.$store.getters.addEvent, editedData);
    },
    deleteEvent(data) {
      let editedData = data;
      Object.assign(this.$store.getters.addEvent, editedData);
     this.$store.dispatch('removeEvent')
    },
    addNewEvent() {

      this.$store.commit("SET_DATE_FROM", this.selectedValue);
      this.$store.dispatch('addNewEvent');
      this.performDialog();
    },
    // permision to filter calendar
    checkRole() {
      let role = 'BO';
      if (role == 'BO' || role == 'Board'){
        this.permition = true;
      }
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

.selected-day ul li:first-child {
  margin-top: 10px;
}

.selected-day ul li {
  margin-bottom: 10px;
}
</style>
