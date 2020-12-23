<template>
  <v-dialog v-model="dialog" :width="!isMobile? '400': '250'" >
    <v-card  height="360">
      <v-container>
        <div id="content">
          <div class="d-flex flex-row-reverse cross-icon">
            <img
              :class="!isMobile? 'cross-icon': 'img-btn'"
              @click="onDialogClosed"
              src="../../../assets/icons/cross.png"/>
          </div>
          <v-list>
            <v-btn v-if="!isMobile"
              color="#E52B38"
              class="ma-2 white--text"
              @click="onClickCopyBtn"
              width="250px">
                <img class="img-btn mr-2" src="../../../assets/icons/link.png" />
                Copy Link
            </v-btn>
            <v-btn v-else
              color="#E52B38"
              class="ma-2 white--text"
              @click="onClickCopyBtn"
              width="200px"
              small>
              <img class="img-btn-small mr-2" src="../../../assets/icons/link.png" />
                Copy Link
            </v-btn>
            <v-btn
              v-if="!isMobile"
              color="#1DA1F2"
              class="ma-2 white--text share-component ml-2"
              :href="href_tw"
              data-size="large" 
              data-show-count="false" 
              target="_blank"
              charset="utf-8"
              width="250px">
                <img class="img-btn mr-2" src="../../../assets/icons/twitter.png" />
                Share on Twitter
            </v-btn>
            <v-btn
              v-else
              color="#1DA1F2"
              class="ma-2 white--text share-component ml-2"
              :href="href_tw"
              data-size="large" 
              data-show-count="false" 
              target="_blank"
              charset="utf-8"
              width="200px"
              small>
                <img class="img-btn-small mr-2" src="../../../assets/icons/twitter.png" />
                Share on Twitter
            </v-btn>
            <v-btn
              v-if="!isMobile"
              color="#3b5998"
              class="ma-2 white--text fb-xfbml-parse-ignore share-component ml-2"
              data-href="https://developers.facebook.com/docs/plugins/" 
              data-layout="button_count" data-size="small"
              target="_blank" 
              :href="href_fb"
              width="250px">
                <img class="img-btn mr-2" src="../../../assets/icons/facebook.png" />
                Share on Facebook 
            </v-btn>
            <v-btn
              v-else
              color="#3b5998"
              class="ma-2 white--text fb-xfbml-parse-ignore share-component ml-2"
              data-href="https://developers.facebook.com/docs/plugins/" 
              data-layout="button_count" data-size="small"
              target="_blank" 
              :href="href_fb"
              width="200px"
              small>
                <img class="img-btn-small mr-2" src="../../../assets/icons/facebook.png" />
                Share on Facebook 
            </v-btn>
            <v-list-item-content :class="!isMobile? 'pt-2 pb-0 ml-15': 'pt-2 pb-0 ml-1'" align="center">
              <v-alert
                :value="alert"
                transition="slide-y-transition"
                dense
                text
                type="success"
                max-width="250px"
                small
              >
                Link copied to clipboard
              </v-alert>
            </v-list-item-content>
          </v-list>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  src:"https://platform.twitter.com/widgets.js",
  created() {
    this.getUrl();
    this.setUrl();
  },
  props : {
    judul_berita : {
      type : String,
      default(){
        return {}
      }
    },
    onDialogClosed : Function
  },

  data: () => ({
    url: "",
    alert: false,
    href_tw: "",
    href_fb: "",
    dialog: true,
    copySucceeded: null,
  }),

  methods: {
    getUrl() {
      this.url = window.location.href;
    },
    setUrl() {
      this.href_tw = "https://twitter.com/intent/tweet?text=" + this.judul_berita + "&url=" + this.url
      this.href_fb = "https://www.facebook.com/sharer.php?u=" + this.url + "&quote=" + this.judul_berita
    },
    onClickCopyBtn() {
      navigator.clipboard.writeText(this.url);
      this.alert = true;
      window.setInterval(() => {
        this.alert = false;
      }, 3000)
    }
  },
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      }
      return false;
    },
  },
}
</script>

<style scoped>
.notification-header {
  border-bottom: 1px solid #d9d9d9;
}
.item {
  cursor: pointer;
}
.more {
  cursor: pointer;
  border-top: 1px solid #eeeeee;
}
.more:hover {
  background: rgb(214, 214, 214);
}

#content {
  text-align: center;
}

.cross-icon {
  margin-top: 10px;
  height: 24px;
  max-height: 24px;
  margin-right: 15px;
  margin-bottom: 60px;
  cursor: pointer;
}

.v-card {
    height: 500px;
}

.share-component {
  text-decoration: none;
  color: black;
  margin-top: 0;
  padding-top: 0;
}

.act-item {
  cursor: pointer;
}

.img-btn {
  height: 24px;
  max-height: 24px;
  margin-top: 2px;
}

.img-btn-small {
  height: 16px;
  max-height: 16px;
}
</style>