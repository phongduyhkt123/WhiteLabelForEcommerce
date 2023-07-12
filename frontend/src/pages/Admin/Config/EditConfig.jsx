import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Form, Title, useGetOne, useUpdate } from 'react-admin';
import { Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Drawer from '~/components/Drawer/Drawer';
import { AlertContext, AlertTypes } from '~/context/AlertContext';
import { downloadFile } from '~/utils/util';
import ConfigDialog from './ConfigDialog';

export const EditConfig = () => {
    const { id } = useParams();
    const { isLoading, data } = useGetOne('config', { id });
    const [update, { isLoading: isSubmitting }] = useUpdate();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState('');

    const { setMessage, setShowMessage } = useContext(AlertContext);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        try {
            const testIfJson = JSON.parse(data.value);
            if (typeof testIfJson !== 'object') {
                setMessage({
                    text: 'Invalid JSON 1',
                    severity: 'error',
                    type: AlertTypes.SNACKBAR_LARGE,
                });
            } else {
                update(
                    'config',
                    { id, data },
                    {
                        onSuccess: () => {
                            setMessage({
                                text: 'Config updated',
                                severity: 'success',
                                type: AlertTypes.SNACKBAR_LARGE,
                            });
                            navigate('/admin/config');
                        },
                    },
                );
            }
        } catch (error) {
            setMessage({
                text: 'Invalid JSON',
                severity: 'error',
                type: AlertTypes.SNACKBAR_LARGE,
            });
        }
        setShowMessage(true);
    };

    const onChange2 = ({ config, value, stack = [], key }) => {
        if (stack.length > 1) {
            if (!Array.isArray(config)) {
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
                config[stack[0]] = onChange2({
                    config: config[stack[0]],
                    value,
                    stack: stack.slice(1),
                    key,
                });
                return config;
            }
        } else {
            if (!Array.isArray(config)) {
                return {
                    ...config,
                    [stack[0]]: { ...config[stack[0]], [key]: value },
                };
            } else {
                config[stack[0]] = { ...config[stack[0]], [key]: value };
                return config;
            }
        }
    };

    const exportToJson = (e) => {
        e.preventDefault();
        downloadFile({
            data: JSON.stringify(JSON.parse(data.value), null, 2),
            fileName: 'config.json',
            fileType: 'text/json',
        });
    };

    const render = ({ config, parent, key, field, stack = [] }) => {
        if (typeof parent[key] === 'object') {
            const tempStack = [...stack];
            return (
                <Drawer title={key} key={key}>
                    {Object.keys(parent[key]).map((item) => {
                        return render({ config, parent: parent[key], key: item, field, stack: [...tempStack, key] });
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

                                return (
                                    <>
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

                                            <label htmlFor="input-file">
                                                <Button variant="outlined" color="primary" component="span">
                                                    <Typography variant="h6" color="primary" m="auto">
                                                        Upload json
                                                    </Typography>
                                                </Button>
                                            </label>
                                            <input
                                                type="file"
                                                id="input-file"
                                                accept="application/json"
                                                style={{ display: 'none' }}
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        const text = e.target.result;
                                                        field.onChange(text);
                                                    };
                                                    reader.readAsText(file);
                                                }}
                                            />

                                            <Button variant="outlined" color="primary" onClick={(e) => exportToJson(e)}>
                                                <Typography variant="h6" color="primary" m="auto">
                                                    Download json
                                                </Typography>
                                            </Button>
                                        </Box>

                                        <ConfigDialog
                                            open={openDialog}
                                            onCancel={() => {
                                                setOpenDialog(false);
                                                setDialogValue(JSON.stringify(config, null, 2));
                                            }}
                                            onSubmit={() => {
                                                try {
                                                    const testIfJson = JSON.parse(data);
                                                    if (typeof testIfJson == 'object') {
                                                        field.onChange(dialogValue);
                                                        setOpenDialog(false);
                                                        return;
                                                    } else {
                                                        setMessage({
                                                            text: 'Invalid JSON 1',
                                                            severity: 'error',
                                                            type: AlertTypes.SNACKBAR_LARGE,
                                                        });
                                                    }
                                                } catch {
                                                    setMessage({
                                                        text: 'Invalid JSON 2',
                                                        severity: 'error',
                                                        type: AlertTypes.SNACKBAR_LARGE,
                                                    });
                                                }
                                                setShowMessage(true);
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
