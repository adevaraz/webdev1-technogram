<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center fill-height">
      <v-col xs="12" sm="8" md="5" lg="5">
        <v-row class="fill-height">
          <v-col>
            <v-card :loading="isLoading && !isMobile" height="100%" :elevation="isMobile ? 0 : 2">
              <template slot="progress">
                <v-progress-linear  color="#E52B38" height="10" indeterminate></v-progress-linear>
              </template>
              <div class="content">
                <div class="logo">
                  <v-img :src="require('../../../assets/technogram-creator-b.png')"></v-img>
                </div>
                <form class="mt-10">
                  <v-row class="jutify-center">
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">Username</p>
                      <v-text-field :rules="[rules.username]" v-model="username"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">Password</p>
                      <v-text-field
                        v-model="password"
                        :rules="[rules.password]"
                        :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="isPasswordShown ? 'text' : 'password'"
                        class="input-group--focused"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-alert
                        dense
                        outlined
                        type="error"
                        :icon="false"
                        v-if="error.isError"
                        class="text-center text-subtitle-2"
                      >{{errorMessage}}</v-alert>
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn
                        color="#E52B38"
                        @click="signin"
                        class="login_btn"
                        :disabled="!isInputValid"
                      >Sign in</v-btn>
                    </v-col>
                  </v-row>
                </form>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-progress-circular
      class="progressbar"
      v-if="isLoading && isMobile"
      color="#E52B38"
      height="10"
      indeterminate
    ></v-progress-circular>
    <v-overlay :value="isLoading" absolute></v-overlay>
  </v-container>
</template>

<script>
import Auth from "../../../api/admin/auth";
export default {
  data() {
    return {
      isPasswordShown: false,
      isLoading: false,
      username: "",
      password: "",
      error: {
        isError: false,
        message: "",
      },
      rules: {
        username: (value) => !!value || "Username tidak boleh kosong",
        password: (value) => !!value || "Password tidak boleh kosong",
      },
    };
  },
  computed: {
    errorMessage() {
      return this.error.message;
    },
    isInputValid() {
      const isEmpty = (this.username === "") | (this.password === "");
      return !isEmpty;
    },
    isMobile(){
      return this.$vuetify.breakpoint.xs ? true : false
    }
  },
  methods: {
    async signin() {
      console.log(this.isMobile);
      this.error.isError = false;
      this.error.message = "";
      this.isLoading = true;
      const loginResult = await Auth.signin(this.username, this.password);
      this.isLoading = false;
      if (loginResult instanceof Error) {
        this.error.message = loginResult.cause;
        this.error.isError = true;
      } else {
        console.log(loginResult);
      }
    },
  },
};
</script>

<style scoped>
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

.content form {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progressbar {
  position: relative;
  bottom: 50%;
}

@media screen and (max-width: 400px) {
  .content .logo {
    width: 60%;
  }
  .content form {
    width: 90%;
  }
}

.content form .login_btn {
  color: white;
}
</style>
