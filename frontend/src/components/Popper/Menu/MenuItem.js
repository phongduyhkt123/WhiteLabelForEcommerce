import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ data, onClick, className }) => {
    const { title, icon, items, to } = data;

    const classNames = cx('item', className);

    return (
        <Button leftIcon={icon} className={cx('fw-500', 'w-100')} onClick={onClick}>
            {title}
        </Button>
    );
};

export default MenuItem;
