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
                            :rules="[v => !!v || 'Name is required']"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            label="Email"
                            outlined
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
                        <v-btn color="green white--text" :disabled="!isValid">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            
        </v-container>
        
    </div>
</template>

<script>
export default {
    name: "Register",
    data: () => ({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        ]
  }),
  computed:{
      confirmPasswordRule() {
          return () => (this.password === this.confirmPassword) || 'Password dosen\'t match'
      }
  }
}
</script>