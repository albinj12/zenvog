<template>
  <div>
    <v-app-bar
      color="green"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>ZENVOG</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-show="loginStatus" class="mx-4" color="white green--text" to="/explore">Explore</v-btn>
      <v-btn v-show="loginStatus" class="mx-4" color="white green--text" to="/profile">Profile</v-btn>
      <v-btn v-show="loginStatus" class="mx-4" color="white green--text" @click="logout" >Logout</v-btn>
      <v-btn v-show="!loginStatus" class="mx-4 font-weight-bold" text color="white green--text" to="/login">Login</v-btn>
      <v-btn v-show="!loginStatus" class="mx-4" color="white green--text" to="/register">Register</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { LOGOUT_QUERY } from '../graphql/query'
export default {
  data(){
    return {
      loginStatus: false
    }
  },
  created(){
    if(this.$cookies.get("tid") && this.$cookies.get("sid")){
      this.loginStatus = true
      console.log("logged in")
    }else{
      this.loginStatus = false
      console.log("logged out")
    }
  },
  methods:{
    logout(){
      this.$apollo.query({
        query: LOGOUT_QUERY
      }).then(() => {
        this.loginStatus = false
        window.location.href = 'http://localhost:8080/login'
      }).catch(() => {
        this.loginStatus = false
        window.location.href = 'http://localhost:8080/login'
      })
    }
  }
}
</script>