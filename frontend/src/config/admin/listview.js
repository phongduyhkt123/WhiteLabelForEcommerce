const { TextField, ImageField, FunctionField, BooleanInput } = require('react-admin');

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
        source: 'avatar',
        name: '',
        Element: ImageField,
    },
    {
        source: 'status',
        name: 'STATUS',
        editable: true,
        Element: BooleanInput,
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
        source: 'role',
        name: 'ROLE',
        Element: TextField,
    },
    {
        source: 'isEnabled',
        name: 'STATUS',
        editable: true,
        Element: BooleanInput,
    },
];

/**
 * Category List
 */
export const categoryList = [
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
        source: 'status',
        name: 'STATUS',
        editable: true,
        Element: BooleanInput,
    },
];

/**
 * Buyer Rank List
 */
export const orderList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'createTime',
        name: 'CREATE TIME',
        Element: TextField,
    },
    {
        source: 'paymentMethod',
        name: 'PAYMENT METHOD',
        Element: TextField,
    },
    {
        source: 'total',
        name: 'TOTAL',
        Element: TextField,
    },
    {
        source: 'status',
        name: 'STATUS',
        Element: TextField,
    },
];

export const configList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'isSelected',
        editable: true,
        Element: BooleanInput,
    },
];

export const commentList = [
    {
        source: 'id',
        name: 'ID',
        Element: TextField,
    },
    {
        source: 'description',
        name: 'DESCRIPTION',
        Element: TextField,
    },
    {
        source: 'rate',
        name: 'RATE',
        Element: TextField,
    },
    {
        source: 'productId',
        name: 'PRODUCT ID',
        Element: TextField,
    },
    {
        source: 'userId',
        name: 'USER ID',
        Element: TextField,
    },
];
