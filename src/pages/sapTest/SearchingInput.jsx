import { React } from 'react';
import { ShopItems } from './requestComponents/ShopItems';
import { Events } from './requestComponents/Events';
import { ItemsLoaded } from './requestComponents/ItemsLoaded';
import { BenefitRules } from './requestComponents/BenefitRules';
import { UserBenefits } from './requestComponents/UserBenefits';
import { UserSapInfo } from './requestComponents/UserSapInfo';
import { UserCard } from './requestComponents/UserCard';

export const SearchingInput = ({ navBarItem }) => {

    return (
        <div>
            {navBarItem.id === 1 ?
                <ShopItems />

                : navBarItem.id === 2 ?
                    <Events />

                    : navBarItem.id === 3 ?
                        <ItemsLoaded />

                        : navBarItem.id === 4 ?
                            <BenefitRules />

                            : navBarItem.id === 5 ?
                                <UserBenefits navBarItem={navBarItem} />

                                : navBarItem.id === 6 ?
                                    <UserSapInfo />

                                    : navBarItem.id === 7 ?
                                        <UserCard />

                                        : ''
            }
        </div>
    )
}
