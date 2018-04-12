<template>
	<div class="plane-parent">
            <div class="plane">
                <div class="plane-left">
                    <img class="img-user" src="../../assets/images/grouper-256.png">
                    <p class="p-login">Zaloguj się do Intranetu</p>
                </div>
                <div class="login-credentials">
                    <input type="email" v-model="username" @blur="$v.username.$touch()">
                    <label class="email">Użytkownik</label>
                    <input type="password" v-model="password" @blur="$v.password.$touch()">
                    <label for="password" class="password">Hasło</label>
                    <button class="button" :disabled="$v.$invalid" @click="onSubmit"><span>Zaloguj</span></button>
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
                password: ''
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
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password
                })
            }
        }
	}
</script>

