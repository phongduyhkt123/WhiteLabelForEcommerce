import { DOMAIN } from '~/utils/httpRequest';

export function getSocialLoginUrl(name) {
    // return `${BASE_URL}/oauth2/authorization/${name}?redirect_uri=${REDIRECT_URI}`;
    return `${DOMAIN}/oauth2/authorization/${name}?redirect_uri=/oauth2/callback`;
}
