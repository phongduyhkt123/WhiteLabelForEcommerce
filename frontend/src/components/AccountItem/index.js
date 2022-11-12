import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const AccountItem = ({ data }) => {
    return (
        <Link to={`/@${data?.nickname}`} className={cx('wrapper', 'row')}>
            <img
                src={
                    data
                        ? data.avatar
                        : 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg'
                }
                alt="avatar"
                className={cx('avatar')}
            />
            <div className={cx('info')}>
                <h4 className={cx('username', 'row')}>
                    {data ? data.nickname : 'ThiQuyenDinh'}
                    <span>
                        <FontAwesomeIcon icon={icon({ name: 'check-circle' })} className={cx('check-icon')} />
                    </span>
                </h4>
                <div className={cx('fullname')}>{data ? data.full_name : 'Thi Quyen Dinh'}</div>
            </div>
        </Link>
    );
};

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
