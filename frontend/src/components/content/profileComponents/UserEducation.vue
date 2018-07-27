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

            <p v-if="!editMode"> {{ formatDate(education.DateStart) }} </p>
            <v-date-picker :max-date="new Date()" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateStart">
              <input value="education.DateStart" />
            </v-date-picker>
            <span>-</span>
            <div name="endDateDiv" :id="index">
              <p v-if="!editMode"> {{ formatDate(education.DateEnd) }} </p>
              <v-date-picker popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateEnd">
                <input value="education.DateEnd" />
              </v-date-picker>
            </div>

          <input :disabled="!editMode" type="checkbox" @change="disableEndDateInput" id="checkbox" :name="index" v-model="education.isCurrent" />
          <label for="checkbox">Obecnie</label>
          <div class="prof-input-s"> 
            <input required v-if="editMode" class="inputProfile inputEdit" v-model="education.FieldOfStudy">
            <input class="inputProfile inputDisabled" v-if="!editMode" v-model="education.FieldOfStudy"/>
             <!-- :disabled="!editMode" -->
            <span class="prof-div-bar"></span>
            <label class="label-profile">Kierunek</label>
          </div>
          <div class="prof-input-s">
            <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.University"/>
            <!-- :disabled="!editMode" -->
            <input class="inputProfile inputDisabled" v-if="!editMode" v-model="education.University"/>
            <span class="prof-div-bar"></span>
            <label class="label-profile">Kierunek</label>
          </div>
          <div class="prof-input-s">
            <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.StudyType"/>
            <input class="inputProfile inputDisabled" v-if="!editMode" v-model="education.StudyType"/>
            <!-- :disabled="!editMode" -->
            <span class="prof-div-bar"></span>
            <label class="label-profile">Kierunek</label>
          </div>
          <div class="prof-input-s">
            <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.AcademicTitle"/>
            <input class="inputProfile inputDisabled" v-if="!editMode" v-model="education.AcademicTitle"/>
            <!-- :disabled="!editMode -->
          </div>
          <button v-if="editMode">&#x2714;</button>
          <button v-if="editMode" @click="removeUserEducation(index)">X</button>
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
        input.setAttribute("style", "opacity: 0");
        this.userEducation[index].DateEnd = null;
      } else {
        input.setAttribute("style", "opacity: 1");
      }
    },
  }
};
</script>

<style>
</style>

