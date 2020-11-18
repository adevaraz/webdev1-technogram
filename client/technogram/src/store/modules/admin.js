import Admin from '../../api/admin/auth'
import StatusType from '../StatusTypeConst'
const AdminModule = {
    namespaced: true,
    state: () => ({
        token : '',
        username : '',
        status : {
            type : StatusType.IDLE,
            message : ''
        }
    }),
    mutations :{
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
        }
    },
    actions : {
        async getNewToken({commit}){
            commit('SET_LOADING');
            console.log('loading');            
            const result = await Admin.getRefreshToken();
            console.log(result);   
            if(result instanceof Error){
                commit('SET_TOKEN' , '');
                commit('SET_ERROR' , result.cause)
                return;
            }
            commit('SET_TOKEN', result.token);
            commit('SET_SUCCESS' , 'Success get new Access token');
        },
        async logOut({commit , state}){
            commit('SET_LOADING');
            if(state.token !== ''){
                await Admin.logout(state.token)
                commit('SET_TOKEN' , '');
            }
            commit('SET_SUCCESS' , 'Success get new Access token');
        },
        setToken({commit} , token){
            commit('SET_TOKEN',token);
        }
    }
    
}

export default AdminModule;