const { TextInput, ImageField, ImageInput, NumberInput } = require('react-admin');

export const productCreate = [
    {
        source: 'name',
        Element: TextInput,
        type: 'text',
    },
    {
        type: 'sub',
        label: 'variations',
        quantity: 1,
        fields: [
            {
                source: 'variations.variationName',
                label: 'variation name',
                Element: TextInput,
                type: 'text',
            },
            {
                source: 'variations.tier',
                label: 'tier',
                Element: TextInput,
                type: 'text',
            },
            {
                source: 'variations.price',
                label: 'price',
                Element: NumberInput,
                type: 'text',
            },
            {
                source: 'variations.availableQuantity',
                label: 'available quantity',
                Element: NumberInput,
                type: 'text',
            },
            {
                source: 'variations.discount',
                label: 'discount',
                Element: NumberInput,
                type: 'text',
            },
        ],
    },
    {
        source: 'description',
        Element: TextInput,
        type: 'text',
    },
    {
        source: 'idCategory',
        Element: NumberInput,
        type: 'text',
    },
    {
        source: 'avatar',
        Element: ImageInput,
        type: 'image',
    },
    {
        source: 'images',
        Element: ImageInput,
        type: 'image',
        quantity: 1,
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
