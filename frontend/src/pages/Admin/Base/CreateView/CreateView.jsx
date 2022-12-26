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
                        renderElement({ Element, type, label, quantity, index, handleAdd, rest }),
                    )}
                </Grid>
            </SimpleForm>
        </Create>
    );
};

const renderElement = ({ type, Element, label, quantity, index, prefix: prefix_, handleAdd, rest }) => {
    // prefix_ is passed from renderElement in ElementWithSub
    console.log(prefix_);
    if (type === 'sub') {
        // sub fields
        return (
            // if type is sub, render sub fields (see product-create-field)
            // prefix is used to group fields together, prefix will be added to name of field
            withQuantity(
                (prefix) => <ElementWithSub Element={Element} label={label} prefix={prefix || ''} {...rest} />,
                quantity,
                index,
                handleAdd,
            )
        );
    } else {
        // normal fields
        return withQuantity(
            (prefix) => (
                <Element {...rest} source={`${prefix || prefix_ || ''}${rest.source}`} style={{ display: 'flex' }}>
                    {type === 'image' && <ImageField source="src" title="title" />}
                </Element>
            ),
            quantity,
            index,
            handleAdd,
        );
    }
};

// element with in sub fields
const ElementWithSub = ({ Element, label, prefix, ...rest }) => {
    // need to add this prefix to source
    return (
        <div style={{ border: '1px solid #000' }}>
            <h3>{label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {rest.fields.map(({ Element, type, ...rest }, index) =>
                    renderElement({ Element, type, index, prefix, label, rest }),
                )}
            </div>
        </div>
    );
};

// edit styles here
// index + '_' is prefix for sub fields
const withQuantity = (Element, quantity, index, handleAdd) => {
    return quantity ? ( // have quantity
        <Grid item xs={10} key={index}>
            <Grid container spacing={2}>
                {times(quantity, (index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        {Element(index + '_')}
                    </Grid>
                ))}
            </Grid>
            <Button variant="outlined" color="primary" onClick={() => handleAdd(index)}>
                Add
            </Button>
        </Grid>
    ) : (
        // dont have quantity
        <Grid item xs={10} key={index}>
            {Element()}
        </Grid>
    );
};
