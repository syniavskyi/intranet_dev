<template>
	<div class="plane-parent plane-parent-login">
        <div class="backdrop" v-if="showRemindPassword"></div>
        <div class="modal" v-if="showRemindPassword">
            <div class="modal-header">
                <h1 class="modal-title">Nie pamiętasz hasła?</h1>
                <button class="modal-exit" @click="switchForgotPassword">&#10006;</button>
            </div>
            <div class="modal-email">
                <label class="modal-label">Wprowadź email</label>
                <input class="input modal-input" v-model="email">
            </div>
            <button class="button modal-button" :disabled="$v.email.$invalid" type="button" @click="onResetPassword"><span class="span-arrow">Zresetuj hasło</span></button>
        </div>
            <div class="plane plane-login">
                <div class="plane-left">
                    <img class="img-user" src="../../assets/images/grouper-256.png">
                    <p class="p-login">Zaloguj się do Intranetu</p>
                </div>
                <div class="login-credentials">
                    <input type="email" class="input input-login-email" v-model="username" @blur="$v.username.$touch()">
                    <label class="label label-login-email">Użytkownik</label>
                    <div class="login-pass-div">
                        <input :type="passwordFieldType" @keyup.enter="onSubmit" class="input input-login-pass" v-model="password" @blur="$v.password.$touch()">
                        <button class="show-pass-eye"  @click="switchPasswordVisibility"><icon :name="eyeType"></icon></button>
                    </div>
                    <label for="password" class="label label-login-pass">Hasło</label>
                    <p class="forgot-pass" @click="switchForgotPassword">Nie pamiętasz hasła?</p>
                    <p class="login-error" v-if="loginError">Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe</p>
                    <button class="button login-button" :disabled="$v.password.$invalid" @click="onSubmit">
                        <span class="loading-icon"><img  src="../../assets/images/loading-white.png" v-show="isLoading"></span>
                        <span class="span-arrow" v-show="!isLoading">Zaloguj</span>
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
    import { required, minLength, email } from 'vuelidate/lib/validators'
    import Icon from 'vue-awesome/components/Icon'

	export default {
	    name: 'Login',
	    data () {
	        return {
                username: '',
                password: '',
                showRemindPassword: false,
                isLoading: false,
                passwordFieldType: 'password',
                eyeType: 'eye',
                email:''
	        }
        },
        components: {
            Icon
        },
        validations: {
            password: {
                required,
                minLen: minLength(8)
            },
            username: {
                required
            },
            email: {
                required,
                email
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
            switchForgotPassword() {
                this.showRemindPassword = !this.showRemindPassword
            },
            switchPasswordVisibility() {
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
                this.eyeType = this.eyeType === 'eye' ? 'eye-slash' : 'eye'
            },
            onResetPassword(){ 
                this.$store.dispatch('generatePassword')
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

<style>

</style>
