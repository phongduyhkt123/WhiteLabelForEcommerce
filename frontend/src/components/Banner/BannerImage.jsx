import { styled } from '@mui/material/styles';

export const BannerImage = styled('img')(({ src, theme }) => ({
    src: `url(${src})`,
    width: '500px',
    [theme.breakpoints.down('md')]: {
        width: '350px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '320px',
        height: '300px',
    },
}));
