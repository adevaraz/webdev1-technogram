<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="cols-container">
        <div class="img-container">
          <img
            src="https://akcdn.detik.net.id/visual/2019/10/01/f48a29f7-0148-4f67-9cd4-0de9431b66fe_169.jpeg?w=650"
            alt="header_img"
          />
        </div>
      </v-col>
      <v-col cols="12" class="cols-container">
        <h2 class="playfair-font new-tittle">Bill Gates dan Corona</h2>
      </v-col>
      <v-col cols="12" class="mt-1">
        <v-row>
          <v-col cols="6" class="cols-container">
            <p class="text-caption playfair-font">by Writer</p>
          </v-col>
          <v-col cols="6" class="cols-container">
            <h3 class="text-caption playfair-font text-end">Friday, 09/10/2020 15:49</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap");
.playfair-font {
  font-family: "Playfair Display", serif;
}
.img-container {
  width: 100%;
}

.img-container img {
  width: 100%;
  height: auto;
}

.cols-container {
  padding: 0;
}

.new-tittle {
  font-weight: 600;
}
</style>