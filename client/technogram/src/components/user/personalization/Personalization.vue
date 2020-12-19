<template>
<v-container>
   <v-row :class="isMobile? 'content-mobile' : 'content'">
    <v-col
    md="6"
    offset-md="12"
    align="center">
     <h1 class="playfair-font">Which categories do you like to read?</h1>
     </v-col>
     <v-col
      class="category"
      md="6"
      offset-md="12"
      align="center">
        <v-btn
            class="button"
            color="secondary"
            :class="categoryClass(index)"
            v-for="(item,index) in kategori"
            :key="item.nama_kategori"
            elevation="4"
            @click="addKategori(item);"
            rounded >
            {{ item.nama_kategori }}  
            </v-btn>
     </v-col>
     <v-col
      md="6"
      offset-md="12"
      align="center">
      <v-btn
        color ="#E52B38"
        class ="submit"
        rounded
        @click="AddPersonalize">
        Done
        </v-btn>
        </v-col>
    </v-row>
 
    
</v-container>
</template>

<script>
import { store } from "../../../store/index";
import personalize from "../../../api/personalization/personalization.js";
export default {
  data: () => ({
      isLoading: false,
      kategori: [],
      isButtonClicked:[],
      kategoriSelected:[],
      kategoriSelectedFix:[]
  }),
  computed :{
      isMobile() {
      return this.$vuetify.breakpoint.xs ? true : false;
    },
  },
  methods :{
  addKategori(value, index){

      this.kategoriSelected.push(value)
      if(this.isButtonClicked[index]==true){
        this.isButtonClicked[index] = false;
      }else {
        this.isButtonClicked[index] = true;
      } 
  },
  async addKategoriFix(){
        this.kategoriSelected.forEach((element)=>{
            this.kategoriSelectedFix.push(element);
        })
    for(var i=0; i < this.kategoriSelectedFix.length; i++){
              console.log(this.kategoriSelectedFix[i].nama_kategori);
          }
  },
  categoryClass(index){
      this.isButtonClicked[index]==true ? "button text-decoration-underline text-none"
        : "button  text-none";
  },
  async AddPersonalize() {
    var result;
    this.kategoriSelected.forEach((element)=>{
      result = personalize.addPersonalize(
        element,
        store.getters["user/getToken"]
      )
    })
        if (result instanceof Error) {
        this.error.message = result.cause;
      } else {
        this.$router.push({ path: "/" });
      }
  },
  async retrieveKategori() {
      try {
        const kategoriResult = await personalize.retrieveAll();
        if (kategoriResult instanceof Error) {
          throw kategoriResult;
        } else {
          if (kategoriResult.data.length > 0) {
            kategoriResult.data.forEach((element) => {
              this.kategori.push(element);
            });
          }
          for(var i=0; i < kategoriResult.data.length; i++){
              console.log(this.kategori[i].nama_kategori);
              this.isButtonClicked[i]=false;
          }
        }
      } catch (error) {
        console.log(error);
      }
  }
  }, 
  mounted() {
      
      this.retrieveKategori();
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");

.playfair-font {
  font-family: "Playfair Display", serif;

}

.content {
    padding-top : 5rem;
}
.content-mobile {
  padding : 3rem;
}
.progress-bar {
  z-index : 500;
  position : fixed;
  left : 50%;
  top: 50%;
  transform : transform(-50%,-50%) 
}
.button {
  margin: 20px;
}

.category {
    margin-top: 2rem;
}

.submit {
  color: white;
}

.container{
  padding : 5 rem;
}
</style>