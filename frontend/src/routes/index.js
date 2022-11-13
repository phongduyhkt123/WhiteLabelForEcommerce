import { route } from '~/config';
import UserProfileLayout from '~/layouts/UserProfileLayout/UserProfileLayout';
import { Cart, Home, Profile, Search, Product, SingleProduct, Signin, DeliveryAddress, Checkout, Order } from '~/pages';
import AuthCheck from '~/pages/Signin/AuthCheck';

const publicRoute = [
    { path: route.home, element: <Home /> },
    {
        path: route.signin,
        element: (
            <AuthCheck>
                <Signin />
            </AuthCheck>
        ),
    },
    { path: route.search, element: <Search />, layout: null },
    { path: route.singleProduct, element: <SingleProduct /> },
    { path: route.product, element: <Product /> },
];

const privateRoute = [
    { path: route.deliveryAddress, element: <DeliveryAddress />, layout: UserProfileLayout },
    { path: route.profile, element: <Profile />, layout: UserProfileLayout },
    { path: route.order, element: <Order />, layout: UserProfileLayout },
    { path: route.cart, element: <Cart /> },
    { path: route.checkout, element: <Checkout /> },
];

export { publicRoute, privateRoute };
