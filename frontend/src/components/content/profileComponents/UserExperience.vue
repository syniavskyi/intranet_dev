<template>
     <div class="profile-tile">
                    <div class="profile-tile-header">
                        <div class="profile-tile-header-row">
                            <h2 class="profile-tile-title">{{ $t("header.experience") }}</h2>
                            <div class="profile-table-buttons">
                                <button class="profile-edit-experience" v-if="!editMode" @click="edit">{{ $t("button.edit") }}</button>
                                <button class="profile-edit-experience-e" v-if="editMode" @click="addUserExperience">Dodaj nowy wpis</button>
                                <button class="profile-edit-experience-e" v-if="editMode" @click="cancel">Anuluj</button>
                            </div>
                        </div>
                        <div class="tile-underscore"></div>
                    </div>
                    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
                    <div class="profile-tile-content">
                      <div class="prof-tile-column">
                        <div id="prof-user-exp" class="prof-div-row" v-for="(experience, index) in userExperience" :key='index'>
                          <div :class="editMode ? 'prof-row-dates' : 'prof-row-dates-s'">
                            <p class="prof-date-label" v-if="!editMode"> {{ formatDate(experience.DateStart) }} </p>
                            <div v-if="editMode" class="prof-input-xxs">
                              <v-date-picker class="prof-input-date" :max-date="new Date()" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateStart">
                                  <input value="experience.DateStart" />
                              </v-date-picker>
                              <label v-if="editMode">Do</label>
                            </div>
                            <span class="prof-span-0">&#8212;</span>
                            <div name="endDateDiv" :id="formatId(index)">
                              <p class="prof-date-label" v-if="!editMode"> {{ formatDate(experience.DateEnd) }} </p>
                              <div v-if="editMode" class="prof-input-xxs">
                                <v-date-picker class="prof-input-date" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateEnd">
                                    <input value="experience.DateEnd" />
                                </v-date-picker>
                                <label v-if="editMode">Do</label>
                              </div>
                            </div>
                            <label class="checkbox-wrap">
                              <input class="checkbox-margin" :disabled="!editMode" type="checkbox" @change="disableEndDateInput" :name="index" v-model="experience.isCurrent" />
                              <div class="checkbox-in"></div>
                              <p style="padding:0;margin:0;">Obecnie</p>
                            </label>
                          </div>
                          <div class="prof-row-inputs">
                            <div class="prof-input-ss">
                              <input required v-if="editMode" class="inputProfile inputEdit" v-model="experience.Employer">
                              <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="experience.Employer"/>
                              <span class="prof-div-bar"></span>
                              <label class="label-profile">Pracodawca</label>
                            </div>
                            <div class="prof-input-ss">
                              <input required v-if="editMode" class="inputProfile inputEdit" v-model="experience.WorkPos">
                              <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="experience.WorkPos"/>
                              <span class="prof-div-bar"></span>
                              <label class="label-profile">Pracodawca</label>
                            </div>
                          </div>
                          <div class="prof-row-btns">
                            <button class="prof-row-btn" v-if="editMode">&#x2714;</button>
                            <button class="prof-row-btn" v-if="editMode" @click="removeUserExperience(index)">X</button>
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
      userExperience: "getUserExperience"
    })
  },
  mounted() {
    var list = this.$el.querySelectorAll("input[type='checkbox']")
    for (var i=0;i < list.length; i++) {
      var endDate = list[i].parentElement.parentElement.children[2],
      checkboxWrap = list[i].parentElement.parentElement.children[3];
      if (list[i].checked) {
        endDate.setAttribute("style", "display: none;")
      } else {
        checkboxWrap.setAttribute("style", "display: none;")
      }
    }
  },
  methods: {
    ...mapActions(["addUserExperience", "removeUserExperience"]),
    edit() {
      this.editMode = true;
      this._beforeEditingProjects = JSON.parse(
        JSON.stringify(this.userExperience)
      );
      var checkboxes = this.$el.querySelectorAll(".checkbox-wrap")
      for (var i=0; i < checkboxes.length; i++) {
        checkboxes[i].setAttribute("style", "display: flex;")
      }
    },
    formatId(index) {
      return index +'e'
    },
    cancel() {
      this.$store.commit("SET_EXPERIENCE_ERROR", false);
      this.$store.commit("SET_USER_EXPERIENCE", this._beforeEditingCache);
      this.editMode = false;
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("DD.MM.YYYY")
        : "-";
    },
    validateDates(index) {
      const startDate = this.userExperience[index].DateStart,
        endDate = this.userExperience[index].DateEnd,
        isCurrent = this.userExperience[index].isCurrent;

      if (endDate && startDate && isCurrent === false) {
        const formatStartDate = moment(startDate).format("YYYY-MM-DD"),
          formatEndDate = moment(endDate).format("YYYY-MM-DD");

        this.invalidDates = formatStartDate > formatEndDate ? true : false;
      }
    },
    disableEndDateInput(value) {
      const isCurrent = value.target.checked,
        index = value.target.name,
        input = document.getElementById(index + 'e');

      if (isCurrent) {
        input.setAttribute("style", "display: none;");
        this.userExperience[index].DateEnd = null;
      } else {
        input.setAttribute("style", "display: flex;");
      }
    },
  }
};
</script>

<style>
</style>

