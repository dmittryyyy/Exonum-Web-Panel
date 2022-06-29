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

    const readValueInput = (e) => {
        setCountInput(e.target.value);
    }

    const validationLimit = (str) => {
        if (countInput) {
            return str > 0 && str < 1001;
        } else {
            setClassInput('searchError');
        }
    };

    const onShopItems = async () => {
        if (validationLimit(countInput)) {
            try {
                await getShopItems(client.activeAPI + `/${'external/api/v1'}`, countInput)
                    .then(resp => {
                        if (!resp || resp === []) {
                            setIsError('Data undefined!');
                        } else {
                            setisDataShopItems(resp);
                            setIsError('');
                            setClassInput('search');
                            navigate(countInput);
                        }
                    });
            } catch (e) {
                console.log(e);
                setIsError(e.message);
                setisDataShopItems('');
                if (e.response.status >= 500) {
                    setIsError('Unexpected error, please try again later...');
                }
            }
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onShopItems();
        }
    }

    useEffect(() => {
        if (countInput) {
            onShopItems();
        }
    }, []);

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    <input onKeyDown={onKeyDown} type="number" placeholder='Enter limit elements' max={100} onChange={readValueInput} value={countInput} />
                </div>
                <button onClick={onShopItems}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent
                data={isDataShopItems}
                columnsTable={columnsSapExplorer.shopItems} />
        </>

    )
}
