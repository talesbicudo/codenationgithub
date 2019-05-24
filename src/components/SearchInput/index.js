import React, { useState } from 'react';

const SearchInput = ({ initialValue, placeholder, buttonText, onFocus, onBlur, onChange, onSubmit }) => {

    const [value, setValue] = useState(initialValue);

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
        <form onSubmit={onSubmitHandler}>
            <input type="text" onFocus={onFocusHandler}
                onBlur={onBlurHandler} value={value} placeholder={placeholder} onChange={onChangeHandler} />
            <button type="submit">{buttonText}</button>
        </form>
    )
}

export default SearchInput;