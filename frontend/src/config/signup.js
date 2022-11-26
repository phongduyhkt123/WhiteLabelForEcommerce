import { route } from '~/config';
const signup = {
    image: 'https://coreldrawdesign.com/resources/previews/preview-fitness-gym-social-media-post-banner-template-1602333977.jpg',
    logo: {},
    redirect: route.signin,
    title: {},
    form: {
        fullName: {
            label: 'Full Name',
            type: 'text',
            autoFocus: true,
            required: true,
        },
        username: {
            label: 'Username',
            type: 'text',
            required: true,
        },
        email: {
            label: 'Email Address',
            type: 'email',
        },
        phone: {
            label: 'Phone Number',
            type: 'tel',
        },
        password: {
            label: 'Password',
            type: 'password',
            required: true,
        },
    },
    button: {
        label: 'Sign up',
    },
};

export default signup;
