const CURRENT_THEME_KEY = "CURRENT_THEME_KEY_STORAGE"

const Light = {
    primary : "#E52B38",
    primaryVariant : "#ef4a52",
    surface : "#FFFFFF",
    background : "#FFFFFF",
    backgroundVariant : "#FFFFFF",
    error : "#d32031",
    onPrimary : "#FFFFFF",
    onBackground : "#000000",
    onSurface : "#000000",
    onError : "#FFFFFF",
    onBackgroundVariant : "#000000"
}

const Dark = {
    primary : "#E52B38",
    primaryVariant : "#ef4a52",
    surface : "#212226",
    background : "#212226",
    error : "#d32031",
    onPrimary : "#FFFFFF",
    onBackground : "#FFFFFF",
    onSurface : "#FFFFFF",
    onError : "#FFFFFF",
    backgroundVariant : "#3C3D40",
    onBackgroundVariant : "#FFFFFF"
}

const ThemeModule = {
    namespaced: true,
    state: () => ({
        currentColor :Light,
        isDark : false
    }),
    mutations :{
        SET_IS_DARK(state , isDark){
            state.isDark = isDark;
            if(isDark){
                state.currentColor = Dark
            }else{
                state.currentColor = Light
            }
        },
    },
    getters : {
        getCurrentColor(state){
            return state.currentColor;
        },
        getIsDark(state){
            return state.isDark;
        }
    },
    actions : {
        toogleDark({commit , state}){
            const isNewThemeDark = !state.isDark;
            localStorage.setItem(CURRENT_THEME_KEY , JSON.stringify(isNewThemeDark))
            commit('SET_IS_DARK' , isNewThemeDark);
        },
        sychronizeCurrentTheme({commit}){
            commit('SET_IS_DARK' , JSON.parse(localStorage.getItem(CURRENT_THEME_KEY)) || false)
        }
    }

}

export default ThemeModule