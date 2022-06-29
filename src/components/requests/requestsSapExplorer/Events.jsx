import { React, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import DateTimePicker from 'react-datetime-picker';

import { ThemeContext } from '../../../index';
import { getEvents, getUserSapInfo, getBlockchainProfile } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';
import { NavBarForRelatedQueries } from '../../navBar/NavBarForRelatedQueries';

export const Events = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { createdOn_gt, limit } = useParams();
    const navigate = useNavigate();

    const [countInput, setCountInput] = useState(limit ? limit : '');
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
        if (countInput) {
            return str > 0 && str < 1001;
        } else {
            setClassInput('searchError');
            setIsError('Enter limit!');
        }
    };

    const onEvents = async () => {
        if (validationCalendar(valueCalendar) && validationLimit(countInput)) {
            try {
                await getEvents(client.activeAPI + `/${'external/api/v1'}`, valueCalendar.toISOString(), countInput)
                    .then(resp => {
                        setisDataEvents(resp);
                    });
                navigate(valueCalendar + `/${countInput}`);
                setClassInput('search');
                setIsError('');
            } catch (err) {
                console.log(err);
            }
        }
    };

    const onBlockchainProfile = async () => {
        let idBlockchian;
        await getUserSapInfo(client.activeAPI + `/${'external/api/v1'}`, isDataEvents[0].data.userId)
            .then(resp => {
                idBlockchian = resp.blockchainId;
            });
        await getBlockchainProfile(idBlockchian).then(data => {
            setIsDataBlockchain([data]);
        })
    }

    useEffect(() => {
        if (countInput && valueCalendar) {
            onEvents();
        }
    }, []);

    const readValueInput = (e) => {
        setCountInput(e.target.value);
    }

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

                <div className="searchWrapper">
                    <div className={classInput}>
                        <input type="number" placeholder='Enter limit elements' max={100} onChange={readValueInput} value={countInput} />
                    </div>
                    <button onClick={onEvents}>Search</button>
                    <p>{isError}</p>
                </div>
            </div>

            <RequestContent
                data={isDataEvents}
                columnsTable={columnsSapExplorer.events} />

            {isDataBlockchain ? <h4>Blockchain profile</h4> : ''}
            <RequestContent data={isDataBlockchain} />
        </>

    )
}
