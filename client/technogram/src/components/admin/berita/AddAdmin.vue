<template>
    <v-app>
    <div>
      <v-form>
        <v-text-field label="Username" v-model= "username"></v-text-field>
        <v-text-field :type="'password'" label="Password" v-model="password"> </v-text-field>
      </v-form>
      <v-btn elevation="5" small>Add New Admin</v-btn>
      </div>
    </v-app>
 
</template>

<script>

</script>

<style>
  
</style>
