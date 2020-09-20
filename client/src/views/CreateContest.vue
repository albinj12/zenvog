<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <v-card class="ma-10 px-16 py-5">
    <!-- <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img> -->
    <v-card-title>Enter contest details</v-card-title>

    <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle> -->
    <v-form>
        <div>
            <v-text-field
                label="Contest Name"
                v-model="contestName"
                outlined>              
            </v-text-field>
            <v-text-field
                label="Contest Tagline"
                v-model="contestTagline"
                outlined>     
            </v-text-field>
            <v-textarea
                label="Contest Description"
                v-model="contestDescription"
                outlined>
            </v-textarea>
            <v-text-field
                label="Maxium Participants"
                v-model="maxParticipants"
                outlined
                type="number"
                min="1">
            </v-text-field>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Last Date for entry"
                  persistent-hint
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" :min="minDate" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
            <v-select
              :items="contestTypes"
              v-model="contestType"
              label="Contest Type"
              outlined
            ></v-select>
            <p>Enter Rules for the contest</p>
            <div
              v-for="(contestRule, i) in contestRules"
              :key="i"
              class="d-flex"
              >
                <v-text-field
                v-model="contestRule.value"
                ></v-text-field>
                
                <v-btn @click="removeRule(i)" class="error">Delete Rule</v-btn>
              </div>
              <v-btn @click="addRule" class="primary">Create new rule</v-btn>
              </div>
    </v-form>
    <v-card-actions class="justify-center">
        <v-btn @click="createContest" color="green white--text">Create contest</v-btn>
    </v-card-actions>
  </v-card>
    </v-col>
  </v-row>
</v-container>
  
</template>

<script>
import { CREATE_CONTEST_MUTATION } from '../graphql/mutation'
  export default {
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      minDate: new Date().toISOString().substr(0, 10),
      contestTypes: ['Public', 'Private'],
      contestRules: [{value:"rules are to be violated"}],
      contestName:'The greate photo',
      contestTagline:'its a good tagline',
      contestDescription:'wow nice description',
      maxParticipants:1,
      contestType:'Public',
      rules:[]
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      addRule () {
        this.contestRules.push({ 
          value: "",
        })
     },
    
     removeRule (index) {
         this.contestRules.splice(index, 1)
     },

     createContest(){
       this.contestRules.forEach(element => {
         this.rules.push(element.value)
       });
       this.$apollo.mutate({
         mutation: CREATE_CONTEST_MUTATION,
         variables:{
           name: this.contestName,
           tagline: this.contestTagline,
           description: this.contestDescription,
           deadline: this.date,
           maxParticipants: this.maxParticipants,
           contestType: this.contestType,
           rules: this.rules
           
         }
       }).then((result) => {
         console.log(result)
       })
     }
    },
  }
</script>

