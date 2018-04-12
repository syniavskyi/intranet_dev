<template>
    <div class="plane-parent">
        <label for="">Imię i nazwisko</label>
        <input type="text" v-model="fullName">
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