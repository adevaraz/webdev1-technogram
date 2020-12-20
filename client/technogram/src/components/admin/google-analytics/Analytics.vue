<template>
    <v-container>
        <v-card class="pa-5">
            <h3 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Sessions in the last 30 days</h3>
            <div id="sessions-chart"></div>
        </v-card>
        <v-card class="pa-5">
            <h3 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Top 10 Most Visited Pages in the last 30 days</h3>
            <div id="mostVisitedPage-chart"></div>
        </v-card>
        <v-card class="pa-5">
            <h3 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Unique users from different countries in the last 90 days</h3>
            <div id="location-chart"></div>
        </v-card>
        <v-card class="pa-5">
            <h3 style=" margin-bottom:20px ; font-family:'Playfair Display' ">Browser used in the last 30 days</h3>
            <div id="browser-chart"></div>
        </v-card>
        <v-overlay :value="isLoading">
            <v-progress-circular indeterminate size="64" color="#E52B38"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import Auth from "../../../api/admin/auth";
export default {
    data: () => ({
        isLoading: false,
    }),
    methods: {
        async createDashboard(){
            const gapi = window.gapi;
            this.isLoading = true;
            const accessTokenGA = await Auth.getAccessTokenGA();
            await gapi.analytics.ready(function() {
                gapi.analytics.auth.authorize({
                    'serverAuth': {
                        'access_token': accessTokenGA
                    }
                });


                var sessionsChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234635847',
                        metrics: 'ga:sessions',
                        dimensions: 'ga:date',
                        'start-date': '30daysAgo',
                        'end-date': 'yesterday'
                    },
                    chart: {
                        container: 'sessions-chart',
                        type: 'LINE',
                        options: {
                            width: '100%'
                        }
                    }
                });

                var mostVisitedPageChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234635847',
                        'start-date': '30daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:bounces,ga:entrances,ga:exits',
                        'sort': '-ga:pageviews',
                        'dimensions': 'ga:pagePath',
                        'max-results': 10
                    },
                    chart: {
                        'container': 'mostVisitedPage-chart',
                        'type': 'PIE',
                        'options': {
                            'width': '50%',
                            'pieHole': 0.4,
                        }
                    }
                });

                var locationChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234635847',
                        'start-date': '90daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:users',
                        'sort': '-ga:users',
                        'dimensions': 'ga:country',
                    },
                    chart: {
                        'container': 'location-chart',
                        'type': 'GEO',
                        'options': {
                            'width' : '100%',
                            // 'region' : 'US',
                            // 'domain' : 'ID',
                            // 'magnifyingGlass' : {enable: true, zoomFactor: 7.5}
                            // enableRegionInteractivity : true
                            // region : 'ID',
                            // resolution : 'provinces',
                            // displayMode: 'markers'
                        }
                    }
                });

                var browserChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        'ids': 'ga:234635847',
                        'start-date': '30daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:sessions',
                        'sort': '-ga:sessions',
                        'dimensions': 'ga:browser',
                    },
                    chart: {
                        'container': 'browser-chart',
                        'type': 'TABLE',
                        'options': {
                            'width' : '100%',
                            // 'region' : 'US',
                            // 'domain' : 'ID',
                            // 'magnifyingGlass' : {enable: true, zoomFactor: 7.5}
                            // enableRegionInteractivity : true
                            // region : 'ID',
                            // resolution : 'provinces',
                            // displayMode: 'markers'
                        }
                    }
                });

                sessionsChart.execute();
                mostVisitedPageChart.execute();
                locationChart.execute();
                browserChart.execute();
            })
            setTimeout(this.stopLoading,1500);
        },
        stopLoading(){
            this.isLoading = false;
        }
    },
    mounted(){
        this.createDashboard();
    }
};
</script>