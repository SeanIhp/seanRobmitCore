import cookies from 'js-cookie';
import { request } from '../../../libs/httpRequest';
import services from '../../../config/services';

import Efview from '../../../libs/efview';
import detItems from './detail_1.js';
import detItems2 from './detail_2.js';

let viewConfig = Efview.extend( function(){ Efview.base.bill.view.call(this);  }, Efview.base.bill.view, {
    dict: {
        _remote: [
            {
                dictGroupCode: 'org_type,org_industry,org_status,org_grade,org_business_type,channel,grade_area_type',
                params: null
            }, 
            {
                dictGroupCode: null,
                params: {
                    dictGroupCode: 'channel', 
                    level: 1
                }
            }    
        ],
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
        },
        quoteStatus: {
            source: 'local',
            data: [
                {code: '0', name: '停用'},
                {code: '1', name: '可用'}
                // {code: '0', name: '正常'},
                // {code: '1', name: '已停用'},
                // {code: '2', name: '已取消'}
            ]
        },
        selectExtra: {
            source: 'local',
            data: [
                { code: '008',     name: '!@@!!!!New York' },
                { code: '098898',  name: 'London' },
                { code: '6632414', name: 'Sydney' },
                { code: '001',     name: 'Ottawa' },
                { code: '002',     name: 'Paris' },
                { code: '003',     name: 'Canberra' }
            ]
        }
    },
    newone: {
        sheetID: null,
        customCode: '',
        customName: '',
        details: [],
        // discountPercent: 1,
        email: '',
        grantPercent: 1, 
        linkTel: '',
        state: 0
    },
    list: {
        id: 'quoteBillList',
        resources: services.goodsQuote,  // services.goods,
        method: 'quote.manage.search',   // 'omd.goods.brand.search',
        response: 'bills',  // 'brand',
        key: 'sheetID',
        stateKey: 'state',
        columns: [    
            {   
                type: 'index',
                label: '#',
                width: 80,
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
                title: '客户编码',
                key: 'customCode',    // 'code',
                width: 100,
                'header-align': 'center',
                align: 'right'
            }, {
                title: '客户姓名',
                key: 'customName',
                width: 130,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
                title: '折扣权限',
                key: 'discountPercent',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '授权折扣',
                key: 'grantPercent',
                width: 90,
                'header-align': 'center',
                align: 'center'
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
                url: viewConfig.list.resources + '?method=quote.manage.add&ent_id=0&token=' + token,
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
                url: viewConfig.list.resources + '?method=quote.manage.update&ent_id=0&token=' + token,
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
                url: viewConfig.list.resources + '?method=quote.manage.delete&ent_id=0&token=' + token,
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
                    type: 'text',   // number/email/select/datePicker/radio/checkbox/textarea/switch
                    readonly: 'all'
                }, {
                    title: '单据状态',
                    key: 'state',
                    type: 'select',
                    // type: 'radio',
                    // type: 'checkbox',
                    // type: 'switch',
                    extra: 'billStatus',
                    // readonly: 'all',
                }, {
                    title: '客户姓名',
                    key: 'customName',
                    //type: 'text', (default)                    
                    type: 'demonList',
                    extra: {
                        key: 'customs',
                        valueMap: [
                            {from: 'customCode',        to: 'customCode'},
                            {from: 'customName',        to: 'customName'},
                            {from: 'linkTel',           to: 'linkTel'},
                            {from: 'email',             to: 'email'},
                            {from: 'discountPercent',   to: 'discountPercent'}
                        ]
                    }
                }, {
                    title: '客户编码',
                    key: 'customCode',
                    type: 'textarea',   //'text',   // 'demon',
                    // readonly: 'all'
                }, {
                    title: '联系电话',
                    key: 'linkTel',
                    // readonly: 'all'
                }, {
                    title: '邮箱',
                    key: 'email',
                    type: 'email',
                    readonly: 'all'
                }, {
                    title: '联动FIELD',
                    key: 'liandong',
                    type: 'select',
                    extra: {
                        key: null,
                        data: []
                    }
                }, {
                    title: '折扣权限',
                    key: 'discountPercent',
                    type: 'number',
                    max: 1,
                    min: 0,
                    step: 0.01,
                    precision: 2
                }, {
                    title: '创建时间',
                    key: 'createDate',
                    type: 'datetimerange',
                    // readonly: 'all'
                }],
                dependency: [
                    {
                        key: 'email',
                        paramKey: 'oid',
                        source: 'linkTel',
                        remote: {
                            resources: services.goods,  // services.goods,
                            method: 'omd.org.getchildren',   // 'omd.goods.brand.search',
                            params: {
                                order_direction: 'asc'
                            },
                            response: 'organization',  // 'brand',                            
                        },
                        valueMap: [
                            {
                                from: 'industry', to: 'value'
                            }
                        ]
                    },
                    {
                        key: 'liandong',
                        paramKey: 'oid',
                        source: 'linkTel',
                        remote: {
                            resources: services.goods,  // services.goods,
                            method: 'omd.org.getchildren',   // 'omd.goods.brand.search',
                            params: {
                                order_direction: 'asc'
                            },
                            response: 'organization',  // 'brand',                            
                        },
                        valueMap: [
                            { from: 'industry', to: 'name' },
                            { from: 'industry_code', to: 'code' }
                        ]
                    },
                ]
            },
            // 明细子表
            body: [
                {
                    key: 'itemQuotesDetail',
                    title: '商品报价',
                    config: detItems
                },                
                {
                    key: 'itemQuotesDetail2',
                    title: 'SP Quo II',
                    config: detItems2
                }       
            ]
        }


    }
});

export default viewConfig;
