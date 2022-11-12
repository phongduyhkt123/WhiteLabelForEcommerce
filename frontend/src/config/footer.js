import { Facebook } from '@mui/icons-material';

const Footer = {
    styles: {
        height: '300px',
        // background: '#5e72e4',
        // color: '#5e72e4',
    },

    font: { 'font-family': 'Roboto', fontsize: '1.5rem' },

    logo: { url: 'https://i.imgur.com/4Q1YQqg.png', alt: 'logo', width: 100, height: 100 },

    items: [
        {
            title: 'About Us',
            subItems: [
                {
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
            ],
        },
        {
            title: 'Contact Us',
            subItems: [
                {
                    icon: <Facebook />,
                    content: 'facebook.com',
                },
                {
                    icon: <Facebook />,
                    content: 'facebook.com',
                },
            ],
        },
        {
            title: 'Follow Us',
            subItems: [],
        },
    ],

    copyRight: {
        content: '© 2021 React Admin. All rights reserved.',
    },
};

export default Footer;
