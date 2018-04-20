<template>
	<div class="plane-parent plane-parent-login">
         <transition name="slide-backdrop">
        <div class="backdrop" v-if="showRemindPassword"></div>
         </transition>
          <transition name="slide">
        <div class="modal" v-if="showRemindPassword">
            <div class="modal-header">
                <h1 class="modal-title">Nie pamiętasz hasła?</h1>
                <button class="modal-exit" @click="switchForgotPassword">&#10006;</button>
            </div>
            <div class="modal-email">
                <label class="modal-label">Wprowadź email</label>
                <input class="input modal-input" v-model="email">
                <transition name="fade-alert">
                    <p class="success-alert" v-if="sendEmailSuccess">Na podany adres email wysłano nowe hasło.</p>
                </transition>
                <!-- <p class="p-modal-txt">na który otrzymasz link resetujący.</p> -->
            </div>
            <button class="button modal-button" :disabled="$v.email.$invalid" type="button" @click="onResetPassword"><span class="span-arrow">Zresetuj hasło</span></button>
        </div>
        </transition>
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
                    <transition name="show-alert"> 
                        <p class="login-error" v-if="loginError">Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe</p>
                    </transition>
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
                this.$store.dispatch('sendEmailWithPass', this.email)
            }
        },
        computed: {
            loginError() {
                return this.$store.getters.isLoginError
            },
            sendEmailSuccess() {
                return this.$store.getters.isSendEmailSuccess
            },
            newPassword() {
                return this.$store.getters.password
            }
        },
        created() {
            this.$store.dispatch('tryAutoLogin')
        }
	}
</script>

<style>

.fade-alert-enter {
        opacity: 0;
    }

    .fade-alert-enter-active {
        transition: opacity 2s;    
    }


    .fade-alert-leave-active  {
        transition: opacity 2s;   
        opacity: 0;
}
.show-alert-enter {
    opacity: 0;
}

    .show-alert-move {
        transition: transform 2s; 
    }

    .show-alert-enter-active {
        animation: slide-in 2s ease-out forwards;
        transition: opacity 2s;
    }

    .show-alert-leave-active {
        animation: slide-out 2s ease-out forwards;
        transition: opacity 2s;
        opacity: 0;
        position: absolute;
    }

   @keyframes show-alert-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes show-alert-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }

    }
</style>
