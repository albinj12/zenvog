<template>
    <div>
        <v-container>
            <v-row>
                <v-card
                    min-width="450"
                    class="mt-16"
                    >
                    <v-card-title  class="px-7 green--text">
                        Login
                    </v-card-title>
                    <v-form v-model="isValid">
                        <div class="px-7">
                        <v-text-field
                            label="Email"
                            outlined
                            v-model="email"
                            :rules="emailRules"
                            required
                            error-count="2"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Password"
                            outlined
                            required
                            :rules="passwordRules"
                            type="password"
                            error-count="5"
                            v-model="password"
                        >
                        </v-text-field>
                        </div>
                    </v-form>
                    <v-card-actions class="justify-center">
                        <v-btn color="green white--text mt-n2 mb-3" @click="login" :disabled="!isValid">Login</v-btn>
                    </v-card-actions>
                     <p v-if="loginerr=='Invalid email or password'" class="text-body-2 px-7 mt-n5 mb-6 red--text">Invalid email or password</p>
                </v-card>
            </v-row>
            
        </v-container>
        
    </div>
</template>

<script>

import {LOGIN_QUERY} from '../graphql/query'

export default {
    name: "Register",
    data: () => ({
        email: "",
        password: "",
        isValid: true,
        emailRules: [ 
            v => !!v || 'Email is required', 
            v => /.+@.+/.test(v) || 'E-mail must be valid' 
        ],
        passwordRules: [ 
            v => !!v || 'Password is required',
        ],
        loginerr: ""
  }),
  methods:{
      login(){
          const {email, password} = this.$data
          this.$apollo.query({
              query: LOGIN_QUERY,
              variables:{
                  email,
                  password
              }
          }).then((result) => {
              this.loginerr=""
              if(result.data.login === "success"){
                 window.location.href = 'http://localhost:8080/'
              }
          }).catch((error) => {
              this.loginerr = error.message.slice(22)
              alert(error.message)
          })
      }
  }
}
</script>