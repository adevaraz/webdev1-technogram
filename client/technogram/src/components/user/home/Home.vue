<template>
    <v-container>
        <v-row class="pa-md-10 pa-xl-10 pa-lg-10 pa-xs-3 pa-sm-3" >
            <v-col cols="12">
                <h1 class="playfair-font">Popular News</h1>
            </v-col>
            <v-col cols="12" lg="5" md="5" xl="5" sm="12" xs="12" class="popular-container"> 
                <headline-berita class="item"></headline-berita>
            </v-col>
            <v-col cols="12" lg="7" md="7" xl="7" sm="12"  class="popular-container">
                <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6"  sm="12"  v-for="index in 6" :key="index" class="pt-0"> 
                        <small-berita class="item"></small-berita>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <div class="middle-border">
                </div>
            </v-col>
            <v-col cols="12">
                <h1 class="playfair-font text-center">Recent News</h1>
            </v-col>
            <v-col cols="12">
                <v-row class="justify-center">
                   <v-col cols="10" v-for="index in 6" :key="index" class="pt-0"> 
                        <preview-berita></preview-berita>
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
export default {
    components : {
        HeadlineBerita,
        SmallBerita,
        PreviewBerita
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap');
.playfair-font{
    font-family: 'Playfair Display', serif;
}

.middle-border{
    background: rgb(112,112,112,0.56);
    width: 100%;
    height: 2px;
}

.item{
    cursor: pointer;
}

</style>