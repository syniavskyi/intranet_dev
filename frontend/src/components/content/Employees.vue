<template>
  <div class="plane-component">
    <div class="component-nav-and-content">
      <app-menu></app-menu>
      <div class="component-content">
        <div class="content-header">
          <div class="content-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="content-header-menu">
            <p class="content-header-title">Lista Pracowników</p>
          </div>
        </div>
        <div id="searchEmployee">
          <p>Wpisz imię lub nazwisko</p>
          <input v-model="searchUser"/>
          <p>Lub wybierz oddział</p>
        </div>
        <div class="employees-table">
          <div class="emp-thead">
                <div class="emp-thead-item">{{ $t("label.fullName") }}</div>
                <div class="emp-thead-item">{{ $t("label.position") }}</div>
                <div class="emp-thead-item">{{ $t("label.department") }}</div>
                <div class="emp-thead-item">{{ $t("label.phone") }}</div>
                <div class="emp-thead-item">{{ $t("label.email") }}</div>
          </div>
          <div class="emp-tbody">
            <div class="emp-tbody-row" v-for="user in filteredUsers" :key="user.PersonNumber">
              <div class="emp-tbody-item">
                <div class="emp-tbody-item-title"> {{ $t("label.fullName") }} </div>
                <div class="emp-tbody-item-txt"> {{ user.Fullname }} </div>
              </div>
              <div class="emp-tbody-item">
                <div class="emp-tbody-item-title"> {{ $t("label.position") }} </div>
                <div class="emp-tbody-item-txt"> {{ user.JobPosition }} </div>
              </div>
              <div class="emp-tbody-item">
                <div class="emp-tbody-item-title">{{ $t("label.department") }} </div>
                <div class="emp-tbody-item-txt"> {{ user.SectionName }} </div>
              </div>
              <div class="emp-tbody-item">
                <div class="emp-tbody-item-title">{{ $t("label.phone") }} </div>
                <div class="emp-tbody-item-txt"> {{ user.Telephone }} </div>
              </div>
              <div class="emp-tbody-item">
                <div class="emp-tbody-item-title">{{ $t("label.email") }} </div>
                <div class="emp-tbody-item-txt"> {{ user.Email }} </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import i18n from '../../lang/lang'
import Menu from '../Menu.vue'
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        userInfo: {},
        searchUser: ''
      }
    },
    components: {
        'app-menu': Menu
    },
    beforeCreate() {
      if (this.$store.getters.isDataLoaded === false) {
            this.$store.dispatch('loadData', localStorage.getItem('token'))
      }
    },
    computed: {
      ...mapGetters(["usersList"]),
    filteredUsers:function(){
        let self = this
        return this.usersList.filter(function(user){return user.Fullname.toLowerCase().indexOf(self.searchUser.toLowerCase())>=0;});
    }
    }
  }
</script>

<style>

</style>
