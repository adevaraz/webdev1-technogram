<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="console.log('submit')">
          <v-text-field
            class="text-caption"
            placeholder="Masukan kata kunci pencarian disini ...."
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" v-if="isLoggedIn">
        <v-row>
          <v-col cols="12" class="pl-6 profile button">
            <div text class="text-start text-none button-content">
              <v-col cols="1" class="img-container pa-0 ma-0" align-self="center">
                <img class="item img-btn" src="../../../../assets/icons/profile.png" />
              </v-col>
              <v-col cols="11" class="pa-0 ma-0 pl-5 pl-xs-1">
                <div class="username-text">Adevaraz</div>
                <div class="email-text">zaraveda@polban.ac.id</div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn text small class="worksans-font text-none">Saved news</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="!isLoggedIn">
        <v-btn text small class="text-caption worksans-font text-none" @click="loggedInToggle">Sign in</v-btn>
      </v-col>
      <v-col cols="12">
        <div class="border-btm mt-1"></div>
      </v-col>
      <v-col v-for="(menu,index) in menus" cols="6" :key="menu.id">
        <v-btn text small :class="menuClass(index)" @click="onClicked(index)">{{menu.name}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: {
    menus: {
      type: Array,
    },
    onClicked: Function,
    currentSelected: Number,
    isLoggedIn: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    ...mapActions({
      loggedInToggle : 'user/loginToogle'
    }),
    menuClass(index) {
      const basicClass =
        "font-weight-bold text-caption worksans-font text-none";
      return index === this.currentSelected
        ? basicClass + " text-decoration-underline"
        : basicClass;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
.border-btm {
  border-bottom: 1px solid #bab4b8;
}

.worksans-font {
  font-family: "Work Sans", sans-serif;
}

.img-container {
  display: flex;
  justify-content: flex-start;
}

.img-container img {
  width: 2rem;
  height: 2rem;
}

.username-text {
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
}

.email-text {
  font-family: "Work Sans", sans-serif;
  font-weight: 300;
}

.button{
  cursor: pointer;
}

.button:hover{
  background: #eeeeee;
  border-radius: 16px;
}



.button-content{
  display: flex;
  justify-content: flex-start;
}


</style>