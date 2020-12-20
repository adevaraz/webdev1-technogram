import axios from 'axios'
import {TIMEOUT, USER_URL, USER_ROLE} from '../const'
import ErrorHandler from '../errorHandler'

const confirmVerification = async (verificationToken) => {
    try {
        const currentUrl = USER_URL + `/confirm?ref=${verificationToken}`;
        const result = await axios.put(currentUrl);

        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
}

const resendVerifEmail = async (email) => {
    try {
        const currentUrl = USER_URL + `/resend-verif-email`;
        const result = await axios.post(currentUrl, email);

        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
}

export default {
    confirmVerification,
    resendVerifEmail
}