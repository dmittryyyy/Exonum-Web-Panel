export const columnsShop = [
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
]

export const columnsEvents = [
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
]

export const columnsVendingMachines = [
    {
        name: 'id',
        selector: (row) => row.id,
        sortable: true,
        wrap: true,
        omit: false
    },
    {
        name: 'name',
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
    },
    {
        name: 'description',
        selector: (row) => row.description,
        sortable: true,
        wrap: true,
    },
    {
        name: 'serialNumber',
        selector: (row) => row.serialNumber,
        sortable: true,
        wrap: true,
    },
    {
        name: 'serialVendingNumber',
        selector: (row) => row.serialVendingNumber,
        sortable: true,
        wrap: true,
    },
    {
        name: 'blockchainKey',
        selector: (row) => row.blockchainKey,
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
        name: 'condition',
        selector: (row) => row.condition,
        sortable: true,
        wrap: true,
    },
    {
        name: 'vendAnaliticaId',
        selector: (row) => row.vendAnaliticaId,
        sortable: true,
        wrap: true,
    },
    {
        name: 'lastConnectionTime',
        selector: (row) => row.lastConnectionTime,
        sortable: true,
        wrap: true,
    },
    {
        name: 'lastConnectionTimeout',
        selector: (row) => row.lastConnectionTimeout,
        sortable: true,
        wrap: true,
    },
    {
        name: 'lastEventDate',
        selector: (row) => row.lastEventDate,
        sortable: true,
        wrap: true,
    },
    {
        name: 'userPublicKey',
        selector: (row) => row.userPublicKey,
        sortable: true,
        wrap: true,
    },
    {
        name: 'userPrivateKey',
        selector: (row) => row.userPrivateKey,
        sortable: true,
        wrap: true,
    },
    {
        name: 'placeId',
        selector: (row) => row.placeId,
        sortable: true,
        wrap: true,
    },
]

export const columnsBenefitsRules = [
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
]

export const columnsUserBenefits = [
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
]

export const columnsItemsLoaded = [
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
]