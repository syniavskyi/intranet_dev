<template>
  <div class="plane-employees">
    <div class="employees-nav-and-content">
      <app-menu></app-menu>
      <div class="employees-content">
        <div class="employees-header">
          <div class="employees-header-title-and-menu">
            <img src="../../assets/images/nav/if_menu-32.png" width="32px" class="employees-header-menu">
            <p class="employees-header-title">Lista Pracowników</p>
          </div>
        </div>
        <div class="employees-list">
          <!-- <div id="container"> -->
            <div class="employees-column">
              <p class="employees-column-title">{{ $t("label.fullName") }}</p>
              <ul class="employees-column-item">
                <li class="employees-list-item" v-for="userInfo in getUserList">
                  {{ userInfo.firstName }} {{ userInfo.lastName }}
                </li>
              </ul>
            </div>
            <div class="employees-column">
              <p class="employees-column-title">{{ $t("label.position") }}</p>
              <ul class="employees-column-item">
                <li class="employees-list-item" v-for="userInfo in getUserList">
                  {{ userInfo.roleName }}
                </li>
              </ul>
            </div>
            <div class="employees-column">
              <p class="employees-column-title">{{ $t("label.department") }}</p>
              <ul class="employees-column-item">
                <li class="employees-list-item" v-for="userInfo in getUserList">
                  {{ userInfo.depName }}
                </li>
              </ul>
            </div>
            <div class="employees-column">
              <p class="employees-column-title">{{ $t("label.phone") }}</p>
              <ul class="employees-column-item">
                <li class="employees-list-item" v-for="userInfo in getUserList">
                  {{ userInfo.phone }}
                </li>
              </ul>
            </div>
            <div class="employees-column">
              <p class="employees-column-title">{{ $t("label.email") }}</p>
              <ul class="employees-column-item">
                <li class="employees-list-item" v-for="userInfo in getUserList"><a :href="'mailto:' + userInfo.email">
                  {{ userInfo.email }}
                </a></li>
              </ul>
            </div>
          <!-- </div> -->
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import i18n from '../../lang/lang'
import Menu from '../Menu.vue'

  export default {
    data() {
      return {
        userInfo: {}
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
      getUserList() {
        return this.$store.getters.usersList;
      }
    }
  }
</script>

<style>
#container {
  display: flex;
}

p {
  padding: 5px 15px;
}

ul {
  padding: 5px 15px;
}
</style>
