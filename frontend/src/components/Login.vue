<template>
	<div class="wrapper">
        <div class="plane--left--parent">
                <div class="plane--left">
                    <h1 class="intranet--title">{{ Hello }}</h1>
                    <div class="image--user"></div>
                    <p class="intranet--subtitle">Zaloguj się do Intranetu</p>
                </div>
         </div>
<!--            <div class="clearfix"></div>-->
           <div class="plane--right--parent">
                <div class="plane--right">
                    <div class="image--logo"></div>
                    <div class="login--credentials">
                        <input class="input" type="email"/>
                        <label for="password" class="label plane--right__label1">Użytkownik</label>
                        <input class="input" id="password" type="password" />
                        <label class="label plane--right__label2">Hasło</label>
                    </div>
           </div>
        </div>
    </div>
</template>

<script>
	export default {
	  name: 'Login',
	  data () {
	    return {
	      Hello: "Witaj"
	    }
	  }
	}
</script>

<style scoped>
</style>