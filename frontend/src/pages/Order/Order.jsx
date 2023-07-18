import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination,
    Rating,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import times from 'lodash.times';
import { useContext, useState } from 'react';
import { CartItemSkeleton } from '~/components/Skeleton';
import Title from '~/components/Title/Title';
import { ConfigContext } from '~/context/ConfigContext';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';
import { useSearchParams } from 'react-router-dom';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import { AlertContext, AlertTypes } from '~/context/AlertContext';

const Order = ({ title }) => {
    const { routes: route, orderStatus } = useContext(ConfigContext);
    const { setMessage, setShowMessage } = useContext(AlertContext);

    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [comment, setComment] = useState({ productVariationId: 0, rate: 5, description: 'Good' });

    const [selectedOrder, setSelectedOrder] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();

    const orderStatusList = Object.keys(orderStatus.items).map((key) => {
        return { status: key, name: orderStatus.labels[orderStatus.items[key].name] };
    });

    const [active, setActive] = useState(searchParams.get('status') || orderStatusList[0].status);

    const {
        data: orders,
        setData: setOrders,
        loaded,
    } = request.useAxios({
        url: route.orderAPI.url,
        config: {
            params: {
                status: searchParams.get('status') || 0,
                page: searchParams.get('page') || 1,
            },
        },
        dep: [searchParams],
        isAuthen: true,
    });

    console.log('searchParams', searchParams);

    const filter = ({ target: { value } }) => {
        setActive(value);
        setSearchParams({ status: value });
    };

    const handleChangePage = ({}, page) => {
        searchParams.set('page', page);
        setSearchParams(searchParams);
    };

    const handleSubmitComment = () => {
        console.log('comment', comment);
        request.post(route.commentAPI.url, { ...comment });
        setOpenCommentDialog(false);
        setComment({ productId: 0, rate: 5, description: 'Good' });
    };

    const handleCancel = async () => {
        try {
            const res = await request.put(`${route.orderAPI.url}/${selectedOrder.id}?new-status=CANCELED`);
            if (res.status === 200) {
                setOrders({ ...orders, data: orders.data.filter((item) => item.id !== selectedOrder.id) });
                setMessage({
                    text: 'Hủy đơn hàng thành công',
                    severity: 'success',
                    type: AlertTypes.SNACKBAR_LARGE,
                });
            }
        } catch (err) {
            setMessage({
                text: 'Hủy đơn hàng thất bại, vui lòng thử lại sau',
                severity: 'error',
                type: AlertTypes.SNACKBAR_LARGE,
            });
            console.log('err', err);
        } finally {
            setOpenConfirmDialog(false);
            setShowMessage(true);
        }
    };

    return (
        <Title title={title}>
            <ButtonGroup variant="outlined" fullWidth>
                {orderStatusList.map(({ status, name }) => (
                    <Button
                        key={status}
                        value={status}
                        onClick={filter}
                        variant={active === status ? 'contained' : 'outlined'}
                    >
                        {name}
                    </Button>
                ))}
            </ButtonGroup>
            <Stack spacing={1}>
                {loaded
                    ? orders?.data?.map((item) => (
                          <OrderItem
                              key={item.id}
                              item={item}
                              setSelectedOrder={setSelectedOrder}
                              setOpenCommentDialog={setOpenCommentDialog}
                              setOpenConfirmDialog={setOpenConfirmDialog}
                          />
                      ))
                    : times(10).map((n) => <CartItemSkeleton key={n} />)}
            </Stack>
            {loaded && orders?.data.length > 0 && (
                <Pagination
                    color="primary"
                    count={orders?.totalPage}
                    size="large"
                    sx={{ mt: 2 }}
                    page={parseInt(searchParams?.get('page') || 1)}
                    onChange={handleChangePage}
                />
            )}

            {loaded && !orders?.data.length > 0 && (
                <Typography
                    variant="h5"
                    color="primary"
                    mx="auto"
                    mt={8}
                    p={4}
                    bgcolor="background.paper"
                    textAlign="center"
                >
                    Bạn chưa có đơn hàng nào
                </Typography>
            )}

            {/* dialog for leave a comment */}
            <Dialog fullWidth open={openCommentDialog} onClose={() => setOpenCommentDialog(false)}>
                <DialogTitle>Đánh giá</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Chọn sản phẩm bạn muốn đánh giá</Typography>
                    <Stack spacing={2} sx={{ m: 2 }} maxHeight={200} overflow="auto">
                        {selectedOrder?.orderDetails?.map((item) => {
                            if (item.reviewed) return null;
                            return (
                                <Button
                                    key={item.productVariation.id}
                                    variant={
                                        comment.productVariationId === item.productVariation.id
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    color="primary"
                                    onClick={() =>
                                        setComment({ ...comment, productVariationId: item.productVariation.id })
                                    }
                                    sx={{ textTransform: 'none' }}
                                >
                                    <Typography variant="body1">{item.productVariation.product.name}</Typography>
                                </Button>
                            );
                        })}
                    </Stack>

                    <Typography>Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={comment.rate}
                        onChange={(e) => setComment({ ...comment, rate: parseInt(e.target.value) })}
                    />

                    <DialogContentText>Leave a comment</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comment"
                        type="text"
                        value={comment.description}
                        fullWidth
                        onChange={(e) => setComment({ ...comment, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCommentDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitComment} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* dialog for confirm cancel */}
            <ConfirmDialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                onConfirm={handleCancel}
            >
                Bạn có chắc muốn hủy đơn hàng này?
            </ConfirmDialog>
        </Title>
    );
};

export default Order;
