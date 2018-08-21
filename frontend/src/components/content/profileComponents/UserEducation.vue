<template>
  <div class="profile-tile">
    <div class="profile-tile-header">
      <div class="profile-tile-header-row">
        <h2 class="profile-tile-title">{{ $t("header.education") }}</h2>
        <div class="profile-table-buttons">
          <button class="profile-edit-experience" v-if="!editMode" @click="edit">{{ $t("button.edit") }}</button>
          <button class="profile-edit-experience-e" v-if="editMode" @click="addUserEduRow">Dodaj nowy wpis</button>
          <button class="profile-edit-experience-e" v-if="editMode" @click="cancel">{{ $t("button.finishEdit") }}</button>
        </div>
      </div>
      <div class="tile-underscore"></div>
    </div>
    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
    <div class="profile-tile-content">
      <div class="prof-tile-column">
        <div class="prof-div-row" v-for="(education, index) in userEducation" :key='index'>
          <div class="prof-row-dates">
            <div :class="editMode ? 'prof-row-dates-left' : 'prof-row-dates-left-s'">
              <p class="prof-date-label" v-if="!editMode"> {{ formatDate(education.DateStart) }} </p>
              <div v-if="editMode" class="prof-input-xxs">
                <!-- :max-date="new Date()" -->
                <v-date-picker class="prof-input-date" :max-date="education.DateEnd === null ? new Date() : education.DateEnd" popoverDirection="top" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateStart">
                  <input value="education.DateStart" >
                </v-date-picker>
                <label v-if="editMode">Od</label>
              </div>
              <span class="prof-span-0">&#8212;</span>
              <!-- &#9472; -->
              <div name="endDateDiv" :id="index">
                <p class="prof-date-label" v-if="!editMode"> {{ formatDate(education.DateEnd) }} </p>
                <div v-if="editMode" class="prof-input-xxs">
                  <v-date-picker class="prof-input-date" popoverDirection="top" :min-date="education.DateStart" :max-date="new Date()" v-if="editMode" @input="validateDates(index)" is-expanded mode="single" v-model="education.DateEnd">
                    <input value="education.DateEnd" />
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
            <!-- <div class="prof-row-btns">
              <button class="prof-row-btn" :disabled="true" v-if="editMode" @click="save(index)">&#x2714;</button>
              <button class="prof-row-btn" v-if="editMode" @click="remove(index)">X</button>
            </div> -->
          </div>
          <div class="prof-row-inputs">
            <div class="prof-inputs-div">
              <div class="prof-input-l">
                <input required v-if="editMode" class="inputProfile inputEdit" v-model="education.FieldOfStudy" @input="checkFields">
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.FieldOfStudy"/>
                <!-- :disabled="!editMode" -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Kierunek</label>
              </div>
              <div class="prof-input-l">
                <input required v-if="editMode" class="inputProfile inputEdit" v-model="education.University" @input="checkFields"/>
                <!-- :disabled="!editMode" -->
                <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.University"/>
                <span class="prof-div-bar"></span>
                <label class="label-profile">Uczelnia</label>
              </div>
            </div>
            <div class="prof-inputs-div">
              <div class="prof-input-xs">
                <!-- <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.StudyType"/> -->
                <!-- <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.StudyType"/> -->
                <select required v-if="editMode" class="selectProfile selectEdit" @change="checkFields" v-model="education.StudyType">
                  <option v-for="type in studyTypes" :key="type.Key" :value="type.Key">{{type.Value}}</option>
                </select>
                <select disabled v-if="!editMode" class="selectProfile selectDisabled" v-model="education.StudyType">
                  <option v-for="type in studyTypes" :key="type.Key" :value="type.Key">{{type.Value}}</option>
                </select>
                <!-- :disabled="!editMode" -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Tryb Studiów</label>
              </div>
              <div class="prof-input-xs">
                <!-- <input required v-if="editMode" class="inputProfile inputEdit"  v-model="education.AcademicTitle"/> -->
                <!-- <input disabled class="inputProfile inputDisabled" v-if="!editMode" v-model="education.AcademicTitle"/> -->
                <select required v-if="editMode" class="selectProfile selectEdit" @change="checkFields" v-model="education.AcademicTitle">
                  <option v-for="type in academicTitles" :key="type.Key" :value="type.Key">{{type.Value}}</option>
                </select>
                <select disabled v-if="!editMode" class="selectProfile selectDisabled" v-model="education.AcademicTitle">
                  <option v-for="type in academicTitles" :key="type.Key" :value="type.Key">{{type.Value}}</option>
                </select>
                <!-- :disabled="!editMode -->
                <span class="prof-div-bar"></span>
                <label class="label-profile">Stopień</label>
              </div>
            </div>
          </div>
          <div class="prof-row-btns eduButtons">
              <button title="" :disabled="true" class="prof-row-btn" v-if="editMode" @click="save(index)">&#x2714;</button>
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
import { required, minLength } from "vuelidate/lib/validators";
import jsZip from "jszip";
export default {
  data() {
    return {
      editMode: false,
      _beforeEditingCache: null,
      invalidDates: false
    };
  },
  beforeCreate() {
    if (this.$store.getters.isDataLoaded === false) {
      this.$store.dispatch("loadData");
    }
  },
  // updated() {
  //   if (this.$el) {
  //     var list = this.$el.querySelectorAll("input[type='checkbox']")
  //     for (var i=0;i < list.length; i++) {
  //       var endDate = list[i].parentElement.parentElement.children[2],
  //       checkboxWrap = list[i].parentElement.parentElement.children[3];
  //       if (list[i].checked) {
  //         endDate.setAttribute("style", "display: none;")
  //       } else {
  //         checkboxWrap.setAttribute("style", "display: none;")
  //       }
  //     }
  //   }
  // },
  computed: {
    ...mapGetters({
      userEducation: "getUserEducation",
      studyTypes: "studyTypes",
      academicTitles: "academicTitles"
    })
  },
  mounted() {
    var list = this.$el.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < list.length; i++) {
      var endDate = list[i].parentElement.parentElement.children[2],
        checkboxWrap = list[i].parentElement.parentElement.children[3];
      if (list[i].checked) {
        endDate.setAttribute("style", "display: none;");
      } else {
        checkboxWrap.setAttribute("style", "display: none;");
      }
    }
  },
  methods: {
    ...mapActions(["addUserEduRow", "removeUserEducation"]),
    edit() {
      const plik = new jsZip();
      this.editMode = true;
      this._beforeEditingCache = JSON.parse(JSON.stringify(this.userEducation));
      var checkboxes = this.$el.querySelectorAll(".checkbox-wrap");
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].setAttribute("style", "display: flex;");
      }
    },
    checkFields() {
      if (this.userEducation.length > 0) {
        for (let i = 0; i < this.userEducation.length; i++) {
          if (
            this.userEducation[i].FieldOfStudy &&
            this.userEducation[i].University &&
            this.userEducation[i].StudyType &&
            this.userEducation[i].AcademicTitle &&
            this.userEducation[i].DateStart &&
            (this.userEducation[i].DateEnd !== null ||
              this.userEducation[i].isCurrent)
          ) {
            document.getElementsByClassName("eduButtons")[i].children[0].disabled = false;
          } else {
            document.getElementsByClassName("eduButtons")[i].children[0].disabled = true;
          }
        }
      }
    },
    remove(index) {
      this._beforeEditingCache.splice(index, 1);
      this.removeUserEducation(index);
    },
    cancel() {
      this.$store.commit("SET_EDUCATION_ERROR", false);
      this.$store.commit("SET_USER_EDUCATION", this._beforeEditingCache);
      this.editMode = false;
    },
    save(index) {
      const dataToChange = this._beforeEditingCache[index],
        newData = this.userEducation[index];

      if (dataToChange) {
          newData.AcademicTitleToChange = dataToChange.AcademicTitle;
          newData.FieldOfStudyToChange = dataToChange.FieldOfStudy;
          newData.UniversityToChange = dataToChange.University;
          this.$store.dispatch("editUserEducation", newData);
        } else {
          this.$store.dispatch("addUserEducation", newData);
        }

        this._beforeEditingCache = JSON.parse(
          JSON.stringify(this.userEducation)
        );
    },
    formatDate(date) {
      return date !== null && date !== undefined ? moment(date).format("DD.MM.YYYY") : "-";
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
      this.checkFields();
    },
    disableEndDateInput(value) {
      const isCurrent = value.target.checked,
        index = value.target.name,
        input = document.getElementById(index);

      if (isCurrent) {
        // input.setAttribute("style", "opacity: 0");
        input.setAttribute("style", "display: none;");
        this.userEducation[index].DateEnd = null;
      } else {
        // input.setAttribute("style", "opacity: 1");
        input.setAttribute("style", "display: flex;");
      }
      this.checkFields();
    }
  }
};
</script>

<style>
</style>
