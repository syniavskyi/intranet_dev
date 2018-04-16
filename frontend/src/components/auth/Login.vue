<template>
	<div class="plane-parent plane-parent-login">
            <div class="plane plane-login">
                <div class="plane-left">
                    <img class="img-user" src="../../assets/images/grouper-256.png">
                    <p class="p-login">Zaloguj się do Intranetu</p>
                </div>
                <div class="login-credentials">
                    <input type="email" class="input input-login-email" v-model="username" @blur="$v.username.$touch()">
                    <label class="label label-login-email">Użytkownik</label>
                    <input type="password" @keyup.enter="onSubmit" class="input input-login-pass" v-model="password" @blur="$v.password.$touch()">
                    <label for="password" class="label label-login-pass">Hasło</label>
                    <p class="forgot-pass" @click="onForgotPassword">Zapomniałeś hasło?</p>
                    <p class="login-error" v-if="loginError"> Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe</p>
                    <button class="button login-button" :disabled="$v.$invalid" @click="onSubmit"><span>Zaloguj</span></button>
                </div>
            </div>
        </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'
	export default {
	    name: 'Login',
	    data () {
	        return {
                username: '',
                password: '',
                showRemindPassword: false,
                isLoading: false
	        }
        },
        validations: {
            password: {
                required,
                minLen: minLength(8)
            },
            username: {
                required
            }
        },
        methods: {
            onSubmit() {
                this.isLoading = true
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password
                })
                this.isLoading = false
            },
            onForgotPassword() {
                this.showRemindPassword = true 
            }
        },
        computed: {
            loginError() {
                return this.$store.getters.isLoginError
            }
        },
        created() {
            this.$store.dispatch('tryAutoLogin')
        }
	}
</script>

