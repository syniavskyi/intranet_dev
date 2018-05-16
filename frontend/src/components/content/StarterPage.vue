<template>
  <div>
    <h1>Starter Page</h1>
    <h3>Witaj w firmie! Poniżej lista dokumentów do wypełnienia i dostarczenia dla Back Office'u dla nowozatrudnionych pracowników.</h3>
    <ul>
      <li v-for="list in listOfDoc" :class="list.checked ? 'line-through' : 'none' ">
        <!-- <button>Plik</button>{{ list }}<input type="checkbox" @change="$v.docCheckbox.$touch()" v-model="docCheckbox"> -->
        <button>Plik</button>{{ list.title }}<input type="checkbox" :checked="list.checked" @change="changeCheckbox(list)">
      </li>
    </ul>
    <button :disabled="buttonDisabled">Dostarczyłem wszystkie dokumenty</button>
  </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import i18n from '../../lang/lang'

export default {
  data() {
    return {
      listOfDoc: [
        {
          title: "Umowa o Pracę",
          checked: false
        },
        // "Umowa o Pracę",
        {
          title: "Zakres obowiązków",
          checked: true
        }
        // "Zakres obowiązków",
        // "Informacja dla praacownika",
        // "Deklaracja PIT-2",
        // "Dane personalne",
        // "Oświadczenie dla Urzędu Skarbowego",
        // "Oświadczenie zleceniobiorcy",
        // "Kwestionariusz osobowy",
        // "Oświadczenie na rozłąkę",
        // "Dotychczasowe świadectwa pracy",
        // "Dyplomy",
        // "Dokumentacja od lekarza tj. badania okresowe i psychologiczne pod kątem prowadzenia auta"
      ],
      buttonDisabled: true
      // listOfDoc: [
      //   {
      //     title: "test",
      //     checkbox: false
      //   },
      //   {
      //     title: "test2",
      //     checkbox: false
      //   }
      // ]
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
      for(var i = 0; i < this.listOfDoc.length; i++) {
        // this.listOfDoc[i].checked ? this.buttonDisabled = false : return this.buttonDisabled = true;
        if(this.listOfDoc[i].checked) {
          this.buttonDisabled = false;
        } else {
          return this.buttonDisabled = true;
        }
      }
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
