import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useGetOne, useUpdate, Title, TextInput, Form } from 'react-admin';
import { Card, TextField, Button, Stack } from '@mui/material';

export const EditConfig = () => {
    const { id } = useParams();
    const { handleSubmit, reset, control } = useForm();
    const { isLoading, data } = useGetOne('config', { id });
    const [update, { isLoading: isSubmitting }] = useUpdate();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        update(
            'config',
            { id, data },
            {
                onSuccess: () => {
                    navigate('/admin/config');
                },
            },
        );
    };

    if (isLoading) return null;
    return (
        <div>
            <Title title="Config Edition" />
            <Card sx={{ mt: 4 }}>
                <Form record={data} onSubmit={onSubmit}>
                    <Stack spacing={2} p={3}>
                        <Controller name="id" render={({ field }) => <TextField label="Id" {...field} />} />
                        <Controller
                            name="value"
                            render={({ field }) => {
                                const config = JSON.parse(field.value?.replaceAll('\\"', '"') || '{}');

                                return Object.keys(config).map((item) => {
                                    return (
                                        <TextField
                                            label={item}
                                            multiline
                                            rows={20}
                                            key={item}
                                            defaultValue={JSON.stringify(config[item], null, 2)}
                                            onChange={(e) => {
                                                // console.log(
                                                //     JSON.stringify(
                                                //         {
                                                //             [item]: JSON.parse(e.target.value),
                                                //         },
                                                //         null,
                                                //         2,
                                                //     ),
                                                // );
                                                field.onChange(
                                                    JSON.stringify(
                                                        {
                                                            ...config,
                                                            [item]: JSON.parse(e.target.value),
                                                        },
                                                        null,
                                                        2,
                                                    ),
                                                );
                                            }}
                                        />
                                    );
                                });
                            }}
                        />

                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Stack>
                </Form>
            </Card>
        </div>
    );
};
