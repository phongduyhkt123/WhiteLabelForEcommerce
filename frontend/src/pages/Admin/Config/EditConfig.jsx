import { Key } from '@mui/icons-material';
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { Form, Title, useGetOne, useRecordContext, useUpdate } from 'react-admin';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Drawer from '~/components/Drawer/Drawer';
import ConfigDialog from './ConfigDialog';
import { useState } from 'react';

export const EditConfig = () => {
    const { id } = useParams();
    const { isLoading, data } = useGetOne('config', { id });
    const [update, { isLoading: isSubmitting }] = useUpdate();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState('');
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

    const onChange = ({ config, value, item1, item2, item3 }) => {
        return JSON.stringify(
            {
                ...config,
                [item1]: {
                    ...config[item1],
                    [item2]: {
                        ...config['routes'][item2],
                        [item3]: value,
                    },
                },
            },
            null,
            2,
        );
    };

    const onChange2 = ({ config, value, stack = [], key }) => {
        console.log('stack', stack);
        if (stack.length > 1) {
            return {
                ...config,
                [stack[0]]: onChange2({
                    config: config[stack[0]],
                    value,
                    stack: stack.slice(1),
                    key,
                }),
            };
        } else {
            return {
                ...config,
                [stack[0]]: { ...config[stack[0]], [key]: value },
            };
        }
    };

    const render = ({ config, parent, key, field, stack = [] }) => {
        if (typeof parent[key] === 'object') {
            stack.push(key);
            return (
                <Drawer title={key} key={key}>
                    {Object.keys(parent[key]).map((item) => {
                        // key === 'groupProducts' && console.log('stack', stack);
                        stack[1] === 'groupProducts' && console.log('stack', stack);
                        return render({ config, parent: parent[key], key: item, field, stack: [...stack, item] });
                    })}
                </Drawer>
            );
        } else {
            return (
                <Box key={key}>
                    <Typography variant="h6" color="primary" m="auto">
                        {key}
                    </Typography>
                    <TextField
                        label={key}
                        multiline
                        key={key}
                        defaultValue={parent[key]}
                        onChange={(e) => {
                            const change = JSON.stringify(
                                onChange2({
                                    config: config,
                                    value: e.target.value,
                                    stack,
                                    key,
                                }),
                            );
                            field.onChange(change);
                        }}
                    />
                </Box>
            );
        }
    };

    if (isLoading) return null;
    return (
        <div>
            <Title title="Config Edition" />
            <Card sx={{ mt: 4 }}>
                <Form record={data} onSubmit={onSubmit}>
                    <Stack spacing={2} p={3}>
                        <Controller
                            name="value"
                            render={({ field }) => {
                                const config = JSON.parse(field.value);

                                console.log('config', config);
                                console.log('change', config['routes']);

                                return (
                                    <>
                                        {/* <Typography variant="h6" color="primary" m="auto">
                                            Routes
                                        </Typography>
                                        {console.log(Object.keys(config['routes']))}
                                        {Object.keys(config['routes']).map((item) => {
                                            return (
                                                <>
                                                    <Typography variant="h6" color="primary" m="auto">
                                                        {item}
                                                    </Typography>
                                                    {Object.keys(config['routes'][item]).map((i) => {
                                                        return (
                                                            <TextField
                                                                label={i}
                                                                multiline
                                                                key={i}
                                                                defaultValue={config['routes'][item][i]}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    field.onChange(
                                                                        onChange({
                                                                            config: config,
                                                                            value: e.target.value,
                                                                            item1: 'routes',
                                                                            item2: item,
                                                                            item3: i,
                                                                        }),
                                                                    );
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </>
                                            );
                                        })} */}

                                        <Box sx={{ mt: 4 }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                sx={{ mr: 2 }}
                                                onClick={() => setOpenDialog(true)}
                                            >
                                                <Typography variant="h6" color="primary" m="auto">
                                                    Edit as JSON
                                                </Typography>
                                            </Button>

                                            <Button variant="outlined" color="primary" onClick={() => {}}>
                                                <Typography variant="h6" color="primary" m="auto">
                                                    Select a theme
                                                </Typography>
                                            </Button>
                                        </Box>

                                        <ConfigDialog
                                            open={openDialog}
                                            onCancel={() => setOpenDialog(false)}
                                            onSubmit={() => {
                                                field.onChange(dialogValue);
                                                setOpenDialog(false);
                                            }}
                                        >
                                            <TextField
                                                autoFocus
                                                type="text"
                                                required
                                                fullWidth
                                                multiline
                                                value={dialogValue ? dialogValue : JSON.stringify(config, null, 2)}
                                                onChange={(e) => setDialogValue(e.target.value)}
                                            />
                                        </ConfigDialog>

                                        <Drawer title="ROUTES">
                                            {Object.keys(config['routes']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['routes'],
                                                    key,
                                                    field,
                                                    stack: ['routes'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="GLOBAL">
                                            {Object.keys(config['global']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['global'],
                                                    key,
                                                    field,
                                                    stack: ['global'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="FOOTER">
                                            {Object.keys(config['footer']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['footer'],
                                                    key,
                                                    field,
                                                    stack: ['footer'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="HEADER">
                                            {Object.keys(config['header']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['header'],
                                                    key,
                                                    field,
                                                    stack: ['header'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="HOME">
                                            {Object.keys(config['home']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['home'],
                                                    key,
                                                    field,
                                                    stack: ['home'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="SIGNIN">
                                            {Object.keys(config['signin']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['signin'],
                                                    key,
                                                    field,
                                                    stack: ['signin'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="SIGNUP">
                                            {Object.keys(config['signup']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['signup'],
                                                    key,
                                                    field,
                                                    stack: ['signup'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="PAYMENTMETHODS">
                                            {Object.keys(config['paymentMethods']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['paymentMethods'],
                                                    key,
                                                    field,
                                                    stack: ['paymentMethods'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="CART">
                                            {Object.keys(config['cart']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['cart'],
                                                    key,
                                                    field,
                                                    stack: ['cart'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="PRODUCT">
                                            {Object.keys(config['product']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['product'],
                                                    key,
                                                    field,
                                                    stack: ['product'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="SINGLEPRODUCT">
                                            {Object.keys(config['singleProduct']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['singleProduct'],
                                                    key,
                                                    field,
                                                    stack: ['singleProduct'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="PRODUCTCARD">
                                            {Object.keys(config['productCard']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['productCard'],
                                                    key,
                                                    field,
                                                    stack: ['productCard'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="DELIVERYADDRESS">
                                            {Object.keys(config['deliveryAddress']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['deliveryAddress'],
                                                    key,
                                                    field,
                                                    stack: ['deliveryAddress'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="CHECKOUT">
                                            {Object.keys(config['checkout']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['checkout'],
                                                    key,
                                                    field,
                                                    stack: ['checkout'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="ORDER">
                                            {Object.keys(config['order']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['order'],
                                                    key,
                                                    field,
                                                    stack: ['order'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="PROFILE">
                                            {Object.keys(config['profile']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['profile'],
                                                    key,
                                                    field,
                                                    stack: ['profile'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="PROFILESIDEBAR">
                                            {Object.keys(config['profileSideBar']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['profileSideBar'],
                                                    key,
                                                    field,
                                                    stack: ['profileSideBar'],
                                                });
                                            })}
                                        </Drawer>

                                        <Drawer title="ORDERSTATUS">
                                            {Object.keys(config['orderStatus']).map((key) => {
                                                return render({
                                                    config: config,
                                                    parent: config['orderStatus'],
                                                    key,
                                                    field,
                                                    stack: ['orderStatus'],
                                                });
                                            })}
                                        </Drawer>
                                    </>
                                );
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
