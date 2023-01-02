const { TextInput, ImageField, ImageInput, NumberInput } = require('react-admin');

export const productCreate = [
    {
        source: 'name',
        Element: TextInput,
        type: 'text',
    },
    {
        source: 'description',
        Element: TextInput,
        type: 'text',
    },
    {
        source: 'categoryId',
        Element: NumberInput,
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
            {
                source: 'imagesVar',
                label: 'Image',
                Element: ImageInput,
                type: 'image',
            },
        ],
    },
    {
        source: 'avatar',
        Element: ImageInput,
        type: 'image',
    },
    {
        source: 'imagesPro',
        Element: ImageInput,
        type: 'image',
        quantity: 1,
    },
];

/**
 * Category Create
 */
export const categoryCreate = [
    {
        source: 'name',
        Element: TextInput,
    },
];
