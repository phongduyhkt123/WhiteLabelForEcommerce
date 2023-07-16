import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const useSearchParams = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));

    useEffect(() => {
        setSearchParams(new URLSearchParams(location.search));
    }, [location.search]);

    const updateSearchParams = (newParams) => {
        const params = new URLSearchParams(newParams);
        history.push(`?${params.toString()}`);
    };

    return [searchParams, updateSearchParams];
};

export default useSearchParams;
