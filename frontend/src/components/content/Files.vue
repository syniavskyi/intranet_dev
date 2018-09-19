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
            <input id="documents-row-1" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-1">{{ $t("label.kagrinDocs") }}</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.holidayRequest") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <div class="documents-div">
                    <a class="doc-file-div">
                      <div class="doc-file-img doc-file-doc"></div>
                      <div class="doc-file-desc">{{ $t("label.holidayRequestDoc") }}</div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.attendanceList") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <div class="documents-div">
                      <a class="doc-file-div">
                      <div class="doc-file-img doc-file-xls"></div>
                      <div class="doc-file-desc">{{ $t("label.attendanceListXLS") }}</div>
                    </a>
                    <a class="doc-file-div">
                      <div class="doc-file-img  doc-file-pdf"></div>
                      <div class="doc-file-desc">{{ $t("label.attendanceListPDF") }}</div>
                     </a>
                  </div>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.cvTemplates") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <input id="documents-row-2" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-2">{{ $t("label.criticalDocs") }}</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.cvTemplates") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <input id="documents-row-3" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-3">{{ $t("label.criticalDocs") }}</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <h1 class="documents-tile-text">Jakiś content</h1>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.cvTemplates") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <h1>asdadsada</h1>
                  <h2>asadsad</h2>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">{{ $t("label.importantDocs") }}</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
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
import Menu from '../Menu.vue'
import axios from 'axios'
import i18n from '../../lang/lang'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      listOfDoc: []
    }
  },
  computed: {
    ...mapGetters({
      displayMenu: 'getShowMenu',
      displayOverlay: 'getShowMenuOverlay'
    })
  },
  methods: {
    showMenu(event) {
      let obj = {window, event}
      this.$store.dispatch("setSideMenu", obj);
    },
  },
  components: {
    'app-menu': Menu
  }
}
</script>
<style>
</style>
