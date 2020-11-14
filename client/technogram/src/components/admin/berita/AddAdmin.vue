<template>
    <v-app>
 
      <v-card max-width="374">
        <v-card-title><h3>Create New Admin</h3></v-card-title>
          <v-card-text>
            <v-text-field label="Username" v-model= "username" 
            :rules="rules"
            counter
            maxlength="15"
            hint="At least 8 characters">
            </v-text-field>
           <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters">
            </v-text-field>
          </v-card-text>
          <v-alert
          dense
          outlined
          type="error"
          v-if="error.isError">
          {{errorMessage}}
          </v-alert>
          <v-alert
          dense
          outlined
          type="success"
          v-if="error.isSuccess">
          {{successMessage}}
          </v-alert>

          <v-btn elevation="4" small color="primary" @click="addAdmin" :disabled="!isInputValid">Create New Admin</v-btn>
          <v-btn elevation="4" small  color="error">Close</v-btn>
       </v-card>
    </v-app>
 
</template>

<script>
import Admin from "../../../api/admin/admin";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: {
        isError: false,
        message: "",
        isSuccess: false
      },
      rules : {
        username: (value) => !!value || "Username tidak boleh kosong",
        password: (value) => !!value || "Password tidak boleh kosong",
      },
      }
    },
    
      computed: {
        errorMessage() {
        return this.error.message; 
        },
        successMessage() {
        return "Account is created";
        },
        isInputValid() {
        const isEmpty = (this.username === "") | (this.password === "");
        return !isEmpty;
        },
      },
    
    methods:{
      async addAdmin(){
        console.log(this.username);
        const result = await Admin.addAdmin(this.username, this.password);
        console.log(result)
        if(result instanceof Error){
          this.error.message = result.cause;
          this.error.isError = true;
   
        }else{
          
          this.error.isSuccess = true;
        
          throw result
        }
      }
    }
  }

</script>

<style>
  
</style>
