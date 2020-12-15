<template>
    <small-berita :berita="source" style="bakcground:red;"></small-berita>
</template>

<script>
import SmallBerita from '../berita/SmallBerita.vue'
  export default {
  components: { SmallBerita },
    name: 'item-component',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>