import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 *
 * is a LegacyDataProvider
 * will be convert to a DataProvider by convertLegacyDataProvider
 */
const SpringDataProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /* 
    if !MODIFY_MANY {
        convertDataRequestToHTTP -> call API -> convertHTTPResponse
    } 
    else{
        call API
    }
    */

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        options.headers = params.meta?.headers ? params.meta.headers : { 'Content-Type': 'application/json' };
        switch (type) {
            case GET_MANY_REFERENCE:
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const query = {
                    filter: JSON.stringify({ id: params.ids }),
                };
                let idStr = '';
                const queryString = params.ids.map((id) => idStr + `id=${id}`);
                url = `${apiUrl}/${resource}?${idStr}}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';

                // if send form data (multipart/form-data) then map data to FormData
                if (options.headers['Content-Type'] === 'multipart/form-data') {
                    const formData = new FormData();
                    const info = {};
                    Object.keys(params.data).forEach((key) => {
                        if (params.data[key]?.rawFile) {
                            formData.append(key, params.data[key].rawFile);
                        } else if (typeof params.data[key] === 'object') {
                            // may be this is a nested object
                            // if key contains prefix 'id_' then cut it
                            const newKey = key.includes('_') ? key.slice(0, key.indexOf('_')) : key;
                            info[newKey] = info[newKey] ? [...info[newKey], params.data[key]] : [params.data[key]];
                        } else {
                            info[key] = params.data[key];
                        }
                    });
                    formData.append('info', JSON.stringify(info));

                    options.data = formData;
                } else {
                    // else send json
                    options.body = JSON.stringify(params.data);
                }

                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, data } = response;

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: data.data,
                    total: parseInt(data.data.length, 10),
                };
            case CREATE:
            case UPDATE:
            case GET_ONE:
                return { data: data.data };
            default:
                return { data: data };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const user = auth
            ? {
                  authenticated: true,
                  token: `${auth.type} ${auth.token}`,
              }
            : null;

        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map((id) =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    }),
                ),
            ).then((responses) => ({
                data: responses.map((response) => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        else if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map((id) =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    }),
                ),
            ).then((responses) => ({
                data: responses.map((response) => response.json),
            }));
        }
        // Not MODIFIY_MANY
        else {
            const { url, options } = convertDataRequestToHTTP(type, resource, params);

            // Add headers to all requests
            options.user = user;
            options.headers = { ...options.headers, Authorization: user.token };

            // const fetch = async () => {
            //     const response = await httpClient(url, options);
            //     return response;
            // };

            // const response = fetch();

            // return convertHTTPResponse(response, type, resource, params);

            return httpClient(url, options).then((response) => {
                const data = convertHTTPResponse(response, type, resource, params);
                return data;
            });
        }
    };
};

export { SpringDataProvider };
