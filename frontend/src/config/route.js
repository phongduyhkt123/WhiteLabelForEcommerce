const Route = {
    home: '/',
    signin: '/signin',
    register: '/register',
    profile: '/profile',
    search: '/search',
    singleProduct: '/product/:id',
    product: '/product',
    cart: '/cart',
    checkout: '/checkout',
    singleOrder: '/order/:id',
    order: '/order',
    deliveryAddress: '/delivery-address',
    userinfo: '/userinfo',
    payment: '/payment',

    // API
    cartAPI: '/buyer/cart-detail',
    signinAPI: '/signin',
    productAPI: '/product',
    orderAPI: '/buyer/order',
    deliveryAddressAPI: '/buyer/delivery-address',
    userinfoAPI: '/buyer/userinfo',
    singleProductAPI: '/product/:id',
};

export default Route;
