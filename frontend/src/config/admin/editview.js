const { TextInput, ImageField, SelectInput, ArrayField, TextField } = require('react-admin');

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

/**
 * Order Edit
 */
export const orderEdit = [
    {
        source: 'id',
        label: 'ID',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'user.fullname',
        label: 'Buyer Name',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'user.phone',
        label: 'Buyer Phone',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'addressDetail',
        label: 'Delivery Address',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'receiverName',
        label: 'Receiver Name',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'receiverPhone',
        label: 'Receiver Phone',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'price',
        label: 'PRICE',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'shipPrice',
        label: 'SHIP PRICE',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'total',
        label: 'TOTAL PRICE',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'status',
        label: 'STATUS',
        Element: SelectInput,
        readOnly: true,
        type: 'select',
    },
    {
        source: 'createTime',
        label: 'CREATED AT',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'paymentMethod',
        label: 'PAYMENT METHOD',
        Element: TextInput,
        readOnly: true,
    },
    {
        source: 'orderDetails',
        label: 'ORDER DETAILS',
        Element: ArrayField,
        readOnly: true,
        type: 'sub',
        fields: [
            {
                source: 'productVariation.avatar.url',
                label: 'IMAGE',
                Element: ImageField,
                readOnly: true,
            },
            {
                source: 'productVariation.product.name',
                label: 'PRODUCT NAME',
                Element: TextField,
                readOnly: true,
            },
            {
                source: 'productVariation.variationName',
                label: 'VARIATION NAME',
                Element: TextField,
                readOnly: true,
            },
            {
                source: 'unitPrice',
                label: 'UNIT PRICE',
                Element: TextField,
                readOnly: true,
            },
            {
                source: 'quantity',
                label: 'QUANTITY',
                Element: TextField,
                readOnly: true,
            },
        ],
    },
];
