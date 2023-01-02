const { useContext, useEffect, useState } = require('react');
const { ConfigContext } = require('~/context/ConfigContext');

const useConfig = () => {
    const [config, setConfig] = useState();
    const c = useContext(ConfigContext);

    useEffect(() => {
        setConfig(c);
    }, [c]);

    return c;
};

export default useConfig;
