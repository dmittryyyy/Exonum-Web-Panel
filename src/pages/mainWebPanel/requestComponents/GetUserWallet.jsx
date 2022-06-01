import { React, useContext, useState } from 'react';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/NodeAPI';
import { columnsUserWallet } from '../ColumnsTable';
import { ContentMain } from '../ContentMain';

export const GetUserWallet = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    const [isValueSearch, setIsValueSearch] = useState('');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const GetUserWallet = async () => {
        setColumnsTable(columnsUserWallet);
        if (isValueSearch) {
            if (testHash(isValueSearch)) {
                try {
                    await searchUserWallet(client.activeNode, isValueSearch)
                        .then((wallet) => {
                            setDataJsonFormat(wallet.data);
                            setDataTableFormat([wallet.data]);
                        });
                        setIsError('');
                        setClassInput('search');
                } catch (error) {
                    console.log(error);
                }
            } else {
                setIsError('Not a HEX string');
                setClassInput('searchError');
            }
        } else {
            setIsError('Empty search string!');
            setClassInput('searchError');
        }
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user wallet'
                        value={isValueSearch}
                        onChange={(e) => setIsValueSearch(e.target.value)} />
                </div>
                <button onClick={GetUserWallet}>Search</button>
                <p>{isError}</p>
            </div>
            <ContentMain dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat}/>
        </>

    )
}
