<template>
  <div>
    <v-app-bar
      color="green"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Contest App</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-show="loginStatus" class="mx-4" color="white green--text" to="/profile">Profile</v-btn>
      <v-btn v-show="loginStatus" class="mx-4" color="white green--text" >Logout</v-btn>
      <v-btn v-show="!loginStatus" class="mx-4 font-weight-bold" text color="white green--text" to="/login">Login</v-btn>
      <v-btn v-show="!loginStatus" class="mx-4" color="white green--text" to="/register">Register</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
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
  }
}
</script>