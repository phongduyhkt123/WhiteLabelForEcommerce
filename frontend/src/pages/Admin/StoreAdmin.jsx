import { Admin, CustomRoutes, Layout, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { categoryCreate, productCreate, configCreate } from '~/config/admin/createview';
import { categoryEdit, orderEdit, userEdit } from '~/config/admin/editview';
import { categoryList, configList, orderList, productList, userList } from '~/config/admin/listview';
import { SpringDataProvider, authProvider } from '~/provider';
import * as request from '~/utils/httpRequest';
import { CreateView } from './Base/CreateView/CreateView';
import { EditView } from './Base/EditView/EditView';
import { ListView } from './Base/ListView/ListView';
import { EditConfig } from './Config/EditConfig';
import { CustomMenu } from './CustomMenu/CustomMenu';
import { EditOrder } from './Order/EditOrder';
import { EditProduct } from './Product/EditProduct';
import Report from './Report';

const dataProvider = SpringDataProvider('http://localhost:8080/api/admin', request.fetch);

const StoreAdmin = ({ aTheme }) => {
    const ListProduct = <ListView fields={productList} />;
    const ListUser = <ListView fields={userList} />;
    const ListCategory = <ListView fields={categoryList} />;
    const OrderList = <ListView fields={orderList} />;
    const ConfigList = <ListView fields={configList} />;

    const EditUser = <EditView fields={userEdit} />;

    const CreateProduct = <CreateView fields={productCreate} headers={{ 'Content-Type': 'multipart/form-data' }} />;
    const CreateCategory = <CreateView fields={categoryCreate} />;
    const CreateConfig = <CreateView fields={configCreate} />;

    return (
        <Admin
            layout={(props) => {
                console.log(props);
                return <Layout {...props} menu={CustomMenu} />;
            }}
            basename="/admin"
            title="Admin"
            dataProvider={dataProvider}
            authProvider={authProvider}
            theme={aTheme}
        >
            <Resource name="product" list={ListProduct} edit={EditProduct} create={CreateProduct} />
            <Resource name="user-manage" list={ListUser} edit={EditUser} />
            <Resource
                name="category"
                list={ListCategory}
                edit={<EditView fields={categoryEdit} />}
                create={CreateCategory}
            />
            <Resource name="order" list={OrderList} edit={<EditOrder fields={orderEdit} />} />
            <Resource name="config" list={ConfigList} edit={EditConfig} create={CreateConfig} />
            <CustomRoutes>
                <Route path="/report" element={<Report />} />
            </CustomRoutes>
        </Admin>
    );
};

export default StoreAdmin;
