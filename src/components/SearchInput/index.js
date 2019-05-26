import { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { GoSearch } from 'react-icons/go'

const SearchInput = ({
    initialValue = "",
    placeholder = "",
    buttonText = "",
    onFocus = () => { },
    onBlur = () => { },
    onChange = () => { },
    onSubmit = () => { } }) => {

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onChangeHandler = event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        onSubmit();
    }

    const onFocusHandler = () => onFocus(value);
    const onBlurHandler = () => onBlur(value)

    return (
        <form onSubmit={onSubmitHandler} css={css`
            width: 100%;
            display: flex;
            border-radius: 0.3rem;
            border: 0.1rem solid grey;
            justify-content: space-between;
            overflow: hidden;
            * {
                border: none;
                padding:.2rem;
            }
            input {
                flex-grow: 2;
            }
            button {
                display: flex;
                flex-flow: row;
                justify-content: center;
                width: 2rem;
            }
        `
        }>
            <input type="search"
                onFocus={onFocusHandler}
                onBlur={onBlurHandler} value={value} placeholder={placeholder} onChange={onChangeHandler} />
            <button type="submit"><GoSearch /></button>
        </form >
    )
}

export default SearchInput;