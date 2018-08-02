<template>
  <div id="content">
    <div class="Section1" >
      <!-- header with name and position-->
    <button @click="generate" v-if="showGenerateBtn" class="profile-edit-experience-e">Zatwierdź i generuj</button>
    <div>
        <h1 style="text-align:right"  v-show="cvElements.name"> {{ userData.firstName }} {{ userData.lastName }} </h1>
        <h3 style="text-align:right"> {{ userData.position }} </h3>
    </div>
    <table width="100%">
      <tr>
        <td>
          <tr align="right">
            <h1  v-if="cvElements.name" style="font-family: 'Arial'">Damian Jankowski</h1>
            <h2 style="font-family: 'Arial'">Programista Fiori</h2>
          </tr>
        <!-- personal data -->
              <h3 style="font-weight: normal; margin-bottom:1rem; padding:0; border-bottom: 2px solid #E79600; text-transform: uppercase; font-family: 'Arial';">Dane osobowe</h3>
              <!-- <v:line  from="0,0" to="800,0" strokeweight="2pt"  xmlns:v="urn:schemas-microsoft-com:vml" strokecolor="blue"/> -->
              <table width="100%">
                <tr>
                  <td>
                    <table width="80%">
                      <tr>
                        <td width="42%" style="font-weight: bold; font-family: 'Arial'">Narodowość</td>
                        <td style="font-family: 'Arial'">Polska</td>
                      </tr>
                      <tr v-if="cvElements.date">
                        <td style="font-weight: bold; font-family: 'Arial'">Data urodzenia</td>
                        <td style="font-family: 'Arial'">01.02.1996</td>
                      </tr>
                      <tr  v-if="cvElements.phone">
                        <td style="font-weight: bold; font-family: 'Arial'">{{ $t("label.phone") }}</td>
                        <!-- <td>{{userData.phone}}</td> -->
                        <td style="font-family: 'Arial'">+48 600 374 541</td>
                      </tr>
                      <tr  v-if="cvElements.address">
                        <td style="font-weight: bold; font-family: 'Arial'">{{ $t("label.email") }}</td>
                        <!-- <td>{{userData.email}}</td> -->
                        <td style="font-family: 'Arial'">damian.jankowski@btech.pl</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; font-family: 'Arial' ">Znajmość języków</td>
                        <td style="font-family: 'Arial'">Polski - ojczysty</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style="font-family: 'Arial'">Angielski - C1</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style="font-family: 'Arial'">Niemiecki - A1</td>
                        <!-- <td>Niemiecki - A1</td> -->
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table width="20%">
                      <tr>
                        <td>
                          <img  v-if="cvElements.photo" id="cv-img" class="img-user-class" src="../../assets/images/hd.jpg"  width="150px">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

          <!-- education -->
            <h3 style="font-family:'Arial'; font-weight: normal; margin-bottom:1rem; padding:0; border-bottom: 2px solid #E79600; text-transform: uppercase; ">{{ $t("header.education") }}</h3>
            <table style="border-spacing: 0;" cellpadding="5" cellspacing="0" id="cv-education" width="100%" v-for="(education, index) in userEducation" :key='index'>
              <tr >
                <td style="font-weight: bold; font-family: 'Arial';" width="21%">{{education.University}}</td>
                <td style="font-family: 'Arial';" width="50%">{{education.FieldOfStudy}}</td>
                <!-- <td style="font-family: 'Arial'; background: #ccc; " width="20%">{{education.AcademicTitle}}</td> -->
              </tr>
              <tr>
                <td style="font-family: 'Arial';">{{formatDate(education.DateStart)}} - {{formatDate(education.DateEnd)}}</td>
                <!-- <td style="font-style: italic; font-size: 0.95rem; font-family: 'Arial'">{{education.StudyType}}</td> -->
              </tr>
              <tr>
                
              </tr>
            </table>

        <!-- experience -->
            <h3 style="font-weight: normal; margin-bottom:1rem; padding:0; border-bottom: 2px solid #E79600; text-transform: uppercase; font-family: 'Arial';">{{ $t("header.experience") }}</h3>
            <table class="border-collapse: collapse;"  width="100%" v-for="(experience, index) in userExperience" :key='index'>
              <tr cellspacing="0">
                <td style="font-family: 'Arial'; font-weight: bold;">{{experience.Employer}}</td>
                <td style="font-weight: bold; font-family: 'Arial'; font-size: 0.9rem;">{{experience.WorkPos}}</td>
              </tr>
              <tr>
                <td style="border-spacing: 0; font-family: 'Arial';" width="30%">{{formatDate(experience.DateStart)}} - {{formatDate(experience.DateEnd)}}</td>
                
              </tr>
            </table>

          <!-- projects -->
            <h3 style="font-weight: normal; margin-bottom:1rem; padding:0; border-bottom: 2px solid #E79600; text-transform: uppercase; font-family: 'Arial';">{{ $t("header.projects") }}</h3>
            <table width="100%" v-for="(project, index) in userProjects" :key="index">
              <tr>
                <td width="30%" style="font-weight: bold; font-family: 'Arial'">{{project.contractor}} (Handel)</td>
                <td style="font-family: 'Arial'">Moduły SAP: <strong class v-for="sapModule in userProjects[index].modules" :key="sapModule.id">{{ sapModule.id }}</strong></td>
              </tr>
              <tr>
                <td style="font-family: 'Arial';">{{formatDate(project.duration.start)}} - {{formatDate(project.duration.end)}}</td>
                <td style="font-family: 'Arial'">{{project.descr}}</td>
              </tr>
            </table>

            <h3 style="font-weight: normal; margin-bottom:1rem; padding:0; border-bottom: 2px solid #E79600; text-transform: uppercase; font-family: 'Arial';">Doświadczenie SAP</h3>
            <table>
              <tr>
                <td width="45%" style="font-family: 'Arial'; font-weight: bold;">Doświadczenie Modułowe SAP</td>
                <td>SD, MM, FI, PP QM</td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;">Języki programowania</td>
                <td>JavaScript, JSON, XML, ABAP, OO ABAP</td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;">Technologie</td>
                <td>SAPUI5, OData, SAP Gateway, RFC</td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;">Rozszerzenia</td>
                <td>BADI, Enhancement Points, OData Extension</td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;">Dodatkowe doświadczenie</td>
                <td>Autoryzacja, Role użytkowników</td>
              </tr>
            </table>
        </td>
      </tr>
    </table>
    <div style="mso-element:footer" id="f1" >
      <table>
        <tr>
          <td>
            <p class="MsoFooter">Damiana Stopka</p>
          </td>
        </tr>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      userInfo: {},
      showGenerateBtn: true
    };
  },
  beforeCreate() {
    this.$store.dispatch("getUserInfo");
    const retrievedObject = JSON.parse(localStorage.getItem('Object'));
    this.$store.commit('SET_CV_ELEMENTS', retrievedObject)
  },

  methods: {
    generate() {
      if (this.cvElements.format == "DOCX") {
        this.generateDocx()
      } else {
        this.generatePdf()
      }
    },
    generatePdf() {

    },
    generateDocx() {
      this.showGenerateBtn = false
      this.convertImagesToBase64();
      const preHtml  = "<html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' xmlns='http://www.w3.org/TR/REC-html40'> <head><meta http-equiv=Content-Type content='text/html; charset=utf-8'></head> <body>",
            postHtml = "</body></html>";
      const content  = preHtml + document.getElementById("content").innerHTML + postHtml;
      const converted = htmlDocx.asBlob(content, { margins: {bottom: 0}});
      saveAs(converted, "document.docx");
    },
    convertImagesToBase64() {
      let contentDocument = document.getElementById("content"),
          image = document.getElementById("cv-img"),
          canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d"),
          width = image.width,
          height = image.height
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0,width,height);
      const dataURL = canvas.toDataURL("image/jpeg");
      image.setAttribute("src", dataURL);
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("YYYY")
        : "-";
    }
  },
  computed: {
    ...mapGetters({
      userEducation: "getUserEducation",
      userProjects: "getUserProjectsList",
      userExperience: "getUserExperience",
      userData: "userData",
      cvElements: "getCvElements"
    }),
    returnUserInfo() {
      return this.$store.getters.userInfo;
    }
  }
};
</script>
<style>
table {
  width: 21cm;
}
table,
th,
td {
  /* border: 1px solid black; */
}

.cv-table-header {
  text-align: left;
  background-color: lightgray;
}
</style>
