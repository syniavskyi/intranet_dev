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
                    <div>
                        <div v-for="(experience, index) in userExperience" :key='index'>
                            <p v-if="!editMode"> {{ formatDate(experience.DateStart) }} </p>
                            <v-date-picker :max-date="new Date()" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateStart">
                                <input value="" />
                            </v-date-picker>
                            <span>-</span>
                            <div name="endDateDiv" :id="index">
                                <p v-if="!editMode"> {{ formatDate(experience.DateEnd) }} </p>
                                <v-date-picker popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateEnd">
                                    <input value="experience.DateEnd" />
                                </v-date-picker>
                            </div>
                            <input :disabled="!editMode" type="checkbox" @change="disableEndDateInput" id="checkbox" :name="index" v-model="experience.isCurrent" />
                            <label for="checkbox">Obecnie</label>
                            <input :disabled="!editMode" v-model="experience.Employer"/>
                            <input :disabled="!editMode" v-model="experience.WorkPos"/>
                            <button v-if="editMode">&#x2714;</button>
                            <button v-if="editMode" @click="removeUserExperience(index)">X</button>
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
  methods: {
    ...mapActions(["addUserExperience", "removeUserExperience"]),
    edit() {
      this.editMode = true;
      this._beforeEditingProjects = JSON.parse(
        JSON.stringify(this.userExperience)
      );
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
        input = document.getElementById(index);

      if (isCurrent) {
        input.setAttribute("style", "opacity: 0");
        this.userExperience[index].DateEnd = null;
      } else {
        input.setAttribute("style", "opacity: 1");
      }
    },
  }
};
</script>

<style>
</style>

