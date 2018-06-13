<template>
  <div class="plane-documents">
    <div class="documents-nav-and-content">
      <app-menu></app-menu>
      <div class="documents-content">
        <div class="documents-header"> 
          <div class="documents-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="documents-header-menu">
            <p class="documents-header-title">Dokumenty</p>
          </div>
        </div>
        <div class="documents-page-tiles">
          <div class="documents-tiles-row">
            <input id="documents-row-1" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-1">Dokumenty Kagrin</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Wniosek Urlopowy</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <div class="document-div">
                    <div class="document-items">
                      <a class="doc-download-button">&#8675;</a>
                      <div class="doc-file"></div>
                      <a class="doc-download-button"></a>
                    </div>
                    <div class="document-items"></div>
                  </div>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Lista obecności</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Wzory CV</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <input id="documents-row-2" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-2">Dokumenty istotne</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Wzory CV</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                </div>
              </div>
            </div>
          </div>
          <div class="documents-tiles-row">
            <input id="documents-row-3" class="documents-tiles-row-header-input" type="checkbox">
            <label class="documents-tiles-row-header" for="documents-row-3">Dokumenty istotne</label>
            <div class="documents-tiles-row-content">
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <h1 class="documents-tile-text">Jakiś content</h1>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Wzory CV</p>
                  <div class="documents-tile-underscore"></div>
                </div>
                <div class="documents-tile-content">
                  <h1>asdadsada</h1>
                  <h2>asadsad</h2>
                </div>
              </div>
              <div class="documents-tile documents-tile-1-3">
                <div class="documents-tile-header">
                  <p class="documents-tile-header-title">Dokumenty ważne</p>
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

export default {
  data() {
    return {
      listOfDoc: []
    }
  },
  components: {
    'app-menu': Menu
  }
}
</script>
<style>
</style>
