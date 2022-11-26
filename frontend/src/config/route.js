const Route = {
    home: '/',
    signin: '/signin',
    signup: '/signup',
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
    countCartAPI: '/buyer/cart-detail/count',
    signinAPI: '/signin',
    productAPI: '/product',
    categoryAPI: '/product-category',
    orderAPI: '/buyer/order',
    orderFromCartAPI: '/buyer/order/cart',
    deliveryAddressAPI: '/buyer/delivery-address',
    userinfoAPI: '/buyer/userinfo',
    singleProductAPI: '/product/',
};

export default Route;
