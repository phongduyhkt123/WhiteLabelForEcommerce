import { BASE_URL } from '~/utils/httpRequest';

const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/google';

export function getSocialLoginUrl(name) {
    // return `${BASE_URL}/oauth2/authorization/${name}?redirect_uri=${REDIRECT_URI}`;
    return `http://localhost:8080/oauth2/authorization/${name}?redirect_uri=/oauth2/callback`;
}
