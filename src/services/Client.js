import { expolorerBlocks } from './webPanelAPI';

export class Client {
    constructor() {
        this._nodeServers = [
            'https://node1.unotex.ru/auditor1/api',
            'https://node1.unotex.ru/auditor2/api',
            'https://node1.unotex.ru/auditor3/api',
            'https://node1.unotex.ru/auditor4/api',
            'https://node1.unotex.ru/validator1/api',
            'https://node1.unotex.ru/validator2/api',
            'https://node1.unotex.ru/validator3/api',
            'https://node1.unotex.ru/validator4/api',
        ];
        this.activeNode = 'https://node1.unotex.ru/auditor1/api';
    }  

    GetActiveNode() {
        return this.activeNode;
    }

    async GetCurentHight() {
        return expolorerBlocks(this.activeNode, "1").then((data) => { return data.range.start })
    }

    setNodes(nodes) {
        this._nodeServers = nodes;
    }

    GetNodes() {
        return this._nodeServers;
    }

    get nodesServers() {
        return this._nodeServers;
    }
}

