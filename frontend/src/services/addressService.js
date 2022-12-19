import * as request from '~/utils/httpRequest';

const addressUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
const token = '864fea75-67e2-11ed-889d-7acb4388671e';

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
