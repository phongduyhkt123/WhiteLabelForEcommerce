import { Report } from '@mui/icons-material';
import { Menu, useResourceDefinitions } from 'react-admin';

export const CustomMenu = () => {
    const resources = useResourceDefinitions();
    return (
        <Menu>
            <Menu.DashboardItem />
            {Object.keys(resources).map((name) => {
                return <Menu.ResourceItem key={name} name={name} />;
            })}

            <Menu.Item to="/admin/report" primaryText="Report" leftIcon={<Report />} />
        </Menu>
    );
};
