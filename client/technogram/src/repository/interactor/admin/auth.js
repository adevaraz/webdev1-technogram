import adminAuthNetowrkSource from '../../datasource/api/admin/auth'
const signin = async(username , password) => {
    return await adminAuthNetowrkSource.signin(username ,password)
}

const getRefreshToken = async() => {
    return await adminAuthNetowrkSource.getRefreshToken()
}

const getAccessTokenGA = async() => {
    return await adminAuthNetowrkSource.getAccessTokenGA()
} 

const logout = async(token) => {
    return await adminAuthNetowrkSource.logout(token)
}

export default{
    signin,
    getRefreshToken,
    getAccessTokenGA,
    logout
}
