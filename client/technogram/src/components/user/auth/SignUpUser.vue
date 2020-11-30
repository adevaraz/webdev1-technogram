<template>

 <v-dialog max-width="600px" v-model="dialog">
  <template v-slot:activator="{ on, attrs }">
        <p class="text-caption font-weight-bold" text small v-bind="attrs"
          v-on="on">? Create one</p>
      </template>
  
                    <v-card :loading="isLoading && !isMobile" height="100%" :elevation="isMobile ? 0 : 2">
                  <v-btn text small @click="dialog = false" >X</v-btn>
                        <div class="content">
                            <v-card-title>
                                <h1> Sign up with email </h1> 
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
                                    class="text-caption font-weight-bold text-center"
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
                            </form>
                        </div>
                    </v-card>
            
</v-dialog>
</template>

<script>
import Auth from "../../../api/pembaca/auth";

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
    async signup() {
      console.log("HELLOOOO NYAMPE GA\n\n")
      this.error.isError = false;
      this.error.message = "";
      this.isLoading = true;
      const signupResult = await Auth.signup(this.email, this.username, this.password);
      this.isLoading = false;
        
      if (signupResult instanceof Error) {
        this.error.message = signupResult.cause;
        this.error.isError = true;
      } else {
        await this.setToken(signupResult.token);
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
  padding: 5rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.signup_btn {
  color: white;
}
</style>