import { Create, SimpleForm } from 'react-admin';

export const CreateView = ({ fields }) => (
    <Create>
        <SimpleForm>
            {fields.map(({ Element, ...rest }, index) => {
                return <Element key={index} {...rest} />;
            })}
        </SimpleForm>
    </Create>
);
