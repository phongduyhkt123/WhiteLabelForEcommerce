import { route } from '~/config';
import { useAxios } from '~/utils/httpRequest';

const useGetProduct = (filter, page) => {
    let params = {};
    params.page = page;
    if (filter?.category.length > 0)
        params = {
            ...params,
            ...filter,
            category: filter.category[0],
        };
    let url = route.productAPI.url;
    if (filter?.key) {
        params.key = filter.key;
        url = route.productSearchAPI.url;
    }
    return useAxios({ url: url, config: { params }, dep: [filter, page] });
};

export default useGetProduct;
