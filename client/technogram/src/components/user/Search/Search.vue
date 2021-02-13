<template>
    <v-dialog v-model="dialog">
        <v-card max-height="1080px" :style="{background : currentTheme.backgroundVariant}">
            <v-card-title></v-card-title>
            <v-card-text>
                <v-container d-block>
                <div class="d-flex flex-row-reverse cross-icon">
                    <img
                        v-if="isDark"
                        class="cross-icon"
                        @click="onDialogClosed"
                        src="../../../assets/icons/cross-w.svg"
                    />
                    <img
                        v-else
                        class="cross-icon"
                        @click="onDialogClosed"
                        src="../../../assets/icons/cross.svg"
                    />
                </div>
                <div class="d-flex flex-row search" align-center>
                    <v-text-field
                        v-if="isDark"
                        dark
                        color= "#e52b38"
                        v-model="key"
                        placeholder="Masukkan kata kunci..."
                        prepend-inner-icon="mdi-magnify"
                        v-on:keydown.enter="
                            $router.push({
                                name: 'recent-result',
                                query: { q: key },
                            });
                            dialog = false;
                        "
                    >
                    </v-text-field>
                    <v-text-field
                        v-else
                        color= "#e52b38"
                        v-model="key"
                        placeholder="Masukkan kata kunci..."
                        prepend-inner-icon="mdi-magnify"
                        v-on:keydown.enter="
                            $router.push({
                                name: 'recent-result',
                                query: { q: key },
                            });
                            dialog = false;
                        "
                    >
                    </v-text-field>
                </div>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        onDialogClosed : Function
    },
    data: () => ({
        dialog: true,
        key : ''
    }),
    methods: {
    },
    computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark : "theme/getIsDark"
    }),
  }
}
</script>

<style scoped>
.cross-icon {
  margin-top: 0px;
  height: 24px;
  max-height: 24px;
  margin-right: 15px;
  margin-bottom: 100px;
  cursor: pointer;
}

.search {
  margin-right: 200px;
  margin-left: 200px;
  height: 36px;
  max-height: 36px;
}

.v-card {
    padding-top: 50px;
    padding-bottom: 140px;
}

.v-text-field {
  width: 200px;
}
</style> 