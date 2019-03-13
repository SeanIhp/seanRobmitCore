import cookies from 'js-cookie';
import { request } from '../../../libs/httpRequest';
import services from '../../../config/services';

import Efview from '../../../libs/efview';

let viewConfig = Efview.extend( function(){ Efview.base.bill.view.call(this);  }, Efview.base.bill.view, {
    dict: {
        billStatus: {
            source: 'local',
            data: [
                {code: '0', name: '未审核'},
                {code: '1', name: '已审核'},
                {code: '2', name: '已取消'}
                // {code: '0', name: '已录入'},
                // {code: '1', name: '已申报'},
                // {code: '2', name: '审核中'},
                // {code: '3', name: '已审核'},
                // {code: '4', name: '已取消'}
            ]
        },     
        itemStatus: {
            source: 'local',
            data: [
                {code: '0', name: '停用'},
                {code: '1', name: '可用'}
                // {code: '0', name: '正常'},
                // {code: '1', name: '已停用'},
                // {code: '2', name: '已取消'}
            ]
        }
    },
    newone: {
        sheetID: null,
        itemCode: '',
        itemName: '',
        purchaseCost: -1,
        advicePrice: -1,
        stockQty: 0,
        itemState: '1',
        state: '0'
    },
    list: {
        id: 'itemBillList',
        resources: services.goodsQuote,  
        method: 'goods.manage.searchGoodsBill',   
        response: 'goods_bill',  
        key: 'sheetID',
        searchParamDefault: {
            // fields: 'bid,code,name,scode,sname,desc,grade_id,grade_name,cat_id,cat_name,country_id,country,parent_id,parent_name,level,is_parent,img_url,status',
            // order_direction: 'desc',
            // order_field: 'bid'
        },
        columns: [
            {   
                type: 'index',
                label: '#',
                width: 80,
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
                title: '单据编号',
                key: 'sheetID',
                width: 180,
                'header-align': 'left',
                align: 'right'
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
            }, {
                title: '创建时间',
                key: 'createDate',
                width: 160,
                'header-align': 'center',
                align: 'center'
            }
        ],
        load: async function (param) {
            let _that = this;
            _that.loading = true;
            let token = cookies.get('token') || '1584928153141266120';
            let searchParam = param || {..._that.searchParamDefault};
            // searchParam.page_no = _that.pager.pageIndex;
            // searchParam.page_size = _that.pager.pageSize;
            searchParam.pageNo = _that.pager.pageIndex;
            searchParam.pageSize = _that.pager.pageSize;
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '?method=' + viewConfig.list.method + '&ent_id=0&token=' + token,
                data: searchParam
            }, function(resData){                
                _that.rowDatas = resData.data[_that.response];
                _that.pager.total = resData.data.total_results;            
                _that.loading = false;
            });
        },
        add: async function (param, cb) {
            let _that = this;
            _that.loading = true;
            let token = cookies.get('token') || '1584928153141266120';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '?method=goods.manage.addGoodsBill&ent_id=0&token=' + token,
                data: param
            }, function(resData){                
                if(!!resData && resData.returncode==='0'){
                    viewConfig.list.currentRow.sheetID = resData.data.sheetID;                
                    viewConfig.list.currentRow.createDate = resData.data.createDate;                
                    viewConfig.list.currentRow.lastDate = resData.data.lastDate;
                    _that.pager.total += 1;   
                    cb();
                    _that.loading = false;
                }else{
                    _that.loading = false;
                    viewConfig.errorMsg = resData.data;
                }
            });     
        },
        update: async function (param, cb) {
            let _that = this;
            delete param.createData;
            delete param.lastDate;
            delete param._flag;
            _that.loading = true;
            let token = cookies.get('token') || '1584928153141266120';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '?method=goods.manage.updateGoods&ent_id=0&token=' + token,
                data: param
            }, function(resData){         
                if(!!resData && resData.returncode==='0'){               
                    cb();
                    _that.loading = false;
                }else{
                    _that.loading = false;
                    viewConfig.errorMsg = resData.data;
                }
            });        
        },
        delete: async function (param, cb) {
            let _that = this;
            _that.loading = true;
            let token = cookies.get('token') || '1584928153141266120';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '?method=goods.manage.deleteGoodsBill&ent_id=0&token=' + token,
                data: param
            }, function(resData){         
                if(!!resData && resData.returncode==='0'){
                    _that.pager.total -= 1;        
                    cb();
                    _that.loading = false;
                }else{
                    _that.loading = false;
                    viewConfig.errorMsg = resData.data;
                }
            });        
        },
        detail: {
            // 明细单头
            head: {
                fields: [{            
                    title: '单据编号',
                    key: 'sheetID',
                    type: 'text',   // number/email/select/datePicker/timePicker/colorPicker/radio/checkbox/textarea/cascader/switch/slider/rate
                    readonly: 'all'
                }, {
                    title: '单据状态',
                    key: 'state',
                    type: 'select',
                    extra: 'billStatus',
                    readonly: 'all',
                }, {
                    title: '商品编码',
                    key: 'itemCode',
                    type: 'text',
                    readonly: 'modify'
                    // }
                }, {
                    title: '商品名称',
                    key: 'itemName',
                    //type: 'text', (default)
                }, {
                    title: '采购价',
                    key: 'purchaseCost'
                }, {
                    title: '建议零售价',
                    key: 'advicePrice'
                }, {
                    title: '库存量',
                    key: 'stockQTY',
                    type: 'number',
                    max: 100000,
                    min: 1,
                    step: 1,
                    precision: 0
                }, {
                    title: '商品状态',
                    key: 'state',
                    type: 'select',
                    extra: 'itemStatus',
                    readonly: 'new'
                }, {
                    title: '创建时间',
                    key: 'createDate',
                    readonly: 'all'
                }],
                rules: {
                    itemCode: [ // 客户编码
                        { required: true, message: '商品编码不可为空！', trigger: 'blur' }
                    ],
                    itemName: [ // 客户姓名
                        { required: true, message: '商品名称不可为空！', trigger: 'blur' }
                    ],
                    purchaseCost: [ // 采购价
                        { required: true, message: '请提供有效的采购价！', trigger: 'blur' }
                    ],
                    advicePrice: [ // 建议零售价
                        { required: true, message: '请提供有效的建议零售价！', trigger: 'blur' }
                    ],
                    stockQTY: [ //库存量
                        { required: true, message: '请输入折扣率！', trigger: 'change' }
                    ]
                }
            }
        }
    }
});

export default viewConfig;
