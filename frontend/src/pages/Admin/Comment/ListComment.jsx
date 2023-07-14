import { BulkDeleteButton, Datagrid, EditButton, List } from 'react-admin';

export const ListComment = ({ fields }) => {
    return (
        <List>
            <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
                {fields.map(({ Element, ...rest }, index) => {
                    return <Element key={index} {...rest} sx={{ fontSize: '14px' }} />;
                })}
                <EditButton />
            </Datagrid>
        </List>
    );
};

const PostBulkActionButtons = () => (
    <>
        {/* default bulk delete action */}
        <BulkDeleteButton />
    </>
);
