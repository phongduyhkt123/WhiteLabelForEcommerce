import { route } from '~/config';
import { useAxios } from '~/utils/httpRequest';

const useGetProduct = (filter, page) => {
    let params = {};
    params.page = page;
    if (filter?.category.length > 0)
        params = {
            ...params,
            idCategory: filter.category[0],
        };
    return useAxios({ url: route.productAPI, config: { params }, dep: [filter, page] });
};

export default useGetProduct;
