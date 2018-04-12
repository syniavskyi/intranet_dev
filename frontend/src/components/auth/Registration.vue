<template>
    <div class="plane-parent">
        <div class="plane">
            <div class="plane-left">
                <img class="img-user" src="../../assets/images/grouper-256.png">
                <p class="p-login">Zarejestruj pracownika w Intranecie</p>
            </div>
            <div class="login-credentials">
                <input type="text" name="fullName" v-model="fullName">
                <label for="fullName">Imię i nazwisko</label>
                <label for="">E-mail</label>
                <input type="email" disabled="false" v-model="fullNameToEmail">
                <!-- <p>{{ fullName }}</p> -->
                <label for="">Hasło</label>
                <input type="password">
                <button disabled="disabled">Wygeneruj hasło</button>
                <label for="">Rola</label>
                <select name="" id="">
                    <option value="">Management</option>
                    <option value="">Leader</option>
                    <option value="">Office</option>
                    <option value="">Basic</option>
                </select>
                <label for="">Oddział</label>
                <select name="" id="">
                    <option value="">Dąbrowa Górnicza</option>
                    <option value="">Wrocław</option>
                </select>
                <button class="button"><span>Zarejestruj</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        data() {
            return {
                fullName: '',
                email: ''
            }
        },
        created() {
            return axios.get('/rolesList.json')
                .then(res => {
                    return console.log(res);
                })
        },
        computed: {
            fullNameToEmail() {
                var sEmail = this.fullName.replace(' ', '.').toLowerCase(),
                    sDomain = '@btech.pl',
                    sReturnEmail;
                
                this.fullName === '' ? sDomain = '' : sReturnEmail = sEmail + sDomain;

                return sReturnEmail;
            }
        }
    }
</script>

<style scoped>

</style>