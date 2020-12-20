<template>
    <v-container>
        <notification-detail-recycler  style="width:100%;"></notification-detail-recycler>
    </v-container>
</template>

<script>

const NotificationDetailRecycler = () => import("./NotificationDetailRecycler.vue");

export default {
  components: {
      NotificationDetailRecycler
  }
};
</script>