<template>
  <v-container @mouseover="onHover" @mouseleave="onLeave">
    <v-row @click="onBeritaSelected(berita.id_berita)">
      <v-col class="pa-0" cols="4">
        <div class="img-container">
          <lazy-image
            class="img-content"
            :src="berita.url_gambar"
            :zoomEffect="true"
            :shouldZoom="isOnHover"
            :title="berita.judul"
          ></lazy-image>
        </div>
      </v-col>
      <v-col class="pa-0" cols="7" offset="1" align-self="start">
        <v-row class="justify-start">
          <v-col cols="11" class="pa-0 ma-0">
            <h2
              class="playfair-font news-title clickable-text"
              :class="onHoverClass"
            >
              {{ berita.judul || "" }}
            </h2>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0 mt-2">
            <h4 class="work-sans news-writer">
              oleh {{ berita.jurnalis || "" }}
            </h4>
          </v-col>
          <v-col cols="11" class="pa-0 ma-0" v-if="!showTime">
            <h4 class="work-sans news-time">{{ date }}</h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const LazyImage = () => import("../ui/LazyImage.vue");
const TIME_MODE_RECENT = "TIME_MODE_RECENT";
const TIME_MODE_DETAIL = "TIME_MODE_DETAIL";

const processDate = (fulldate, timeMode) => {
  if (timeMode === TIME_MODE_RECENT) {
    return getTimeDifference(fulldate);
  }
  return getDateDetail(fulldate);
};

// Return 10 minutes ago , 59 minutes ago , 1 hours ago
const getTimeDifference = (fullDate) => {
  const oldDate = fullDate;
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate - oldDate);
  const secondDifference = Math.floor(timeDifference / 1000);
  let timeType = "";
  let timeNumber = "";
  switch (true) {
    // If time difference under one minutes
    case secondDifference < 60:
      timeType = "seconds";
      timeNumber = secondDifference;
      break;
    // If time difference under 1 hours
    case secondDifference < 60 * 60:
      timeType = "minutes";
      timeNumber = Math.floor(secondDifference / 60);
      break;
    // if time difference under 1 day
    case secondDifference < 60 * 60 * 24:
      timeType = "hours";
      timeNumber = Math.floor(secondDifference / (60 * 60));
      break;

    case secondDifference < 60 * 60 * 24 * 7:
      timeType = "days";
      timeNumber = Math.floor(secondDifference / (60 * 60 * 24));
      break;
    case secondDifference < 60 * 60 * 24 * 7 * 30:
      timeType = "weeks";
      timeNumber = Math.floor(secondDifference / (60 * 60 * 24 * 7));
      break;
    default:
      timeType = "months";
      timeNumber = Math.floor(secondDifference / (60 * 60 * 24 * 7 * 30));
      break;
  }
  const finalString = `${timeNumber} ${timeType} ago`;
  return finalString;
};

//return detail time with Format : 'Friday, 09/10/2020 15:49'
const getDateDetail = (fullDate) => {
  const day = fullDate.toString().split(" ")[0];
  const date = fullDate.toLocaleDateString();
  const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
  return `${day} ${date} ${time}`;
};

export default {
  components: { LazyImage },
  props: {
    showTime: {
      type: Boolean,
      default: false,
    },
    berita: {
      type: Object,
      default() {
        return TIME_MODE_DETAIL;
      },
    },
    timeMode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOnHover: false,
    };
  },
  methods: {
    onHover() {
      this.isOnHover = true;
    },
    onLeave() {
      this.isOnHover = false;
    },
    onBeritaSelected(id) {
      // this.$router
      //   .push({
      //     name: "read-berita",
      //     params: { id: `${id}` },
      //   })
      //   .catch((err) => {
      //     err;
      //   });
       window.open(`/berita/${id}`, "_blank"); 
    },
  },
  computed: {
    date() {
      return processDate(new Date(this.berita.waktu_publikasi), this.timeMode);
    },
    onHoverClass() {
      if (this.isOnHover) {
        return "hover";
      }
      return "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
/* .playfair-font {
  font-family: "Playfair Display", serif;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
} */

.img-container {
  width: 100%;
  position: relative;
}

.img-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.img-content {
  position: absolute;
}

.news-title {
  font-size: 1rem;
  font-weight: 600;
}

.news-writer {
  font-weight: 400;
  font-size: 0.8rem;
}

.news-time {
  font-weight: 400;
  font-size: 0.7rem;
}

.clickable-text:hover,
.clickable-text:focus {
  cursor: pointer;
  color: #e52b38;
}

.clickable-toogle {
  color: #e52b38;
}

.hover {
  color: rgb(229, 43, 56, 0.9);
}
</style>