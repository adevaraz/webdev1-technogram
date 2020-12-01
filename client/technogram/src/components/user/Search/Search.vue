<template>
    <v-container d-block>
        <div class="d-flex flex-row-reverse">
            <img class="cross-icon" @click="$router.go(-1)" src='../../../assets/icons/cross.png'>
        </div>
        <div class="d-flex flex-row" align-center>
            <img class="search-icon" @click="$router.push({ name: 'recent-result', query: {q: key} })" src='../../../assets/icons/search-icon.png'>
            <v-text-field 
                v-model="key"
                placeholder="Enter keyword here..."
                v-on:keydown.enter="$router.push({ name: 'recent-result', query: {q: key} })"
            >
            </v-text-field>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
             key: '',
        }
    }
}
</script>

<style scoped>
.v-text-field {
    width: 100px;
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
    margin-right: 15px;
    cursor: pointer;
}
.search-icon {
    margin-top: 240px;
    margin-right: 15px;
    margin-left: 200px;
    height: 36px;
    max-height: 36px;
}

</style>