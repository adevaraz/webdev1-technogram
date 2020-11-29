<template>
    <v-container d-block>
        <v-row class="d-flex justify-center mx-auto link" align-center>
            <a @click="$router.push({ name: 'recent-result', query: {q: key} })" class="mx-4 link">Recent</a>
            <a @click="$router.push({ name: 'mostlikes-result', query: {q: key} })" class="mx-4 link">Most likes</a>
            <!--a @click="$router.push({ name: 'recent-result' })" class="mx-4 link">Recent</a>
            <a @click="$router.push({ name: 'mostlikes-result' })" class="mx-4 link">Most likes</a-->
        </v-row>
        <v-row>
            <component :is="currentView" keep-alive></component>
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
    }
}
</script>

<style scoped>
.link {
    margin-bottom: 0;
    text-align: center;
    color: black;
}

.link:active {
    text-decoration: underline;
}
</style>