<template>
  <div class="plane-starter-page">
    <div class="starter-page-nav-and-content">
      <div class="starter-page-content">
        <div class="starter-header"> 
          <div class="starter-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="starter-header-menu">
            <p class="starter-header-title">Strona Startowa</p>
          </div>
        </div>
        <h3 class="starter-page-user-header">Witaj w BTech!</h3>
        <div class="starter-page-list">
          <div class="starter-page-list-header">
            <p class="starter-page-list-title">Poniżej znajduje się lista dokumentów które musisz wypełnić i dostarczyć</p>
          </div>
          <div class="starter-page-list-content">
            <ul class="starter-page-ul">
              <li class="starter-page-item" v-for="list in listOfDoc">
                <div class="starter-page-list-item-btns">
                  <button class="starter-page-file-btn">&#x21e3;</button>
                  <div class="starter-page-pdf">.pdf</div>
                </div>
                <div class="starter-page-list-item-wrapper">
                  <div class="starter-page-item-text"  :class="list.checked ? 'line-through' : 'none'">
                    {{ list.title }}
                  </div>
                </div>
                <input class="starter-page-checkbox" :checked="list.checked" @change="changeCheckbox(list)" type="checkbox">
              </li>
            </ul>
            <div class="starter-page-list-bottom">
              <button class="starter-page-docs-btn button" :disabled="setButton">Dokumenty przekazano</button>
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
          checked: false
        },
        {
          title: "Zakres obowiązków",
          checked: true
        },
        {
          title: "Informacja dla praacownika",
          checked: true
        },
        {
          title: "Deklaracja PIT-2",
          checked: false
        },
        {
          title: "Dane personalne",
          checked: true
        },
        {
          title: "Oświadczenie dla Urzędu Skarbowego",
          checked: false
        },
        {
          title: "Oświadczenie zleceniobiorcy",
          checked: true
        },
        {
          title: "Kwestionariusz osobowy",
          checked: false
        },
        {
          title: "Oświadczenie na rozłąkę",
          checked: true
        },
        {
          title: "Dotychczasowe świadectwa pracy",
          checked: false
        },
        {
          title: "Dyplomy",
          checked: true
        },
        {
          title: "Dokumentacja od lekarza tj. badania okresowe i psychologiczne pod kątem prowadzenia auta",
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
