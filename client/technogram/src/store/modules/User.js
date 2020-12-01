import User from '../../api/pembaca/auth'
import StatusType from '../StatusTypeConst'
const UserModule = {
    namespaced: true,
    state: () => ({
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2ODIwNzk3LCJleHAiOjE2MDY4Mjc5OTd9.5Jaj7ROyEiVg6Ujce9ygInnz8wMf0ZqoZpNkvEY_Hw0',
        username : '',
        status : {
            type : StatusType.IDLE,
            message : ''
        },
        isLoggedIn : true
    }),
    mutations :{
        SET_LOGGEDIN(state, isLoggedin){
            state.isLoggedIn = isLoggedin
        },
        SET_TOKEN(state , token){
            state.token = token;
        },
        SET_USERNAME(state , username){
            state.username = username;
        },
        SET_LOADING(state){
            state.status = {
                type : StatusType.LOADING,
                message : 'is loading'
            }
        },
        SET_ERROR(state , message){
            state.status = {
                type : StatusType.LOADING,
                message : message
            }
        },
        SET_SUCCESS(state ,message){
            state.status = {
                type : StatusType.SUCCESS,
                message : message
            }
        },
        SET_IDLE(state){
            state.status = {
                type : StatusType.IDLE,
                message : ''
            }
        }
    },
    getters : {
        getToken(state){
            return state.token;
        },
        getUsername(state){
            return state.username;
        },
        isTokenExist(state){
            return (state.token !== undefined && state.token !== '');
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        }
    },
    actions : {
        async loginToogle({commit , state}){
            commit('SET_LOADING');
            console.log('loading');            
            commit('SET_LOGGEDIN' , !state.isLoggedIn)
            commit('SET_SUCCESS' , 'Success get new Access token');
        },

        async signOut({commit , state}){
            commit('SET_LOADING');
            if(state.token !== ''){
                await User.signOut(state.token);
                commit('SET_TOKEN' , '');
                commit('SET_LOGGEDIN', !state.isLoggedIn);
            }
            commit('SET_SUCCESS' , 'Success get new Access token');
        },
    }

    
}

export default UserModule;