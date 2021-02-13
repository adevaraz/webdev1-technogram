<template>
    <v-container>
        <notification-detail-recycler  style="width:100%;" :style="{background : currentTheme.background}"></notification-detail-recycler>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
const NotificationDetailRecycler = () => import("./NotificationDetailRecycler.vue");

export default {
  components: {
      NotificationDetailRecycler
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
    }),
  }
};
</script>