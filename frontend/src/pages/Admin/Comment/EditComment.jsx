import { DeleteButton, Edit, SaveButton, SimpleForm, Toolbar } from 'react-admin';

export const EditComment = ({ fields }) => {
    return (
        <Edit>
            <SimpleForm toolbar={<CustomToolbar />}>
                {fields.map(({ Element, readOnly, type, source, ...rest }, index) => {
                    return renderElement({ Element, type, source, readOnly, index, rest });
                })}
            </SimpleForm>
        </Edit>
    );
};

const renderElement = ({ Element, type, index, readOnly, source, rest }) => {
    return <Element {...rest} source={source} key={index} inputProps={{ readOnly: true }} />;
};

const CustomToolbar = (props) => (
    <Toolbar {...props} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SaveButton />
        <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
);
