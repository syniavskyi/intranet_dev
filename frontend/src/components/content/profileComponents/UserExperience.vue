<template>
  <div class="profile-tile">
    <div class="profile-tile-header">
      <div class="profile-tile-header-row">
        <h2 class="profile-tile-title">{{ $t("header.experience") }}</h2>
        <div class="profile-table-buttons">
          <button class="profile-edit-btn" v-if="!editMode" @click="edit">{{ $t("button.edit") }}</button>
          <button class="profile-edit-btn-e" v-if="editMode" @click="addUserExperience">Dodaj nowy wpis</button>
          <button class="profile-edit-btn-e" v-if="editMode" @click="cancel">{{ $t("button.finishEdit") }}</button>
        </div>
      </div>
      <div class="tile-underscore"></div>
    </div>
    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
    <div class="profile-tile-content">
      <div class="prof-tile-column">
        <div id="prof-user-exp" class="prof-div-row" v-for="(experience, index) in userExperience" :key='index'>
          <div class="prof-row-dates">
            <div :class="editMode ? 'prof-row-dates-left' : 'prof-row-dates-left-s'">
              <p class="prof-date-label" v-if="!editMode"> {{ formatDate(experience.DateStart) }} </p>
              <div v-if="editMode" class="prof-input-xxs">
                <v-date-picker class="prof-input-date" :max-date="experience.DateEnd === null ? new Date() : experience.DateEnd" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateStart">
                  <input value="experience.DateStart" />
                </v-date-picker>
                <label v-if="editMode">Od</label>
              </div>
              <span class="prof-span-0">&#8212;</span>
              <div name="endDateDiv" :id="formatId(index)">
                <p class="prof-date-label" v-if="!editMode"> {{ formatDate(experience.DateEnd) }} </p>
                <div v-if="editMode" class="prof-input-xxs">
                  <v-date-picker class="prof-input-date" :min-date="experience.DateStart" :max-date="new Date()" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="experience.DateEnd">
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
          </div>
          <div class="prof-row-inputs">
            <div class="prof-input-ss">
              <input required v-if="editMode" class="inputProfile inputEdit" v-model="experience.Employer" @input="checkFields">
              <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="experience.Employer"/>
              <span class="prof-div-bar"></span>
              <label class="label-profile">Pracodawca</label>
            </div>
            <div class="prof-input-ss">
              <select required v-if="editMode" class="selectProfile selectEdit" @change="checkFields" v-model="experience.WorkPos">
                <option v-for="workPos in workPositions" :key="workPos.Key" :value="workPos.Key">{{workPos.Value}}</option>
              </select>
              <select disabled v-if="!editMode" class="selectProfile selectDisabled" v-model="experience.WorkPos">
                <option v-for="workPos in workPositions" :key="workPos.Key" :value="workPos.Key">{{workPos.Value}}</option>
              </select>
              <!-- :disabled="!editMode" -->
              <span class="prof-div-bar"></span>
              <label class="label-profile">Stanowisko</label>
            </div>
          </div>
          <div class="prof-row-btns expButtons">
            <button class="prof-row-btn" v-if="editMode" @click="save(index)">&#x2714;</button>
            <button class="prof-row-dbtn" v-if="editMode" @click="remove(index)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
      userExperience: "getUserExperience",
      workPositions: "workPositions"
    })
  },
  // updated() {
  //   var list = this.$el.querySelectorAll("input[type='checkbox']")
  //   for (var i=0;i < list.length; i++) {
  //     var endDate = list[i].parentElement.parentElement.children[2],
  //     checkboxWrap = list[i].parentElement.parentElement.children[3];
  //     if (list[i].checked) {
  //       endDate.setAttribute("style", "display: none;")
  //     } else {
  //       checkboxWrap.setAttribute("style", "display: none;")
  //     }
  //   }
  // },
  methods: {
    ...mapActions(["addUserExperience", "removeUserExperience"]),
    edit() {
      this.editMode = true;
      this._beforeEditingCache = JSON.parse(
        JSON.stringify(this.userExperience)
      );
      var checkboxes = this.$el.querySelectorAll(".checkbox-wrap");
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].setAttribute("style", "display: flex;");
      }
    },
    checkFields() {
      if (this.userExperience.length > 0) {
        for (let i = 0; i < this.userExperience.length; i++) {
          if (
            this.userExperience[i].Employer &&
            this.userExperience[i].WorkPos &&
            this.userExperience[i].DateStart &&
            (this.userExperience[i].DateEnd !== null ||
              this.userExperience[i].isCurrent)
          ) {
            document.getElementsByClassName("expButtons")[i].children[0].disabled = false;
          } else {
            document.getElementsByClassName("expButtons")[i].children[0].disabled = true;
          }
        }
      }
    },
    formatId(index) {
      return index + "e";
    },
    cancel() {
      this.$store.commit("SET_EXPERIENCE_ERROR", false);
      this.$store.commit("SET_USER_EXPERIENCE", this._beforeEditingCache);
      this.editMode = false;
    },
    remove(index) {
      this._beforeEditingCache.splice(index, 1);
      this.removeUserExperience(index);
    },
    save(index) {
      const dataToChange = this._beforeEditingCache[index],
        newData = this.userExperience[index];

      newData.Language = 'PL'

      if (dataToChange) {
        newData.WorkPosToChange = dataToChange.WorkPos;
        newData.EmployerToChange = dataToChange.Employer;
        newData.DateStartToChange = dataToChange.DateStart ;
        this.$store.dispatch("updateUserExp", newData);
      } else {
        this.$store.dispatch("saveNewUserExp", newData);
      }
      this._beforeEditingCache = JSON.parse(
        JSON.stringify(this.userExperience)
      );
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
      this.checkFields();
    },
    disableEndDateInput(value) {
      const isCurrent = value.target.checked,
        index = value.target.name,
        input = document.getElementById(index + "e");

      if (isCurrent) {
        input.setAttribute("style", "display: none;");
        this.userExperience[index].DateEnd = null;
      } else {
        input.setAttribute("style", "display: flex;");
      }
      this.checkFields();
    }
  }
};
</script>

<style>
</style>
