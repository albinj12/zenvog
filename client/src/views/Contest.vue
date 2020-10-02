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
                                    <v-btn :disabled="!contestDetails.participateOption" @click="dialog = true">Participate</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <div>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Upload Image</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            label="Photo"
                            required
                            type="file"
                            @input="selectImage"
                        ></v-text-field>
                        <small>Please follow the regulation regarding the photo</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="uploadImage">Upload</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </div>
         
        <v-container>
            <v-row>
                <v-col v-for="entry in contestDetails.entry" :key="entry._id">
                    <div>
                        <v-img
                            :src="entry.url" width="300"
                            height="300"
                        ></v-img>
                        <div>
                            <span @click="vote(entry._id)" class="mr-16 pr-16">{{entry.votes}}</span>
                            <span class="ml-16 pl-8">{{entry.participant.name}}</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { UPLOAD_IMAGE_MUTATION, VOTE_MUTATION } from '../graphql/mutation';
import { GET_CONTEST_QUERY } from '../graphql/query';
export default {
    data: () => ({
        contestDetails: {},
        selectedImage: null,
        dialog: false,
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
    },
    methods: {
        selectImage(){
            this.selectedImage = event.target.files[0]
            console.log(this.selectedImage)
        },
        uploadImage(){
            if(this.selectedImage != null){
                this.$apollo.mutate({
                    mutation: UPLOAD_IMAGE_MUTATION,
                    variables:{
                        file: this.selectedImage,
                        contestId: this.$route.params.id
                    }
                }).then( result => {
                    console.log(result.data)
                    this.selectedImage = null
                    this.dialog = false
                }).catch( error => {
                    alert(error)
                    this.dialog = false
                })
            }
        },
        vote(entryId){
            console.log(entryId)
            this.$apollo.mutate({
                mutation: VOTE_MUTATION,
                variables:{
                    contestId: this.$route.params.id,
                    entryId
                }
            }).then(result => {
                alert(result.data.vote)
            }).catch(error => [
                alert(error)
            ])
        }
    }
}
</script>