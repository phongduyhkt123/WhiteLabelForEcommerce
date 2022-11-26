import { route } from '~/config';
const signin = {
    image: 'https://coreldrawdesign.com/resources/previews/preview-fitness-gym-social-media-post-banner-template-1602333977.jpg',
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
