import React from 'react';

import './Content.scss';

export const Content = ({ isResultTransaction, a }) => {
  return (
    <div className='resultSearch'>
        <pre>{isResultTransaction}</pre>
    </div>
  )
}
