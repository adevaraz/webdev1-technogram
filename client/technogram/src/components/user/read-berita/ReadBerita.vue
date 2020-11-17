<template>
    <v-container class="d-flex flex-row mb-6">
        <v-sheet class="mx-16 px-16">
            <h1>Judul</h1>
            <p>tanggal</p>

            <!-- Information section -->
            <v-card
                class="d-flex flex-col mb-6"
                flat
                tile
            >
                <h4 class="mr-auto">by Zara</h4>

                <div class="d-flex flex-row" style="background-color: blue;">
                    <div id="likes" class="d-flex flex-row align-center">
                        <img class="item img-btn" src="../../../assets/icons/heart-empty.png" style="background-color: grey;" />
                        <p style="background-color: red;">2000 likes</p>
                    </div>

                    <div id="view" class="d-flex flex-row align-center">
                        <img class="item img-btn" src="../../../assets/icons/view.png" style="background-color: grey;" />
                        <p style="background-color: red;">2000 viewers</p>
                    </div>
                    
                    <div id="save" class="d-flex flex-row align-center" style="background-color: cyan;">
                        <img class="item img-btn" src="../../../assets/icons/unsaved-icon.png" style="background-color: grey;" />
                        <!-- <p>Simpan</p> -->
                    </div>
                </div>
            </v-card>

            <div id="content">
                <div id="header">
                    <img src="">
                </div>

                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    <br><br>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    <br><br>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    <br><br>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

                <p>Written by</p>
                <h4>Zara</h4>
                <p>Loremloremlorem</p>
            </div>
        </v-sheet>

        <v-card>
            <!-- Pake component yang ada di nopalpadil -->
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
    })
}
</script>

<style scoped>
.item {
  margin-right: 1rem;
  cursor: pointer;
}

.img-btn:hover {
  background: rgba(80, 80, 80, 0.164);
}

.item {
    height: 16px;
    max-height: 16px;
}

#header {
    text-align: center;
}
</style>