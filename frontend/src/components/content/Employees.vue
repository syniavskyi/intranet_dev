<template>
  <div id="container">
    <div>
      <p>Imie i nazwisko</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </li>
      </ul>
    </div>
    <div>
      <p>Stanowisko</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.roleName }}
        </li>
      </ul>
    </div>
    <div>
      <p>Oddział</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.depName }}
        </li>
      </ul>
    </div>
    <div>
      <p>Telefon</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.phone }}
        </li>
      </ul>
    </div>
    <div>
      <p>E-mail</p>
      <ul>
        <li v-for="userInfo in getUserList"><a :href="'mailto:' + userInfo.email">
          {{ userInfo.email }}
        </a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    beforeCreate() {
      this.$store.dispatch("getUserInfo");
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
