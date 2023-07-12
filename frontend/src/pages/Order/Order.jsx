import {
    Box,
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
import { useSearchParams } from 'react-router-dom';
import { CartItemSkeleton } from '~/components/Skeleton';
import Title from '~/components/Title/Title';
import { ConfigContext } from '~/context/ConfigContext';
import * as request from '~/utils/httpRequest';
import OrderItem from './OrderItem';
import { Image } from '@mui/icons-material';

const Order = ({ title }) => {
    const { routes: route } = useContext(ConfigContext);

    const [page, setPage] = useState(1);

    const [active, setActive] = useState(1);

    const [openCommentDialog, setOpenCommentDialog] = useState(false);

    const [comment, setComment] = useState({ productId: 0, rate: 5, description: 'Good' });

    const [selectedOrder, setSelectedOrder] = useState({});

    const { data: orders, loaded } = request.useAxios({
        url: route.orderAPI.url,
        config: { params: { page } },
        dep: [page],
        isAuthen: true,
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const filter = ({ target: { value } }) => {
        setActive(parseInt(value));
        setSearchParams({ status: value });
    };

    const handleChangePage = ({}, page) => {
        setPage(page);
        setSearchParams({ page });
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
                <Button value={1} onClick={filter} variant={active === 1 ? 'contained' : 'outlined'}>
                    Waiting for payment
                </Button>
                <Button value={2} onClick={filter} variant={active === 2 ? 'contained' : 'outlined'}>
                    Waiting for confirm
                </Button>
                <Button value={3} onClick={filter} variant={active === 3 ? 'contained' : 'outlined'}>
                    Delivering
                </Button>
                <Button value={4} onClick={filter} variant={active === 4 ? 'contained' : 'outlined'}>
                    Delivered
                </Button>
                <Button value={5} onClick={filter} variant={active === 5 ? 'contained' : 'outlined'}>
                    Completed
                </Button>
                <Button value={6} onClick={filter} variant={active === 6 ? 'contained' : 'outlined'}>
                    Canceled
                </Button>
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
