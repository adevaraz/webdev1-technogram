<template>
  <v-container fluid>
    <v-row class="center-container mt-2">
        <v-col class="pa-0" cols="4">
            <v-row class="justify-center" >
                <v-col cols="5" >
                    <div class="img-container" :style="backgroundImg" :title="berita.judul"></div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="5" class="pa-0 ma-0 mr-4">
                    <v-row class="justify-center right-col" align="center">
                    <v-col cols="3" class="pa-0 ma-0 ">
                        <div class="like-container">
                          <v-col cols="1" class="pa-0 ma-0 mr-4">
                              <img src="../../../assets/icons/heart-filled.svg" />
                          </v-col>
                          <v-col cols="2" class="pa-0 ma-0">
                              <h3 class="work-sans news-likes text-start">{{berita.jumlah_likes}}</h3>
                          </v-col>
                        </div>
                    </v-col>
                    <v-col  cols="8" class="pa-0 ma-0">
                        <h3 class="work-sans news-date text-end">{{date || ''}}</h3>
                    </v-col>
                    </v-row>
                </v-col>
            </v-row>
      </v-col>

      <v-col class="pa-0 mt-1" cols="8" >
        <v-row class="justify ml-4">
          <v-col cols="9" class="pa-0 ma-0">
            <h1 class="news-title">
              {{berita.judul || ''}}
            </h1>
          </v-col>
          <v-col cols="9" class="pa-0 mt-4">
            <h3 class="work-sans news-preview" >
              {{preview}}...
            </h3>
          </v-col>
          <v-col cols="9" class=" ma-0 mt-3">
            <v-row class="justify">
              <v-col cols="6" class="pa-0 ma-0">
                <h3 class="work-sans news-writer text-start">oleh {{berita.jurnalis || ''}}</h3>
              </v-col>
              <v-col cols="6" class="pa-0 mx-auto">
                <h3 class="work-sans news-category">| {{berita.kategori_berita || ''}}</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>     
    </v-row>
    <div class="middle-border"></div>
  </v-container>
</template>

<script>
export default {
  props : {
    berita : {
      type : Object,
      default(){
        return {}
      }
    },
    previewMaxWord : {
      type : Number ,
       default : 120
    }
  },
  computed: {
    backgroundImg() {
      return `background-image: url('${this.berita.url_gambar}')`;
    },
    date(){
      //Format : 'Friday, 09/10/2020 15:49'
      const fullDate = new Date(this.berita.waktu_publikasi);
      const month = fullDate.toString().split(' ')[1];
      const date = fullDate.getDate();
      const year = fullDate.getFullYear();
      return `${month} ${date} ${year}`;
    },
    preview(){
      let rawHtmlArticle = this.berita.artikel;
      const splitRegex = /(<(.*?)>)/g;
      const wordOnlyArticle = rawHtmlArticle.toString().replaceAll(splitRegex , "");
      return wordOnlyArticle.substring(0 , this.previewMaxWord);
     
    }
    
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");

.playfair-font {
  font-family: "Playfair Display", serif;
}

.middle-border {
  background: rgb(112, 112, 112, 0.3);
  width: 55%;
  height: 1px;
  margin-left: 35%;
}
.worksans-font {
  font-family: "Work Sans", sans-serif;
}
.center-container{
    margin-left: auto;
}
.img-container {
  height: 100%;
  width: 150%;
  background: #EEEEEE;
  background-size: cover;
  background-position: center;
  padding-top: 100%;
  margin-left: 10%;
  
}
.news-title {
  font-size: 24px;
  font-weight: 600;
}
.news-preview {
  font-weight: 400;
  font-size: 14px;
  color: #898788;
}
.news-writer {
  font-weight: 1000;
  font-size: 12px;
}
.news-time {
  font-weight: 400;
  font-size: 1rem;
}
.news-category {
  font-weight: 400;
  font-size: 12px;
  color: #e52b38;
}
.right-col img {
  width: 10px;
  height: 10px;
}
.like-container{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 105%;
}
.news-likes{
   font-weight: 400;
  font-size: 0.8rem;
  color: #e52b38;
   
}
.news-date{
   font-weight: 400;
  font-size: 0.8rem;
  color: #898788;
     
}
.left-container{
    border-bottom: 0.5px solid #bab4b8b9;
}
</style>