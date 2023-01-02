import { createContext, useEffect, useState } from 'react';
import { get } from '~/utils/httpRequest';

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState();

    useEffect(() => {
        get('/config').then((res) => {
            setConfig(JSON.parse(res.data.data[0].value.replaceAll('\\"', '"')));
        });
    }, []);

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export { ConfigProvider, ConfigContext };
