import StatusType from '../StatusTypeConst'
const UserModule = {
    namespaced: true,
    state: () => ({
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjA2ODI1MjE2LCJleHAiOjE2MDY4MzI0MTZ9.7zFmzvmxr7Y6KF1erzEhRvRilBCrSAoYnHBhfcDxs98',
        username : '',
        status : {
            type : StatusType.IDLE,
            message : ''
        },
        isLoggedIn : false,
        mostLikedKategori : 'app',
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
        },
        SET_MOSTLIKED_KATEGORI(state , mostLikedKategori){
            state.mostLikedKategori = mostLikedKategori
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
        },
        getMostLikedKategori(state){
            return state.mostLikedKategori;
        }
    },
    actions : {
        async loginToogle({commit , state}){
            commit('SET_LOADING');
            console.log('loading');            
            commit('SET_LOGGEDIN' , !state.isLoggedIn)
            commit('SET_SUCCESS' , 'Success get new Access token');
        }
        
    }

    
}

export default UserModule;