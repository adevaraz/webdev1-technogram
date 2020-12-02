import User from '../../api/pembaca/auth'
import StatusType from '../StatusTypeConst'
const UserModule = {
    namespaced: true,
    state: () => ({
        token : '',
        username : '',
        email : '',
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
        getUserEmail(state){
            return state.email;
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
        },

        async signOut({commit , state}){
            commit('SET_LOADING');
            if(state.token !== ''){
                await User.signOut(state.token);
                commit('SET_TOKEN' , '');
                commit('SET_LOGGEDIN', !state.isLoggedIn);
            }
            commit('SET_SUCCESS' , 'Success get new Access token');
        }
    }

    
}

export default UserModule;