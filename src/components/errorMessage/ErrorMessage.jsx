import { React } from 'react';

import './ErrorMessage.scss';

export const ErrorMessage = ({ errorInput, isErrorRequest }) => {

    return (
        <div className='errorMessage'>
            {errorInput ? <p>{errorInput}</p> : ''}

            {isErrorRequest ?

                <img className='errorIcon' src='images/errorRequest.gif'></img>

                : ''}
        </div>
    )
}
