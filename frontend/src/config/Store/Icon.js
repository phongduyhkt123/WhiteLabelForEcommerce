import {
    AttachMoney,
    CreditCard,
    Facebook,
    Google,
    Mail,
    Payment,
    Phone,
    AddShoppingCart,
    AccountCircle,
    SignalCellularAlt,
    Receipt,
    Room,
} from '@mui/icons-material';
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
    AccountCircle: AccountCircle,
    SignalCellularAlt: SignalCellularAlt,
    Receipt: Receipt,
    Room: Room,
};

const Icon = ({ component, ...rest }) => {
    const Component = Components[component];
    return <Component {...rest} />;
};

export default Icon;
