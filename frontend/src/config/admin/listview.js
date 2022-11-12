const { TextField, ImageField, FunctionField } = require('react-admin');

export const productList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'name',
        name: 'NAME',
        Element: TextField,
    },
    {
        source: 'category.name',
        name: 'CATEGORY',
        Element: TextField,
    },
    {
        source: 'status',
        name: 'STATUS',
        Element: TextField,
    },
    {
        source: 'avatar',
        name: '',
        Element: ImageField,
    },
];

/**
 * userList
 */
export const userList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'username',
        name: 'USERNAME',
        Element: TextField,
    },
    {
        source: 'fullname',
        name: 'NAME',
        Element: TextField,
    },
    {
        source: 'role.name',
        name: 'ROLE',
        Element: TextField,
    },
    {
        source: 'status',
        name: 'STATUS',
        Element: TextField,
    },
];

/**
 * Buyer Rank List
 */
export const buyerrankList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'name',
        name: 'NAME',
        Element: TextField,
    },
    {
        label: 'Discount',
        Element: FunctionField,
        render: (record) => {
            return `${record.discountRate * 100}%`;
        },
    },
];
