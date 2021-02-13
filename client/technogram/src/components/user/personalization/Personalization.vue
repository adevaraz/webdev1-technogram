<template>
  <v-container :style="{background : currentTheme.background }">
    <v-row :class="isMobile ? 'content-mobile' : 'content'">
      <v-col md="12" offset-md="12" align="center">
        <h1 
          class="playfair-font"
          :style="{ color: currentTheme.onBackground }"
        >
          Kategori mana yang suka Anda baca?
        </h1>
      </v-col>

      <v-btn-toggle
        align="center"
        v-model="toggleButton"
        multiple
        class="toggle"
        :style="{background : currentTheme.background }"
      >
        <v-col class="column" md="6" offset-md="3">
          <v-btn
            class="button"
            color="secondary"
            v-for="item in kategori"
            :key="item.nama_kategori"
            elevation="4"
            rounded
          >
            {{ item.nama_kategori }}
          </v-btn>
        </v-col>
      </v-btn-toggle>

      <v-col md="12" offset-md="12" align="center">
        <v-btn color="#E52B38" class="submit" rounded @click="AddPersonalize">
          Selesai
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "../../../store/index";
import personalize from "../../../repository/interactor/personalization/personalization.js";
import { mapGetters } from "vuex";
export default {
  metaInfo: {
    title: "Personalisasi",
    htmlAttrs: {
      lang: "id",
    },
  },
  data: () => ({
    isLoading: false,
    kategori: [],
    toggleButton: undefined,
    kategoriFix: [],
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
    }),
  },
  methods: {
    async AddPersonalize() {
      var i = 0;
      var result = true;

      while (i < this.toggleButton.length && result) {
        this.kategoriFix[i] = this.kategori[this.toggleButton[i]].id_kategori;
        result = personalize.addPersonalize(
          this.kategoriFix[i],
          store.getters["user/getToken"]
        );
        i++;
      }

      if (result instanceof Error) {
        this.error.message = result.cause;
      } else {
        this.$router.push({ path: "/" });
      }
    },
    async retrieveKategori() {
      try {
        const kategoriResult = await personalize.retrieveAll();
        if (kategoriResult instanceof Error) {
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.kategori.push(element);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveKategori();
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");

.playfair-font {
  font-family: "Playfair Display", serif;
}

.content {
  padding-top: 5rem;
}
.content-mobile {
  justify-content: center;
}
.progress-bar {
  z-index: 500;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: transform(-50%, -50%);
}
.button {
  margin: 20px;
}
.toggle {
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}
.category {
  margin-top: 2rem;
}

.submit {
  color: white;
}

.column {
  margin: 0px;
}

.container {
  padding: 5 rem;
}
</style>