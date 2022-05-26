import { React, useContext } from 'react';

import { ThemeContext } from '../../../index';
import { getVendingMachines, getVendingProfilesBenefits, getUsersBenefits, getUserSapInfo, getItemsLoaded, getUserCards } from '../../../services/SapTestAPI';

export const ShowVendingMachines = ({ setJsonFormat }) => {

    const { client } = useContext(ThemeContext);

    const showVendingMachines = async () => {
        try {
            await getVendingMachines(client.venidngMachine).then(resp => {
                setJsonFormat(JSON.stringify(resp, null, 2));
            })
        } catch (err) {
            console.log(err);
        }
    }

    const benefitRules = () => {
        try {
            getVendingProfilesBenefits(client.sveklaServer, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    const usersBenefits = async () => {
        try {
            await getUsersBenefits(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err)
        }
    }

    const userSapInfo = async () => {
        try {
            await getUserSapInfo(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    const itemsLoaded = async () => {
        try {
            await getItemsLoaded(client.sveklaServer, 'bd1e89c6-d715-4174-baa9-c7a190b6232a')
                .then(resp => {
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    
    const usersCard = async () => {
        try {
            await getUserCards(client.sveklaServerV1, '53f30c57-ca2e-5fff-8aec-313aadea2926')
                .then(resp => {
                    setJsonFormat(JSON.stringify(resp, null, 2));
                })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <button onClick={showVendingMachines}>Show VendingMachines</button>
            <button onClick={benefitRules}>BenefitRules</button>
            <button onClick={usersBenefits}>UserBenefits</button>
            <button onClick={userSapInfo}>UserSapInfo</button>
            <button onClick={itemsLoaded}>ItemsLoaded</button>
            <button onClick={usersCard}>UserCard</button>
        </div>
    )
}
