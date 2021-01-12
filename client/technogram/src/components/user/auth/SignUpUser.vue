<template>
  <v-dialog max-width="600px" v-model="dialog">
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
      <img
        class="item img-btn"
        @click="onDialogClosed"
        src="../../../assets/icons/cross.svg"
      />
      <div :class="isMobile ? 'content-mobile' : 'content'">
        <v-card-title>
          <h1 :class="isMobile ? 'playfair-font-mobile' : 'playfair-font'">
            Daftar menggunakan Email
          </h1>
        </v-card-title>
        <form class="mt-10">
          <v-row class="jutify-center">
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">
                Email
              </p>
              <v-text-field
                v-model="email"
                :rules="[rules.email]"
                label="email@domain.com"
                single-line
                color="#E52B38"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">
                Username
              </p>
              <v-text-field
                v-model="username"
                :rules="[rules.username]"
                label="Username"
                single-line
                color="#E52B38"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">
                Password
              </p>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                single-line
                type="password"
                required
                color="#E52B38"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">
                Masukkan Ulang Password
              </p>
              <v-text-field
                label="Masukkan ulang password"
                single-line
                v-model="confirmPassword"
                :rules="[confirmPasswordRules, passwordConfirmationRule]"
                type="password"
                required
                color="#E52B38"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-col>
            <v-alert dense outlined type="error" v-if="error.isError">
              {{ errorMessage }}
            </v-alert>
            <v-alert dense outlined type="success" v-if="error.isNotError">
              {{ errorMessage }}
            </v-alert>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn
              color="#E52B38"
              @click="signup"
              class="signup_btn"
              :userEmail="this.email"
              >Daftar</v-btn
            >
          </v-col>
        </form>
      </div>
    </v-card>
    <v-progress-circular
      class="progressbar"
      v-if="isLoading && isMobile"
      color="#E52B38"
      height="10"
      indeterminate
    ></v-progress-circular>
    <v-overlay :value="isLoading" absolute></v-overlay>
  </v-dialog>
</template>

<script>
import Auth from "../../../api/pembaca/auth";
import { mapActions } from "vuex";

export default {
  props: {
    onDialogClosed: Function,
  },
  data() {
    return {
      isPasswordShown: false,
      isLoading: false,
      dialog: true,
      email: "",
      username: "",
      password: "",
      passwordRules: undefined,
      confirmPasswordRules: "",
      confirmPassword: "",


      error: {
        isNotError: false,
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
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    },
  },
  methods: {
    ...mapActions({
      loggedIn: "user/getNewToken",
      setToken: "user/setToken",
      setEmail: "user/setEmail",
    }),

    async signup() {
      this.error.message = "";
      this.isLoading = true;
      const signupResult = await Auth.signup(
        this.email,
        this.username,
        this.password
      );
      console.log(signupResult);
      this.isLoading = false;

      if (signupResult instanceof Error) {
        this.error.message = signupResult.cause;
        this.error.isError = true;
        this.error.isNotError = false;
      } else {
        // const loginResult = await Auth.signin(this.email, this.password);
        // await this.setToken(signupResult.token, true);
        // this.$router.push({ path: "/" });
        // this.setToken({
        //   token: loginResult.token,
        //   username: loginResult.username,
        //   email: this.email,
        //   kategori: loginResult.mostLikedCategory,
        // });

        // this.$router.push({ path: "/personalization" });

        this.setEmail(this.email);
        this.$router.push({
          path: "/verification",
        });

        this.dialog = false;
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

.item {
  height: 20px;
  margin: 10px;
}

.content {
  padding: 4rem;
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
  font-size: 21px;
}

.playfair-font {
  font-family: "Playfair Display", serif;
  font-size: 29px;
}

.signup_btn {
  color: white;
}

.img-btn {
  cursor: pointer;
}

.progressbar {
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>