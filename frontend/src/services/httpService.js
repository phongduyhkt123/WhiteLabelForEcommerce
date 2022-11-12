import * as request from '~/utils/httpRequest';

const postService = async (destination, payload) => {
    try {
        const response = await request.post(destination, payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getService = async (destination, payload) => {
    try {
        const response = await request.post(destination, payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { postService };
