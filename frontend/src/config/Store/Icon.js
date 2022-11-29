import { Facebook, Google, Mail, Phone } from '@mui/icons-material';

const Components = {
    Facebook: Facebook,
    Google: Google,
    Mail: Mail,
    Phone: Phone,
};

const Icon = ({ component }) => {
    const Component = Components[component];
    return <Component />;
};

export default Icon;
