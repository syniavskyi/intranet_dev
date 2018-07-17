<template>
    <div id="content">
        <!-- header with name and position-->
        <button @click="generateCV">Generuj</button>
        <div>
            <h1 style="text-align:right">Imię i nazwisko</h1>
            <h3 style="text-align:right">Pozycja</h3>
        </div>

  <table width="100%">
    <tr>
      <td>
       <!-- personal data -->
        <div>
            <h3>Dane osobowe</h3>
            <table width="100%">
              <tr>
                <td style='border:none;border-bottom:solid #F4B083 1.5pt;
    mso-border-bottom-themecolor:accent2;mso-border-bottom-themetint:153;
    background:white;mso-background-themecolor:background1;padding:0cm 5.4pt 0cm 5.4pt'>Data urodzenia</td>
                <td>01.02.1996</td>
              </tr>
              <tr>
                <td>Telefon</td>
                <td>662 366 186</td>
              </tr>
              <tr>
                <td>Adres e-mail</td>
                <td>maria.harcej@btech.pl</td>
              </tr>
            </table>
        </div>

        <!-- education -->
        <div>
          <h3>Edukacja</h3>
          <table width="100%">
            <tr>
              <td class="cv-table-header"><b>Politechnika Wrocławska</b></td>
              <td class="cv-table-header"><b>Zarządzanie</b></td>
              <td class="cv-table-header"><b>Licencjat</b></td>
            </tr>
            <tr>
              <td>2015-2018</td>
              <td>Tryb dzienny</td>
              <td></td>
            </tr>
          </table>
        </div>

       <!-- experience -->
        <div>
          <h3>Doświadczenie</h3>
          <table width="100%">
            <tr>
              <td class="cv-table-header"><b>BTech Sp. z o.o.</b></td>
              <td class="cv-table-header"><b>SAPUI5 / Fiori Developer</b></td>
            </tr>
            <tr>
              <td colspan="2">od 08.2017</td>
            </tr>
          </table>
        </div>

        <!-- projects -->
        <div>
          <h3>Projekty</h3>
          <table width="100%">
            <tr>
              <td class="cv-table-header"><b>KOMFORT S.A</b></td>
              <td class="cv-table-header"><b>SAP Moduł: SD</b></td>
            </tr>
            <tr>
              <td>Handel </td>
              <td rowspan="2">co się robiło</td>
            </tr>
            <tr>
              <td>od 10.2017</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
    </div>
</template>

<script>
export default {
  methods: {
    generateCV() {
      var html, link, blob, url;
      // var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      // var postHtml = "</body></html>";
      // html = preHtml + document.getElementById('content').innerHTML + postHtml;
      html = document.getElementById("content").innerHTML;
      blob = new Blob(["\ufeff", html], {
        type: "application/pdf"
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
  border: 1px solid black;
}

.cv-table-header {
    text-align: left;
    background-color: lightgray; 
}
</style>


