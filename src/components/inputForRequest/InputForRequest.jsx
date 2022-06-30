import React from 'react';

import './InputForRequest.scss';

export const InputForRequest = ({ classInput, isValueSearch, setIsValueSearch, request, isError, placeholder, type }) => {

  const readValueInput = (e) => {
    setIsValueSearch(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      request();
    }
  }

  return (

    <div className="searchWrapper">

      <div className={classInput}>

        {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}

        <input type={type ? type : ''} placeholder={placeholder}
          onKeyDown={onKeyDown}
          value={isValueSearch}
          onChange={readValueInput} />

      </div>

      <button onClick={request}>search</button>
      <p>{isError}</p>

    </div>
  )
}
