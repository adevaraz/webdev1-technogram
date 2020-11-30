<template>

 <v-dialog max-width="600px" v-model="dialog">
  <template v-slot:activator="{ on, attrs }">
        <v-btn class="login_btn" color="#E52B38" small v-bind="attrs"
          v-on="on">Sign in</v-btn>
      </template>
      <v-card :loading="isLoading && !isMobile" height="100%" :elevation="isMobile ? 0 : 2">
        <v-btn text small @click="dialog = false" >X</v-btn>
          <div class="content">
              <v-card-title>
                <h1> Sign in with email </h1> 
              </v-card-title>
               <form class="mt-10">
                  <v-row class="jutify-center">
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">Email</p>
                        <v-text-field 
                          v-model="email"
                          color="#E52B38"
                          single-line
                          ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">Password</p>
                        <v-text-field
                          v-model="password"
                          :rules="[rules.password]"
                          :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                          single-line
                          :type="isPasswordShown ? 'text' : 'password'"
                          color="#E52B38"
                          class="input-group--focused"
                          @click:append="isPasswordShown = !isPasswordShown"
                        ></v-text-field>
                    </v-col>
                  </v-row>
                    <v-row >
                      <v-col cols="6">
                        <p class="text-caption font-weight-bold ">Forgot your password?</p>
                     </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                      <p class="text-caption font-weight-bold ">Have no account</p>
                        <signup></signup>
                     </v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn class="login_btn" color="#E52B38" small @click="loggedInToggle">Sign in</v-btn>

                    </v-col>
                  </form>
                </div>
          </v-card>
      <transition :name="transitionName">
      <div class="drawer" v-if="shouldShowDrawer">
        <nav-drawer
          :isLoggedIn="isLoggedIn"
        ></nav-drawer>
      </div>
    </transition>
            
</v-dialog>
</template>

<script>
import Auth from "../../../api/pembaca/auth";
import SignUpPembaca from "./SignUpUser.vue";
import NavDrawer from "../ui/navigation/NavDrawer.vue";

import {mapActions} from "vuex";
export default {
  data() {
    return {
      isPasswordShown: false,
      isLoading: false,
      dialog: false,
      email: "",
      password: "",
      error: {
        isError: false,
        message: "",
      },
      rules: {
        email: (value) => !!value || "Email cannot be null or empty",
        password: (value) => !!value || "Password cannot be null or empty",
      },
    };
  },
  components :
      {
        'signup' : SignUpPembaca,
        'nav-drawer' : NavDrawer
      },
  props: {
    isLoggedIn: {
      default: true,
    },
    toogleDrawer: Function,
  },
  computed: {
    errorMessage() {
      return this.error.message;
    },
    isInputValid() {
      const isEmpty = (this.email === "") | (this.password === "");
      return !isEmpty;
    },
    isMobile(){
      return this.$vuetify.breakpoint.xs ? true : false
    }
  },
  methods: {
    ...mapActions({
      loggedInToggle : 'user/loginToogle'
    }),
    async signin() {
    
      this.error.isError = false;
      this.error.message = "";
      this.isLoading = true;
      console.log(this.email);
      const loginResult = await Auth.signin(this.email, this.password);
      this.isLoading = false;
        
      if (loginResult instanceof Error) {
        this.error.message = loginResult.cause;
        this.error.isError = true;
      } else {
        await this.setToken(loginResult.token);
        this.$router.push({path : 'user/loginToogle'})
      } 
    },
  },
};
</script>

<style scoped>
col-12 {
    padding-top: 0;
    padding-bottom: 0;
  }

.container {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.content {
  padding: 1rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login_btn {
  color: white;
}

</style>