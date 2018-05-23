<template>
  <div class="plane-starter-page">
    <div class="starter-page-nav-and-content">
      <app-menu></app-menu>
      <div class="starter-page-content">
        <div class="starter-header">
          <div class="starter-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="starter-header-menu">
            <p class="starter-header-title">{{ $t("header.starterPage") }}</p>
          </div>
        </div>
        <h3 class="starter-page-user-header">{{ $t("header.welcome") }}</h3>
        <div class="starter-page-list">
          <div class="starter-page-list-header">
            <p class="starter-page-list-title">{{ $t("label.documentList") }}</p>
          </div>
          <div class="starter-page-list-content">
            <ul class="starter-page-ul">
              <li class="starter-page-item" v-for="list in getDocs" :key="list.title">
                <div class="starter-page-list-item-btns">
                  <button class="starter-page-file-btn">&#x21e3;</button>
                  <div v-if="list.format === 'pdf'" class="starter-page-pdf">.pdf</div>
                  <div v-else class="starter-page-docx">.docx</div>
                </div>
                <div class="starter-page-list-item-wrapper">
                  <div class="starter-page-item-text" :class="list.checked ? 'line-through' : 'none'">
                    {{ list.title }}
                    <p class="starter-list-item-popover">{{ list.description }}</p>
                  </div>
                </div>
                <input class="starter-page-checkbox" :checked="list.checked" @change="changeCheckbox(list)" type="checkbox">
              </li>
            </ul>
            <div class="starter-page-list-bottom">
              <button class="starter-page-docs-btn button" :disabled="setButton">{{ $t("button.documentComplete") }}</button>
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
  },
  created() {
    this.checkList();
    this.getDocList();
  },
  mounted() {
    this.$nextTick(function() {
      console.log('test');
    })
  },
  methods: {
    changeCheckbox(data) {
      data.checked = !data.checked;
      this.checkList();
    },
    checkList() {
      this.$store.dispatch("checkList", {
        listOfDoc: this.listOfDoc
      })
    },
    getDocList(){
      this.$store.dispatch("getDocs");
    }
  },
  computed: {
    setButton() {
      return this.$store.getters.returnCheckList;
    },
    getDocs(){
      return this.$store.getters.docLists;
    }
  }
}
</script>

<style scoped>
  .line-through {
    text-decoration: line-through;
    color: grey;
  }

  .none {
    text-decoration: none;
  }
</style>
