const { TextInput, ImageField } = require('react-admin');

export const productEdit = [
    {
        source: 'id',
        name: 'ID',
        Element: TextInput,
    },
    {
        source: 'name',
        name: 'NAME',
        Element: TextInput,
    },
    {
        source: 'category.name',
        name: 'CATEGORY',
        Element: TextInput,
    },
    {
        source: 'status',
        name: 'STATUS',
        Element: TextInput,
    },
    {
        source: 'avatar',
        name: '',
        Element: ImageField,
    },
];

/**
 * userEdit
 */
export const userEdit = [
    {
        source: 'id',
        name: 'ID',
        Element: TextInput,
    },
    {
        source: 'username',
        name: 'USERNAME',
        Element: TextInput,
    },
    {
        source: 'fullname',
        name: 'NAME',
        Element: TextInput,
    },
    {
        source: 'role.name',
        name: 'ROLE',
        Element: TextInput,
    },
    {
        source: 'status',
        name: 'STATUS',
        Element: TextInput,
    },
];

/**
 * Buyer Rank Edit
 */
export const buyerrankEdit = [
    {
        source: 'id',
        name: 'ID',
        Element: TextInput,
    },
    {
        source: 'name',
        name: 'NAME',
        Element: TextInput,
    },
    {
        name: 'Discount',
        Element: TextInput,
        source: 'discountRate',
    },
];
