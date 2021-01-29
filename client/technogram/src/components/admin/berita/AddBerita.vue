<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="10">
          <div class="text-h3">Buat Berita</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10">
          <v-alert
            v-if="alert.type"
            :type="alert.type"
            :value="alertStatus"
            transition="slide-y-transition"
          >
            {{ alert.message }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" md="10">
          <div class="text-h6">Judul Berita</div>
          <v-text-field
            v-model="judul"
            :rules="judulRules"
            :counter="100"
            placeholder="Judul Berita"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5">
          <div class="text-h6">Nama Jurnalis</div>
          <v-text-field
            v-model="jurnalis"
            :rules="jurnalisRules"
            :counter="32"
            placeholder="Nama Jurnalis"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-h6">Deskripsi Jurnalis</div>
          <v-text-field
            v-model="deskripsi_jurnalis"
            :rules="deskripsiJurnalisRules"
            :counter="255"
            placeholder="Deskripsi Jurnalis"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="5">
          <div class="text-h6">Kategori</div>
          <v-select
            v-model="kategori_berita"
            :items="listKategori"
            :rules="kategoriRules"
            placeholder="Pilih Kategori"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-h6">Pilih Foto Header</div>
          <v-file-input
            @change="Preview_image"
            @click:clear="close_image"
            v-model="url_gambar"
            placeholder="Pilih Gambar"
            prepend-icon="mdi-camera"
            accept=".webp"
            :rules="imgRules"
          >
          </v-file-input>
          <v-img
            v-if="this.urlTemp != null"
            :src="urlTemp"
            :aspect-ratio="16 / 9"
            contain
            class="grey darken-4"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10">
          <div class="text-h6 mb-4">Artikel</div>
          <vue-editor
            id="editor"
            v-model="artikel"
            useCustomImageHandler
            @image-added="handleImageAdded"
            @image-removed="handleImageRemoved"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10">
          <v-btn
            class="float-right mt-2"
            elevation="6"
            color="success"
            large
            @click="saveBerita"
            :disabled="!valid"
            >Simpan</v-btn
          >
        </v-col>
      </v-row>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-form>
</template>

<script>
import { BASE_URL } from "../../../repository/interactor/const";
import berita from "../../../repository/interactor/berita/berita";
import { store } from "../../../store/index";
export default {
  name: "add-berita",
  components: {
    VueEditor: () =>
      import("vue2-editor").then((result) => {
        return result.VueEditor;
      }),
  },
  data() {
    return {
      isReset: false,
      isLoading: false,
      alertStatus: false,
      alert: {
        type: "",
        message: "",
      },
      valid: true,
      urlTemp: null,
      url_gambar: null,
      error: {
        isError: false,
        message: "",
        statusCode: "",
      },
      judul: "",
      jurnalis: "",
      deskripsi_jurnalis: "",
      kategori_berita: "",
      artikel: "",
      judulRules: [
        (v) => !!v || "Judul tidak boleh kosong.",
        (v) => v.length <= 100 || "Judul maksimal 100 karakter",
        (v) => v.length >= 3 || "Judul harus minimal 3 karakter",
      ],
      jurnalisRules: [
        (v) => !!v || "Nama Jurnalis tidak boleh kosong.",
        (v) => v.length <= 32 || "Nama Jurnalis maksimal 32 karakter",
        (v) => v.length >= 3 || "Nama Jurnalis minimal 3 karakter",
      ],
      deskripsiJurnalisRules: [
        (v) => !!v || "Deskripsi Jurnalis tidak boleh kosong.",
        (v) => v.length <= 255 || "Deskripsi Jurnalis maksimal 255 karakter",
        (v) => v.length >= 3 || "Deskripsi Jurnalis minimal 3 karakter",
      ],
      kategoriRules: [(v) => !!v || "Kategori tidak boleh kosong."],
      imgRules: [],
      listKategori: [],
    };
  },
  mounted() {
    this.retrieveKategori();
  },
  methods: {
    Preview_image() {
      if (this.url_gambar) {
        this.imgRules = [
          (v) => v.type === "image/webp" || "Gambar harus bertipe *.webp",
        ];
        this.urlTemp = URL.createObjectURL(this.url_gambar);
      }
    },
    close_image() {
      this.urlTemp = null;
      this.url_gambar = null;
      if (!this.valid) {
        this.imgRules = [];
      }
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    async retrieveKategori() {
      try {
        this.isLoading = true;
        const kategoriResult = await berita.getAllKategori();
        if (kategoriResult instanceof Error) {
          this.error.message = kategoriResult.cause;
          this.error.isError = true;
          this.error.statusCode = kategoriResult.statusCode;
          this.alert.type = "error";
          this.alert.message = this.error.message;
          this.alertStatus = true;
          this.isLoading = false;
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.listKategori.push(this.toTitleCase(element.nama_kategori));
            });
          }
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        console.log(file);
        let formData = new FormData();
        formData.append("url_gambar", file);
        const result = await berita.uploadImg(formData);
        if (result instanceof Error) {
          this.error.message = result.cause;
          this.error.isError = true;
          this.error.statusCode = result.statusCode;
          this.alert.type = "error";
          this.alert.message = this.error.message;
          this.alertStatus = true;
          throw result;
        }
        const url = BASE_URL + "/" + result.data.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      } catch (error) {
        console.log(error);
      }
    },
    async handleImageRemoved(image) {
      if (this.isReset) {
        this.isReset = false;
        return;
      }
      try {
        const result = await berita.deleteImg(image);
        if (result instanceof Error) {
          this.error.message = result.cause;
          this.error.isError = true;
          this.error.statusCode = result.statusCode;
          this.alert.type = "error";
          this.alert.message = this.error.message;
          this.alertStatus = true;
          throw result;
        }
        console.log(result.message);
      } catch (error) {
        console.log(error);
      }
    },
    async saveBerita() {
      try {
        let data = new FormData();
        data.append("judul", this.judul);
        data.append("artikel", this.artikel);
        if (this.url_gambar) data.append("url_gambar", this.url_gambar);
        data.append("kategori_berita", this.kategori_berita);
        data.append("jurnalis", this.jurnalis);
        data.append("deskripsi_jurnalis", this.deskripsi_jurnalis);
        this.isLoading = true;
        const result = await berita.save(data, store.getters["admin/getToken"]);
        if (result instanceof Error) {
          this.error.message = result.cause;
          this.error.isError = true;
          this.error.statusCode = result.statusCode;
          this.alert.type = "error";
          this.alert.message = this.error.message;
          this.alertStatus = true;
          this.isLoading = false;
          window.scrollTo(0, 0);
          throw result;
        }
        console.log(result);
        this.reset();
        this.alert.type = "success";
        this.alert.message = result.message;
        this.alertStatus = true;
        this.isLoading = false;
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      this.urlTemp = null;
      this.url_gambar = null;
      this.judul = "";
      this.jurnalis = "";
      this.deskripsi_jurnalis = "";
      this.kategori_berita = "";
      this.isReset = true;
      this.artikel = "";
      this.$refs.form.resetValidation();
    },
  },
  watch: {
    alertStatus: function (val) {
      if (val) {
        setTimeout(() => {
          this.alertStatus = false;
          this.alert.type = "";
          this.alert.message = "";
        }, 5000);
      }
    },
    url_gambar: function (val) {
      if (val) {
        this.imgRules = [
          (v) => v.type === "image/webp" || "Gambar harus bertipe *.webp",
        ];
      } else {
        this.imgRules = [];
      }
    },
  },
};
</script>

<style>
</style>