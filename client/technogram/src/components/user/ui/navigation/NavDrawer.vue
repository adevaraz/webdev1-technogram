<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="console.log(submit)">
          <v-text-field
          class="text-caption"
          placeholder="Masukan kata kunci pencarian disini ...."
          prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" >
        <v-btn text  small class="text-caption font-weight-medium worksans-font text-none">Sign in</v-btn>
        <div class='border-btm mt-1'></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(menu,index) in menus" cols="6" :key="menu.id">
        <v-btn text small :class="menuClass(index)" @click="onClicked(index)">{{menu.name}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props : {
      menus : {
          type : Array
      },
      onClicked : Function,
      currentSelected : Number
  },
  methods : {
      menuClass(index){
          const basicClass = 'font-weight-bold text-caption worksans-font text-none'
          return index === this.currentSelected ? basicClass + ' text-decoration-underline' : basicClass
      }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap');
.border-btm{
    border-bottom: 1px solid #BAB4B8;
}

.worksans-font{
    font-family: 'Work Sans', sans-serif;
}
</style>