import { React, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeContext } from '../../../index';
import { searchUserWallet } from '../../../services/BlockhainAPI';
import { RequestContent } from '../../../components/requestContent/RequestContent';

export const GetUserWallet = ({ testHash }) => {

    const { client } = useContext(ThemeContext);

    let { user_walletId } = useParams();
    const navigate = useNavigate();

    const [isValueSearch, setIsValueSearch] = useState(user_walletId ? user_walletId : '');
    const [dataJsonFormat, setDataJsonFormat] = useState();
    const [dataTableFormat, setDataTableFormat] = useState();

    const [classInput, setClassInput] = useState('search');
    const [isError, setIsError] = useState('');

    const columnsUserWallet = [
        {
          name: 'payment_account_id',
          selector: (row) => row.payment_account_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'owner_id',
          selector: (row) => row.owner_id,
          sortable: true,
          wrap: true,
        },
        {
          name: 'application_service_id',
          selector: (row) => row.application_service_id,
          sortable: true,
          wrap: true,
        },
        // {
        //   name: 'administrators',
        //   selector: (row) => row.administrators,
        //   sortable: true,
        //   wrap: true,
        // },
        // {
        //   name: 'users',
        //   selector: (row) => row.users,
        //   sortable: true,
        //   wrap: true,
        // },
        {
          name: 'amount',
          selector: (row) => row.amount,
          sortable: true,
          wrap: true,
        },
        {
          name: 'currency_code',
          selector: (row) => row.currency_code,
          sortable: true,
          wrap: true,
        },
        {
          name: 'name',
          selector: (row) => row.name,
          sortable: true,
          wrap: true,
        },
        {
          name: 'description',
          selector: (row) => row.description,
          sortable: true,
          wrap: true,
        },
        {
          name: 'history_hash',
          selector: (row) => row.history_hash,
          sortable: true,
          wrap: true,
        },
        {
          name: 'blocked_amount',
          selector: (row) => row.blocked_amount,
          sortable: true,
          wrap: true,
        },
      ]

    const getUserWallet = async () => {
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
                    navigate(isValueSearch);
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

    useEffect(() => {
        if (isValueSearch) {
            getUserWallet();
        }
    }, []);

    const readValueInput = (e) => {
        setIsValueSearch(e.target.value);
    }

    return (

        <>
            <div className="searchWrapper">
                <div className={classInput}>
                    {isValueSearch && <span className='clearInput' onClick={() => setIsValueSearch('')}>X</span>}
                    <input placeholder='Enter user wallet'
                        value={isValueSearch}
                        onChange={readValueInput} />
                </div>
                <button onClick={getUserWallet}>Search</button>
                <p>{isError}</p>
            </div>

            <RequestContent dataJsonFormat={dataJsonFormat} dataTableFormat={dataTableFormat} columnsTable={columnsUserWallet} setDataTableFormat={setDataTableFormat} />
        </>

    )
}
