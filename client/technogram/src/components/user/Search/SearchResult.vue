<template>
    <v-container d-block>
        <v-row class="pa-xs-3 pa-sm-3 px-md-10 px-xl-10 px-lg-10">
            <v-row align-center :class="!isMobile? 'd-flex justify-center  mx-auto': 'd-flex justify-left  ml-8' ">
                <a :class="isMobile? 'ml-n2 link-mobile' : 'mx-4 link'" @click="$router.push({ name: 'recent-result', query: {q: key} }); currentView='ByRecent'">Recent</a>
                <a :class="isMobile? 'ml-n2 link-mobile' : 'mx-4 link'" @click="currentView='ByMostLikes'; $router.push({ name: 'mostlikes-result', query: {q: key} })" class="mx-4 link">Most likes</a>
                <component :is="currentView" keep-alive></component>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
import ByRecent from './ByRecent';
import ByMostLikes from './ByMostLikes';

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
    color: black;
}

.link-mobile {
    margin-bottom: 0;
    color: black;
    margin: 20px;
}

.link:active {
    text-decoration: underline;
}
</style>