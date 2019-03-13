import services from '../config/services';

let Efdemon = {
    lists: [
        {
            key: 'customs',
            remote: {
                resources: services.goodsQuote,
                method: 'customer.manage.search',
                response: 'customer_bill'
            },
            loading: false,
            stripe: true,
            pager: {
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                sizeOption: [10, 20, 50]
            },
            searchParamDefault: {},
            multiple: true,     // false
            selected: [],
            columns: [
                {
                    type: 'selection',      // index
                    label: '#',
                    width: 70,
                    'header-align': 'center',
                    align: 'center',
                    fixed: 'left'
                }, {
                    title: '客户编码',
                    key: 'customCode',    // 'code',
                    width: 160,
                    'header-align': 'center',
                    align: 'right'
                }, {
                    title: '客户姓名',
                    key: 'customName',
                    width: 180,
                    'header-align': 'center',
                    align: 'center',
                    fixed: 'left'
                }, {
                    title: '联系电话',
                    key: 'linkTel',
                    width: 120,
                    'header-align': 'center',
                    align: 'center'
                }, {
                    title: '邮箱',
                    key: 'email',
                    width: 200,
                    'header-align': 'center',
                    align: 'right'
                }, {
                    title: '折扣权限',
                    key: 'discountPercent',
                    width: 90,
                    'header-align': 'center',
                    align: 'center'
                }
            ]
        },
        {
            key: 'items',
            remote: {
                resources: services.goodsQuote,
                method: 'goods.manage.searchGoodsBill',
                response: 'goods_bill'
            },
            loading: false,
            stripe: true,
            pager: {
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                sizeOption: [10, 20, 50]
            },
            searchParamDefault: {},
            multiple: true,     // false
            selected: [],
            columns: [
                {
                    type: 'selection',      // index
                    label: '#',
                    width: 70,
                    'header-align': 'center',
                    align: 'center',
                    fixed: 'left'
                }, {
                    title: '商品编码',
                    key: 'itemCode',
                    width: 160,
                    'header-align': 'center',
                    align: 'right'
                }, {
                    title: '商品名称',
                    key: 'itemName',
                    width: 200,
                    'header-align': 'center',
                    align: 'center',
                    fixed: 'left'
                }, {
                    title: '采购价',
                    key: 'purchaseCost',
                    width: 120,
                    'header-align': 'center',
                    align: 'center'
                }, {
                    title: '建议零售价',
                    key: 'advisePrice',
                    width: 200,
                    'header-align': 'center',
                    align: 'right'
                }, {
                    title: '库存量',
                    key: 'stockQty',
                    width: 90,
                    'header-align': 'center',
                    align: 'center'
                }, {
                    title: '商品状态',
                    key: 'state',
                    width: 90,
                    'header-align': 'center',
                    align: 'center'
                }
            ]
        }
    ],
    grids: [
        {}
    ]
};

export default Efdemon;
