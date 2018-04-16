<template>
    <div class="plane-parent">
        <div class="plane">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-registration">Rejestracja użytkownika</p>
            </div>
            <div class="registration-credentials">
                <label for="fullName" class="label">Imię i nazwisko</label>
                <input type="text" name="fullName" v-model="fullName" @change="checkEmail()" class="input">
                <label for="email" class="label">E-mail</label>
                <input disabled="false" v-model="fullNameToEmail" class="input">
                <label class="label" for="password">Hasło</label>
                <div class="div-pass">
                    <input class="input reg-pass-input" type="password">
                    <button class="gen-pass">Generuj hasło</button>
                    <!-- <input class="gen-pass" value="Generuj Hasło">  -->
                </div>
                <div class="div-select">
                    <label class="label" for="role">Rola</label>
                    <select class="select">
                        <option v-for="roles in role">{{ roles }}</option>
                    </select>
                </div>
                <div class="div-select">
                    <label class="label" for="role">Oddział</label>
                    <select class="select" >
                        <option>Wrocław</option>
                        <option>Dąbrowa Górnicza</option>
                    </select>
                </div> 
                <button class="button"><span>Zarejestruj</span></button>
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
      role: [ ],
      emails: [ ]
    };
  },
  created() {
    axios.get("/api/rolesList").then(res => {
        const data = res.data;

        for(let key in data) {
            const role = data[key];
            let upper = data[key].roleName.substring(0, 1);
            let toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();
            data[key].roleName = upper + toLower;
            role.roleName = data[key].roleName;
            
            this.role.push(role.roleName);
        }
    });
  },
  methods: {
    checkEmail() {
        axios.get('/api/emailList').then(res => {
            const data = res.data;

            for(let key in data) {
                const email = data[key];
                email.email = data[key].email;

                this.emails.push(email.email);
            }
            for (var i = 0; i < this.emails.length; i++) {
                if (this.email === this.emails[i]) {
                    alert('znaleziono email');
                } else {
                    alert('nie znaleziono adresu email');
                }
            } 
        });
        // if(this.emails.length > 0) {
            // console.log(this.emails);
            // console.log(Array.values(this.emails));
            // var iLength = Object.keys(this.emails).length;
            // for (var i = 0; i < this.emails.length; i++) {
            //     if (this.email == this.emails[i]) {
            //         console.log(this.email);
            //         console.log(this.emails[i]);
            //     }
            // } 
        // }
    }
  },
  computed: {
    fullNameToEmail() {
    var sEmail = this.fullName.replace(" ", ".").toLowerCase(),
        sDomain = "@btech.pl",
        sReturnEmail;

    this.fullName === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
    this.email = sReturnEmail;

    return sReturnEmail;
    },
  }
};
</script>