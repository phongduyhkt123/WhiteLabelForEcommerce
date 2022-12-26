import { deliveryAddress, route } from '~/config';
import { AlertTypes } from '~/context/AlertContext';
import * as request from '~/utils/httpRequest';

const addressUrl = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const shipFeeUrl = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';
const serviceUrl = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';
const token = 'df5672bd-6410-11ed-b824-262f869eb1a7';

export const getCitys = async () => {
    const res = await request.get(`${addressUrl}/province`, {
        headers: { Token: token },
    });
    const data = res.data.data.map((item) => ({ id: item.ProvinceID, name: item.ProvinceName }));
    return { data };
};

export const getDistricts = async (id) => {
    const res = await request.get(`${addressUrl}/district`, {
        headers: { Token: token },
        params: { province_id: id },
    });
    const data = res.data.data.map((item) => ({ id: item.DistrictID, name: item.DistrictName }));
    return { data };
};

export const getWards = async (districtId) => {
    const res = await request.get(`${addressUrl}/ward`, {
        headers: { Token: token },
        params: { district_id: districtId },
    });
    const data = res.data.data.map((item) => ({ id: item.WardCode, name: item.WardName }));
    return { data };
};

export const getShipFee = async ({ from_district_id = 3695, to_district_id, to_ward_code }) => {
    const service = await getService({ to_district: to_district_id });

    if (service.data.length > 0) {
        const res = await request.post(
            `${shipFeeUrl}`,
            {
                from_district_id,
                to_ward_code,
                to_district_id,
                height: 50,
                length: 20,
                weight: 200,
                width: 20,
                service_id: service.data[0].service_id,
            },
            { headers: { Token: token, ShopId: 3450942 } },
        );
        return { data: res.data.data };
    }
    return { data: null };
};

export const getService = async ({ from_district = 3695, to_district }) => {
    const res = await request.post(
        `${serviceUrl}`,
        {
            from_district,
            to_district,
            shop_id: 3450942,
        },
        { headers: { Token: token } },
    );

    return { data: res.data.data };
};

export const saveAddress = async ({ params, id }) => {
    try {
        const res = id
            ? await request.put(`${route.deliveryAddressAPI}/${id}`, params)
            : await request.post(route.deliveryAddressAPI, params);
        return {
            data: res.data.data,
            message: {
                text: id ? deliveryAddress.labels.editAddressSuccess : deliveryAddress.labels.addNewAddressSuccess,
                severity: 'success',
                type: AlertTypes.SNACKBAR_LARGE,
            },
        };
    } catch (err) {
        return {
            message: {
                text:
                    err?.response?.data?.message || id
                        ? deliveryAddress.labels.addNewAddressUnKnownError
                        : deliveryAddress.labels.editAddressUnKnownError,
                severity: 'error',
                type: AlertTypes.SNACKBAR_LARGE,
            },
        };
    }
};
