// const BASE_URL = "https://technogram-api.technogram.tech"
const BASE_URL = "http://localhost:3000";

const BERITA_URL = BASE_URL + "/news";
const KATEGORI_URL = BASE_URL + "/kategori";
const ADMIN_URL = BASE_URL + "/admin";
const USER_URL = BASE_URL + "/account";
const ACCESS_TOKEN_GOOGLE_ANALYTICS = BASE_URL + '/accessTokens'

const ADMIN_ROLE = "ADMIN";
const USER_ROLE = "USER";

const TIMEOUT = 10000;

export {
    BASE_URL,
    KATEGORI_URL,
    BERITA_URL,
    TIMEOUT,
    ADMIN_URL,
    USER_URL,
    USER_ROLE,
    ADMIN_ROLE,
    ACCESS_TOKEN_GOOGLE_ANALYTICS
};
