<template>
	<div class="plane-parent plane-parent-login">
        <div class="backdrop" v-if="showRemindPassword"></div>
        <div class="modal" v-if="showRemindPassword">
            <h1 class="modal-title">Nie pamiętasz hasła?</h1>
            <div class="modal-email">
                <label class="modal-label">Wprowadź email</label>
                <input class="input modal-input">
            </div>
            <div class="modal__actions">
                <button class="button modal-button" type="button"><span class="span-arrow">Zresetuj hasło</span></button>
            </div>
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
                    <p class="forgot-pass" @click="onForgotPassword">Nie pamiętasz hasła?</p>
                    <p class="login-error" v-if="loginError"> Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe</p>
                    <button class="button login-button" :disabled="$v.password.$invalid" @click="onSubmit"><span class="span-arrow">Zaloguj</span></button>
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
            onForgotPassword() {
                this.showRemindPassword = true 
            },
            switchPasswordVisibility() {
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
                this.eyeType = this.eyeType === 'eye' ? 'eye-slash' : 'eye'
            },
            onResetPassword(){ 
                this.$store.dispatch('resetPassword', this.email)
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
.show-pass-eye {
   font-size: 0.8rem;
   align-self: right;
   order: 1;
   height: 2.5rem;
   width: 1rem;
   z-index: 100;
   background: transparent;
   transition: border 0.5s ease;
   border: none;
   padding: none;
   margin:none;
}
.show-pass-eye:hover {
    cursor: pointer;
}
.show-pass-eye:focus {
    outline: none;
}
</style>
