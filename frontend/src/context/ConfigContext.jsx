import { createContext, useEffect, useState } from 'react';
import { get } from '~/utils/httpRequest';

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState();

    useEffect(() => {
        get('/config').then((res) => {
            const config = res.data.data.find((item) => item.isSelected === true);
            setConfig(JSON.parse(config.value));
        });
    }, []);

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export { ConfigProvider, ConfigContext };
