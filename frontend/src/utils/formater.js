import config from '~/data/config.json';

const currency = config.global.currency;

export const commas = (number) => {
    return `${currency.symbol} ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
