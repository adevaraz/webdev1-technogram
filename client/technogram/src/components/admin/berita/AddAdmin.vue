<template>
    <v-app>
    <div>
      <v-form>
        <v-text-field label="Username" v-model= "username"></v-text-field>
        <v-text-field :type="'password'" label="Password" v-model="password"> </v-text-field>
      </v-form>
      <v-btn elevation="5" small @click="addAdmin">Add New Admin</v-btn>
      </div>
    </v-app>
 
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      error: {
        isError: false,
        message: "",
      },
      rules : {
        username: (value) => !!value || "Username tidak boleh kosong",
        password: (value) => !!value || "Password tidak boleh kosong",
      },
      }
    },
    methods:{
      async addAdmin(){
        console.log(this.username);
        
      }
    }
  }

</script>

<style>
  
</style>
