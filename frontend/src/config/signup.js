import { route } from '~/config';
const signup = {
    image: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp',
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
