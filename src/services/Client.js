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
        this._selectedBarItem = [];
        this._activeNode = 'https://node1.unotex.ru/auditor1/api';
    }  
    
    setNodesServers(nodes) {
        this._nodeServers = nodes;
    }

    setActiveNode(node) {
        this._activeNode = node;
    }

    get nodesServers() {
        return this._nodeServers;
    }

    get activeNode() {
        return this._activeNode;
    }
}

