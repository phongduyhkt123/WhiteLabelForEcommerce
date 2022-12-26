import { Admin, Resource } from 'react-admin';
import { buyerrankCreate, productCreate, userCreate } from '~/config/admin/createview';
import { buyerrankEdit, productEdit, userEdit, orderEdit } from '~/config/admin/editview';
import { buyerrankList, productList, userList, categoryList, orderList } from '~/config/admin/listview';
import { authProvider, SpringDataProvider } from '~/provider';
import * as request from '~/utils/httpRequest';
import { CreateView } from './Base/CreateView/CreateView';
import { EditView } from './Base/EditView/EditView';
import { ListView } from './Base/ListView/ListView';
import { EditOrder } from './Order/EditOrder';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { defaultTheme } from 'react-admin';

const dataProvider = SpringDataProvider('http://localhost:8080/api/admin', request.fetch);

const theme = responsiveFontSizes(
    createTheme({
        ...defaultTheme,
        typography: {
            fontSize: 15,
        },
    }),
);

const StoreAdmin = () => {
    const ListProduct = <ListView fields={productList} />;
    const ListUser = <ListView fields={userList} />;
    const ListBuyerRank = <ListView fields={buyerrankList} />;
    const ListCategory = <ListView fields={categoryList} />;
    const OrderList = <ListView fields={orderList} />;

    const EditProduct = <EditView fields={productEdit} />;
    const EditUser = <EditView fields={userEdit} />;

    const CreateProduct = <CreateView fields={productCreate} headers={{ 'Content-Type': 'multipart/form-data' }} />;
    const CreateUser = <CreateView fields={userCreate} />;

    return (
        <Admin basename="/admin" title="Admin" dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="product" list={ListProduct} edit={EditProduct} create={CreateProduct} />
            <Resource name="user-manage" list={ListUser} edit={EditUser} create={CreateUser} />
            <Resource name="product-category" list={ListCategory} />
            <Resource name="order" list={OrderList} edit={<EditOrder fields={orderEdit} />} />
        </Admin>
    );
};

export default StoreAdmin;
