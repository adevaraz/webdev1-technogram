<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" class="cols-container img-container" :style="backgroundImg">
        <v-progress-circular class="progressbar" v-if="isLoading" color="#E52B38" height="10" indeterminate></v-progress-circular>
      </v-col>
      <div v-if="berita !== null">
        <v-col cols="12" class="cols-container">
          <h2 class="playfair-font news-tittle">{{ berita.judul || "" }}</h2>
        </v-col>
        <v-col cols="12">
          <v-row class="align-center" align-self="end">
            <v-col cols="6" class="cols-container">
              <p class="worksans-font news-writer">by {{ berita.jurnalis || "" }}</p>
            </v-col>
            <v-col cols="6" class="cols-container pt-1">
              <p class="worksans-font news-time text-end">{{ date || "" }}</p>
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    berita: {
      type: Object,
      default() {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    backgroundImg() {
      if (this.berita !== null) {
        console.log('ayo UBAH GAMBAR');
        console.log(this.berita.url_gambar);
        return `background-image: url('${this.berita.url_gambar}')`;
      }
      return "";
    },
    date() {
      //Format : 'Friday, 09/10/2020 15:49'
      const fullDate = new Date(this.berita.waktu_publikasi);
      const day = fullDate.toString().split(" ")[0];
      const date = fullDate.toLocaleDateString();
      const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return `${day} ${date} ${time}`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.playfair-font {
  font-family: "Playfair Display", serif;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.img-container {
  background: #eeeeee;
  background-size: cover;
  background-position: center;
  height: 18rem;
  position: relative;
  width: 100%;
}

.progressbar {
  position: absolute;
  left: 50%;
  transform: translate(-50% , -50%);
  top: 50%;
}

.cols-container {
  padding: 0;
}

.news-tittle {
  font-weight: 600;
}

.news-writer {
  font-weight: 500;
}

.news-time {
  font-size: 0.8rem;
  font-weight: 400;
}

@media screen and (max-width: 400px) {
  .img-container {
    height: 12rem;
  }
}

@media screen and (min-width: 800px) and (max-width: 1264px) {
  .img-container {
    height: 26rem;
  }
}
</style>
