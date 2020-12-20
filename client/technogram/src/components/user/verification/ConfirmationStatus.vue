<template>
    <v-container pt-2>
        <div id="success">
            <v-col>
                <v-row
                    class="pa-2"
                    align="center" 
                    justify="center"
                >
                    <h1>Verification Success!</h1>
                </v-row>
                <v-row
                    align="center"
                    justify="center"
                >
                    <img id="vector" src="../../../assets/verification/login-amico.png" />
                </v-row>
                <v-row
                    align="center"
                    justify="center"
                >
                    <a href="https://storyset.com/mobile">Illustration by Freepik Storyset</a>
                </v-row>
                <v-row
                    class="pa-4"
                    align="center"
                    justify="center"
                >
                    Please sign in first to use your account.
                </v-row>
            </v-col>
        </div>
        <div id="failed">
            <v-col>
                <v-row
                    class="pa-2"
                    align="center" 
                    justify="center"
                >
                    <h1>Verification Failed.</h1>
                </v-row>
                <v-row
                    class="pa-4"
                    align="center"
                    justify="center"
                >
                    Click <span class="text-decoration-underline px-1" style="cursor:pointer;"> here </span> to resend verification email.
                </v-row>
            </v-col>
        </div>
    </v-container>
</template>

<script>
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