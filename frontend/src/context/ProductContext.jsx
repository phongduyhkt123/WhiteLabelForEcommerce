import { useMediaQuery } from '@mui/material';
import { createContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState();

    const ectx = {
        quantity,
        setQuantity,
        variant,
        setVariant,
    };

    return <ProductContext.Provider value={ectx}>{children}</ProductContext.Provider>;
};

export { ProductProvider, ProductContext };
