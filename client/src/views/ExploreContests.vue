<template>
    <div>
        <v-container class="mx-4 " fluid>
            <h1>Explore Contests</h1>
            <v-row class="mt-6">
                <v-col cols="2">
                    <h4>Filter results</h4>
                </v-col>
                <v-col>
                    <h2>Contests</h2>
                    <v-row>
                        <v-col>
                            <v-row v-for="contest in contests" :key="contest._id">
                                <v-card :to="`/contest/${contest._id}`" width="1000" class="my-4">
                                    <v-card-title>
                                        {{contest.name}}
                                        <div id="contestStatus" class="mx-16 px-16">
                                            <v-chip
                                                class="ma-2"
                                                :color="getColor(contest.status)"
                                                text-color="white"
                                                >
                                                {{contest.status}}
                                            </v-chip>
                                        </div>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="8">
                                                {{contest.tagline}}
                                                <br>
                                                Organized by: {{contest.createdBy.name}}
                                                <br>
                                                Deadline: {{contest.deadline}}
                                            </v-col>
                                            <v-col>
                                                Maximum Participants: {{contest.maxParticipants}}
                                                <br>
                                                Current Participants: {{contest.currentParticipants}}
                                            </v-col>
                                        </v-row>
                                        
                                    </v-card-text>
                                </v-card>
                            </v-row>
                        </v-col>
                        
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { GET_CONTESTS_QUERY } from '../graphql/query'
import moment from 'moment'
export default {
    data(){
        return {
            contests: []
        }
    },
    created(){
        this.$apollo.query({
            query: GET_CONTESTS_QUERY
        }).then(result => {
            var contestsArray = result.data.getContests
            for(let i=0; i<contestsArray.length; i++){
                contestsArray[i].deadline = moment(contestsArray[i].deadline).format("Do MMMM YYYY")
            }
            this.contests = contestsArray
            console.log(this.contests)
        }).catch(error => {
            if(error == 'Error: GraphQL error: Unautherized'){
                window.location.href='http://localhost:8080/login'
            }
        })
    },
    methods: {
        getColor(status){
            if(status == "Upcoming"){
                return "yellow"
            }else if(status == "Ongoing"){
                return "green"
            }else {
                return "red"
            }
        }
    }
}
</script>
