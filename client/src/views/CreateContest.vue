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
    <v-form v-model="isValid" ref="createContestForm">
        <div>
          <!-- contest name -->
            <v-text-field
                label="Contest Name"
                v-model="contestName"
                :rules="fieldrules"
                outlined>              
            </v-text-field>
            <!-- contest tagline -->
            <v-text-field
                label="Contest Tagline"
                v-model="contestTagline"
                outlined>     
            </v-text-field>
            <!-- contest tagline -->
            <!-- contest description -->
            <v-textarea
                label="Contest Description"
                v-model="contestDescription"
                :rules="fieldrules"
                outlined>
            </v-textarea>
            <!-- contest description -->
            <!-- Maxium Participants -->
            <v-text-field
                label="Maxium Participants"
                v-model="maxParticipants"
                :rules="fieldrules"
                outlined
                type="number"
                min="1">
            </v-text-field>
            <!-- Maxium Participants -->
            <v-menu
              ref="startDateMenu"
              v-model="startDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDateFormatted"
                  label="Contest start date"
                  persistent-hint
                  :rules="fieldrules"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" :min="startMinDate" no-title @input="startDateMenu = false"></v-date-picker>
            </v-menu>
            <v-menu
              ref="endDateMenu"
              v-model="endDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDateFormatted"
                  label="Last Date for entry"
                  persistent-hint
                  :rules="fieldrules"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" :min="endMinDate" no-title @input="endDateMenu = false"></v-date-picker>
            </v-menu>
            <v-select
              :items="contestTypes"
              v-model="contestType"
              label="Contest Type"
              outlined
              :rules="fieldrules"
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
import moment from 'moment'
  export default {
    data: () => ({
      startDateMenu: false,
      startDate: new Date().toISOString().substr(0, 10),
      startDateFormatted: "",
      endDate: new Date().toISOString().substr(0, 10),
      endDateFormatted: "",
      endDateMenu: false,
      startMinDate: new Date().toISOString().substr(0, 10),
      endMinDate: new Date().toISOString().substr(0, 10),
      contestTypes: ['Public', 'Private'],
      contestRules: [],
      contestName:'',
      contestTagline:'',
      contestDescription:'',
      maxParticipants:1,
      contestType:'Public',
      isValid: true,
      fieldrules:[
         v => !!v || 'Field is required', 
      ]
    }),

    watch: {
      endDate () {
        this.endDateFormatted = moment(this.endDate).format('dddd, Do MMMM YYYY')
      },
      startDate(){
        this.startDateFormatted = moment(this.startDate).format('dddd, Do MMMM YYYY')
      },
      startDateFormatted(){
        if(moment( this.startDate).month() <= moment(this.endDate) && moment( this.startDate).date() < moment(this.date) ){
          this.endDate = this.startDate
          this.endDateFormatted = this.startDateFormatted
        }
        console.log()
        this.endMinDate = this.startDate
      }
    },

    created() {
      let sid = this.$cookies.get("sid")
      let tid = this.$cookies.get("tid")
      if(!sid || !tid){
        window.location.href='http://localhost:8080/login'
      }
    },

    methods: {
      addRule () {
        this.contestRules.push({ 
          value: "",
        })
     },
    
     removeRule (index) {
         this.contestRules.splice(index, 1)
     },

     createContest(){
       console.log(this.maxParticipants)
       console.log(typeof(this.maxParticipants))
       if(this.$refs.createContestForm.validate()){
          let rules = []
          this.contestRules.forEach(element => {
            rules.push(element.value)
          });
          this.$apollo.mutate({
            mutation: CREATE_CONTEST_MUTATION,
            variables:{
              name: this.contestName,
              tagline: this.contestTagline,
              description: this.contestDescription,
              startDate: this.startDate,
              deadline: this.endDate,
              maxParticipants: parseInt(this.maxParticipants),
              contestType: this.contestType,
              rules: rules
              
            }
          }).then((result) => {
            window.location.href=`http://localhost:8080/contest/${result.data.createContest._id}`
          }).catch((error) => {
            if(error.message=="GraphQL error: Failed to create contest"){
              alert(error.message.slice(15))
            }else{
              alert(error.message)
            }

          })
       }else{
         alert("Please fill all the required fields")
       }
       
     }
    },
  }
</script>

