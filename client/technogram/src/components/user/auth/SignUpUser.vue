<template>

 <v-dialog max-width="600px" v-model="dialog">
  <template v-slot:activator="{ on, attrs }">
      <p class="text-caption font-weight-bold" text small v-bind="attrs"
      v-on="on">? Create one</p>
    </template>
  
      <v-card height="100%" :elevation="isMobile ? 0 : 2">
      <v-progress-linear
      v-if="isLoading"
      color="#E52B38"
      height="10"
      indeterminate
    >
    </v-progress-linear>
         <img class="item img-btn" @click="dialog=false" src="../../../assets/icons/cross.png" />
          <div :class="isMobile? 'content-mobile' : 'content'">
            <v-card-title>
                <h1 :class="isMobile? 'playfair-font-mobile' : 'playfair-font'"> Sign Up with email </h1> 
                </v-card-title>
                    <form class="mt-10">
                        <v-row class="jutify-center">
                              <v-col cols="12">
                                <p class="text-caption font-weight-bold text-center">Your Email</p>
                                    <v-text-field 
                                    v-model="email" 
                                    :rules="[rules.email]"
                                    single-line
                                    color="#E52B38"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <p class="text-caption font-weight-bold text-center">Your Username</p>                                    
                                  <v-text-field
                                  v-model="username" :rules="[rules.username]"
                                  single-line
                                  color="#E52B38"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <p class="text-caption font-weight-bold text-center">Your Password</p>                                    
                                  <v-text-field
                                  v-model="password"
                                  :rules="passwordRules" 
                                  single-line
                                  type="password" 
                                  required
                                  color="#E52B38"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                <p class="text-caption font-weight-bold text-center">Re-enter Password</p>                                    
                                <v-text-field
                                    label="Confirm Password" 
                                    single-line
                                    v-model="confirmPassword" 
                                    :rules="[confirmPasswordRules,passwordConfirmationRule]"
                                    type="password" 
                                    required
                                    color="#E52B38"
                                ></v-text-field>
                                </v-col>
                                </v-row>
                    
                            <v-col class="d-flex justify-center">
                      <v-btn
                        color="#E52B38"
                        @click="signup"
                        class="signup_btn"
                      >Sign up</v-btn>
                    </v-col>
                    <v-col>
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
                      v-if="error.isNotError">
                      {{errorMessage}}
                      </v-alert>
                      
                    </v-col>
                            </form>
                        </div>
                    </v-card>
            
</v-dialog>
</template>

<script>
import Auth from "../../../api/pembaca/auth";

import {mapActions} from "vuex";

export default {
  data() {
    return {
      isPasswordShown: false,
      isLoading: false,
      dialog: false,
      email: "",
      username: "",
      password: "",
 
      error: {
        isNotError : false,
        isError: false,
        message: "",
        confirmPassword: "",
      },
      rules: {
        email: (value) => !!value || "Email cannot be null or empty",
        username: (value) => !!value || "Username cannot be null or empty",
        password: (value) => !!value || "Password cannot be null or empty",
        passwordRules: (value) => !!value || "Password is required",
        confirmPasswordRules: (value) => !!value || "Password is required",
      },
    };
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
    },
    passwordConfirmationRule() {
        return () => (this.password === this.confirmPassword) || "Password must match"
    },
  },
  methods: {
    ...mapActions({
      loggedIn : 'user/getNewToken',
      setToken : 'user/setToken'
      
    }),
    async signup() {
      this.error.message = "";
      this.isLoading = true;
      const signupResult = await Auth.signup(this.email, this.username, this.password);
      this.isLoading = false;
        
      if (signupResult instanceof Error) {
        this.error.message = signupResult.cause;
        this.error.isError = true;
        this.error.isNotError = false;
      } else {
        this.error.message = "Your Account Successfully Created!"
        this.error.isNotError = true;
        this.error.isError = false;
        await this.setToken(signupResult.token, true);
        this.$router.push({path : '/'});
        
      } 
    },
  },
};

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");

col-12 {
    padding-top: 0;
    padding-bottom: 0;
  }

.container {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.item{
  height: 20px;
  margin: 10px;
}
.content {
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content-mobile {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.playfair-font-mobile {
  font-family: "Playfair Display", serif;
  font-size: 25px;
}

.playfair-font{
  font-family: "Playfair Display", serif;
}
.signup_btn {
  color: white;
}
</style>