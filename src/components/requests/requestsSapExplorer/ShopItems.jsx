import { React, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../../index';
import { getShopItems } from '../../../services/SapExplorer';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const ShopItems = () => {

    const { client, columnsSapExplorer } = useContext(ThemeContext);

    let { limit } = useParams();
    const navigate = useNavigate();

    const [countInput, setCountInput] = useState(limit ? limit : '');
    const [isDataShopItems, setisDataShopItems] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const validationLimit = (str) => {
        if (countInput) {
            return str > 0 && str < 1001;
        } else {
            setClassInput('searchError');
        }
    };

    const shopItems = async () => {
        if (validationLimit(countInput)) {
            try {
                await getShopItems(client.activeAPI + `/${'external/api/v1'}`, countInput)
                    .then(resp => {
                        setisDataShopItems(resp);
                    });
                navigate(countInput);
                setIsError('');
                setClassInput('search');
            } catch (err) {
                console.log(err);
            }
        } else {

        }
    }

    useEffect(() => {
        if (countInput) {
            shopItems();
        }
    }, []);

    const readValueInput = (e) => {
        setCountInput(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    <input type="number" placeholder='Enter limit elements' max={100} onChange={readValueInput} value={countInput} />
                </div>
                <button onClick={shopItems}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent 
            data={isDataShopItems} 
            columnsTable={columnsSapExplorer.shopItems} />
        </>

    )
}
