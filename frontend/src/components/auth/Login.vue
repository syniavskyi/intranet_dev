<template>
	<div class="wrapper">
        <div class="plane--left--parent">
                <div class="plane--left">
                    <h1 class="intranet--title">Witaj</h1>
                    <div class="image--user"></div>
                    <p class="intranet--subtitle">Zaloguj się do Intranetu</p>
                </div>
        </div>
<!--            <div class="clearfix"></div>-->
        <div class="plane--right--parent">
                <div class="plane--right">
                    <div class="image--logo"></div>
                    <div class="login--credentials">
                        <input class="input" id="username" type="email" v-model="username" :class="{invalid: $v.username.$error}" @blur="$v.username.$touch()"/>
                        <label class="label plane--right__label1" for="username">Użytkownik</label>
                        <input class="input" id="password" type="password" v-model="password" :class="{invalid: $v.password.$error}" @blur="$v.password.$touch()"/>
                        <label class="label plane--right__label2" for="password">Hasło</label>
                    </div>
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
                // this.$store.dispatch('login', {
                //     username: this.username,
                //     password: this.password
                // })
            }
        }
	}
</script>

<style scoped>
.invalid  {

}
</style>