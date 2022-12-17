import { AttachMoney, CreditCard, Facebook, Google, Mail, Payment, Phone, AddShoppingCart } from '@mui/icons-material';
import Paypal from '~/components/Icons';

const Components = {
    Facebook: Facebook,
    Google: Google,
    Mail: Mail,
    Phone: Phone,
    AttachMoney: AttachMoney,
    CreditCard: CreditCard,
    Payment: Payment,
    Paypal: Paypal,
    AddShoppingCart: AddShoppingCart,
};

const Icon = ({ component }) => {
    const Component = Components[component];
    return <Component />;
};

export default Icon;
