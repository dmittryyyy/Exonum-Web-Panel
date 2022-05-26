import { React, useContext, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { ThemeContext } from '../../../index';
import { getEvents } from '../../../services/SapTestAPI';
import { columnsEvents } from '../../../components/columnsTable/mainPage/ColumnsTable';

export const Events = ({ setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    const { client } = useContext(ThemeContext);

    const [countInput, setCountInput] = useState('');
    const [valueCalendar, setValueCalendar] = useState();
    const [classInput, setClassInput] = useState('limit');
    const [nullCalendar, setNullCalendar] = useState(null);

    const validationCalendar = () => {
        if (nullCalendar === null) {
            setNullCalendar('Enter Date and Time!');
        } 
    }

    const validationLimit = () => {
        if (countInput > 100) {
            setCountInput(100);
        } else if (countInput <= 0 || null) {
            setClassInput('inputError')
        } else if (countInput > 0) {
            setClassInput('limit')
        }
    }

    const Events = async () => {
        validationLimit();
        validationCalendar();
        if (validationCalendar && validationLimit) {
            try {
                await getEvents(client.sveklaServerV1, valueCalendar.toISOString(), countInput)
                    .then(resp => {
                        setDataTableFormat(resp);
                        setDataJsonFormat(JSON.stringify(resp, null, 2));
                        setColumnsTable(columnsEvents);
                    })
                    setNullCalendar(null)
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (

        <>
            <div className="searchBlock">
                <div className='DataTime'>
                    <DateTimePicker onChange={setValueCalendar} value={valueCalendar}
                    />
                    <p>{nullCalendar}</p>
                </div>

                <div className={classInput}>
                    <input type="number" placeholder='Enter limit elements' max={100} onChange={(e) => setCountInput(e.target.value)} value={countInput} />
                    <button onClick={Events}>Найти</button>
                </div>
            </div>
        </>
    )
}
