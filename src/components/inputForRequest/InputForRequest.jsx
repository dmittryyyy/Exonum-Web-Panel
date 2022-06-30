import { React, useState } from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './InputForRequest.scss';

export const InputForRequest = ({ isValueSearch, setIsValueSearch, request, placeholder, type }) => {

  const [errorInput, setErrorInput] = useState();
  const [isErrorRequest, setisErrorRequest] = useState(false);

  const readValueInput = (e) => {
    setIsValueSearch(e.target.value);
    if (isValueSearch === '' || !e.target.value) {
      setErrorInput('');
      setisErrorRequest('');
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      request(setErrorInput, setisErrorRequest);
    }
  }

  return (
    <>
      <div className="searchWrapper">

        <div className={errorInput ? 'searchError' : 'search'}>

          {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}

          <input type={type && type} placeholder={placeholder}
            onKeyDown={onKeyDown}
            value={isValueSearch}
            onChange={readValueInput} />

        </div>

        <button className='btnSearch' onClick={() => request(setErrorInput, setisErrorRequest)}>search</button>

      </div>

      <ErrorMessage errorInput={errorInput} isErrorRequest={isErrorRequest}/>
    </>
  )
}
