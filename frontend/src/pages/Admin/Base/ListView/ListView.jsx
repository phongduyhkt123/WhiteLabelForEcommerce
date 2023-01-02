import { Switch } from '@mui/material';
import { useState } from 'react';
import { Datagrid, EditButton, Form, List, useRecordContext } from 'react-admin';

export const ListView = ({ fields }) => {
    return (
        <List>
            <Datagrid>
                {fields.map(({ Element, editable, ...rest }, index) => {
                    if (editable) {
                        return (
                            <Form key={index}>
                                <CustomSwitch Element={Element} {...rest} />
                            </Form>
                        );
                    }
                    return <Element key={index} {...rest} sx={{ fontSize: '14px' }} />;
                })}
                <EditButton />
            </Datagrid>
        </List>
    );
};

const CustomSwitch = ({ source, Element, ...rest }) => {
    const record = useRecordContext();

    //check type of record source
    if (typeof record[source] === 'boolean') {
        return <Element source={source} {...rest} />;
    }

    return <Switch defaultChecked={record[source] === 'ENABLED'} {...rest} />;
};
