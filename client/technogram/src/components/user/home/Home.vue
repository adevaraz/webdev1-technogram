<template>
    <v-container>
        <v-row class="pa-md-10 pa-xl-10 pa-lg-10 pa-xs-3 pa-sm-3" >
            <v-col cols="12">
                <h1 :class="!isMobile? 'playfair-font text-start' : 'playfair-font text-center'" >Popular News</h1>
            </v-col>
            <v-col cols="12" lg="5" md="12" xl="5" sm="12" xs="12"> 
                <headline-berita class="item"></headline-berita>
            </v-col>
            <v-col cols="12" v-if="isMobile" class="mt-n6">
                <div class="middle-border">
                </div>
            </v-col>            
            <v-col cols="12" lg="6" offset-lg="1" md="12"  xl="6" offset-xl="1" sm="12">
                <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6" xl="6"  v-for="index in 6" :key="index" class="pt-0"> 
                        <small-berita class="item" :showTime="isMobile"></small-berita>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" v-if="!isMobile">
                <div class="middle-border">
                </div>
            </v-col>
            <v-col cols="12" :class="isMobile? 'mt-n3 mb-n5' : ''">
                <h1 :class="isMobile? 'playfair-font text-start' : 'playfair-font text-center'">Recent News</h1>
            </v-col>
            <v-col cols="12" v-if="isMobile">
                <div class="middle-border">
                </div>
            </v-col>            
            <v-col cols="12">
                <v-row :class="isMobile? 'pa-0' : 'justify-center'" >
                   <v-col :cols="isMobile? '12' : '10' " class="mt-n2"  v-for="index in 6" :key="index"> 
                        <preview-berita v-if="!isMobile"></preview-berita>
                        <mobile-preview-berita  v-else ></mobile-preview-berita >
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HeadlineBerita from '../berita/HeadlineBerita.vue'
import SmallBerita from '../berita/SmallBerita.vue'
import PreviewBerita from '../berita/PreviewBerita.vue'
import MobilePreviewBerita from '../berita/MobilePreviewBerita.vue'
export default {
    components : {
        HeadlineBerita,
        SmallBerita,
        PreviewBerita,
        MobilePreviewBerita
    },
    computed : {
        isMobile() {
            if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
                return true;
            }
            return false;
        }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap');
.playfair-font{
    font-family: 'Playfair Display', serif;
}

.middle-border{
    background: rgb(112,112,112,0.3);
    width: 100%;
    height: 2px;
}

.item{
    cursor: pointer;
}

</style>