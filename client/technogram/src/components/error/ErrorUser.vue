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
          <img id="vector" src="../../assets/error/404_Error.gif" />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <div class="text-h6 font-weight-medium">
            Silahkan Hubungi Tim Technogram jika ada Kendala :)
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
.layout {
  background-color: rgb(251, 251, 251);
}
</style>