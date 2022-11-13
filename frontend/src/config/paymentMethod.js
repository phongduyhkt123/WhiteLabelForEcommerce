import { AttachMoney, CreditCard, Payment } from '@mui/icons-material';

const paymentMethods = [
    {
        id: 1,
        code: 'CASH',
        name: 'Cash on delivery',
        icon: <AttachMoney />,
    },
    {
        id: 2,
        code: 'CARD',
        name: 'Credit Card',
        icon: <CreditCard />,
    },
    {
        id: 3,
        code: 'PAYPAL',
        name: 'Paypal',
        icon: <Payment />,
    },
];

export default paymentMethods;
