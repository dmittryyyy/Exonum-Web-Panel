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
    const [classInput, setClassInput] = useState('search');
    const [nullCalendar, setNullCalendar] = useState(null);
    const [isError, setIsError] = useState('');

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
        if (isValueSearch) {
            return str > 0 && str < 1001;
        } else {
            setClassInput('searchError');
            setIsError('Enter limit!');
        }
    };

    const onEvents = async () => {
        if (validationCalendar(valueCalendar) && validationLimit(isValueSearch)) {
            try {
                await getEvents(client.activeAPI + `/${'external/api/v1'}`, valueCalendar.toISOString(), isValueSearch)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setisDataEvents(resp);
                            setClassInput('search');
                            setIsError('');
                            navigate(valueCalendar + `/${isValueSearch}`);
                        }
                    });
            } catch (e) {
                console.log(e);
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        }
    };

    const onBlockchainProfile = async () => {
        let idBlockchian;
        try {
            await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataEvents[0].data.userId)
                .then(resp => {
                    if (!resp || resp === []) {
                        setIsError('Data undefined!');
                    }
                    idBlockchian = resp.blockchainId;
                });
        } catch (e) {
            console.log(e);
            setIsError('Run the main query first!');
        }
        if (idBlockchian) {
            try {
                await getBlockchainProfile(idBlockchian).then(data => {
                    setIsDataBlockchain([data]);
                })
            } catch (e) {
                console.log(e);
                setIsError(e.message);
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
            />

            <div className="searchBlock">
                <div className='DataTime'>
                    <DateTimePicker onChange={setValueCalendar} value={valueCalendar}
                    />
                    <p>{nullCalendar}</p>
                </div>

                <InputForRequest classInput={classInput} placeholder={'Enter limit elements'} type={'number'}
                    isError={isError}
                    isValueSearch={isValueSearch} setIsValueSearch={setIsValueSearch}
                    request={onEvents} />
            </div>

            <RequestContent
                data={isDataEvents}
                columnsTable={columnsSapExplorer.events} />

            <RequestContent data={isDataBlockchain} title={isDataBlockchain ? 'Blockchain profile' : ''}/>
        </>

    )
}
