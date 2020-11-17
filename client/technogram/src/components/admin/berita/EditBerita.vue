<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="10">
          <div class="text-h3">Edit Berita</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10">
          <v-alert
            type="success"
            :value="alert"
            transition="slide-y-transition"
          >
            Sukses Update berita.
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" md="10">
          <div class="text-h6">ID Berita</div>
          <v-text-field v-model="id" readonly></v-text-field>
        </v-col>
      </v-row>
      <v-row>
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
            accept="image/png, image/jpeg, image/jpg"
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
            @click="updateBerita"
            :disabled="!valid"
            >Simpan</v-btn
          >
        </v-col>
      </v-row>
      <v-overlay :value="isLoading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-form>
</template>

<script>
import { BASE_URL } from "../../../api/const";
import { VueEditor } from "vue2-editor";
import berita from "../../../api/berita/berita";
export default {
  name: "edit-berita",
  components: { VueEditor },
  data() {
    return {
      isReset: false,
      isLoading: false,
      alert: false,
      valid: true,
      urlTemp: null,
      url_gambar: null,
      url_gambar_ori: null,
      id: "",
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
    this.getBeritabyId(this.$route.params.id);
  },
  methods: {
    Preview_image() {
      if (this.url_gambar instanceof File) {
        console.log(this.url_gambar);
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
        const kategoriResult = await berita.getAllKategori();
        if (kategoriResult instanceof Error) {
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.listKategori.push(this.toTitleCase(element.nama_kategori));
            });
          }
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
          throw result;
        }
        console.log(result.message);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBerita() {
      try {
        const path = require("path");
        let data = new FormData();
        data.append("judul", this.judul);
        data.append("artikel", this.artikel);
        if (this.url_gambar_ori && this.url_gambar) {
          if (path.basename(this.url_gambar_ori) === this.url_gambar.name) {
            this.url_gambar = this.url_gambar_ori;
          }
        }
        console.log(this.url_gambar);
        data.append("url_gambar", this.url_gambar);
        data.append("kategori_berita", this.kategori_berita);
        data.append("jurnalis", this.jurnalis);
        data.append("deskripsi_jurnalis", this.deskripsi_jurnalis);
        this.isLoading = true;
        const result = await berita.update(this.id, data);
        if (result instanceof Error) {
          throw result;
        }
        this.isLoading = false;
        console.log(result);
        this.getBeritabyId(this.id);
        this.alert = true;
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
    async getBeritabyId(id) {
      try {
        this.isLoading = true;
        const result = await berita.get(id);
        if (result instanceof Error) {
          throw result;
        }
        this.isLoading = false;
        console.log(result.data);
        if (result.data.url_gambar) {
          this.urlTemp = BASE_URL + `/` + result.data.url_gambar;
          this.url_gambar = await this.getImageObj(this.urlTemp);
          this.url_gambar_ori = result.data.url_gambar;
          console.log(this.url_gambar);
        }
        this.id = result.data.id_berita;
        this.judul = result.data.judul;
        this.jurnalis = result.data.jurnalis;
        this.deskripsi_jurnalis = result.data.deskripsi_jurnalis;
        this.kategori_berita = result.data.kategori_berita;
        this.artikel = result.data.artikel;
      } catch (error) {
        console.log(error);
      }
    },
    async getImageObj(ImageUrl) {
      try {
        const path = require("path");
        const result = await fetch(ImageUrl);
        if (result instanceof Error) throw result;
        const blobObj = await result.blob();
        if (blobObj instanceof Error) throw blobObj;
        return new File([blobObj], path.basename(ImageUrl), {
          type: blobObj.type,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    alert: function (val) {
      if (val) {
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    },
    url_gambar: function (val) {
      if (val instanceof File) {
        this.imgRules = [
          (v) =>
            v.type === "image/png" ||
            v.type === "image/jpg" ||
            v.type === "image/jpeg" ||
            "Gambar harus bertipe *.jpg, *.jpeg, atau *.png",
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