<template>
    <v-container d-block>
        <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
            <v-row align-center :class="!isMobile? 'justify-center mx-auto': 'd-flex justify-left mx-1' ">
                <v-col :class="isMobile? 'link-mobile' : 'link'">
                <a class="link-color mt-n2" @click="$router.push({ name: 'recent-result', query: {q: key} }); currentView='ByRecent'">Terbaru</a>
                <a @click="currentView='ByMostLikes'; $router.push({ name: 'mostlikes-result', query: {q: key} })" class="mx-4 link link-color mt-n2">Paling Disukai</a>
                </v-col>
                <v-col cols="12">
                   <component :is="currentView" keep-alive></component>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
const ByRecent = () => import("./ByRecent");
const ByMostLikes = () => import("./ByMostLikes");
export default {
    components: { 
        ByRecent, ByMostLikes 
    },
    data() {
        return {
            isError: false,
            errorMessage: "",
            recentLoading: false,
            mostLikedLoading: false,
            currentView: 'ByRecent',
            key: this.$route.query.q,
        }
    },
    watch:{
        '$route' : function(){
            this.key = this.$route.query.q;
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
.link {
    margin-bottom: 0;
    text-align: center;
}

.link-mobile {
    margin-bottom: 0;
    color: black;
    margin: 0px;
}

.link-color {
    color: black;
}
</style>