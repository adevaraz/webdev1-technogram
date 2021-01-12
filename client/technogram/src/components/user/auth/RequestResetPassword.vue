<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center fill-height">
      <v-col xs="12" sm="8" md="5" lg="5">
        <v-row class="fill-height">
          <v-col>
            <v-card
              :loading="isLoading && !isMobile"
              height="100%"
              :elevation="isMobile ? 0 : 2"
            >
              <template slot="progress">
                <v-progress-linear
                  color="#E52B38"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <div class="content">
                <div class="logo">
                  <v-img
                    :src="require('../../../assets/technogram-creator-b.svg')"
                  ></v-img>
                </div>
                <form class="mt-10" @submit.prevent="resetPassword" v-if="!isEmailSent">
                  <v-row class="jutify-center">
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">
                        Email
                      </p>
                      <v-text-field
                        v-model="email"
                        :rules="[rules.isEmail,rules.isEmailValid]"
                        type="text"
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
                        >{{ errorMessage }}</v-alert
                      >
                    </v-col>
                    <v-col class="d-flex justify-center">
                      <v-btn
                        type="submit"
                        color="#E52B38"
                        class="login_btn"
                        :disabled="!isInputValid"
                        >Kirim Permintaan</v-btn
                      >
                    </v-col>
                  </v-row>
                </form>
                <div v-else><h1>Email terkirim</h1></div>
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
import UserAuth from "../../../api/pembaca/auth";
export default {
  data() {
    return {
      isLoading: false,
      email : "",
      error: {
        isError: false,
        message: "",
      },
      rules: {
        isEmail: (value) => !!value || "Email tidak boleh kosong",
        isEmailValid : (value) => value.includes('@') || "Email tidak valid"
      },
      isEmailSent : false
    };
  },
  computed: {
    errorMessage() {
      return this.error.message;
    },
    isInputValid() {
        console.log(this.rules.isEmail(this.email));
        console.log(this.rules.isEmailValid(this.email));
      if(this.rules.isEmail(this.email) !== true|| this.rules.isEmailValid(this.email)  !== true){
          return false
      }
      return true;
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
  },
  methods: {
    async resetPassword() {
        try{
            this.error.isError = false;
            this.error.message = "";
            this.isLoading = true;
            const result = await  UserAuth.requestRestPasswordEmail(this.email);
            this.isLoading = false;
            if (result instanceof Error) {
                this.error.message = result.cause;
                this.error.isError = true;
            } else {
                this.isEmailSent = true;
            }
        }catch(err){
            this.error.isError = true;
            this.error.message = "Unknown error happen";
            this.isLoading = false;
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