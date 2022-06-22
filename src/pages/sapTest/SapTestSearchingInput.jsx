import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ShopItems } from './requestComponents/ShopItems';
import { Events } from './requestComponents/Events';
import { ItemsLoaded } from './requestComponents/ItemsLoaded';
import { BenefitRules } from './requestComponents/BenefitRules';
import { UserBenefits } from './requestComponents/UserBenefits';
import { UserSapInfo } from './requestComponents/UserSapInfo';
import { UserCard } from './requestComponents/UserCard';
import { Cards } from './requestComponents/Cards';
import { ShowVendingMachines } from './requestComponents/ShowVendingMachines';

export const SapTestSearchingInput = () => {

    return (
        <div>

            <Routes>

               <Route path='shop-items/*' element={<ShopItems />}>
                   <Route path=':limit' element={ <ShopItems />}/>
               </Route>

               <Route path='events/*' element={<Events />}>
                   <Route path=':createdOn_gt/:limit' element={ <Events />}/>
               </Route>

               <Route path='items-loaded/*' element={<ItemsLoaded />}>
                   <Route path=':items_loadedId' element={ <ItemsLoaded />}/>
               </Route>

               <Route path='benefit-rules/*' element={<BenefitRules />}>
                   <Route path=':benefit_rulesId' element={ <BenefitRules />}/>
               </Route>

               <Route path='user-benefits/*' element={<UserBenefits />}>
                   <Route path=':user_benefitsId' element={ <UserBenefits />}/>
               </Route>

               <Route path='user-sapInfo/*' element={<UserSapInfo />}>
                   <Route path=':user_infoId' element={ <UserSapInfo />}/>
               </Route>

               <Route path='user-card/*' element={<UserCard />}>
                   <Route path=':user_card' element={ <UserCard />}/>
               </Route>

               <Route path='cards/*' element={<Cards />}>
                   <Route path=':cards' element={ <Cards />}/>
               </Route>
               
               <Route path='vending-machines/*' element={<ShowVendingMachines />}/>

            </Routes>

        </div>
    )
}
