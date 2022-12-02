import { AttachMoney, CreditCard, Facebook, Google, Mail, Payment, Phone } from '@mui/icons-material';

const Components = {
    Facebook: Facebook,
    Google: Google,
    Mail: Mail,
    Phone: Phone,
    AttachMoney: AttachMoney,
    CreditCard: CreditCard,
    Payment: Payment,
};

const Icon = ({ component }) => {
    const Component = Components[component];
    return <Component />;
};

export default Icon;
