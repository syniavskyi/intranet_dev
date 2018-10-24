<template>
  <div class="plane-component">
    <div class="component-nav-and-content">
      <app-menu v-show="displayMenu"></app-menu>
      <div class="modal-overlay" v-show="displayOverlay"></div>
      <div class="component-content">
        <div class="content-header">
          <div class="content-header-title-and-menu">
            <!-- <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="content-header-menu"> -->
            <div @click="showMenu" class="content-header-menu">&#9776;</div>
            <p class="content-header-title">{{ $t("header.documents") }}</p>
          </div>
        </div>
        <div class="documents-page-tiles">

          <div class="documents-tiles-row">
            <!-- <input id="documents-row-1" class="documents-tiles-row-header-input" type="checkbox"> -->
            <div @click.self="toggleDocTile" class="documents-tiles-row-header" for="documents-row-1">Dokumenty</div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3" v-for="doc in docFiles" :key="doc.FileId">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ doc.Filename }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <div class="documents-div">
                    <a class="doc-file-div" :href="generateLink(doc.FileId)" target="_blank">
                      <div class="doc-file-img doc-file-pdf" v-if="checkFileFormat(doc.Filename) == '.pdf'"></div>
                      <div class="doc-file-img doc-file-doc" v-if="checkFileFormat(doc.Filename) == '.docx' || checkFileFormat(doc.Filename) == '.doc'"></div>
                      <div class="doc-file-desc">{{ doc.Filename }}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <!-- <input id="documents-row-2" class="documents-tiles-row-header-input" type="checkbox"> -->
            <div @click.self="toggleDocTile" class="documents-tiles-row-header" for="documents-row-2">Namiary na systemy</div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3" v-for="doc in systemFiles" :key="doc.FileId">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ doc.Filename }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <div class="documents-div">
                    <a class="doc-file-div" :href="generateLink(doc.FileId)" target="_blank">
                      <div class="doc-file-img doc-file-pdf" v-if="checkFileFormat(doc.Filename) == '.pdf'"></div>
                      <div class="doc-file-img doc-file-doc" v-if="checkFileFormat(doc.Filename) == '.docx' || checkFileFormat(doc.Filename) == '.doc'"></div>
                      <div class="doc-file-desc">{{ doc.Filename }}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <!-- <input id="documents-row-3" class="documents-tiles-row-header-input" type="checkbox"> -->
            <div @click.self="toggleDocTile" class="documents-tiles-row-header" for="documents-row-3">Biuro</div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3" v-for="doc in officeFiles" :key="doc.FileId">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ doc.Filename }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                 <div class="documents-div">
                    <a class="doc-file-div" :href="generateLink(doc.FileId)" target="_blank">
                      <div class="doc-file-img doc-file-pdf" v-if="checkFileFormat(doc.Filename) == '.pdf'"></div>
                      <div class="doc-file-img doc-file-doc" v-if="checkFileFormat(doc.Filename) == '.docx' || checkFileFormat(doc.Filename) == '.doc'"></div>
                      <div class="doc-file-desc">{{ doc.Filename }}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <!-- <input id="documents-row-4" class="documents-tiles-row-header-input" type="checkbox"> -->
            <div @click.self="toggleDocTile" class="documents-tiles-row-header" for="documents-row-4">Informacje</div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3" v-for="doc in infoFiles" :key="doc.FileId">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ doc.Filename }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                 <div class="documents-div">
                    <a class="doc-file-div" :href="generateLink(doc.FileId)" target="_blank">
                      <div class="doc-file-img doc-file-pdf" v-if="checkFileFormat(doc.Filename) == '.pdf'"></div>
                      <div class="doc-file-img doc-file-doc" v-if="checkFileFormat(doc.Filename) == '.docx' || checkFileFormat(doc.Filename) == '.doc'"></div>
                      <div class="doc-file-desc">{{ doc.Filename }}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <input id="documents-row-5" class="documents-tiles-row-header-input" type="checkbox">
            <div @click.self="toggleDocTile" class="documents-tiles-row-header" for="documents-row-5">Instrukcje</div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3" v-for="doc in instrFiles" :key="doc.FileId">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ doc.Filename }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                 <div class="documents-div">
                    <a class="doc-file-div" :href="generateLink(doc.FileId)" target="_blank">
                      <div class="doc-file-img doc-file-pdf" v-if="checkFileFormat(doc.Filename) == '.pdf'"></div>
                      <div class="doc-file-img doc-file-doc" v-if="checkFileFormat(doc.Filename) == '.docx' || checkFileFormat(doc.Filename) == '.doc'"></div>
                      <div class="doc-file-desc">{{ doc.Filename }}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "../Menu.vue";
import i18n from "../../lang/lang";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      infoFiles: "getInfoFiles",
      docFiles: "getDocumentFiles",
      instrFiles: "getInstructionFiles",
      officeFiles: "getOfficeFiles",
      systemFiles: "getSystemFiles",
      displayMenu: "getShowMenu",
      displayOverlay: "getShowMenuOverlay"
    })
  },
  mounted() {
    this.$nextTick(this.calcDocsHeight().then(height => {}));
  },
  methods: {
    showMenu(event) {
      let obj = { window, event };
      this.$store.dispatch("setSideMenu", obj);
    },
    checkFileFormat(name) {
      return name.slice(name.lastIndexOf("."));
    },
    generateLink(file) {
      let url =
        "http://nw5.local.pl:8050/sap/opu/odata/sap/ZGW_INTRANET_SRV/AttachmentMedias(FileId='" +
        file +
        "',Language='" +
        "PL" +
        "',UserAlias='" +
        "" +
        "')/$value";
      return url;
    },
    toggleDocTile(evt) {
      let el = evt.target.nextElementSibling,
        elChild = evt.target.nextElementSibling;
      const name = { el, elChild };
      this.$store.dispatch("toggleDocTile", name);
    },
    calcDocsHeight(tiles) {
      var tiles = document.getElementsByClassName("documents-tiles-row");
      this.$store.dispatch("calcDocsHeight", tiles);
    }
  },
  components: {
    "app-menu": Menu
  }
};
</script>
<style>
</style>
