<template>
  <div>
    <div class="modal-overlay" v-if="dialogEvent"></div>
    <div class="modal-new-m" v-if="dialogEvent">
      <div class="modal-header">
        <h1 class="modal-title">{{ $t("header.addNewEvent") }}</h1>
        <button class="modal-close" @click="performDialog">&#10006;</button>
      </div>
      <div class="modal-content-new">
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
            <v-date-picker required class="delegations-input-date inputProfile2 calendar-modal-date input-active" popoverDirection="" is-expanded mode="single" v-model="addEvent.DateTo" :min-date="addEvent.DateFrom">
              <input value="addEvent.DateTo"/>
            </v-date-picker>
            <label class="delegations-label-cool-select">{{ $t("label.endDate") }} </label>
          </div>
          <div class="prof-input2">
            <input required class="inputEdit2 inputProfile2 input-active" v-model="addEvent.Description">
            <span class="prof-div-bar"></span>
            <label class="label-profile2">{{ $t("label.eventDescription") }}</label>
          </div>
          <div class="prof-input2">
            <select required class="ava-select-cool marginForm input-active"  v-model="addEvent.Priority" @blur="$v.addEvent.Priority.$touch()">
              <option v-for="priority in priorities" :value="priority.Key" :key="priority.Key">{{ priority.Value }}</option>
            </select>
            <label class="label-profile2">{{ $t("label.priority") }}</label>
          </div>
          <div class="prof-input2">
            <select required class="marginForm ava-select-cool input-active" v-model="addEvent.EventType" @blur="$v.addEvent.EventType.$touch()">
              <option v-for="eventType in eventTypes" :value="eventType.Key" :key="eventType.Key">{{ eventType.Value }}</option>
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
              <option v-for="user in usersList" :value="user.UserAlias" :key="user.UserAlias">{{ user.Fullname }}</option>
            </select>
            <button class="privacy-button marginForm select-button" type="button" @click="selectedGroup = !selectedGroup && selectedUser === false">{{ $t("button.selectGroup") }}</button>
            <select multiple="true" required class="user-list" v-if="selectedGroup" v-model="addEvent.TargetGroup">
              <option v-for="group in targetGroup" :value="group.Key" :key="group.Key">{{ group.Value }}</option>
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
          <button class="button modal-button" :disabled="$v.$invalid" type="button" @click="addNewEventBtn(addEvent)" v-if="displaySaveButton"><span class="span-arrow">{{ $t("button.addEvent") }}</span></button>
          <button class="button modal-button" :disabled="$v.$invalid" v-if="!displaySaveButton" @click="editForm(addEvent)">{{ $t("button.edit") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import i18n from "../../lang/lang";
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
     return {
        isSelected: false,
        selectedUser: false,
        selectedGroup: false,
        }
    },
    props: ['selected-value', 'disabled-edit-button', 'display-save-button'],
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
    computed: Object.assign(
    mapGetters({
      eventTypes: "getEventTypes",
      priorities: "getPriorities",
      addEvent: "getEventToChange",
      usersList: "usersList",
      targetGroup: "getTargetGroup",
      userData: "getUserInfo",
      authType: "getCalendarAuth",
      dialogEvent: "getDialogEvent"
    }), {   }
  ),
    methods: Object.assign(
    mapActions([
      "addNewEvent",
      "editEvent",
      "performDialog"
    ]), {
        // trigger function from js to adjust data for backend
        editForm(data) {
            data.Action = 'U';
            this.editEvent(data);
             this.performDialog();
        },
        addNewEventBtn(data) {
            this.$store.commit("SET_DATE_FROM", this.selectedValue);
            this.addNewEvent(data);
            this.performDialog();
        },
        // permision to filter calendar
        backToModal() {
            this.isSelected = !this.isSelected;
            this.addEvent.Employee = [];
            this.addEvent.TargetGroup = [];
        }
     }
  )
}
</script>