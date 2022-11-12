const { TextInput, ImageField } = require('react-admin');

export const productCreate = [
    {
        source: 'name',
        Element: TextInput,
    },
    {
        source: 'category.name',
        Element: TextInput,
    },
    {
        source: 'status',
        Element: TextInput,
    },
    {
        source: 'avatar',
        Element: ImageField,
    },
];

/**
 * userEdit
 */
export const userCreate = [
    {
        source: 'username',
        Element: TextInput,
    },
    {
        source: 'fullname',
        Element: TextInput,
    },
    {
        source: 'role.name',
        Element: TextInput,
    },
    {
        source: 'status',
        Element: TextInput,
    },
];

/**
 * Buyer Rank Edit
 */
export const buyerrankCreate = [
    {
        source: 'name',
        Element: TextInput,
    },
    {
        Element: TextInput,
        source: 'discountRate',
    },
];
