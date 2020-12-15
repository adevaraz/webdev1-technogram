<template>
    <v-container
     fluid
     class="pa-0"
    >
        <v-row class="full-height">
            <v-col cols="3" class="pa-0">
                <navbar></navbar>
            </v-col>
            <v-col cols="9">
                <div id="chart1-container"></div>
                <div id="chart2-container"></div>
                <div id="view-selector-container"></div>
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Navbar from './ui/Navbar.vue';
import {store} from '../../store/index';
import Auth from "../../api/admin/auth";
// import Http2 from 'http2';
// import {google} from 'googleapis';
export default {
    components: {
        "navbar" : Navbar,
    },
    async beforeRouteEnter (to, from, next) {

        //Check if access token ready in vuex
        if(!store.getters['admin/isTokenExist']){
            //Try to get access token
            await store.dispatch("admin/getNewToken")
            const isTokenExist = store.getters['admin/isTokenExist']
            if(!isTokenExist){
                console.log('not authorized');
                next('/admin/signin')
            }
        }
        next();
    },
    methods: {
        
        createDashboard(){
            const gapi = window.gapi;
            // var dataChart1 = gapi.analytics.googleCharts.DataChart({
            //     query: {
            //         'ids': 'ga:234371993', // <-- Replace with the ids value for your view.
            //         'start-date': '90daysAgo',
            //         'end-date': 'today',
            //         'metrics': 'ga:sessions',
            //         'dimensions': 'ga:date'
            //     },
            //     chart: {
            //         'container': 'chart-1-container',
            //         'type': 'LINE',
            //         'options': {
            //             'width': '100%'
            //         }
            //     }
            // });
            Auth.getAccessTokenGA().then(function (response) {
                gapi.analytics.ready(function() {

                /**
                 * Authorize the user immediately if the user has already granted access.
                 * If no access has been created, render an authorize button inside the
                 * element with the ID "embed-api-auth-container".
                 */
                gapi.analytics.auth.authorize({
                    'serverAuth': {
                        'access_token': response
                    }
                });


                /**
                 * Create a new ViewSelector instance to be rendered inside of an
                 * element with the id "view-selector-container".
                 */
                var viewSelector = new gapi.analytics.ViewSelector({
                    container: 'view-selector-container'
                });

                // Render the view selector to the page.
                viewSelector.execute();


                /**
                 * Create a new DataChart instance with the given query parameters
                 * and Google chart options. It will be rendered inside an element
                 * with the id "chart-container".
                 */
                var dataChart1 = new gapi.analytics.googleCharts.DataChart({
                    query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:date',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday'
                    },
                    chart: {
                    container: 'chart1-container',
                    type: 'LINE',
                    options: {
                        width: '100%'
                    }
                    }
                });

                var dataChart2 = new gapi.analytics.googleCharts.DataChart({
                    query: {
                    'start-date': '90daysAgo',
                    'end-date': 'today',
                    'metrics': 'ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:bounces,ga:entrances,ga:exits',
                    'sort': '-ga:pageviews',
                    'dimensions': 'ga:pagePath',
                    'max-results': 10
                    },
                    chart: {
                    'container': 'chart2-container',
                    'type': 'PIE',
                    'options': {
                        'width': '100%',
                        'pieHole': 0.4,
                    }
                    }
                });


                /**
                 * Render the dataChart on the page whenever a new view is selected.
                 */
                viewSelector.on('change', function(ids) {
                    dataChart1.set({query: {ids: ids}}).execute();
                    dataChart2.set({query: {ids: ids}}).execute();
                });

                });
                // const result = gapi.analytics.data.ga.get({
                //     'auth': response,
                //     'ids': 'ga:234371993',
                //     'start-date': '30daysAgo',
                //     'end-date': 'today',
                //     'metrics': 'ga:pageviews'
                // })

                // console.dir(result);
                // dataChart1.execute();
            });


        }
    },
    mounted(){
        this.createDashboard();
    }
};
</script>

<style>
.full-height {
    height: 100vh;
}
</style>