const {
    TextInput,
    ImageField,
    SelectInput,
    ArrayField,
    TextField,
    FunctionField,
    BooleanInput,
} = require('react-admin');

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
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'username',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'fullname',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'email',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'role',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'isEnabled',
        Element: BooleanInput,
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

export const configEdit = [
    {
        source: 'id',
        name: 'ID',
        Element: TextInput,
    },
    {
        source: 'isSelected',
        name: 'SELECTED',
        Element: TextInput,
    },
    {
        name: 'value',
        Element: FunctionField,
        render: (record) => record.value,
    },
];

export const categoryEdit = [
    {
        source: 'id',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'name',
        Element: TextInput,
    },
];

export const commentEdit = [
    {
        source: 'id',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'description',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'rate',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'userId',
        readOnly: true,
        Element: TextInput,
    },
    {
        source: 'productId',
        readOnly: true,
        Element: TextInput,
    },
];
