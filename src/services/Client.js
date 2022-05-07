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

    GetActiveNode() {
        return this.state.activeNode
    }

    GetCurentHight() {
        return expolorerBlocks(this.state.activeNode, "1").then((data) => {return data.range.start})
    }
}

