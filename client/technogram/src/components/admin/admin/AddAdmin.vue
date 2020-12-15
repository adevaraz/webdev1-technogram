<template>
  <v-card max-width="374">
    <v-progress-linear
      v-if="isLoading"
      color="#E52B38"
      height="10"
      indeterminate
    >
    </v-progress-linear>

    <v-card-title><h3>Create New Admin</h3></v-card-title>
    <v-card-text>
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
    </v-card-text>

    <v-alert dense outlined type="error" v-if="error.isError">
      {{ errorMessage }}
    </v-alert>
    <div style="padding-bottom: 20px; text-align: center">
      <v-btn
        elevation="4"
        small
        color="primary"
        @click="addAdmin"
        :disabled="!isInputValid"
        >Create New Admin</v-btn
      >
      <v-btn elevation="4" small color="error">Close</v-btn>
    </div>
  </v-card>
</template>

<script>
import Admin from "../../../api/admin/admin";
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
</style>
