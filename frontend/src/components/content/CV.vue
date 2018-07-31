<template>
  <div id="content">
    <div class="Section1" >
      <!-- header with name and position-->
    <button @click="generateCV2">Generuj</button>
    <div>
        <h1 style="text-align:right"> {{ userData.firstName }} {{ userData.lastName }} </h1>
        <h3 style="text-align:right"> {{ userData.position }} </h3>
    </div>
    <table width="100%">
      <tr>
        <td>
          <tr align="right">
            <h1 style="font-family: 'Arial'">Damian Jankowski</h1>
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
                      <tr>
                        <td style="font-weight: bold; font-family: 'Arial'">Data urodzenia</td>
                        <td style="font-family: 'Arial'">01.02.1996</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; font-family: 'Arial'">{{ $t("label.phone") }}</td>
                        <!-- <td>{{userData.phone}}</td> -->
                        <td style="font-family: 'Arial'">+48 600 374 541</td>
                      </tr>
                      <tr>
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
                          <img id="img" class="img-user-class" src="../../assets/images/hd.jpg"  width="150px">
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
      userInfo: {}
    };
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
      var preHtml =
        '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"> <head> <meta http-equiv=Content-Type content="text/html" charset=windows-1250"> <meta name=ProgId content=Word.Document> <meta name=Generator content="Microsoft Word 15"> <meta name=Originator content="Microsoft Word 15"> <title>Microsoft Office HTML Example</title><link rel=File-List href="document_files/filelist.xml"><!--[if !mso]><style> v:* {behavior:url(#default#VML);} o:* {behavior:url(#default#VML);} w:* {behavior:url(#default#VML);} .shape {behavior:url(#default#VML);} </style> <![endif]-->  <style> @page {mso-footer:f1} @page Section1  {mso-footer-id:f1; mso-footer:f1;} div.Section1{page: Section1;} p.MsoFooter, li.MsoFooter, div.MsoFooter { mso-pagination:widow-orphan; tab-stops:center 216.0pt right 432.0pt;} span.SpellE {mso-style-name:""; mso-spl-e:yes;} </style> <!--[if gte mso 9]><xml><w:WordDocument><w:View>Web</w:View><w:Zoom>90</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]--><!--[if gte mso 9]><xml><w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false" DefSemiHidden="false" DefQFormat="false" DefPriority="99" LatentStyleCount="375"><w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true" Name="footer"/> </w:LatentStyles></xml><![endif]--></head> <body lang=EN-US style="tab-interval:36.0pt">';
      // var footer = '<div style="mso-element:footer" id="f1" > <p class="MsoFooter" style=mso-tab-count:2><span>Damiana</span><span>Stopka</span></p></div>'
      var postHtml = "</body> </html>";

      this.convertImagesToBase64();
      html = preHtml + document.getElementById("content").innerHTML + postHtml;

      // html = document.getElementById("content").innerHTML;
      blob = new Blob(["\ufeff", html], {
        type: "application/msword"
        // type: "text/html"
        // type: "application/xml"
        // type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      url = URL.createObjectURL(blob);
      link = document.createElement("A");
      link.href = url;
      link.download = "Document"; // default name without extension
      document.body.appendChild(link);
      if (navigator.msSaveOrOpenBlob)
        navigator.msSaveOrOpenBlob(blob, "Document.doc"); // IE10-11
      else link.click(); // other browsers
      // link.click();
      document.body.removeChild(link);
    },
    generateCV2() {
      this.convertImagesToBase64();
      // let image  = document.getElementById("img")
      //   this.toDataURL(image.src, function(dataURL) {
      //       image.src = dataURL;
      //   });
      const preHtml  = "<html xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' xmlns='http://www.w3.org/TR/REC-html40'> <head><meta http-equiv=Content-Type content='text/html; charset=utf-8'></head> <body>",
            postHtml = "</body></html>";
      const content  = preHtml + document.getElementById("content").innerHTML + postHtml;
      const converted = htmlDocx.asBlob(content, { margins: {bottom: 0}});
      saveAs(converted, "document.docx");
    },
    convertImagesToBase64() {
      let contentDocument = document.getElementById("content"),
          image = document.getElementById("img"),
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

      // canvas.remove();
    },
toDataURL(src, callback) {
    var image = new Image();
    image.crossOrigin = 'Anonymous';
 
    image.onload = function() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        context.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL('image/jpeg');
        callback(dataURL);
    };

    image.src = src;
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
      userData: "userData"
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
