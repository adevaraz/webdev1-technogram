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
                    :src="require('../../../assets/technogram-creator-b.png')"
                  ></v-img>
                </div>
                <form class="mt-10" @submit.prevent="resetPassword">
                  <v-row class="jutify-center">
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">
                        New Password
                      </p>
                      <v-text-field
                        v-model="newPassword"
                        :rules="[rules.emptyPassword, rules.minimumPassword]"
                        :append-icon="
                          isNewPasswordShown ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="isNewPasswordShown ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="isNewPasswordShown = !isNewPasswordShown"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-caption font-weight-bold text-center">
                        Confrim New Password
                      </p>
                      <v-text-field
                        v-model="confirmNewPassword"
                        :rules="[
                          rules.emptyPassword,
                          rules.minimumPassword,
                          rules.confirmPassword,
                        ]"
                        :append-icon="
                          isconfirmNewPasswordShown ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="isconfirmNewPasswordShown ? 'text' : 'password'"
                        class="input-group--focused"
                        @click:append="
                          isconfirmNewPasswordShown = !isconfirmNewPasswordShown
                        "
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
                        >Reset Password</v-btn
                      >
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
import UserAuth from "../../../api/pembaca/auth";
import { mapActions } from "vuex";
export default {
  created() {
    if (!this.currentToken) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      isNewPasswordShown: false,
      isLoading: false,
      isconfirmNewPasswordShown: false,
      confirmNewPassword: "",
      newPassword: "",
      error: {
        isError: false,
        message: "",
      },
      rules: {
        emptyPassword: (value) => !!value || "Password tidak boleh kosong",
        minimumPassword: (value) =>
          value.length > 3 || "Password minimal 3 karakter ",
        confirmPassword: (value) =>
          value === this.newPassword || "Password tidak sama",
      },
    };
  },
  computed: {
    currentToken() {
      return this.$route.query.ref;
    },
    errorMessage() {
      return this.error.message;
    },
    isInputValid() {
        
    
        const isNewPasswordEmpty = this.rules.emptyPassword(this.newPassword) !== true;
        const isNewPasswordMinimumLength = this.rules.minimumPassword(this.newPassword) !== true;
        const isConfirmPasswordEmpty = this.rules.emptyPassword(this.confirmNewPassword) !== true;
        const isConfirmPasswordMinimumLength = this.rules.minimumPassword(this.confirmNewPassword) !== true;
        const isPasswordSame = this.rules.confirmPassword(this.confirmNewPassword) !== true;


      if(isNewPasswordEmpty|| isNewPasswordMinimumLength ||isConfirmPasswordEmpty || isConfirmPasswordMinimumLength|| isPasswordSame){
          return false
      }
      return true;
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
  },
  methods: {
    ...mapActions({
      // loggedIn : 'user/getNewToken',
      setToken: "user/setToken",
    }),
    async resetPassword() {
      try {
        this.error.isError = false;
        this.error.message = "";
        this.isLoading = true;
        const result = await UserAuth.resetpassword(
          this.currentToken,
          this.newPassword
        );
        this.isLoading = false;
        if (result instanceof Error) {
          this.error.message = result.cause;
          this.error.isError = true;
        } else {
          this.setToken({
            token: result.token,
            username: result.username,
            email: result.email,
            kategori: result.mostLikedCategory,
          });
          this.$router.push({ path: "/" });
        }
      } catch (err) {
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