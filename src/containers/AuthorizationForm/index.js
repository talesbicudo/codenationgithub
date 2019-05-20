import React from 'react';


const AuthorizationForm = ({ onSubmit, warning }) => {
    const [value, setValue] = React.useState('');
    const handleChange = e => setValue(e.target.value)

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(value);
    }

    return (
        <div>
            {warning && <div className="warning">Warning: {warning}</div>}
            <h1>Submit a Personal Access User Token to use this application
                (<a href='https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line'>Tutorial</a>)
                </h1>
            <form onSubmit={handleSubmit}>
                <input value={value} type='text' onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AuthorizationForm;