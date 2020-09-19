<template>
    <div>
        <v-container class="mx-4 " fluid >
            <v-row class="mt-6">
                <v-col >
                    <v-row >
                        <div class="mx-6">
                            <img id="avatar-img" src="../assets/avatar.jpg" alt="avatar">
                        </div>
                        <div class="mx-6 mt-10">
                            <h1>John Doe</h1>
                            <div class="mt-5">
                                <v-btn color="green white--text">Edit Profile</v-btn>
                            </div>
                        </div>
                        
                    </v-row>
                    
                </v-col>
                <v-col>
                    <v-row justify="end" class="mr-12 mt-16">
                        <v-btn color="green white--text">Create Contest</v-btn>
                    </v-row>
                </v-col>
            </v-row>          
            <v-row class="mt-6">
                <v-tabs
                    background-color="white"
                    color="green"
                >
                    <v-tab ripple>
                       Participated Contests
                    </v-tab>
                    <v-tab ripple>
                        Created Contests
                    </v-tab>
                    <v-tab-item>
                        <v-card v-for="contest in participatedContests" :key="contest.name">
                        <v-card-text>{{contest.name}}</v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="4" v-for="contest in createdContests" :key="contest.name">
                                    <v-card width="450" outlined>
                                    <h3 class="mx-6 py-6">Name: {{contest.name}}</h3>
                                    <h3 class="mx-6 pb-6">Tagline: {{contest.tagline}}</h3>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>  
                    </v-tabs>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {USER_QUERY} from '../graphql/query'
  export default {
    data () {
      return {
        name:'',
        profilePicture:'',
        createdContests:[],
        participatedContests:[]
      }
    },
    created(){
        this.$apollo.query({
            query: USER_QUERY
        }).then((result) => {
            this.name = result.data.user.name,
            this.profilePicture = result.data.user.profilePicture
            this.createdContests = result.data.user.createdContests
            this.participatedContests = result.data.user.participatedContests
        }).catch((error) => {
            if(error == 'Error: GraphQL error: Unautherized'){
                window.location.href='http://localhost:8080/login'
            }
        })
    },
  }
</script>


<style scoped>
#avatar-img{
    width: 200px;
    border-radius: 50%;
}
</style>