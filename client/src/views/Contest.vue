<template>
    <div>
        <v-container class="mx-16 " fluid>
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
                <v-card :loading="loading">
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
                    <v-btn color="red" text @click="cancelUpload">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="uploadImage">Upload</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </div>
        <hr>
        <v-container fluid>
            <v-card id="entries-card">
                <v-row class="py-7 px-8">
                    <v-col v-for="entry in contestDetails.entry" :key="entry._id">
                        <div>
                            <v-img
                                :src="entry.url" width="300"
                                height="300"
                            ></v-img>
                            <div>
                                <span @click="vote(entry._id)" class="mr-16 pr-12">{{entry.votes}}</span>
                                <span class="ml-16 pl-8">{{entry.participant.name}}</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
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
        loading:false,
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
            if(error == 'Error: GraphQL error: Unautherized'){
                window.location.href='http://localhost:8080/login'
            }
        })
    },
    methods: {
        selectImage(){
            this.selectedImage = event.target.files[0]
            console.log(this.selectedImage)
        },
        uploadImage(){
            this.loading = true
            if(this.selectedImage != null){
                this.$apollo.mutate({
                    mutation: UPLOAD_IMAGE_MUTATION,
                    variables:{
                        file: this.selectedImage,
                        contestId: this.$route.params.id
                    },
                    update:(store, {data:{addImage}}) => {
                        const data = store.readQuery({
                            query:GET_CONTEST_QUERY,
                            variables:{
                                id: this.$route.params.id
                            }
                        })
                        data.getContest.entry.push(addImage)
                        data.getContest.currentParticipants += 1
                        store.writeQuery({ 
                            query: GET_CONTEST_QUERY,
                            variables:{
                                id: this.$route.params.id
                            },
                            data })
                    }
                }).then( result => {
                    console.log(result.data)
                    this.selectedImage = null
                    this.loading = false
                    this.dialog = false
                    this.contestDetails.participateOption = false
                }).catch( error => {
                    alert(error)
                    this.dialog = false
                })
            }
        },
        cancelUpload(){
            this.dialog = false,
            this.loading = false,
            this.selectedImage = null
        },
        vote(entryId){
            this.$apollo.mutate({
                mutation: VOTE_MUTATION,
                variables:{
                    contestId: this.$route.params.id,
                    entryId
                },
                update:(store,{data:{vote}}) => {
                    const data = store.readQuery({
                        query:GET_CONTEST_QUERY,
                        variables:{
                            id: this.$route.params.id,
                        }
                    })
                    for(let i=0;i<data.getContest.entry.length;i++){
                        if(data.getContest.entry[i]._id == entryId){
                            data.getContest.entry[i].votes = vote
                        }
                    }
                    store.writeQuery({ query: GET_CONTEST_QUERY,
                    variables:{
                        id: this.$route.params.id
                    },
                    data  })
                }
            }).then((result) => {
                for(let i=0;i<this.contestDetails.entry.length;i++){
                        if(this.contestDetails.entry[i]._id == entryId){
                            this.contestDetails.entry[i].votes = result.data.vote
                        }
                    }
            }).catch(error => {
                alert(error)
            })
        }
    }
}
</script>

<style scoped>
hr {
  border: 1px solid #76FF03;
  width: 90%;
  margin: auto;
}
</style>