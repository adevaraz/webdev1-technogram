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
        style="cursor: pointer"
        @click="onDialogClosed"
        src="../../../assets/icons/cross.png"
      />
      <div :class="isMobile ? 'content-mobile' : 'content'">

          <h1 :class="isMobile ? 'playfair-font-mobile' : 'playfair-font'">
            Masuk dengan Email
          </h1>
    
        <form class="mt-10">
          <v-row class="jutify-center">
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">Email</p>
              <v-text-field
                v-model="email"
                label="email@domain.com"
                color="#E52B38"
                single-line
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p class="text-caption font-weight-bold text-center">Password</p>
              <v-text-field
                v-model="password"
                label="Password"
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
            <p class="text-caption pr-1">Tidak punya akun?</p>
            <p
              class="text-caption font-weight-bold"
              style="cursor: pointer"
              @click="onHaveNoAccountClicked"
            >
              Buat baru
            </p>
          </v-row>
          <v-row align="center" justify="center">
            <p class="text-caption pr-1">Lupa password?</p>
            <p
              class="text-caption font-weight-bold"
              style="cursor: pointer"
              @click="onResetPassword"
            >
              Reset Password
            </p>
          </v-row>
          <v-row align="center" justify="center">
            <v-alert
              dense
              outlined
              type="error"
              :icon="false"
              v-if="error.isError"
              class="text-center text-subtitle-2"
              >{{ errorMessage }}</v-alert
            >
          </v-row>
          <v-col class="d-flex justify-center">
            <v-btn class="login_btn" color="#E52B38" small @click="signin"
              >Masuk</v-btn
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
// import NavDrawer from "../ui/navigation/NavDrawer.vue";
import { mapGetters, mapActions } from "vuex";
// import { store } from "../../../store/index";

export default {
  props: {
    onHaveNoAccountClicked: Function,
    onDialogClosed: Function,
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
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
    closeDialog() {
      return this.dialog;
    },

    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
    }),
  },
  methods: {
    ...mapActions({
      // loggedIn : 'user/getNewToken',
      setToken: "user/setToken",
    }),
    onResetPassword() {
      this.$router.push({ path: "/request-resetpassword" });
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
          token: loginResult.token,
          username: loginResult.username,
          email: this.email,
          kategori: loginResult.mostLikedCategory,
        });

        this.$router.push({ path: "/" });
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
.item {
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
.dialog {
  overflow-y: scroll;
}
.login_btn {
  color: white;
}
.playfair-font-mobile {
  font-family: "Playfair Display", serif;
  font-size: 21px;
}

.playfair-font {
  font-family: "Playfair Display", serif;
  font-size: 29px;
}

.progressbar {
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>