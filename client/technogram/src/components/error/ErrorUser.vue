<template>
  <div class="layout">
    <v-container>
      <v-row>
        <v-col align="center" justify="center">
          <div class="text-h4 font-weight-medium">
            Oops ! Laman Tidak Ditemukan
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <img id="vector" src="../../assets/error/404_Error.svg" />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <a href="https://storyset.com/web">Illustration by Freepik Storyset</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <div class="text-h6 font-weight-medium">
            Silahkan hubungi email <a>id.technogram@gmail.com</a> jika ada kendala :)
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <v-btn to="/" color="error" elevation="4" outlined
            >Kembali ke laman utama</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "not-found-user",
  mounted() {
    document.getElementById("vector").ondragstart = function () {
      return false;
    };
  },
};
</script>

<style>
a {
    text-decoration: none;
    color: black;
    font-size: 12px;
}

.layout {
  background-color: rgb(251, 251, 251);
}

#vector {
  width: 100%;
  max-width: 30rem;
}
</style>