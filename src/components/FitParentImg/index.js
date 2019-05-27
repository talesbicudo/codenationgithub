import PropTypes from 'prop-types';
import Img from 'react-image';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const FitParentImg = (imgProps) => <Img {...imgProps} css={css`
    max-width: 100%;
    max-height: 100%;
`} />

FitParentImg.propTypes = {
    imgProps: PropTypes.object
}
   
export default FitParentImg;
