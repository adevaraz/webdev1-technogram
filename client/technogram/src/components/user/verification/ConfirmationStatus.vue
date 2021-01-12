<template>
    <v-container pt-2>
        <v-progress-circular
            class="progressbar"
            v-if="isLoading"
            color="#E52B38"
            height="10"
            indeterminate
        />
        <div v-if="isSucceed">
            <v-col>
                <v-row
                    class="pa-2"
                    align="center" 
                    justify="center"
                >
                    <h1>Verifikasi Berhasil!</h1>
                </v-row>
                <v-row
                    align="center"
                    justify="center"
                >
                    <img id="vector" src="../../../assets/verification/login-amico.svg" />
                </v-row>
                <v-row
                    align="center"
                    justify="center"
                >
                    <a href="https://storyset.com/mobile">Ilustrasi oleh Freepik Storyset</a>
                </v-row>
            </v-col>
        </div>
        <div v-else-if="!isSucceed && !isLoading">
            <v-col>
                <v-row
                    class="pa-2"
                    align="center" 
                    justify="center"
                >
                    <h1>Verifikasi Gagal.</h1>
                </v-row>
                <v-row
                    class="pa-4"
                    align="center"
                    justify="center"
                >
                    Tekan <span class="text-decoration-underline px-1" style="cursor:pointer;"> di sini </span> untuk mengirim ulang email verifikasi.
                </v-row>
            </v-col>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import verifApi from "../../../api/pembaca/verification";

export default {
    created() {
        if(!this.currentToken) {
            setTimeout( () => this.$router.push({ path: '/' }), 3000);
        }

        this.checkConfirmation();
    },

    data: () => ({
        errorMessage: "",
        isLoading: false,
        isError: false,
        isSucceed: false
    }),

    computed: {
        currentToken() {
            return this.$route.query.ref;
        }
    },

    methods: {
        ...mapActions({
            setToken: "user/setToken"
        }),

        ...mapGetters({
            getToken: "user/getToken"
        }),

        async checkConfirmation() {
            try {
                this.isError = false;
                this.isLoading = true;
                const result = await verifApi.confirmVerification(this.currentToken);
                this.isLoading = false;
                console.log(this.currentToken)

                if(result instanceof Error) {
                    this.errorMessage = result.cause;
                    this.isError = true;
                    this.isSucceed = false;
                } else {
                    this.isSucceed = true;

                    this.setToken({
                        token: result.token,
                        username: result.data.username,
                        email: result.data.email,
                        kategori: result.data.mostLikedCategory
                    });

                    setTimeout( () => this.$router.push({ path: '/personalization' }), 3000);
                }

            } catch (err) {
                this.isError = true;
                this.isLoading = false;
                this.isSucceed = false;
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
    font-size: 12px;
}

#vector {
    width: 100%;
    max-width: 30rem;
}
</style>