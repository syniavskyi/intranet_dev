<template>
  <div class="profile-tile">
    <div class="profile-tile-header">
      <div class="profile-tile-header-row">
        <h2 class="profile-tile-title">{{ $t("header.education") }}</h2>
        <div class="profile-table-buttons">
          <button class="profile-edit-experience" v-if="!editMode" @click="edit">{{ $t("button.edit") }}</button>
          <button class="profile-edit-experience-e" v-if="editMode" @click="addUserEducation">Dodaj nowy wpis</button>
          <button class="profile-edit-experience-e" v-if="editMode" @click="cancel">Anuluj</button>
        </div>
      </div>
      <div class="tile-underscore"></div>
    </div>
    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
    <div class="profile-tile-content">
      <div class="prof-tile-column">
        <div class="prof-div-row" v-for="(education, index) in userEducation" :key='index'>
          <div :class="editMode ? 'prof-row-dates' : 'prof-row-dates-s'">
            <p class="prof-date-label" v-if="!editMode"> {{ formatDate(education.DateStart) }} </p>
            <div v-if="editMode" class="prof-input-xxs">
              <v-date-picker class="prof-input-date" :max-date="new Date()" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateStart">
                <input value="education.DateStart" >
              </v-date-picker>
              <label v-if="editMode">Od</label>
            </div>
            <span class="prof-span-0">&#8212;</span>
            <!-- &#9472; -->
            <div name="endDateDiv" :id="index">
              <p class="prof-date-label" v-if="!editMode"> {{ formatDate(education.DateEnd) }} </p>
              <div v-if="editMode" class="prof-input-xxs">
                <v-date-picker class="prof-input-date" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateEnd">
                  <input value="education.DateEnd" >
                </v-date-picker>
                <label>Do</label>
              </div>
            </div>
            <label class="checkbox-wrap">
              <input class="checkbox-margin" :disabled="!editMode" type="checkbox" @change="disableEndDateInput" :name="index" v-model="education.isCurrent"/>
              <div class="checkbox-in"></div>
              <p style="padding:0;margin:0;">Obecnie</p> 
            </label>
          </div>
          <div class="prof-row-inputs">
            <div class="prof-inputs-div">
              <div class="prof-input-l"> 
                <input required v-if="editMode" class="inputProfile inputEdit" v-model="education.FieldOfStudy">
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.FieldOfStudy"/>
                <!-- :disabled="!editMode" -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Kierunek</label>
              </div>
              <div class="prof-input-l">
                <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.University"/>
                <!-- :disabled="!editMode" -->
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.University"/>
                <span class="prof-div-bar"></span>
                <label class="label-profile">Uczelnia</label>
              </div>
            </div>
            <div class="prof-inputs-div">
              <div class="prof-input-xs">
                <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.StudyType"/>
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.StudyType"/>
                <!-- :disabled="!editMode" -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Tryb Studiów</label>
              </div>
              <div class="prof-input-xs">
                <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.AcademicTitle"/>
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.AcademicTitle"/>
                <!-- :disabled="!editMode -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Stopień</label>
              </div>
            </div>
          </div>
          <div class="prof-row-btns">
            <button class="prof-row-btn" v-if="editMode">&#x2714;</button>
            <button class="prof-row-btn" v-if="editMode" @click="removeUserEducation(index)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from "moment"
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      editMode: false,
      _beforeEditingCache: null,
      invalidDates: false
    };
  },
  computed: {
    ...mapGetters({
      userEducation: "getUserEducation"
    })
  },
  methods: {
    ...mapActions(["addUserEducation", "removeUserEducation"]),
    edit() {
      this.editMode = true;
      this._beforeEditingProjects = JSON.parse(
        JSON.stringify(this.userEducation)
      );
    },
    cancel() {
      this.$store.commit("SET_EDUCATION_ERROR", false);
      this.$store.commit("SET_USER_EDUCATION", this._beforeEditingCache);
      this.editMode = false;
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("DD.MM.YYYY")
        : "-";
    },
    validateDates(index) {
      const startDate = this.userEducation[index].DateStart,
        endDate = this.userEducation[index].DateEnd,
        isCurrent = this.userEducation[index].isCurrent;

      if (endDate && startDate && isCurrent === false) {
        const formatStartDate = moment(startDate).format("YYYY-MM-DD"),
          formatEndDate = moment(endDate).format("YYYY-MM-DD");

        this.invalidDates = formatStartDate > formatEndDate ? true : false;
      }
    },
    disableEndDateInput(value) {
      const isCurrent = value.target.checked,
        index = value.target.name,
        input = document.getElementById(index);

      if (isCurrent) {
        // input.setAttribute("style", "opacity: 0");
        input.setAttribute("style", "display: none;")
        this.userEducation[index].DateEnd = null;
      } else {
        // input.setAttribute("style", "opacity: 1");
        input.setAttribute("style", "display: flex;");

      }
    },
  }
};
</script>

<style>
</style>

