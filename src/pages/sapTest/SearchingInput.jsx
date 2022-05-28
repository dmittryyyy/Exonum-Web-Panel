import { React } from 'react';
import { ShopItems } from './requestComponents/ShopItems';
import { Events } from './requestComponents/Events';
import { ItemsLoaded } from './requestComponents/ItemsLoaded';
import { BenefitRules } from './requestComponents/BenefitRules';
import { UserBenefits } from './requestComponents/UserBenefits';
import { UserSapInfo } from './requestComponents/UserSapInfo';
import { UserCard } from './requestComponents/UserCard';

export const SearchingInput = ({ navBarItem, setDataJsonFormat, setDataTableFormat, setColumnsTable }) => {

    return (
        <div>
            {navBarItem.id === 1 ?
                <ShopItems setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                : navBarItem.id === 2 ?
                    <Events setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>

                    : navBarItem.id === 3 ?
                        <ItemsLoaded setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                        : navBarItem.id === 4 ?
                            <BenefitRules setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                            : navBarItem.id === 5 ?
                                <UserBenefits setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} navBarItem={navBarItem} setColumnsTable={setColumnsTable} />

                                : navBarItem.id === 6 ?
                                    <UserSapInfo setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                                    : navBarItem.id === 7 ?
                                        <UserCard setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable} />

                                        : ''
            }
        </div>
    )
}
