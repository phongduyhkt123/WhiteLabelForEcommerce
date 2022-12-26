import { useEffect, useState } from 'react';

const useTitle = (title) => {
    const [title_, setTitle] = useState(title);
    useEffect(() => {
        document.title = title_;
    }, [title_]);
    return [setTitle];
};

export default useTitle;
