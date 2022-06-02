import { React, useContext, useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router';
import DateTimePicker from 'react-datetime-picker';

import { ThemeContext } from '../../../index';
import { getEvents } from '../../../services/SapTestAPI';
import { columnsEvents } from '../ColumnsTable';
import { ContentSapTest } from '../ContentSapTest';

export const Events = () => {

    const { client } = useContext(ThemeContext);

    let { createdOn_gt, limit } = useParams();
    const navigate = useNavigate();

    const [countInput, setCountInput] = useState(limit ? limit : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();
    const [columnsTable, setColumnsTable] = useState();

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
        setColumnsTable(columnsEvents);
        if (validationCalendar(valueCalendar) && validationLimit(countInput)) {
            try {
                await getEvents(client.sveklaServerV1, valueCalendar.toISOString(), countInput)
                    .then(resp => {
                        setDataTableFormat(resp);
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
                    });
                navigate(valueCalendar + `/${countInput}`);
                setClassInput('search');
                setIsError('');
            } catch (err) {
                console.log(err);
            }
        }
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

            <ContentSapTest dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsTable} />
        </>

    )
}
