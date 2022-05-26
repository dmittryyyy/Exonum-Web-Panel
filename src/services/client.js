export class ClientNode {
    constructor() {
        //Node
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
        this._activeNode = 'https://node1.unotex.ru/auditor1/api';
        
        //Sap
        this._sveklaServerV1 = 'https://angara-test.sveklapay.com/external/api/v1';
        this._sveklaServer = 'https://angara-test.sveklapay.com/api'
        this._venidngMachine = 'https://roteks.sveklapay.com/api/';
    }  
    
    setNodesServers(nodes) {
        this._nodeServers = nodes;
    }

    setActiveNode(node) {
        this._activeNode = node;
    }

    setSveklaServerV1(sveklaServerV1) {
        this._sveklaServerV1 = sveklaServerV1;
    }

    setSveklaServer(sveklaServer) {
        this._sveklaServer = sveklaServer;
    }

    setVendingMachine(venidngMachine) {
        this._venidngMachine = venidngMachine;
    }

    get nodesServers() {
        return this._nodeServers;
    }

    get activeNode() {
        return this._activeNode;
    }

    get sveklaServerV1() {
        return this._sveklaServerV1;
    }

    get sveklaServer() {
        return this._sveklaServer;
    }

    get venidngMachine() {
        return this._venidngMachine;
    }
}
