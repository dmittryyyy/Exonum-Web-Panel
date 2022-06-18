import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getUsersBenefits, chainQueries, getDataOnId } from '../../../services/SapTestAPI';
import { columnsUserBenefits } from '../ColumnsTable';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { RelatedContentQueries } from '../../../components/requestContent/RelatedContentQueries';

export const UserBenefits = () => {

    const { client } = useContext(ThemeContext);

    let { user_benefitsId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_benefitsId ? user_benefitsId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const [chainsDataJson, setChainsDataJson] = useState([]);
    const [dataOnId, setDataOnId] = useState();

    const usersBenefits = async () => {
        setColumnsTable(columnsUserBenefits);
        if (isValueSearch) {
            try {
                await getUsersBenefits(client.sveklaServerV1, isValueSearch)
                    .then(resp => {
                        setDataJsonFormat(resp, null, 2);
                        setDataTableFormat(resp);
                    });
                setIsError('');
                navigate(isValueSearch);
            } catch (err) {
                console.log(err);
            }
        } else {
            setIsError('Empty search string!')
            setClassInput('searchError');
        }
    }

    useEffect(() => {
        if (isValueSearch) {
            usersBenefits();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    const onChainQueries = async () => {
        await chainQueries(client.sveklaServerV1, 'users', dataJsonFormat[0].cardHolderId, 'cards')
            .then(resp => setDataOnId(resp));
        await getDataOnId(dataJsonFormat, client.sveklaServerV1, '/cards/')
            .then(resp => {
                setChainsDataJson([...chainsDataJson, resp]);
            });
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user id'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={usersBenefits}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} setDataTableFormat={setDataTableFormat} />

            {dataJsonFormat ?
                <div className='btnRelatedQueries'>
                    <button className='btn' onClick={onChainQueries}>Chain of related queries</button>

                    <RelatedContentQueries chainsDataJson={chainsDataJson} dataOnId={dataOnId}/>
                </div>
                : ''}
        </>
    )
}
