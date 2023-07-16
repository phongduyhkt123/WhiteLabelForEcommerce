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

const Order = ({ title }) => {
    const { routes: route, orderStatus } = useContext(ConfigContext);

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const [comment, setComment] = useState({ productId: 0, rate: 5, description: 'Good' });

    const [selectedOrder, setSelectedOrder] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();

    const orderStatusList = Object.keys(orderStatus.items).map((key) => {
        return { status: key, name: orderStatus.labels[orderStatus.items[key].name] };
    });

    const [active, setActive] = useState(orderStatusList[0].status);

    const { data: orders, loaded } = request.useAxios({
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
                    ? orders?.data.map((item) => (
                          <OrderItem
                              key={item.id}
                              item={item}
                              onClickComment={() => {
                                  setSelectedOrder(item);
                                  setOpenCommentDialog(true);
                              }}
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
                    You have no order
                </Typography>
            )}

            {/* dialog for leave a comment */}
            <Dialog fullWidth open={openCommentDialog} onClose={() => setOpenCommentDialog(false)}>
                <DialogTitle>Rating</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Choose Product to Rating</Typography>
                    <Stack spacing={2} sx={{ m: 2 }} maxHeight={200} overflow="auto">
                        {selectedOrder?.orderDetails?.map((item) => {
                            if (item.reviewed) return null;
                            return (
                                <Button
                                    key={item.productVariation.product.id}
                                    variant={
                                        comment.productId === item.productVariation.product.id
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    color="primary"
                                    onClick={() =>
                                        setComment({ ...comment, productId: item.productVariation.product.id })
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
        </Title>
    );
};

export default Order;
