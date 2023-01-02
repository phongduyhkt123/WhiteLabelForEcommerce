import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ArrayField, Datagrid, Edit, SelectInput, SimpleForm, useNotify } from 'react-admin';
import { orderStatus } from '~/config';
import * as request from '~/utils/httpRequest';

export const EditOrder = ({ fields }) => {
    const notify = useNotify();
    const handleSubmit = (e) => {
        request
            .put(`admin/order/${e.id}?new-status=${e.status}`)
            .then((res) => {
                notify(`Update Success`, { type: 'success' });
            })
            .catch((err) => {
                notify(`Update Failed`, { type: 'error' });
            });
    };

    return (
        <Edit>
            <SimpleForm onSubmit={handleSubmit}>
                {fields.map(({ Element, readOnly, type, source, ...rest }, index) => {
                    return renderElement({ Element, type, source, readOnly, index, rest });
                })}
            </SimpleForm>
        </Edit>
    );
};

const renderElement = ({ Element, type, index, readOnly, source, rest }) => {
    if (type === 'sub') {
        return (
            <Box key={index}>
                <Typography variant="h6" m={2}>
                    {rest.label}
                </Typography>

                <ArrayField source={source}>
                    <Datagrid bulkActionButtons={false}>
                        {rest.fields.map(({ Element, readOnly, type, source, ...rest }, index) => {
                            return <Element {...rest} source={source} key={index} sx={{ fontSize: 12 }} />;
                        })}
                    </Datagrid>
                </ArrayField>
            </Box>
        );
    } else if (type === 'select') {
        const choices = Object.keys(orderStatus.items).map((key) => {
            return { id: key, name: orderStatus.items[key].name };
        });
        return <SelectInput {...rest} source={source} choices={choices} key={index} />;
    } else {
        return <Element {...rest} source={source} key={index} inputProps={{ readOnly: true }} />;
    }
};
