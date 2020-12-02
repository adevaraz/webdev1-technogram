<template>
  <div @click="onClick">
    <v-row align="center" justify="center">
      <v-col cols="12" class="pa-0">
        <v-btn depressed color="#e52b38" class="white--text">{{ message }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    onClick: {
      type: Function,
      default: null,
    },
  },

  methods: {},
};
</script>

<style scoped>
.toast {
  color: white;
}
</style>
