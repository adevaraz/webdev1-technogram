<template>
  <v-container>
    <v-col cols="6" class="coloumn">
      <v-card class="justify-center" width="90%" max-height="100%">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <div class="content">
          <v-img
            width="5rem"
            height="5rem"
            :src="require('../../../assets/technogram-creator-b.png')"
          ></v-img>
          <form class="mt-10">
            <div class="username">
              <p class="text-caption font-weight-bold text-center">Username</p>  
              <v-text-field cl></v-text-field>
            </div>
            <div class="password">
                              <p class="text-caption font-weight-bold text-center">Password</p>  
                <v-text-field
            :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isPasswordShown ? 'text' : 'password'"
            class="input-group--focused"
          ></v-text-field>
            </div>
           <v-btn color="#E52B38" class="login_btn" small>Sign in</v-btn>
          </form>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            isPasswordShown : true
        }
    }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  min-height: 100%;
  max-height: 100vh;
  box-sizing: border-box;
}


.content {
  padding: 1rem 0 1rem 0;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
}


.content form {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content form .login_btn {
    color : white;
}


</style>