import React, { useContext, useState } from 'react';

import { ThemeContext } from '../..';
import { SearchingSap } from './searchingSap';
import { ContentSapTest } from './ContentSapTest';
import { getVendingProfilesBenefits, getUsersBenefits, getUserSapInfo, getItemsLoaded, getUserCards, getShopItemsUpdate } from '../../services/SapTestAPI';

export const SapTest = () => {

    const { client } = useContext(ThemeContext);

    const [isResult, setIsResult] = useState();
    const [isError, setIsError] = useState();

    const [navBarSapItems, setNavBarSapItems] = useState([]);

    const BenefitRules = () => {
        try {
            getVendingProfilesBenefits(client.sveklaServer, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setIsResult(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    const usersBenefits = async () => {
        try {
            await getUsersBenefits(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setIsResult(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err)
        }
    }

    const userSapInfo = async () => {
        try {
            await getUserSapInfo(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setIsResult(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    const itemsLoaded = async () => {
        try {
            await getItemsLoaded(client.sveklaServer, 'bd1e89c6-d715-4174-baa9-c7a190b6232a')
                .then(resp => {
                    setIsResult(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    const usersCard = async () => {
        try {
            await getUserCards(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
            .then(resp => {
                setIsResult(JSON.stringify(resp, null, 2));
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>

            <button>CLICK</button>

            <div className="searchBlock">

                <SearchingSap
                    navBarSapItems={navBarSapItems}
                    setNavBarSapItems={setNavBarSapItems}
                />

            </div>

            <ContentSapTest
                isResult={isResult}
                isError={isError}
                setIsResult={setIsResult}
                setIsError={setIsError}
            />
        </>
    )
}
