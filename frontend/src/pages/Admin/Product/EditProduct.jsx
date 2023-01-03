import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    ArrayInput,
    NumberInput,
    SimpleFormIterator,
    ImageInput,
    ImageField,
    useRecordContext,
    useUpdate,
} from 'react-admin';

const PreviewImage = ({ source }) => {
    let record = useRecordContext();
    if (typeof record == 'string') {
        record = {
            [source]: record,
        };
    }
    return <ImageField record={record} source={source} />;
};

export const EditProduct = () => {
    const [update, { isLoading: isSubmitting }] = useUpdate();

    return (
        <Edit mutationOptions={{ meta: { headers: { 'Content-Type': 'multipart/form-data' } } }}>
            <SimpleForm sx={{ backgroundColor: 'background.paper' }}>
                <TextInput source="name" inputProps={{ sx: { p: '1rem' } }} />
                <ImageInput source="avatar" accept="image/*">
                    <PreviewImage source="src" />
                </ImageInput>
                <TextInput source="description" multiline rows={5} inputProps={{ sx: { p: '1rem' } }} />
                <ImageInput source="images" accept="image/*" multiple>
                    <ImageField source="src" title="title" />
                </ImageInput>
                <Accordion sx={{ bgcolor: 'background.default' }}>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Variants</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ArrayInput source="variations" sx={{ m: 2 }}>
                            <SimpleFormIterator inline sx={{ m: 2 }} fullWidth>
                                <TextInput
                                    source="variationName"
                                    helperText={false}
                                    inputProps={{ sx: { p: '1rem' } }}
                                    fullWidth
                                />
                                <NumberInput
                                    source="price"
                                    helperText={false}
                                    inputProps={{ sx: { p: '1rem' } }}
                                    fullWidth
                                />
                                <NumberInput
                                    source="availableQuantity"
                                    helperText={false}
                                    inputProps={{ sx: { p: '1rem' } }}
                                    fullWidth
                                />

                                <ImageInput source="avatar" accept="image/*">
                                    <ImageField source="url" title="title" />
                                </ImageInput>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </AccordionDetails>
                </Accordion>
            </SimpleForm>
        </Edit>
    );
};
