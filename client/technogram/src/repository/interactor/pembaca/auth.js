import userAuthNetworkSource from '../../datasource/api/pembaca/auth'
const signin = async(email , password) => {
    return userAuthNetworkSource.signin(email , password)
}

const signup = async(email , username, password) => {
    return userAuthNetworkSource.signup(email ,username, password)

}

const getRefreshToken = async() => {
    return userAuthNetworkSource.getRefreshToken()
}

const signOut = async(token) => {
    return await userAuthNetworkSource.signOut(token)
}

const resetpassword = async (token , newPassword) => {
    return await userAuthNetworkSource.resetpassword(token , newPassword)
}




const requestRestPasswordEmail = async (email) => {
    return await userAuthNetworkSource.requestRestPasswordEmail(email)
}

export default{
    signin,
    signup,
    getRefreshToken,
    signOut,
    resetpassword,
    requestRestPasswordEmail
}
