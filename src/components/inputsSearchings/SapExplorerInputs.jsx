import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ShopItems } from '../requests/requestsSapExplorer/ShopItems';
import { Events } from '../requests/requestsSapExplorer/Events';
import { ItemsLoaded } from '../requests/requestsSapExplorer/ItemsLoaded';
import { BenefitRules } from '../requests/requestsSapExplorer/BenefitRules';
import { UserBenefits } from '../requests/requestsSapExplorer/UserBenefits';
import { UserSapInfo } from '../requests/requestsSapExplorer/UserSapInfo';
import { UserCards } from '../requests/requestsSapExplorer/UserCards';
import { Cards } from '../requests/requestsSapExplorer/Cards';
import { ShowVendingMachines } from '../requests/requestsSapExplorer/ShowVendingMachines';

import './Inputs.scss';

export const SapExplorerInputs = () => {

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

               <Route path='user-card/*' element={<UserCards />}>
                   <Route path=':user_card' element={ <UserCards />}/>
               </Route>

               <Route path='cards/*' element={<Cards />}>
                   <Route path=':cards' element={ <Cards />}/>
               </Route>
               
               <Route path='vending-machines/*' element={<ShowVendingMachines />}/>

            </Routes>

        </div>
    )
}
