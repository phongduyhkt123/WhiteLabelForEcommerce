const home = {
    title: 'Home',
    styles: {},
    topBanner: {
        height: 500,
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        images: [
            {
                src: 'https://img.freepik.com/premium-vector/fitness-club-banner-with-healthy-woman-lifting-weights-exploding-powder-effect-surface-3d-illustration_317810-1773.jpg?w=2000',
                alt: 'image',
            },
        ],
    },
    groupProducts: [
        {
            title: 'Best Seller',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: '/product/most-sold',
            limit: 10,
        },
        {
            title: 'Most View',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: '/product/most-viewed',
            limit: 10,
        },
        {
            title: 'Sale Off',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: '/product/sale',
            limit: 10,
        },
        {
            title: 'Latest',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: '/product/lasted',
            limit: 10,
        },
        {
            title: 'Ramdom',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: '/product',
            limit: 10,
        },
    ],

    bottomBanner: {
        height: 500,
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        images: [
            {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
        ],
    },
};
export default home;
