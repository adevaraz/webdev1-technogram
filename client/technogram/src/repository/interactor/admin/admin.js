
import adminNetworkSource from "../../datasource/api/admin/admin"
const addAdmin = async (username, password, token) => {
    return await adminNetworkSource.addAdmin(username , password , token)
};

export default {
    addAdmin,
};
