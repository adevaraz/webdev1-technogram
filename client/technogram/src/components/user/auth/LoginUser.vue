<template>
 <v-dialog max-width="600px" v-model="dialog">
      <v-card :loading="isLoading && !isMobile" height="100%" :elevation="isMobile ? 0 : 2">
         <img class="item img-btn" style="cursor:pointer;" @click="onDialogClosed" src="../../../assets/icons/cross.png" />
          <div :class="isMobile? 'content-mobile' : 'content'">
              <v-card-title>
                <h1 :class="isMobile? 'playfair-font-mobile' : 'playfair-font'"> Sign in with email </h1> 
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
                    <v-row align="center" justify="center">
                      <p class="text-caption pr-1">Have no account?</p>
                      <p class="text-caption font-weight-bold" style="cursor:pointer;" @click="onHaveNoAccountClicked">Create one</p>
                     </v-row>
                    <v-row align="center" justify="center">
                      <p class="text-caption pr-1">Forget Password?</p>
                      <p class="text-caption font-weight-bold" style="cursor:pointer;" @click="onResetPassword">Reset Password</p>
                     </v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn class="login_btn" color="#E52B38" small @click="signin">Sign in</v-btn>
                    </v-col>
                  </form>
                </div>
          </v-card>
      <transition >
      <!-- <div class="drawer" v-if="shouldShowDrawer">
        <nav-drawer
          :isLoggedIn="isLoggedIn"
        ></nav-drawer>
      </div> -->
    </transition>
            
</v-dialog>
</template>

<script>
import Auth from "../../../api/pembaca/auth";
// import NavDrawer from "../ui/navigation/NavDrawer.vue";
import { mapGetters, mapActions } from 'vuex';
// import { store } from "../../../store/index";

export default {
  props: {
    onHaveNoAccountClicked : Function,
    onDialogClosed : Function
  },
  data() {
    return {
      isPasswordShown: false,
      isLoading: false,
      dialog: true,
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
    closeDialog(){
      return this.dialog
    },

    ...mapGetters(
        {
          isLoggedIn: 'user/isLoggedIn'
        }
    )
  },
  methods: {
    ...mapActions({
      // loggedIn : 'user/getNewToken',
      setToken : 'user/setToken',
    }),
    onResetPassword(){
      this.$router.push({path : '/request-resetpassword'})
    },
    async signin() {
      this.error.isError = false;
      this.error.message = "";
      this.isLoading = true;
      const loginResult = await Auth.signin(this.email, this.password);
      this.isLoading = false;
      console.log(loginResult);
      
      if (loginResult instanceof Error) {
        this.error.message = loginResult.cause;
        this.error.isError = true;
      } else {
        this.setToken({
          token : loginResult.token,
          username : loginResult.username,
          email : this.email,
          kategori :loginResult.mostLikedCategory

        });

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
.item{
  height: 20px;
  margin: 10px;
}
.container {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.worksans-font {
  font-family: "Work Sans", sans-serif;
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
.content-mobile {
  padding: 2rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dialog{
 overflow-y: scroll;
}
.login_btn {
  color: white;
}
.playfair-font-mobile {
  font-family: "Playfair Display", serif;
  font-size: 25px;
}

.playfair-font{
  font-family: "Playfair Display", serif;
}
</style>