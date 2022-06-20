import { makeAutoObservable } from "mobx";

export class ClientNode {
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
        this._activeNode = 'https://node1.unotex.ru/auditor1/api';

        this._sapServers = [
            {url :'https://angara.sveklapay.com', name: "Ангара"},
            {url: 'https://oms-nkz.sveklapay.com', name: 'ОМС Новокузнецк'},
            {url: 'https://oms-osk.sveklapay.com', name: 'ОМС Старый Оскол'},
            {url: 'https://oms-ural.sveklapay.com', name: 'ОМС Урал'},
            {url: 'https://roteks.sveklapay.com', name: 'Ротекс НЛМК'},
            {url: 'https://angara-test.sveklapay.com', name: 'Тестовый САП'},
            {url: 'https://metinvest-oemk.sveklapay.com', name: 'Металлоинвест ОЭМК'},
            {url: 'https://metinvest-mgok.sveklapay.com', name: 'Металлоивест МГОК'},
        ];
        this._activeAPI = 'https://angara-test.sveklapay.com';

        this._sveklaServerV1 = 'https://angara-test.sveklapay.com/external/api/v1';
        this._sveklaServer = 'https://angara-test.sveklapay.com/api';
        this._venidngMachine = 'https://roteks.sveklapay.com/api/';
        
        makeAutoObservable(this);
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

    setActiveAPI(activeAPI) {
        this._activeAPI = activeAPI;
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

    get sapServers() {
        return this._sapServers;
    }

    get activeAPI() {
        return this._activeAPI;
    }
}

