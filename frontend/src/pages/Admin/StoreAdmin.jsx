import { Admin, Resource } from 'react-admin';
import { buyerrankCreate, productCreate, userCreate } from '~/config/admin/createview';
import { buyerrankEdit, productEdit, userEdit } from '~/config/admin/editview';
import { buyerrankList, productList, userList, categoryList, orderList } from '~/config/admin/listview';
import { authProvider, SpringDataProvider } from '~/provider';
import * as request from '~/utils/httpRequest';
import { CreateView } from './CreateView/CreateView';
import { EditView } from './EditView/EditView';
import { ListView } from './ListView/ListView';

const dataProvider = SpringDataProvider('http://localhost:8080/api/admin', request.fetch);

const StoreAdmin = () => {
    const ListProduct = <ListView fields={productList} />;
    const ListUser = <ListView fields={userList} />;
    const ListBuyerRank = <ListView fields={buyerrankList} />;
    const ListCategory = <ListView fields={categoryList} />;
    const OrderList = <ListView fields={orderList} />;

    const EditProduct = <EditView fields={productEdit} />;
    const EditUser = <EditView fields={userEdit} />;
    const EditBuyerRank = <EditView fields={buyerrankEdit} />;

    const CreateProduct = <CreateView fields={productCreate} headers={{ 'Content-Type': 'multipart/form-data' }} />;
    const CreateUser = <CreateView fields={userCreate} />;
    const CreateBuyerRank = <CreateView fields={buyerrankCreate} />;

    return (
        <Admin basename="/admin" title="Admin" dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="product-manage" list={ListProduct} edit={EditProduct} create={CreateProduct} />
            <Resource name="user-manage" list={ListUser} edit={EditUser} create={CreateUser} />
            <Resource name="buyer-rank" list={ListBuyerRank} edit={EditBuyerRank} create={CreateBuyerRank} />
            <Resource name="product-category" list={ListCategory} />
            <Resource name="order" list={OrderList} />
        </Admin>
    );
};

export default StoreAdmin;
