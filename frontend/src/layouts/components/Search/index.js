import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import * as request from '~/utils/httpRequest';
import { search } from '~/services/searchService';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim().length > 0) return;

        const FetchAPI = async () => {
            setIsLoading(true);

            const response = await search(debouncedValue);

            setSearchResult(response);
            setIsLoading(false);
        };

        FetchAPI();
    }, [debouncedValue]);

    const handleClickOutside = () => {
        setIsSearching(false);
    };

    const handleFocus = () => {
        setIsSearching(true);
    };

    return (
        /* create parent node for tippy*/
        <div>
            <HeadlessTippy
                interactive={true}
                visible={isSearching && searchResult.length > 0 && searchValue}
                render={(attrs) => (
                    <div {...attrs} className={cx('search-result')} tabIndex="-1">
                        <PopperWrapper className={cx('pt-8')}>
                            <h4>Accounts</h4>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleClickOutside}
            >
                <div className={cx('search', 'row')}>
                    <input
                        value={searchValue}
                        type="text"
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        ref={inputRef}
                        onChange={(e) => {
                            setSearchValue(e.target.value.trimStart());
                        }}
                        onFocus={handleFocus}
                    />
                    {!isLoading && (
                        <button
                            className={cx('icon-view')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={icon({ name: 'circle-xmark' })} className={cx('clear-icon')} />
                        </button>
                    )}

                    {isLoading && (
                        <button className={cx('icon-view')}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'circle-notch' })}
                                className={cx('load-icon')}
                                spin={true}
                            />
                        </button>
                    )}

                    <span></span>

                    <button className={cx('search-button')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={icon({ name: 'search' })} className={cx('search-icon')} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
