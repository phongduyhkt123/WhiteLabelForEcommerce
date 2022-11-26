import { Button, Grid } from '@mui/material';
import times from 'lodash.times';
import { useState } from 'react';
import { Create, ImageField, SimpleForm, TextInput } from 'react-admin';

export const CreateView = ({ fields, headers }) => {
    const [fieldsState, setFieldsState] = useState(fields);

    const handleAdd = (index) => {
        fieldsState[index].quantity += 1;

        setFieldsState([...fieldsState]);
    };

    return (
        <Create mutationOptions={{ meta: { headers: headers } }}>
            <SimpleForm>
                <Grid container>
                    {fieldsState.map(({ Element, type, label, quantity, ...rest }, index) =>
                        renderElement(Element, type, label, quantity, index, handleAdd, rest),
                    )}
                </Grid>
            </SimpleForm>
        </Create>
    );
};

const renderElement = (Element, type, label, quantity, index, handleAdd, rest) => {
    if (type === 'sub') {
        return (
            // if type is sub, render sub fields (see product-create-field)
            withQuantity(
                (prefix) => (
                    <ElementWithSub Element={Element} type={type} label={label} prefix={prefix || ''} {...rest} />
                ),
                quantity,
                index,
                handleAdd,
            )
        );
    } else if (type === 'image') {
        return withQuantity(
            (prefix) => (
                <Element {...rest} source={`${prefix || ''}${rest.source}`} style={{ display: 'flex' }}>
                    <ImageField source="src" title="title" />
                </Element>
            ),
            quantity,
            index,
            handleAdd,
        );
    } else {
        return withQuantity(
            (prefix) => <Element {...rest} source={`${prefix || ''}${rest.source}`} style={{ display: 'flex' }} />,
            quantity,
            index,
            handleAdd,
        );
    }
};

const ElementWithSub = ({ Element, type, label, prefix, ...rest }) => (
    <div style={{ border: '1px solid #000' }}>
        <h3>{label}</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rest.fields.map(({ Element, source, ...rest }, i) => (
                <Element key={i} {...rest} source={`${prefix}${source}`} />
            ))}
        </div>
    </div>
);

// edit styles here
const withQuantity = (Element, quantity, index, handleAdd) => {
    return quantity ? (
        <Grid item xs={10} key={index}>
            <Grid container spacing={2}>
                {times(quantity, (index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        {quantity > 1 ? Element(index + '_') : Element()}
                    </Grid>
                ))}
            </Grid>
            <Button variant="outlined" color="primary" onClick={() => handleAdd(index)}>
                Add
            </Button>
        </Grid>
    ) : (
        <Grid item xs={10} key={index}>
            {Element()}
        </Grid>
    );
};
