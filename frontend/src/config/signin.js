import { route } from '~/config';
const signin = {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp',
    logo: {},
    redirect: route.home,
    title: {},
    form: {
        loginKey: {
            label: 'Username',
            type: 'text',
        },
        password: {
            label: 'Password',
            type: 'password',
        },
    },
    button: {
        label: 'Sign in',
    },
};

export default signin;
