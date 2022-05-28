import { React, useContext, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { ThemeContext } from '../../../index';
import { getEvents } from '../../../services/SapTestAPI';
import { columnsEvents } from '../../../components/columnsTable/sapPage/ColumnsTable';

export const Events = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [countInput, setCountInput] = useState('');
    const [valueCalendar, setValueCalendar] = useState();
    const [classInput, setClassInput] = useState('search');
    const [nullCalendar, setNullCalendar] = useState(null);

    const validationCalendar = () => {
        if (valueCalendar === undefined) {
            setNullCalendar('Enter Date and Time!');
        } else if (valueCalendar === null) {
            setNullCalendar('Enter Date and Time!');
        } else {
            setNullCalendar('');
        }
    }

    const validationLimit = () => {
        if (countInput > 100) {
            setCountInput(100);
        } else if (countInput <= 0 || null) {
            setClassInput('searchError')
        } else if (countInput > 0) {
            setClassInput('search')
        }
    }

    const Events = async () => {
        setColumnsTable(columnsEvents);
        validationLimit();
        validationCalendar();
        if (validationCalendar && validationLimit) {
            try {
                await getEvents(client.sveklaServerV1, valueCalendar.toISOString(), countInput)
                    .then(resp => {
                        setDataTableFormat(resp);
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
                    })
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (

        <div className="searchBlock">
            <div className='DataTime'>
                <DateTimePicker onChange={setValueCalendar} value={valueCalendar}
                />
                <p>{nullCalendar}</p>
            </div>

            <div className="searchWrapper">
                <div className={classInput}>
                    <input type="number" placeholder='Enter limit elements' max={100} onChange={(e) => setCountInput(e.target.value)} value={countInput} />
                </div>
                <button onClick={Events}>Search</button>
            </div>
        </div>

    )
}
