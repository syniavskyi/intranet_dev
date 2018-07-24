<template>
    <div id="content">
        <!-- header with name and position-->
        <button @click="generateCV">Generuj</button>
        <div>
          <!-- {{ userData.firstName }} {{ userData.lastName }} -->
            <h1 style="text-align:right"> {{ returnUserInfo.Fullname }} </h1>
            <h3 style="text-align:right">  </h3>
            <!-- {{ userData.position }} -->
        </div>
        <!-- :src="userData.image" -->
        <img class="img-user-class"  width="150px">
  <table width="100%">
    <tr>
      <td>
       <!-- personal data -->
        <div>
            <h3>Dane osobowe</h3>
            <table width="100%">
              <tr>
                <td>Data urodzenia</td>
                <td>01.02.1996</td>
              </tr>
              <tr>
                <td>{{ $t("label.phone") }}</td>
                <td></td>
                <!-- {{userData.phone}} -->
              </tr>
              <tr>
                <td>{{ $t("label.email") }}</td>
                <td></td>
                <!-- {{userData.email}} -->
              </tr>
            </table>
        </div>
        <!-- education -->
        <div>
          <h3>{{ $t("header.education") }}</h3>
          <table width="100%" v-for="(education, index) in userEducation" :key='index'>
            <tr>
              <td>{{formatDate(education.DateStart)}}-{{formatDate(education.DateEnd)}}</td>
              <td><b>{{education.FieldOfStudy}}</b></td>
            </tr>
            <tr>
              <td rowspan="3"></td>
              <td >{{education.University}}</td>
            </tr>
            <tr>
              <td>{{education.StudyType}}</td>
            </tr>
            <tr>
              <td >{{education.AcademicTitle}}</td>
            </tr>
          </table>
        </div>
       <!-- experience -->
        <div>
          <h3>{{ $t("header.experience") }}</h3>
          <table width="100%" v-for="(experience, index) in userExperience" :key='index'>
            <tr>
              <thead>{{formatDate(experience.DateStart)}}-{{formatDate(experience.DateEnd)}}</thead>
              <td><b>{{experience.WorkPos}}</b></td>
            </tr>
            <tr>
              <td></td>
              <td>{{experience.Employer}}</td>
            </tr>
          </table>
        </div>
        <!-- projects -->
        <div>
          <h3>{{ $t("header.projects") }}</h3>
          <table width="100%" v-for="(project, index) in userProjects" :key="index">
            <tr>
              <td>{{formatDate(project.duration.start)}}-{{formatDate(project.duration.end)}}</td>
              <td class="cv-table-header"><b>{{project.contractor}}</b>(Handel)</td>
            </tr>
            <tr>
              <td rowspan="2"></td>
              <td class="cv-table-header">Moduły SAP: <b v-for="sapModule in userProjects[index].modules" :key="sapModule.id"> {{ sapModule.id }}  </b></td>
            </tr>
            <tr>
              <td>{{project.descr}}</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  beforeCreate() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    generateCV() {
      var html, link, blob, url;
      // var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      // var postHtml = "</body></html>";
      // html = preHtml + document.getElementById('content').innerHTML + postHtml;
      html = document.getElementById("content").innerHTML;
      blob = new Blob(["\ufeff", html], {
        type: "application/msword"
      });
      url = URL.createObjectURL(blob);
      link = document.createElement("A");
      link.href = url;
      link.download = "Document"; // default name without extension
      document.body.appendChild(link);
      if (navigator.msSaveOrOpenBlob)
        navigator.msSaveOrOpenBlob(blob, "Document.doc"); // IE10-11
      else link.click(); // other browsers
      document.body.removeChild(link);
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("YYYY")
        : "-";
    },
  },
  computed: {
    ...mapGetters({
      userEducation: "getUserEducation",
      userProjects: "getUserProjectsList",
      userExperience: "getUserExperience",
      userData: "userData"
    }),
    returnUserInfo() {
      return this.$store.getters.userInfo;
    }
  },
};
</script>
<style>
table {
  width: 21cm;
}
table,
th,
td {
  border: 1px solid black;
}

.cv-table-header {
  text-align: left;
  background-color: lightgray;
}
</style>
