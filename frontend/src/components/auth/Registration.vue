<template>
    <div class="plane-parent">
        <div class="plane">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-registration">Rejestracja użytkownika</p>
            </div>
            <div class="registration-credentials">
                <label for="fullName">Imię i nazwisko</label>
                <input type="text" name="fullName" v-model="fullName">
                <label for="email">E-mail</label>
                <input type="email" disabled="false" v-model="fullNameToEmail">
                <label for="password">Hasło</label>
                <input type="password">
                <div class="div-select">
                    <label for="role">Rola</label>
                    <select class="select">
                        <option v-for="roles in role">{{ roles }}</option>
                        <!-- <option>Management</option>
                        <option>Liders</option>
                        <option>Office</option>
                        <option>Basic</option> -->
                    </select>
                </div>
                <div class="div-select">
                    <label for="role">Oddział</label>
                    <select class="select" >
                        <option>Wrocław</option>
                        <option>Dąbrowa Górnicza</option>
                    </select>
                </div> 
            </div>
        <!-- <button class="button"><span>Zarejestruj</span></button> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      role: [ ]
    };
  },
  created() {
    axios.get("/api/rolesList").then(res => {
        const data = res.data;
        // const users = [];

        for(let key in data) {
            const role = data[key];
            role.roleName = data[key].roleName;
            this.role.push(role.roleName);
        }
    });
  },
  computed: {
    fullNameToEmail() {
    var sEmail = this.fullName.replace(" ", ".").toLowerCase(),
        sDomain = "@btech.pl",
        sReturnEmail;

    this.fullName === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);

    return sReturnEmail;
    }
  }
};
</script>