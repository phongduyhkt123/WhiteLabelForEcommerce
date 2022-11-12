import * as request from '~/utils/httpRequest';

const test = async () => {
    try {
        const response = await request.get(`product`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { test };
