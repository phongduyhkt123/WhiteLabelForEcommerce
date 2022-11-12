import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Menu = ({ children, className, items = [] }) => {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const classNames = cx('content', className);

    const renderItems = () => {
        return current.data.map((item, index) => {
            // const { title, icon, items, to } = item;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.children) {
                            setHistory((prevs) => [...prevs, item.children]);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 500]}
            interactive={true}
            offset={[10, 10]}
            hideOnClick={false}
            placement="bottom-end"
            render={(attrs) => (
                <div {...attrs} className={classNames} tabIndex="-1">
                    <PopperWrapper className={cx('pv-8', 'row-vertical')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prevs) => prevs.slice(0, prevs.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body', 'scrollable')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory([{ data: items }]);
            }}
        >
            {children}
        </Tippy>
    );
};

export default Menu;
