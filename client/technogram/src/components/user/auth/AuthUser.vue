<template>
    <div>
        <login-user v-if="isLogin" :onHaveNoAccountClicked="changeMode" :onDialogClosed="onDialogClosed"></login-user>
        <sign-up-user :onDialogClosed="onDialogClosed" v-else></sign-up-user>
    </div>
</template>

<script>
const LoginUser = () => import("./LoginUser.vue");
const SignUpUser = () => import("./SignUpUser.vue");
export default {
  components: { LoginUser, SignUpUser },
    props : {
        onDialogClosed : Function
    },
    data(){
        return {
            isLogin : true
        }
    },
    methods :{
        changeMode(){
            this.isLogin = !this.isLogin;
        },

    }
}
</script>