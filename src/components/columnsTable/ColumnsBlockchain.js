export class ColumnsBlockchain {
    constructor() {
        this.columnsDeviceKey = [
            {
                name: 'device_key_id',
                selector: (row) => row.device_key_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'order_id',
                selector: (row) => row.order_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'owner_id',
                selector: (row) => row.owner_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'administrator',
                selector: (row) => row.administrator,
                sortable: true,
                wrap: true,
            },
            {
                name: 'user_id',
                selector: (row) => row.user_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'application_service_id',
                selector: (row) => row.application_service_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'sku_id',
                selector: (row) => row.sku_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'price',
                selector: (row) => row.price,
                sortable: true,
                wrap: true,
            },
            {
                name: 'device_key_description',
                selector: (row) => row.device_key_description,
                sortable: true,
                wrap: true,
            },
            {
                name: 'picture_url',
                selector: (row) => row.picture_url,
                sortable: true,
                wrap: true,
            },
            {
                name: 'device id',
                selector: (row) => row.device[0].device_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'description id',
                selector: (row) => row.device[0].description,
                sortable: true,
                wrap: true,
            },
            {
                name: 'coordlatitude',
                selector: (row) => row.device[0].coordinates.latitude,
                sortable: true,
                wrap: true,
            },
            {
                name: 'coord-longitude',
                selector: (row) => row.device[0].coordinates.longitude,
                sortable: true,
                wrap: true,
            },
            {
                name: 'name',
                selector: (row) => row.device[0].name,
                sortable: true,
                wrap: true,
            },
            {
                name: 'status',
                selector: (row) => row.device[0].status,
                sortable: true,
                wrap: true,
            },
            {
                name: 'case_id',
                selector: (row) => row.device[0].case_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'identifier_token',
                selector: (row) => row.identifier_token,
                sortable: true,
                wrap: true,
            },
            {
                name: 'wearout',
                selector: (row) => row.wearout,
                sortable: true,
                wrap: true,
            },
            {
                name: 'history_hash',
                selector: (row) => row.history_hash,
                sortable: true,
                wrap: true,
            },
            {
                name: 'window_hash',
                selector: (row) => row.window_hash,
                sortable: true,
                wrap: true,
            },
            {
                name: 'is_certificate',
                selector: (row) => JSON.stringify(row.is_certificate),
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsOrders = [
            {
                name: 'order id',
                selector: (row) => row.order_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'external_number',
                selector: (row) => row.external_number,
                sortable: true,
                wrap: true,
            },
            {
                name: 'seller id',
                selector: (row) => row.seller_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'order amount',
                selector: (row) => row.order_amount,
                sortable: true,
                wrap: true,
                maxWidth: '50px',
            },
            {
                name: 'currency',
                selector: (row) => row.currency,
                sortable: true,
                wrap: true,
                maxWidth: '50px',
            },
            {
                name: 'order-description',
                selector: (row) => row.order_description,
                sortable: true,
                wrap: true,
            },
            {
                name: 'user/client id',
                selector: (row) => row.user_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'application service id',
                selector: (row) => row.application_service_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'creation time',
                selector: (row) => row.creation_time,
                sortable: true,
                wrap: true,
            },
            {
                name: 'time update',
                selector: (row) => row.time_for_update,
                sortable: true,
                wrap: true,
                maxWidth: '50px',
            },
            {
                name: 'status',
                selector: (row) => JSON.stringify(row.status),
                sortable: true,
                wrap: true,
            },
            {
                name: 'window hash',
                selector: (row) => row.window_hash,
                sortable: true,
                wrap: true,
            },
        ];
        // this.columnsTransaction = [
        //     {
        //         name: 'type',
        //         selector: (row) => row.type,
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'device_key_id',
        //         selector: (row) => row.content.debug.device_key_id || row.content.debug.device_id,
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'adminId',
        //         selector: (row) => row.content.debug.administrator_id,
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'wearout',
        //         selector: (row) => row.content.debug.wearout,
        //         sortable: true,
        //         wrap: true,
        //         compact: true,
        //     },
        //     {
        //         name: 'time',
        //         selector: (row) => row.content.debug.time,
        //         sortable: true,
        //         wrap: true,
        //         compact: true,
        //     },
        //     {
        //         name: 'info',
        //         selector: (row) => JSON.stringify(row.content.debug.info[0], null, 2),
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'message',
        //         selector: (row) => row.content.message,
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'height',
        //         selector: (row) => JSON.stringify(row.location.block_height),
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'position',
        //         selector: (row) => JSON.stringify(row.location.position_in_block),
        //         sortable: true,
        //         wrap: true,
        //     },
        //     {
        //         name: 'status',
        //         selector: (row) => JSON.stringify(row.status),
        //         sortable: true,
        //         wrap: true,
        //     },
        // ];
        this.columnsUserWallet = [
            {
                name: 'payment_account_id',
                selector: (row) => row.payment_account_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'owner_id',
                selector: (row) => row.owner_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'application_service_id',
                selector: (row) => row.application_service_id,
                sortable: true,
                wrap: true,
            },
            // {
            //   name: 'administrators',
            //   selector: (row) => row.administrators,
            //   sortable: true,
            //   wrap: true,
            // },
            // {
            //   name: 'users',
            //   selector: (row) => row.users,
            //   sortable: true,
            //   wrap: true,
            // },
            {
                name: 'amount',
                selector: (row) => row.amount,
                sortable: true,
                wrap: true,
            },
            {
                name: 'currency_code',
                selector: (row) => row.currency_code,
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
                name: 'description',
                selector: (row) => row.description,
                sortable: true,
                wrap: true,
            },
            {
                name: 'history_hash',
                selector: (row) => row.history_hash,
                sortable: true,
                wrap: true,
            },
            {
                name: 'blocked_amount',
                selector: (row) => row.blocked_amount,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsServiceApplication = [
            {
                name: 'window_hash',
                selector: (row) => row.window_hash,
                sortable: true,
                wrap: true,
            },
            {
                name: 'url',
                selector: (row) => row.url,
                sortable: true,
                wrap: true,
            },
            {
                name: 'successful_url',
                selector: (row) => row.successful_url,
                sortable: true,
                wrap: true,
            },
            {
                name: 'fail_url',
                selector: (row) => row.fail_url,
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
                name: 'tags',
                selector: (row) => row.tags,
                sortable: true,
                wrap: true,
            },
        ];
        this.columnsCatalog = [
            {
                name: 'applicationServ_id',
                selector: (row) => row.application_service_id,
                sortable: true,
                wrap: true,
            },
            {
                name: 'window hash',
                selector: (row) => row.window_hash,
                sortable: true,
                wrap: true,
            },
            {
                name: 'URL',
                selector: (row) => row.url,
                sortable: true,
                wrap: true,
            },
            {
                name: 'Case',
                selector: (row) => row.case,
                sortable: true,
                wrap: true,
            },
            {
                name: 'Name',
                selector: (row) => row.name,
                sortable: true,
                wrap: true,
            },
            {
                name: 'Tags',
                selector: row => row.tags,
                sortable: true,
                wrap: true,
                maxWidth: '50px',
            },

        ]
    }

    get deviceKey() {
        return this.columnsDeviceKey;
    }

    get orders() {
        return this.columnsOrders;
    }

    get transaction() {
        return this.columnsTransaction;
    }

    get userWallet() {
        return this.columnsUserWallet;
    }

    get serviceAP() {
        return this.columnsServiceApplication;
    }

    get catalog() {
        return this.columnsCatalog;
    }
}