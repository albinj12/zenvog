<template>
    <div>
        <v-container class="mx-10 " fluid>
            <v-row>
                <v-col cols=8>
                    <v-row>
                        <v-col>
                            <h1>{{contestDetails.name}}</h1>
                            <p>{{contestDetails.tagline}}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=10 >
                            <h3>Description</h3>
                            <p>{{contestDetails.description}}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=10>
                            <h3>Rules</h3>
                            <div v-for="(rule, i) in contestDetails.rules" :key="rule">
                                <p>{{i+1}}.{{rule}}</p>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row >
                        <v-col class="my-16 mx-10">
                            <v-card
                                max-width="300"
                                class="py-4"
                            >
                                <v-card-text>
                                    <center>
                                        <p>Maximum contestants:{{contestDetails.maxParticipants}}</p>
                                        <p>Current contestants:{{contestDetails.currentParticipants}}</p>
                                    </center>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                    <v-btn>Participate</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { GET_CONTEST_QUERY } from '../graphql/query'
export default {
    data: () => ({
        contestDetails: {}
    }),
    created(){
        console.log('The id is: ' + this.$route.params.id);
        this.$apollo.query({
            query: GET_CONTEST_QUERY,
            variables:{
                  id: this.$route.params.id
              }
        }).then((result) => {
            console.log(result.data)
            this.contestDetails = result.data.getContest
        }).catch((error) => {
            alert(error.message)
        })
    }
}
</script>