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
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
        ],
    },
    groupProduct: [
        {
            title: 'Best Seller',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: 'http://localhost:3000/api/products',
            limit: 10,
        },
        {
            title: 'Ramdom',
            banner: {
                src: 'https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000',
                alt: 'image',
            },
            api: 'http://localhost:3000/api/products',
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
