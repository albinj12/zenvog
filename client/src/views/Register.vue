<template>
    <div>
        <v-container>
            <v-row>
                <v-card
                    min-width="450"
                    class="mt-16"
                    >
                    <v-card-title  class="px-7 green--text">
                        Create new account
                    </v-card-title>
                    <v-form v-model="isValid">
                        <div class="px-7">
                        <v-text-field
                            label="Name"
                            outlined
                            v-model="name"
                            :rules="[v => !!v || 'Name is required']"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            label="Email"
                            outlined
                            v-model="email"
                            :rules="emailRules"
                            required
                            error-count="2"
                        >
                        </v-text-field>
                        <p v-if="signuperr=='This email is already registered'" class="text-body-2 mt-n5 mb-6 red--text">This email is already registered</p>
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
                        <v-text-field
                            label="Confirm Password"
                            outlined
                            required
                            :rules="confirmPasswordRules.concat(confirmPasswordRule)"
                            type="password"
                            v-model="confirmPassword"
                            validate-on-blur
                        >
                        </v-text-field>
                        </div>
                    </v-form>
                    <v-card-actions class="justify-center">
                        <v-btn color="green white--text mt-n2 mb-3" @click="register" :disabled="!isValid">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            
        </v-container>
        
    </div>
</template>

<script>

import {SIGNUP_MUTATION} from '../graphql/resolver'

export default {
    name: "Register",
    data: () => ({
        name: "al",
        email: "",
        password: "Albin@12",
        confirmPassword: "Albin@12",
        isValid: true,
        emailRules: [ 
            v => !!v || 'Email is required', 
            v => /.+@.+/.test(v) || 'E-mail must be valid' 
        ],
        passwordRules: [ 
            v => !!v || 'Password is required', 
            v => (v && v.length >= 5) || 'Password must have 5+ characters',
            v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
            v => /(?=.*\d)/.test(v) || 'Must have one number', 
            v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
        ],
        confirmPasswordRules: [
            v => !!v || 'Password is required', 
        ],
        signuperr: ""
  }),
  computed:{
      confirmPasswordRule() {
          return () => (this.password === this.confirmPassword) || 'Password dosen\'t match'
      }
  },
  methods:{
      register(){
          const {name, email, password} = this.$data
          this.$apollo.mutate({
              mutation: SIGNUP_MUTATION,
              variables:{
                  name,
                  email,
                  password
              }
          }).then((result) => {
              this.signuperr=""
              if(result.data.signup === "success"){
                 window.location.href = 'http://localhost:8080/home'
              }
          }).catch((error) => {
              this.signuperr = error.message.slice(15)
          })
      }
  }
}
</script>