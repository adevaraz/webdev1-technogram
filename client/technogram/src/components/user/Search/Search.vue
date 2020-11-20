<template>
    <v-container>
        <div class="d-flex flex-row-reverse">
            <img class="cross-icon" src='../../../assets/icons/cross.png'>
        </div>
        <div class="d-flex flex-row" align-center>
            <img class="search-icon" src='../../../assets/icons/search-icon.png'>
            <v-text-field 
                v-model="key"
                placeholder="Enter keyword here..."
                v-on:keydown.enter="searchBerita"
                :to="'/search'"
            >
            </v-text-field>
        </div>
    </v-container>
</template>

<script>
</script>

<style scoped>
.v-text-field {
    width: 200px;
    min-height: 40px;
    font-size: 24px;
    margin-top: 230px;
    margin-right: 200px;
    line-height: 20px;
}
.cross-icon {
    margin-top: 20px;
    height: 24px;
    max-height: 24px;
}
.search-icon {
    margin-top: 240px;
    margin-right: 15px;
    margin-left: 200px;
    height: 36px;
    max-height: 36px;
}

</style>