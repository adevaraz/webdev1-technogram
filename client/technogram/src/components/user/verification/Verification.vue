<template>
    <v-container 
        pt-2
        :loading="isLoading"
        height="100%"
    >
        <template slot="progress">
            <v-progress-linear
                color="#E52B38"
                height="10"
                indeterminate
            />
        </template>

        <v-col>
            <v-row
                class="pa-2"
                align="center" 
                justify="center"
            >
                <h1>Akun Berhasil Dibuat!</h1>
            </v-row>
            <v-row
                align="center"
                justify="center"
            >
                <img id="vector" src="../../../assets/verification/email-amico.png" alt="verification email sent illustration" />
            </v-row>
            <v-row
                align="center"
                justify="center"
            >
                <a href="https://storyset.com/marketing">Ilustrasi oleh Freepik Storyset</a>
            </v-row>
            <v-row
                class="pa-4"
                align="center"
                justify="center"
            >
                Silahkan periksa email Anda untuk mengaktivasi akun.
            </v-row>
            <v-row
                class="pt-2"
                align="center"
                justify="center"
            >
                <p class="text-caption pr-1">Belum menerima email?</p>
                <p class="text-caption font-weight-bold" style="cursor:pointer;" @click="resendVerifEmail">Kirim Ulang</p>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import verifApi from "../../../api/pembaca/verification";

export default {
    data: () => ({
        errorMessage: "",
        isLoading: false,
        isError: false
    }),

    methods: {
        ...mapGetters ({
            getEmail: "user/getUserEmail"
        }),

        async resendVerifEmail() {
            try {
                this.isLoading = true;
                const result = await verifApi.resendVerifEmail(this.getEmail());
                this.isLoading = false;

                if(result instanceof Error) {
                    this.errorMessage = result.cause;
                    this.isError = true;
                }

                console.log(result);
            } catch (err) {
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