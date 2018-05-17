<template>
  <div class="plane-starter-page">
    <div class="starter-page-nav-and-content">
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
              <li class="starter-page-item" v-for="list in listOfDoc" :key="list.title">
                <div class="starter-page-list-item-btns">
                  <button class="starter-page-file-btn">&#x21e3;</button>
                  <div class="starter-page-pdf">.pdf</div>
                </div>
                <div class="starter-page-list-item-wrapper">
                  <div class="starter-page-item-text" :class="list.checked ? 'line-through' : 'none'">
                    {{ list.title }}
                    <p class="starter-list-item-popover">{{ list.desc }}</p>
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
import axios from 'axios'
import i18n from '../../lang/lang'

export default {
  data() {
    return {
      listOfDoc: [
        {
          title: "Umowa o Pracę",
          desc: "Wypełniony arkusz umowy o pracę wraz z twoim podpisem i datą podpisania umowy",
          checked: false
        },
        {
          title: "Zakres obowiązków",
          desc: "Zakres obowiązków pracownika zgodnych z objętym przez ciebie stanowiskiem",
          checked: true
        },
        {
          title: "Informacja dla pracownika",
          desc: "Informacja na temat twojego miejsca pracy",
          checked: true
        },
        {
          title: "Deklaracja PIT-2",
          desc: "Deklaracja PIT-2 dla urzędu skarbowego",
          checked: false
        },
        {
          title: "Dane personalne",
          desc: "Twoje dane personalne które pozwolą na uzupełnienie innych dokumentów",
          checked: true
        },
        {
          title: "Oświadczenie dla Urzędu Skarbowego",
          desc: "Oświadczenie dla urzędu skarbowego abyś mógł się rozliczyć",
          checked: false
        },
        {
          title: "Oświadczenie zleceniobiorcy",
          desc: "Oświadczenie dla osoby zlecającej pracę",
          checked: true
        },
        {
          title: "Kwestionariusz osobowy",
          desc: "Kwestionariusz osobowy z twoimi danymi",
          checked: false
        },
        {
          title: "Oświadczenie na rozłąkę",
          desc: "Oświadzczenie na rozłąke która nigdy nie nadejdzie",
          checked: true
        },
        {
          title: "Dotychczasowe świadectwa pracy",
          desc: "Inofrmacje na temat twoich poprzednich miejsc pracy",
          checked: false
        },
        {
          title: "Dyplomy",
          desc: "Wszystkie dyplomy ukończonych przez ciebie szkół wyższych",
          checked: true
        },
        {
          title: "Dokumentacja od lekarza tj. badania okresowe i psychologiczne pod kątem prowadzenia auta",
          desc: "Badania okresowe i psychologiczne pod kątem prowadzenia auta",
          checked: false
        }
      ]
    }
  },
  created() {
    this.checkList();
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
    }
  },
  computed: {
    setButton() {
      return this.$store.getters.returnCheckList;
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
