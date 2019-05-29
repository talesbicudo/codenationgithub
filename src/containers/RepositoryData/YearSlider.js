
import React, { useEffect, useState } from 'react';
import Slider, { Handles } from 'react-compound-slider'
import Handle from '../../components/Handle';

const GITHUB_START_YEAR = 2008;
const NOW = (new Date()).getFullYear();
const domain = [GITHUB_START_YEAR, NOW];

const sliderStyle = {
    position: 'relative',
    width: '90%',
    height: '100%'
}

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
}
const YearSlider = ({ onChange, range, dispatch }) => {
    const initialValues = Object.values(range);

    const [values, setValues] = useState(initialValues);

    const changeHandler = values => setValues(values);

    useEffect(() => {
        dispatch(values)
    }, [values, dispatch]);

    return (
        <Slider
            rootStyle={sliderStyle}
            domain={domain}
            mode={2}
            step={1}
            values={values}
            onChange={changeHandler}
        >
            <div style={railStyle} />
            <Handles type="handles">
                {({ handles, getHandleProps }) => (
                    <div className="slider-handles">
                        {handles.map(handle => (
                            <Handle
                                key={handle.id}
                                handle={handle}
                                getHandleProps={getHandleProps}
                            />
                        ))}
                    </div>
                )}
            </Handles>
        </Slider>
    )

}

export default YearSlider;

