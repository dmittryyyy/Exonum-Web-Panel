export class ColumnsSapExplorer {
    constructor() {
        this.columnsBenefitsRules = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'userId',
                selector: (row) => row.userId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'stepValue',
                selector: (row) => row.stepValue,
                sortable: true,
                wrap: true,
            },
            {
                name: 'utcOffset',
                selector: (row) => row.utcOffset,
                sortable: true,
                wrap: true,
            },
            {
                name: 'value',
                selector: (row) => row.value,
                sortable: true,
                wrap: true,
            },
            {
                name: 'createdOn',
                selector: (row) => row.createdOn,
                sortable: true,
                wrap: true,
            },
            {
                name: 'modifiedOn',
                selector: (row) => row.modifiedOn,
                sortable: true,
                wrap: true,
            },
            {
                name: 'type',
                selector: (row) => row.type,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsCards = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true
            },
            {
                name: 'userId',
                selector: (row) => row.userId,
                sortable: true,
                wrap: true
            },
            {
                name: 'type',
                selector: (row) => row.type,
                sortable: true,
                wrap: true
            },
            {
                name: 'number',
                selector: (row) => row.number,
                sortable: true,
                wrap: true
            },
            {
                name: 'modifiedOn',
                selector: (row) => row.modifiedOn,
                sortable: true,
                wrap: true
            },
            {
                name: 'createdOn',
                selector: (row) => row.createdOn,
                sortable: true,
                wrap: true
            },
        ];
        this.columnsUserCardsRelQuer = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true
            },
            {
                name: 'userId',
                selector: (row) => row.userId,
                sortable: true,
                wrap: true
            },
            {
                name: 'type',
                selector: (row) => row.type,
                sortable: true,
                wrap: true
            },
            {
                name: 'number',
                selector: (row) => row.number,
                sortable: true,
                wrap: true
            },
            {
                name: 'modifiedOn',
                selector: (row) => row.modifiedOn,
                sortable: true,
                wrap: true
            },
            {
                name: 'blockchainId',
                selector: (row) => row.blockchainId,
                sortable: true,
                wrap: true
            },
            {
                name: 'nickname',
                selector: (row) => row.nickname,
                sortable: true,
                wrap: true
            },
            {
                name: 'createdOn',
                selector: (row) => row.createdOn,
                sortable: true,
                wrap: true
            },
        ];
        this.columnsEvents = [
            {
                name: 'eventId',
                selector: (row) => row.eventId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'eventType',
                selector: (row) => row.eventType,
                sortable: true,
                wrap: true,
            },
            {
                name: 'createdOn',
                selector: (row) => row.createdOn,
                sortable: true,
                wrap: true,
            },
            {
                name: 'userId',
                selector: (row) => row.data.userId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'cardId',
                selector: (row) => row.data.cardId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'sku',
                selector: (row) => row.data.sku,
                sortable: true,
                wrap: true,
            },
            {
                name: 'itemCount',
                selector: (row) => row.data.itemCount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'amount',
                selector: (row) => row.data.amount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'portionAmount',
                selector: (row) => row.data.portionAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'subsidyAmount',
                selector: (row) => row.data.subsidyAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'moneyAmount',
                selector: (row) => row.data.moneyAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'deductionAmount',
                selector: (row) => row.data.deductionAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'deviceId',
                selector: (row) => row.deviceId,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsItemsLoaded = [
            {
                name: 'name',
                selector: (row) => row.name,
                sortable: true,
                wrap: true,
            },
            {
                name: 'shopItemId',
                selector: (row) => row.shopItemId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'requiredAmount',
                selector: (row) => row.requiredAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'capacity',
                selector: (row) => row.capacity,
                sortable: true,
                wrap: true,
            },
            {
                name: 'currentAmount',
                selector: (row) => row.currentAmount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'category',
                selector: (row) => row.category,
                sortable: true,
                wrap: true,
            },
            {
                name: 'price',
                selector: (row) => row.price,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsShopItems = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'name',
                selector: (row) => row.name,
                sortable: true,
                wrap: true,
            },
            {
                name: 'category',
                selector: (row) => row.category,
                sortable: true,
                wrap: true,
            },
            {
                name: 'price',
                selector: (row) => row.price,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsUserBenefits = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'userId',
                selector: (row) => row.userId,
                sortable: true,
                wrap: true,
            },
            {
                name: 'type',
                selector: (row) => row.type,
                sortable: true,
                wrap: true,
            },
            {
                name: 'value',
                selector: (row) => row.value,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsUserCards = [
            {
                name: 'id',
                selector: (row) => row.id,
                sortable: true,
                wrap: true
            },
            {
                name: 'number',
                selector: (row) => row.number,
                sortable: true,
                wrap: true
            },
            {
                name: 'cardHolderId',
                selector: (row) => row.cardHolderId,
                sortable: true,
                wrap: true
            },
        ];
        this.columnsRequestsForAllMachines = [
            {
                name: 'name',
                selector: (row) => row.name,
                sortable: true,
                wrap: true
            },
            {
                name: 'shopItemId',
                selector: (row) => row.shopItemId,
                sortable: true,
                wrap: true
            },
            {
                name: 'requiredAmount',
                selector: (row) => row.requiredAmount,
                sortable: true,
                wrap: true
            },
            {
                name: 'capacity',
                selector: (row) => row.capacity,
                sortable: true,
                wrap: true
            },
            {
                name: 'currentAmount',
                selector: (row) => row.currentAmount,
                sortable: true,
                wrap: true
            },
            {
                name: 'price',
                selector: (row) => row.price,
                sortable: true,
                wrap: true
            },
            {
                name: 'category',
                selector: (row) => row.category,
                sortable: true,
                wrap: true
            },
        ];
}

    get benefitsRules() {
        return this.columnsBenefitsRules;
    }

    get cards() {
        return this.columnsCards;
    }

    get events() {
        return this.columnsEvents;
    }

    get itemsLoaded() {
        return this.columnsItemsLoaded;
    }

    get shopItems() {
        return this.columnsShopItems;
    }

    get benefits() {
        return this.columnsUserBenefits;
    }

    get userCards() {
        return this.columnsUserCards;
    }

    get reqForAllMachines() {
        return this.columnsRequestsForAllMachines;
    }

    get userCardsRelQuer() {
        return this.columnsUserCardsRelQuer;
    }

    get blockchainProfile() {
        return this.columnsBlockchainProfile;
    }
}
