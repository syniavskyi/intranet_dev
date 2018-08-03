<template>
  <div id="content">
    <div class="Section1" >
      <!-- header with name and position-->

    <button @click="generate" v-if="showGenerateBtn" class="cv-modal-btn-bclear">Zatwierdź i generuj</button>
    <!-- <div>
    <button @click="generate" v-if="showGenerateBtn" class="profile-edit-experience-e">Zatwierdź i generuj</button>
    <div>
        <h1 style="text-align:right"  v-show="cvElements.name"> {{ userData.firstName }} {{ userData.lastName }} </h1>
        <h3 style="text-align:right"> {{ userData.position }} </h3>
    </div> -->
    <table id="main-table" width="100%">
      <tr>
        <td>
          <tr class="tr-header" align="right">
            <h1  v-if="cvElements.name" style="font-family:'Arial'">Damian Jankowski</h1>
            <h2 style="font-family: 'Arial'">Programista Fiori</h2>
          </tr>
        <!-- personal data -->
              <h3 style="font-weight:bold; margin-bottom:10px; margin-top:10px; padding-bottom:5px; border-bottom:2px solid #E79600; text-transform:uppercase; font-family:'Arial';">Dane osobowe</h3>
              <!-- <v:line  from="0,0" to="800,0" strokeweight="2pt"  xmlns:v="urn:schemas-microsoft-com:vml" strokecolor="blue"/> -->
              <table width="100%">
                <tr>
                  <td>
                    <table width="85%">
                      <tr>
                        <td width="65%" style="font-weight:bold; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Narodowość</p></td>
                        <td style="font-family: 'Arial'"><p style="mso-cellspacing:0; margin:0; padding:0;">Polska</p></td>
                      </tr>
                      <tr v-if="cvElements.date">
                        <td style="font-weight:bold; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Data urodzenia</p></td>
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">01.02.1996</p></td>
                      </tr>
                      <tr  v-if="cvElements.phone">
                        <td style="font-weight: bold; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">{{ $t("label.phone") }}</p></td>
                        <!-- <td>{{userData.phone}}</td> -->
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">+48 600 374 541</p></td>
                      </tr>
                      <tr  v-if="cvElements.address">
                        <td style="font-weight: bold; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">{{ $t("label.email") }}</p></td>
                        <!-- <td>{{userData.email}}</td> -->
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">damian.jankowski@btech.pl</p></td>
                      </tr>
                      <tr>
                        <td style="font-weight:bold; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Znajmość języków</p></td>
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Polski - ojczysty</p></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Angielski - C1</p></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Niemiecki - A1</p></td>
                        <!-- <td>Niemiecki - A1</td> -->
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table width="15%">
                      <tr>
                        <td>
                          <img  v-if="cvElements.photo" id="cv-img" class="img-user-class" src="../../assets/images/hd.jpg"  width="150px">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr> 
                  <td><p style="mso-cellspacing:0; margin:0; margin-bottom: 16px;"></p></td>
                </tr>
              </table>

          <!-- education -->
            <h3 style="mso-cellspacing:0pt; margin-bottom:10px; margin-top:10px; padding-bottom:5px; font-family:'Arial'; font-weight:bold; border-bottom:2px solid #E79600; text-transform:uppercase; ">{{ $t("header.education") }}</h3>
            <table align="center" cellspacing="0"  id="cv-education" width="98%" v-for="(education, index) in userEducation" :key='index'>
              <!-- style="border-spacing: 0;" cellpadding="0" -->
              <tr>
                <td style="font-weight:bold; font-family:'Arial';" width="45%"><p style="mso-cellspacing:0; margin:0; padding:0;">Uniwersytet Ekonomiczny we Wrocławiu im. Adama Lange</p></td>
                <!-- {{education.University}} -->
                <td style="font-family:'Arial';" valign="top" ><p style="mso-cellspacing:0; margin:0; padding:0;">{{education.FieldOfStudy}}</p></td>
                <!-- <td style="font-family: 'Arial'; background: #ccc; " width="20%">{{education.AcademicTitle}}</td> -->
              </tr>
              <tr>
                <td style="font-family:'Arial';"><p style="margin:0; padding:0; margin-bottom:10px;">{{formatDate(education.DateStart)}} - {{formatDate(education.DateEnd)}}</p></td>
                <!-- <td style="font-style: italic; font-size: 0.95rem; font-family: 'Arial'">{{education.StudyType}}</td> -->
              </tr>
              <tr> 
                <!-- <td><p style="mso-cellspacing:0; margin:0; padding:0;">&nbsp;</p></td> -->
              </tr>
            </table>

        <!-- experience -->
            <h3 style="font-weight:bold; margin-bottom:10px; margin-top:10px; padding-bottom:5px; border-bottom:2px solid #E79600; text-transform:uppercase; font-family:'Arial';">{{ $t("header.experience") }}</h3>
            <table align="center" class="border-collapse: collapse;"  width="98%" v-for="(experience, index) in userExperience" :key='index'>
              <tr>
                <td style="padding:0; font-family:'Arial'; font-weight:bold;" width="45%"><p style="mso-cellspacing:0; margin:0; padding:0;"> {{experience.Employer}}</p></td>
                <td style="padding:0; font-family:'Arial'; font-size:0.9rem;"><p style="mso-cellspacing:0; margin:0; padding:0;">{{experience.WorkPos}}</p></td>
              </tr>
              <tr>
                <td style="border-spacing:0; font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0; margin-bottom:10px;">{{formatDate(experience.DateStart)}} - {{formatDate(experience.DateEnd)}}</p></td>
              </tr>
              <tr> 
                <!-- <td><p style="mso-cellspacing:0; margin:0; padding:0;">&nbsp;</p></td> -->
              </tr>
            </table>

          <!-- projects -->
            <h3 style="font-weight:bold; margin-bottom:10px; margin-top:10px; padding-bottom:5px; border-bottom: 2px solid #E79600; text-transform:uppercase; font-family:'Arial';">{{ $t("header.projects") }}</h3>
            <table align="center" width="98%" v-for="(project, index) in userProjects" :key="index">
              <tr>
                <td width="45%" style="font-weight:bold; font-family:'Arial';" v-if="!cvElements.contractor"><p style="mso-cellspacing:0; margin:0; padding:0;">Branża:</p> <p v-for="industry in userProjects[index].industries" :key="industry.id">{{formatIndustryName(industry.id)}}</p></td>
                <td style="font-weight:bold; font-family:'Arial';" v-if="cvElements.contractor">{{project.contractor}} <p v-for="industry in userProjects[index].industries" :key="industry.id">{{formatIndustryName(industry.id)}}</p></td>
                <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">Moduły SAP: <strong class v-for="sapModule in userProjects[index].modules" :key="sapModule.id">{{ sapModule.id }}</strong></p></td>
              </tr>
              <tr>
                <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0;">{{formatDate(project.DateStart)}} - {{formatDate(project.DateEnd)}}</p></td>
                <td style="font-family:'Arial';"><p style="mso-cellspacing:0; margin:0; padding:0; margin-bottom: 10px;">{{project.descr}}</p></td>
              </tr>
              <tr> 
                <!-- <td><p style="mso-cellspacing:0; margin:0; padding:0;">&nbsp;</p></td> -->
              </tr>
            </table>

            <!-- SAP experience -->
            <h3 style="font-weight: bold; margin-bottom: 10px; margin-top:10px; padding-bottom:5px; border-bottom:2px solid #E79600; text-transform: uppercase; font-family: 'Arial';">Doświadczenie SAP</h3>
            <table>
              <tr>
                <td width="46%" style="font-family: 'Arial'; font-weight: bold;"><p style="mso-cellspacing:0; margin:0; padding:0;">Doświadczenie Modułowe SAP</p></td>
                <td><p style="mso-cellspacing:0; margin:0; padding:0; font-family: 'Arial';">SD, MM, FI, PP QM</p></td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;"><p style="mso-cellspacing:0; margin:0; padding:0;">Języki programowania</p></td>
                <td><p style="mso-cellspacing:0; margin:0; padding:0; font-family: 'Arial';">JavaScript, JSON, XML, ABAP, OO ABAP</p></td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;"><p style="mso-cellspacing:0; margin:0; padding:0;">Technologie</p></td>
                <td><p style="mso-cellspacing:0; margin:0; padding:0; font-family: 'Arial';">SAPUI5, OData, SAP Gateway, RFC</p></td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;"><p style="mso-cellspacing:0; margin:0; padding:0;">Rozszerzenia</p></td>
                <td><p style="mso-cellspacing:0; margin:0; padding:0; font-family: 'Arial';">BADI, Enhancement Points, OData Extension</p></td>
              </tr>
              <tr>
                <td style="font-family: 'Arial'; font-weight: bold;"><p style="mso-cellspacing:0; margin:0; padding:0;">Dodatkowe doświadczenie</p></td>
                <td><p style="mso-cellspacing:0; margin:0; padding:0; font-family: 'Arial';">Autoryzacja, Role użytkowników</p></td>
              </tr>
            </table>
        </td>
      </tr>
    </table>
    <!-- <div style="mso-element:footer" id="f1" >
      <table>
        <tr>
          <td>
            <p class="MsoFooter">Damiana Stopka</p>
          </td>
        </tr>
      </table>
    </div> -->
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
      showGenerateBtn: true
    };
  },
  beforeCreate() {
    this.$store.dispatch("getUserData");
    const retrievedObject = JSON.parse(localStorage.getItem("Object"));
    this.$store.commit("SET_CV_ELEMENTS", retrievedObject);
  },

  methods: {
    generate() {
      if (this.cvElements.format == "PDF") {
        this.generatePdf();
      } else {
        this.generateDocx();
      }
    },
    generatePdf() {},
    generateDocx() {
      this.showGenerateBtn = false;
      this.convertImagesToBase64();
      const preHtml =
          "<html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' xmlns='http://www.w3.org/TR/REC-html40'> <head><meta http-equiv=Content-Type content='text/html; charset=utf-8'></head> <body>",
        postHtml = "</body></html>";
      const content =
        preHtml + document.getElementById("content").innerHTML + postHtml;
      const converted = htmlDocx.asBlob(content, { margins: { bottom: 0 } });
      saveAs(converted, "document.docx");
    },
    convertImagesToBase64() {
      let contentDocument = document.getElementById("content"),
        image = document.getElementById("cv-img"),
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        width = image.width,
        height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, width, height);
      const dataURL = canvas.toDataURL("image/jpeg");
      image.setAttribute("src", dataURL);
    },
    formatDate(date) {
      return date !== null && date !== undefined
        ? moment(date).format("YYYY")
        : "-";
    },

    formatIndustryName(id) {
      for (let i = 0; i < this.industryList.length; i++) {
        if (id === this.industryList[i].id) {
          return this.industryList[i].name;
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      userEducation: "getUserEducation",
      userProjects: "getUserProjectsList",
      userExperience: "getUserExperience",
      userData: "userData",
      cvElements: "getCvElements",
      industryList: "getIndustryList",
      userInfo: "getUserInfo"
    })
  }
};
</script>
<style>
#content {
  background: grey;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: min-content;
}
.tr-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.Section1 {
  background: white;
  display: flex;
  align-self: center;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  margin: 1rem auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  width: 50%;
  height: 100%;
  padding: 6rem;
  /* transform: scale(0.5, 0.5); */
}
.cv-table-header {
  text-align: left;
  background-color: lightgray;
}

.cv-modal-btn,
.cv-modal-btn-clear,
.cv-modal-btn-bclear {
  display: flex;
  cursor: pointer;
  color: #333;
  border: 0;
  height: 4rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
  outline: none;
  font-size: 0.85rem;
}
.cv-modal-btn-bclear {
  background: transparent;
  /* text-transform: uppercase; */
  border: 2px solid rgb(61, 61, 61);
  /* padding: .6rem .8rem; */
}
.cv-modal-btn-bclear:hover {
  box-shadow: 0 0 8px #333;
  background: #333;
  color: white;
}
</style>
