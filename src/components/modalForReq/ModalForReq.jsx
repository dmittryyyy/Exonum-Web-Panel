import React from 'react';

import './ModalForReq.scss';

export const ModalForReq = () => {
    return (

        <div className='wrapperModal'>

            <div className='wrapperInput'>

                <div className='title'>
                    <h3>Required data for request</h3>
                </div>

                <div className='name'>
                    <input type="text" placeholder='Enter username'/>
                </div>

                <div className='password'>
                    <input type="text" placeholder='Enter password'/>
                </div>

            </div>

        </div>

    )
}
