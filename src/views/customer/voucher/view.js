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
        customStatus: {
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
        customCode: '',
        customName: '',
        email: '',
        linkTel: '',
        discountPercent: 0.8,
        customStatus: '1',
        state: '0'
    },
    list: {
        id: 'customerBillList',
        resources: services.goodsQuote,  // services.goods,
        method: 'customer.manage.search',   // 'omd.goods.brand.search',
        response: 'customer_bill',  // 'brand',
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
                title: '单据编号',
                key: 'sheetID',
                width: 180,
                'header-align': 'left',
                align: 'right'
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
            }, {
                title: '客户状态',
                key: 'customStatus',
                width: 90,
                'header-align': 'center',
                align: 'center',
                render: Efview.renderByDict,
                extra: 'customStatus'
            }, {
                title: '单据状态',
                key: 'state',
                width: 90,
                'header-align': 'center',
                align: 'center',
                render: Efview.renderByDict,
                extra: 'billStatus'
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
                url: viewConfig.list.resources + '?method=' + viewConfig.list.method + '&token=' + token,
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
                url: viewConfig.list.resources + '?method=customer.manage.add&token=' + token,
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
                url: viewConfig.list.resources + '?method=customer.manage.update&token=' + token,
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
                url: viewConfig.list.resources + '?method=customer.manage.delete&token=' + token,
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
                    title: '客户编码',
                    key: 'customCode',
                    type: 'text',
                    readonly: 'modify'
                }, {
                    title: '客户姓名',
                    key: 'customName',
                    //type: 'text', (default)
                }, {
                    title: '联系电话',
                    key: 'linkTel'
                }, {
                    title: '邮箱',
                    key: 'email',
                    type: 'email'
                }, {
                    title: '折扣权限',
                    key: 'discountPercent',
                    type: 'number',
                    max: 1,
                    min: 0,
                    step: 0.01,
                    precision: 2
                }, {
                    title: '客户状态',
                    key: 'customStatus',
                    type: 'select',
                    extra: 'customStatus',
                    readonly: 'new'
                }, {
                    title: '创建时间',
                    key: 'createDate',
                    readonly: 'all'
                }],
                rules: {
                    customCode: [ // 客户编码
                        { required: true, message: '客户编码不可为空！', trigger: 'blur' }
                    ],
                    customName: [ // 客户姓名
                        { required: true, message: '客户姓名不可为空！', trigger: 'blur' }
                    ],
                    linkTel: [ // 联系电话
                        { required: true, message: '请提供有效的电话号码！', trigger: 'blur' }
                    ],
                    email: [ // 邮箱
                        { required: true, message: '电子邮箱不可为空！', trigger: 'blur' },
                        { type: 'email', message: '无效的邮件地址！', trigger: 'blur' }
                    ],
                    discountPercent: [ //折扣权限
                        { type: 'number', message: '折扣率需在0~1范围内！', min: 0.01, max: 1, trigger: 'change' }
                    ]
                }
            },
            // 明细子表
        }
    }
});

export default viewConfig;
