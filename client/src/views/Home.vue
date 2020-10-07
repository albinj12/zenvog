<template>
  <div class="home">
    <v-container fluid>
      <v-row justify="space-around">
        <v-col cols=5 class="ml-9 my-16 pt-16">
          <v-card class="d-flex flex-column align-center home-card" outlined>
            <h3 class="pa-10">Conduct an online Photography Competetion? ContestApp made it easy for you.</h3>
            <v-btn color="green white--text" width=250 class="my-10 home-card-button" to="/createcontest">Create</v-btn>
          </v-card>
        </v-col>
        <v-col cols=5 class="mr-9 my-16 pt-16">
          <v-card class="d-flex flex-column align-center home-card" outlined>
            <h3 class="pa-10">Are you a photographer? Participate in various online Competetions happeining around the globe</h3>
            <v-btn color="green white--text" width=250 class="my-10 home-card-button" to="/explore">Participate</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols=10>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident commodi, quia iure ratione numquam veniam eaque quaerat reprehenderit. Placeat sequi nihil laudantium! Vero aspernatur maxime inventore, quis obcaecati excepturi molestiae?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ea blanditiis nesciunt. Eveniet, quasi iusto tenetur quidem tempora nisi nihil, officiis nulla pariatur voluptatum odio ducimus asperiores modi deleniti explicabo?</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style scoped>
  .home-card:hover {
    transition: 0.3s;
    transform: scale(1.05);
    border: 2px solid #76FF03 !important;
    background-color: white !important;
  }
  .home-card-button::before{
    background-color: transparent;
  }
  .home-card:hover > .home-card-button {
    transition: 0.5s;
    border: 2px solid #76FF03 !important;
    color: #76FF03 !important;
    background-color: white !important;
  }
  /* .home-card-button:hover{
    border: 2px solid #76FF03 !important;
    color: #76FF03 !important;
    background-color: white !important;
  } */
</style>
