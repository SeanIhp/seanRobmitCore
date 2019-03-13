
import Efview from '../../../libs/efview';

let viewDetailConfig = Efview.extend(function () { Efview.base.bill.viewDetail.call(this); }, Efview.base.bill.viewDetail, {
    name: 'itemQuotesDetail2',
    newone: {
        sheetID: null,
        customCode: '',
        customName: '',
        // discountPercent: 1,
        email: '',
        grantPercent: 1,
        linkTel: '',
        state: 0
    },
    list: {
        id: 'quoteBillDetailList2',
        // resources: services.goodsQuote,
        // method: 'quote.manage.search',   // 'omd.goods.brand.search',
        // response: 'bills',  // 'brand',
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
                title: 'BJD编号',
                key: 'sheetID',
                width: 180,
                'header-align': 'left',
                align: 'right'
            }, {
                title: 'SX编号',
                key: 'seqno',
                width: 120,
                'header-align': 'left',
                align: 'right'
            }, {
                title: 'KH编码',
                key: 'customCode',    
                width: 150,
                'header-align': 'center',
                align: 'right',
                editor: 'demonList',    // 'textbox',
            }, {
                title: 'KH姓名',
                key: 'customName',
                width: 130,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
                title: 'SP编码',
                key: 'itemCode',
                width: 160,
                'header-align': 'center'
            }, {
                title: 'SP名称',
                key: 'itemName',
                width: 130,
                'header-align': 'center',
                align: 'center',
                fixed: 'left',
                editor: 'textbox',
            }, {
                title: '采购成本',
                key: 'purchaseCose',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '建议售价',
                key: 'advisePrice',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '销售报价',
                key: 'salePrice',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '折扣权限',
                key: 'discountPercent',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '库存数量',
                key: 'grantPercent',
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
        // mount: async function (rowData) {
        //     // console.log('this.pager.@@@@@:::::: ', this, viewDetailConfig)
        //     // console.log('this.pager.total:::::: ', this.pager.total)
        // }
    }
});

export default viewDetailConfig;
