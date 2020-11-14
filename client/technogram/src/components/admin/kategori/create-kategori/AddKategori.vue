<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline">Add New News</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>

        <v-text-field
          v-model="nama_kategori"
          :rules="[(v) => !!v || 'Category is required']"
          label="Kategori"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveBerita">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import save from "../../../../api/kategori/addKategori"

export default {
  name: "add-kategoti",
  data() {
    return {
      kategori: {
        nama_kategori: "",
      },
    };
  },
  methods: {

    async saveBerita() {
      const saveResult = await save.addKategori(this.nama_kategori)
      if (saveResult instanceof Error) {
          console.log("berhasil woe")
      } else {
        console.log(saveResult);
      }
    },

  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>

