const Header = {
    styles: {
        height: 70,
        width: '100%',
    },

    font: { 'font-family': 'Roboto', fontsize: '1.5rem' },

    logo: { url: 'https://i.imgur.com/4Q1YQqg.png', alt: 'logo', width: 100, height: 100 },

    button: {},

    search: {},

    navBar: {
        item: [
            {
                title: 'Home',
                url: '/',
            },
            {
                title: 'Categories',
                url: '/categories',
                more: true,
            },
            {
                title: 'Product',
                url: '/product',
            },
            {
                title: 'About',
                url: '/about',
            },
            {
                title: 'Contact',
                url: '/contact',
            },
        ],
    },
};

export default Header;
