<template>
    <v-container pt-2>
        <v-col>
            <v-row
                class="pa-2"
                align="center" 
                justify="center"
            >
                <h1>Account Created!</h1>
            </v-row>
            <v-row
                align="center"
                justify="center"
            >
                <img id="vector" src="../../../assets/verification/email-amico.png" />
            </v-row>
            <v-row
                align="center"
                justify="center"
            >
                <a href="https://storyset.com/marketing">Illustration by Freepik Storyset</a>
            </v-row>
            <v-row
                class="pa-4"
                align="center"
                justify="center"
            >
                Please check your email to activate your account.
            </v-row>
            <v-row
                class="pt-2"
                align="center"
                justify="center"
            >
                <p class="text-caption pr-1">Haven't received the email yet?</p>
                <p class="text-caption font-weight-bold" style="cursor:pointer;">Resend Email</p>
            </v-row>
            <v-row
                class="pa-4"
                align="center"
                justify="center"
            >
                <v-btn to="/">
                    Kembali ke laman utama
                </v-btn>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import verifApi from "../../../api/pembaca/verification";

export default {
    
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