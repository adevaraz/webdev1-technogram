import userNetworkSource from '../../datasource/api/pembaca/verification'
const confirmVerification = async (verificationToken) => {
    return await userNetworkSource.confirmVerification(verificationToken)
}

const resendVerifEmail = async (email) => {
    return await userNetworkSource.resendVerifEmail(email)
}

export default {
    confirmVerification,
    resendVerifEmail
}