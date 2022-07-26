import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import DateTimePicker from 'react-datetime-picker';

import { ThemeContext } from '../../../index';
import { getEvents, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';
import { InputForRequest } from '../../inputForRequest/InputForRequest';

export const Events = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { createdOn_gt, limit } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(limit ? limit : '');
    const [isDataEvents, setisDataEvents] = useState();
    const [isDataBlockchain, setIsDataBlockchain] = useState();

    const [valueCalendar, setValueCalendar] = useState(createdOn_gt ? new Date(createdOn_gt) : null);
    const [nullCalendar, setNullCalendar] = useState(null);
    const [isErrorRelQuer, setIsisErrorRelQuer] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const validationCalendar = (date) => {
        if (valueCalendar === undefined) {
            setNullCalendar('Enter Date and Time!');
        } else if (valueCalendar === null) {
            setNullCalendar('Enter Date and Time!');
        } else {
            setNullCalendar('');
            return date;
        }
    }

    const validationLimit = (str) => {
        return str > 0 && str < 1001;
    };

    const onEvents = async (setErrorInput, setIsErrorRequest) => {
        if (validationCalendar(valueCalendar) && validationLimit(isValueSearch)) {
            try {
                setIsLoading(true);
                await getEvents(client.activeAPI + `/${'external/api/v1'}`, valueCalendar.toISOString(), isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setErrorInput('Data undefined!');
                        } else {
                            setisDataEvents(resp);
                            setErrorInput('');
                            setIsisErrorRelQuer('');
                            setIsErrorRequest(false);
                            navigate(valueCalendar + `/${isValueSearch}`);
                        }
                    });
            } catch (e) {
                console.log(e);
                if (e.response.status >= 500) {
                    setErrorInput('Unexpected error, please try again later...');
                }
                setIsErrorRequest(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            if (!isValueSearch && !valueCalendar) {
                setErrorInput('Specify a date and specify an item limit!')
            } else if (!isValueSearch) {
                setErrorInput('Empty search string!');
            }
        }
    };

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataEvents[0].data.userId)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsisErrorRelQuer('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsisErrorRelQuer('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data.data]);
                })
            } catch (e) {
                console.log(e);
                setIsisErrorRelQuer(e.message);
            }
        }
    }

    useEffect(() => {
        if (isValueSearch && valueCalendar) {
            onEvents();
        }
    }, []);

    return (
        <>
            <NavBarForRelatedQueries
                onBlockchainProfile={<button className='list-queries-item' onClick={onBlockchainProfile}>Blockchain profile</button>} 
                isErrorRelQuer={isErrorRelQuer} />

            <div className="searchBlock">
                <div className='DataTime'>
                    <DateTimePicker onChange={setValueCalendar} value={valueCalendar}
                    />
                    <p>{nullCalendar}</p>
                </div>

                <InputForRequest placeholder={'Enter limit elements'} type={'number'}
                    isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                    request={onEvents} onBlockchainProfile={onBlockchainProfile} />
            </div>

            <RequestContent
                data={isDataEvents}
                columnsTable={columnsSapExplorer.events} isLoading={isLoading}/>

            <RequestContent data={isDataBlockchain} title={isDataBlockchain ? 'Blockchain profile' : ''} />
        </>
    )
}
