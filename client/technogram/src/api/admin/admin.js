import axios from "axios";
import { ADMIN_URL, TIMEOUT, ADMIN_ROLE } from "../const";
import ErrorHandler from "../errorHandler";
const addAdmin = async (username, password, token) => {
    try {
        const addAdminURL = ADMIN_URL + "/new-admin";
        const result = await axios.post(
            addAdminURL,
            {
                username,
                password,
            },
            {
                headers: {
                    Authorization: token,
                },
                timeout: TIMEOUT,
                withCredentials: true,
            }
        );
        return result.data;
    } catch (err) {
        const errorResult = await ErrorHandler.errorHandler(err, ADMIN_ROLE, async(newToken) => {
            return await addAdmin(username, password, newToken);
        })
        return errorResult;
    }
};

export default {
    addAdmin,
};
