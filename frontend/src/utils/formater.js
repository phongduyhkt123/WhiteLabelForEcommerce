import { global as globalConfig } from '~/config';

const currency = globalConfig.currency;

export const commas = (number) => {
    return `${currency.symbol} ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
