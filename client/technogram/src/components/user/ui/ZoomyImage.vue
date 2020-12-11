<template>
  <div class="img-container-parent">
    <div class="img-container error-image" :style="background" style="background-image: url('~@/assets/error-image-generic.png')">
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
  },
  data() {
    return {
      backgroundImage: null,
      isImageLoading : false,
      isError : false
    };
  },
  computed: {
    background() {
      if (this.backgroundImage == null) {
        return `background:${this.placeHolderColor}`;
      }
      if(this.isError){
          return `background-image: url('~@/assets/error-image-generic.png')`; 
      }
      return `background-image: url('${this.backgroundImage}')`;
    },
  },
  methods: {
    loadImagelazliy() {
      console.log(this.src);
      if (this.src !== "") {
        console.log("loading image");
        const lazyImage = new Image();
        lazyImage.onload = () => {
          this.isImageLoading = false;
          this.backgroundImage = this.src;
        };
        lazyImage.onerror = _ => {
            _;
            this.isImageLoading = false;
            this.isError = true;
        };
        if(this.isLoading){
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

.img-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.5s ease-out;
}

.img-container:hover,
.img-container:focus {
  transform: scale(1.2);
}

.progressbar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}
</style>