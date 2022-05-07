import { React } from 'react';
import { expolorerBlocks } from './webPanelAPI';


export class Client {
    state = {
        nodeServers: [
            'https://node1.unotex.ru/auditor1/api',
            'https://node1.unotex.ru/auditor2/api',
            'https://node1.unotex.ru/auditor3/api',
            'https://node1.unotex.ru/auditor4/api',
            'https://node1.unotex.ru/validator1/api',
            'https://node1.unotex.ru/validator2/api',
            'https://node1.unotex.ru/validator3/api',
            'https://node1.unotex.ru/validator4/api',
        ], 
        activeNode: 'https://node1.unotex.ru/auditor1/api'
    }


    async GetCurentHight() {
    let response =  await expolorerBlocks(this.activeNode, 1).then((data) => data.range.start);
       console.log(response);
    }
    
}

