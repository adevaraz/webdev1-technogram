<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Technogram",
    // all titles will be injected into this template
    titleTemplate: "%s | Technogram",
    meta: [
      { charset: "utf-8" },
      {
        vmid: "description",
        name: "description",
        content:
          "Technogram adalah website berita yang memuat konten seputar teknologi terkini.",
      },
    ],
    htmlAttrs: {
      lang: "id",
    },
  },
};
</script>

<style>
#nprogress .bar {
  background: #e52b38 !important;
}
</style>

