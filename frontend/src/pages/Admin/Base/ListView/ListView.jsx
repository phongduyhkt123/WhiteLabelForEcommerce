import { Switch } from '@mui/material';
import {
    BulkDeleteButton,
    Datagrid,
    EditButton,
    Form,
    List,
    useDataProvider,
    useRecordContext,
    useRefresh,
    useResourceDefinition,
    useUpdate,
} from 'react-admin';
import { useMutation } from 'react-query';

export const ListView = ({ fields }) => {
    return (
        <List>
            <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
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
    console.log(record);

    const dataProvider = useDataProvider();

    const resource = useResourceDefinition().name;

    const refresh = useRefresh();

    const params = {};
    //check type of record source
    if (typeof record[source] === 'boolean') {
        params[source] = !record[source];
    } else {
        params[source] = record[source] === 'ENABLED' ? 'DISABLED' : 'ENABLED';
    }

    const { mutate, isLoading } = useMutation(
        [resource, 'update', {}],
        () =>
            dataProvider
                .update(resource, {
                    id: record.id,
                    params: params,
                    meta: { method: 'PATCH' },
                })
                .catch((error) => {}),
        {
            onSuccess: () => {
                refresh();
            },
        },
    );

    rest.onChange = () => {
        mutate();
    };

    //check type of record source
    if (typeof record[source] === 'boolean') {
        return <Element source={source} {...rest} />;
    }

    return <Switch defaultChecked={record[source] === 'ENABLED'} {...rest} />;
};

const PostBulkActionButtons = () => (
    <>
        {/* default bulk delete action */}
        <BulkDeleteButton mutationMode="pessimistic" />
    </>
);
