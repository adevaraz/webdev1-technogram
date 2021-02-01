<template>
  <v-form ref="form" v-model="valid">
    <v-progress-circular
      v-if="isLoading"
      color="#E52B38"
      height="10"
      indeterminate
    >
    </v-progress-circular>
    <v-container fluid class="fill-height">
      <h1>Create New Admin</h1>
      <div class="content">
        <form class="form justify-center">
          <v-text-field
            label="Username"
            :rules="[rules.username]"
            v-model="username"
            counter
            maxlength="15"
            hint="At least 8 characters"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.password]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
          >
          </v-text-field>
          <v-alert dense outlined type="error" v-if="error.isError">
            {{ errorMessage }}
          </v-alert>
          <div style="padding-bottom: 20px; text-align: center">
            <v-btn
              class="item"
              elevation="4"
              small
              color="primary"
              @click="addAdmin"
              :disabled="!isInputValid"
              >Create New Admin</v-btn
            >
          </div>
        </form>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import Admin from "../../../repository/interactor/admin/admin"
import { store } from "../../../store/index";
export default {
  data() {
    return {
      username: "",
      isLoading: false,
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
  },

  methods: {
    async addAdmin() {
      this.isLoading = true;
      const result = await Admin.addAdmin(
        this.username,
        this.password,
        store.getters["admin/getToken"]
      );
      this.isLoading = false;
      if (result instanceof Error) {
        this.error.message = result.cause;
        this.error.isError = true;
      } else {
        this.error.isError = false;
        console.log(this.message);
        throw result;
      }
    },
  },
};
</script>

<style>
.content {
  padding-top: 15rem;
  padding-right: 5rem;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  width: 100%;
}
.item {
  margin-top: 4rem;
}
</style>
