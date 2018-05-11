<template>
  <div id="container">
    <div>
      <p>{{ $t("label.fullName") }}</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </li>
      </ul>
    </div>
    <div>
      <p>{{ $t("label.position") }}</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.roleName }}
        </li>
      </ul>
    </div>
    <div>
      <p>{{ $t("label.department") }}</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.depName }}
        </li>
      </ul>
    </div>
    <div>
      <p>{{ $t("label.phone") }}</p>
      <ul>
        <li v-for="userInfo in getUserList">
          {{ userInfo.phone }}
        </li>
      </ul>
    </div>
    <div>
      <p>{{ $t("label.email") }}</p>
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
import i18n from '../../lang/lang'

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
