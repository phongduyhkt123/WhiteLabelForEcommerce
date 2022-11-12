import { Datagrid, List } from 'react-admin';

export const ListView = ({ fields }) => {
    return (
        <List>
            <Datagrid rowClick="show">
                {fields.map(({ Element, ...rest }, index) => {
                    return <Element key={index} {...rest} />;
                })}
            </Datagrid>
        </List>
    );
};
