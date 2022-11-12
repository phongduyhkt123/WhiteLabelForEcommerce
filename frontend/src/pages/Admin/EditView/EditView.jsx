import { Edit, SimpleForm } from 'react-admin';

export const EditView = ({ fields }) => (
    <Edit>
        <SimpleForm>
            {fields.map(({ Element, ...rest }, index) => {
                return <Element key={index} {...rest} />;
            })}
        </SimpleForm>
    </Edit>
);
