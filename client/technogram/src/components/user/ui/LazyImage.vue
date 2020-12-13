<template>
  <div :class="imageParentClass">
    <div :class="imageClass" :style="background">
      <v-progress-circular
        class="progressbar"
        v-if="isImageLoading"
        color="#E52B38"
        height="10"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    if (this.src !== "") {
      this.loadImagelazliy();
    }
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    placeHolderColor: {
      type: String,
      default: "#eeeeee",
    },
    zoomEffect: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    shouldZoom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      backgroundImage: null,
      isImageLoading: false,
      isError: false,
    };
  },
  computed: {
    background() {
      if (this.isError) {
        return `background-image: url('https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png')`;
      }
      if (this.backgroundImage == null) {
        return `background:${this.placeHolderColor}`;
      }
      return `background-image: url('${this.backgroundImage}')`;
    },
    imageClass() {
      let basicClass = "img-container";
      if (this.zoomEffect) {
        basicClass = basicClass + " zoom-image";
      }
      if (this.shouldZoom) {
        basicClass = basicClass + " zoom-in-manual";
      } else {
        basicClass = basicClass + " zoom-out-manual";
      }
      return basicClass;
    },
    imageParentClass() {
      if (this.zoomEffect) {
        return "img-container-parent zoom-container";
      }
      return "img-container-parent";
    },
  },
  watch: {
    src(_) {
      _;
      this.loadImagelazliy();
    },
  },
  methods: {
    loadImagelazliy() {
      if (this.src !== "") {
        const lazyImage = new Image();
        lazyImage.onload = () => {
          console.log("loaded");
          this.isImageLoading = false;
          this.backgroundImage = this.src;
        };
        lazyImage.onerror = (_) => {
          _;
          this.isImageLoading = false;
          this.isError = true;
        };
        if (this.isLoading) {
          this.isImageLoading = true;
        }
        lazyImage.src = this.src;
      }
    },
  },
};
</script>
<style scoped>
.img-container-parent {
  width: 100%;
  height: 100%;
}

.zoom-container {
  overflow: hidden;
}

.img-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  position: relative;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.zoom-image {
  transition: transform 0.5s ease-out;
}

.zoom-image:hover,
.zoom-image:focus {
  transform: scale(1.2);
}

.zoom-in-manual {
  transform: scale(1.2);
}

.zoom-out-manual {
  transform: scale(1);
}

.progressbar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>