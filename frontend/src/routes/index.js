import { route } from '~/config';
import UserProfileLayout from '~/layouts/UserProfileLayout/UserProfileLayout';
import { Cart, Home, Profile, Product, SingleProduct, Signin, DeliveryAddress, Checkout, Order } from '~/pages';
import Signup from '~/pages/Signup';

const { home, signin, signup, singleProduct, product, deliveryAddress, profile, order, cart, checkout } = route;

const publicRoute = [
    { path: home.path, title: home.title, element: Home },
    {
        path: signin.path,
        element: Signin,
        authCheck: true,
    },
    {
        path: signup.path,
        element: Signup,
        authCheck: true,
    },
    { path: singleProduct.path, title: singleProduct.title, element: SingleProduct },
    { path: product.path, title: product.title, element: Product },
];

const privateRoute = [
    {
        path: deliveryAddress.path,
        title: deliveryAddress.title,
        element: DeliveryAddress,
        layout: UserProfileLayout,
    },
    { path: profile.path, title: profile.title, element: Profile, layout: UserProfileLayout },
    { path: order.path, title: order.title, element: Order, layout: UserProfileLayout },
    { path: cart.path, title: cart.title, element: Cart },
    { path: checkout.path, title: checkout.title, element: Checkout },
];

export { publicRoute, privateRoute };
