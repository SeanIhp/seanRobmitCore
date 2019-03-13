import services from '../../../config/services';
import Efview from '../../../libs/efview';

let viewDetailConfig = Efview.extend(function () { Efview.base.bill.viewDetail.call(this); }, Efview.base.bill.viewDetail, {
    name: 'itemQuotesDetail',
    newone: {
        sheetID: null,
        // customCode: '',
        // customName: '',
        // email: '',
        // grantPercent: 1,
        // linkTel: '',
        itemCode: '',
        itemName: '',
        purchaseCost: -1,
        advicePrice: -1,
        salePrice: 0,
        stockQty: 0,
        itemState: '1',
        state: '0'
    },
    list: {
        id: 'quoteBillDetailList',
        key: 'itemCode',
        columns: [
            {
                type: 'index',
                label: '#',
                width: 80,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
            //     title: '报价单编号',
            //     key: 'sheetID',
            //     width: 180,
            //     'header-align': 'left',
            //     align: 'right'
            // }, {
            //     title: '顺序编号',
            //     key: 'seqno',
            //     width: 90,
            //     'header-align': 'left',
            //     align: 'right'
            // }, {
                title: '商品编码',
                key: 'itemCode',
                width: 180,
                'header-align': 'center',
                editor: 'demonList',    // 'textbox',
                extra: {
                    key: 'items',
                    valueMap: [
                        {from: 'itemCode',          to: 'itemCode'},
                        {from: 'itemName',          to: 'itemName'},
                        {from: 'purchaseCost',      to: 'purchaseCost'},
                        {from: 'advisePrice',       to: 'advisePrice'},
                        {from: 'stockQty',          to: 'stockQty',          default: 0},
                        {from: 'itemState',         to: 'itemState'},
                        {from: [
                            function (a, b, c) { return Efview.utils.toDecimal2(a * b + (c / 100)); },
                            '_extra.advisePrice',
                            '_main.discountPercent',
                            '_extra.purchaseCost',
                            [1, 1, 0.1]
                        ],
                        to: 'salePrice'}
                    ]
                }
            }, {
                title: '商品名称',
                key: 'itemName',
                width: 130,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
                title: '采购成本',
                key: 'purchaseCost',
                width: 120,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '建议售价',
                key: 'advisePrice',
                width: 120,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '销售报价',
                key: 'salePrice',
                width: 120,
                'header-align': 'center',
                align: 'center',
                editor: 'number',
                min: 0,
                max: 99
            }, {
                title: '库存数量',
                key: 'stockQty',
                width: 120,
                'header-align': 'center',
                align: 'center',
                editor: 'textbox'
            }, {
                title: '商品状态',
                key: 'state',
                width: 110,
                'header-align': 'center',
                align: 'center',
                // editor: 'select',
                // editor: 'switch',
                editor: 'selectmultiple',
                extra: 'itemStatus'
            }, {
                title: '创建时间',
                key: 'createDate',
                width: 160,
                'header-align': 'center',
                align: 'center'
            }
        ],
        rules: {
            stockQty: [ // 库存数量
                { type: 'string', required: true, message: '请提供有效的库存数量！' }
            ],
            salePrice: [ // 销售报价
                // { required: true, message: '电子邮箱不可为空！' },
                { type: 'number', min: 10, max: 20, message: '请提ddd供有效的库存数量！', trigger: 'change'}
            ]
        }
        /*
        rules: {
            type: 'object',
            fields: {
                salePrice: { type: 'number', required: true, min: 10, max: 2000, message: '请提ddd供有效的库存数量！'}
            }
        }
        */
    }
});

export default viewDetailConfig;
