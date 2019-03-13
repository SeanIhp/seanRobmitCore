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
        applicationtype: {
            source: 'local',
            data: [
                {code: 0, name: '正常申请单'},
                {code: 1, name: '变更申请单'}
            ]
        },
        authomode: {
            source: 'local',
            data: [
                {code: '0', name: '云模式'},
                {code: '1', name: '本地模式'}
            ]
        },
        controlmode: {
            source: 'local',
            data: [
                {code: 0, name: '按企业控制'},
                {code: 1, name: '按机构控制'},
                {code: 2, name: '按POS控制'}
            ]
        },
        licencetype: {
            source: 'local',
            data: [
                {code: 0, name: '正式许可证'},
                {code: 1, name: '试用许可证'}
            ]
        },
        resourcetype: {
            source: 'local',
            data: [
                {code: 0, name: '产品'},
                {code: 1, name: '服务'},
                {code: 2, name: '移动应用'}
            ]
        },
        resourceverid: {
            source: 'local',
            data: [
                {code: "1589010139971629260",name: "用户中心" },
                {code: "1590891612471297396",name: "34234234"},
                {code: "1590905549094914177",name: "121e"},
                {code: "1591529963520005386",name: "名称" },
            ]
        },
        applyreason: {
            source: 'local',
            data: [
                {code: 0, name: '首次发放'},
                {code: 1, name: '新开店'},
                {code: 2, name: '增加授权数'},
                {code: 3, name: '其他原因的临时申请'},
                {code: 4, name: '跨门店平移'},
                {code: 5, name: '门店间平移'},
                {code: 6, name: '门店名变更'},
                {code: 7, name: '企业变更'}
            ]
        },
        status: {
            source: 'local',
            data: [
                {code: '0', name: '初始'},
                {code: '2', name: '审核中'},
                {code: '3', name: '审核'},
                {code: '4', name: '无效'}
            ]
        },
        relationship: {
            source: 'local',
            data: [
                {code: 'AND', name: '与'},
                {code: 'OR', name: '或'},
            ]
        },
        keyWord: {
            source: 'local',
            data: [
                {code: 'applycode', name: '申请单编号'},
                {code: 'applicationtype', name: '申请类型'},
                {code: 'licencetype', name: '许可证类型'}
            ]
        },
        condition: {
            source: 'local',
            data: [
                { code: 'EQ', name: '等于' }
            ]
        },
        value: {
            source: 'local',
            data: [
                {code: 0, name: '正常申请单'},
                {code: 1, name: '变更申请单'}
            ]
        },
    },
    newone: {
        applicationid: '',
        applycode: '',  // 申请单号
        projectcode: '',  // 立项单号
        contractcode: '',  // 合同编号
        entcode: '', // 企业编号
        entname: '', // 企业名称
        productcode: '', // 产品编号
        productname: '', // 产品名称
        validdays: 9, // 有效期
        startdate: '2018-02-06', // 起始日期
        enddate: '2018-02-15', // 截止日期
        authomode: '0', // 授权模式
        controlmode: 0, // 控制方式
        applicationtype: 0, // 申请类型
        licencetype: 0, // 许可类型
        resourcetype: 0, // 资源类型
        resourceverid: '', // 资源版本
        authocode: '', // 授权码
        checkcycle: '', // 验证周期
        maxcheckcycle: '', // 最长验证周期
        promptdays: '', // 提前预警天数
        serveramount: '', // 服务器数量
        clientamount: '', // 客户端数量
        posamount: '', // POS数量
        applicantid: 'zbuser1', // 申请人
        applydate: '', // 申请日期
        applyreason: 0, // 申请原因
        status: '0', // 状态
        // approverid: '', // 审批人
        // approvedate: '', // 审批日期
        note: '', // 备注
        createman: 'zbuser1', // 创建人
        createtime: '', // 创建日期
        modifyman: 'zbuser1', // 修改人
        modifytime: '', // 修改日期
    },
    list: {
        id: 'customerBillList',
        resources: services.licenceInfo,  // services.goods,
        method: 'autho.licence.getApplicationByCondition',   // 'omd.goods.brand.search',
        response: 'resource',  // 'brand',
        key: 'applicationid',
        searchParamDefault: {
            // fields: 'bid,code,name,scode,sname,desc,grade_id,grade_name,cat_id,cat_name,country_id,country,parent_id,parent_name,level,is_parent,img_url,status',
            // order_direction: 'desc',
            // order_field: 'bid'
        },
        searchParam: {
            rows:[{
                condition:"",
                keyWord:"",
                relationship:"",
                selectItem:{showInput: true},
                value:"",
                value1:"",
                value2:"",
                value3:""
            }]
        },
        searchData: [
            {
                'title': '关系',
                'key': 'relationship', 
                'type': 'select',
                'extra': 'relationship'
            },
            {
                'title': '关键字',
                'key': 'keyWord', 
                'type': 'select',
                'extra': 'keyWord'
            },
            {
                'title': '条件',
                'key': 'condition', 
                'type': 'select',
                'extra': 'condition'
            },
            {
                'title': '值',
                'key': 'value', 
                'type': 'text'
            }
        ],
        selectItem: [
            { 
                value: 'applycode',
                label: '申请单编号' ,
                selected: true,
                showInput:true,
            },
            { 
                value: 'applicationtype',
                label: '申请类型' ,
                selected: true ,
                showSelect:true,
                types:[
                    { value: '0', label: '正常申请单' },
                    { value: '1', label: '变更申请单' }
                ]
            },
            { 
                value: 'licencetype',
                label: '许可证类型' ,
                selected: true ,
                showSelect:true,
                types:[
                    { value: '0', label: '正式许可证' },
                    { value: '1', label: '试用许可证' }
                ]
            }
          ],
        columns: [
            {
                type: 'index',
                label: '#',
                width: 80,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
                title: '申请单号',
                key: 'applycode',    // 'code',
                width: 160,
                'header-align': 'center',
                align: 'right'
            }, {
                title: '立项单号',
                key: 'projectcode',
                width: 180,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }, {
                title: '企业名称',
                key: 'entname',
                width: 180,
                'header-align': 'left',
                align: 'right'
            }, {
                title: '企业编号',
                key: 'entcode',
                width: 120,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '有效期',
                key: 'validdays',
                width: 200,
                'header-align': 'center',
                align: 'right'
            }, {
                title: '合同编号',
                key: 'contractcode',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '产品名称',
                key: 'productname',
                width: 90,
                'header-align': 'center',
                align: 'center'
            }, {
                title: '产品编号',
                key: 'productcode',
                width: 90,
                'header-align': 'center',
                align: 'center'
            },{            
                title: '申请类型',
                key: 'applicationtype',
                width: 90,
                'header-align': 'center',
                render: Efview.renderByDict,
                extra: 'applicationtype',
            }
        ],
        load: async function (param) {
            let _that = this;
            _that.loading = true;
            let token = cookies.get('token') || '1591705854804628120';
            let searchParam = param || {..._that.searchParamDefault};
            // searchParam.page_no = _that.pager.pageIndex;
            // searchParam.page_size = _that.pager.pageSize;
            searchParam.pageNo = _that.pager.pageIndex;
            searchParam.pageSize = _that.pager.pageSize;
            searchParam.user_id = '1590275247964160013';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '&method=' + viewConfig.list.method + '&token=' + token,
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
            let token = cookies.get('token') || '1591705854804628120';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '&method=autho.licence.saveLicenceApplication&token=' + token,
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
            let token = cookies.get('token') || '1591705854804628120';
            let res = request({                 
                method: 'post',
                url: viewConfig.list.resources + '&method=autho.licence.saveLicenceApplication&token=' + token,
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
            let token = cookies.get('token') || '1591705854804628120';
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '&method=autho.licence.delApplication&token=' + token,
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
        search: async function (param, cb) { 
            let _that = this;
            _that.loading = true;
            let token = cookies.get('token') || '1591705854804628120';
            let searchParam = param || {..._that.searchParamDefault};
            //searchParam.pageNo = _that.pager.pageIndex;
            searchParam.pageNo = 1;
            searchParam.pageSize = 5;
            searchParam.user_id = "1590275247964160013";
            console.log("param=="+JSON.stringify(searchParam));
            let res = request({
                method: 'post',
                url: viewConfig.list.resources + '&method=autho.licence.getApplicationByCondition&token=' + token,
                data: searchParam
            }, function(resData){         
                if(!!resData && resData.returncode==='0'){  
                    _that.rowDatas = resData.data[_that.response];
                    _that.pager.total = resData.data.total_results;
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
                    title: '申请单号',
                    key: 'applycode',
                    type: 'text',   // number/email/select/datePicker/timePicker/colorPicker/radio/checkbox/textarea/cascader/switch/slider/rate
                    readonly: 'all'
                },{            
                    title: '立项单号',
                    key: 'projectcode',
                    type: 'text', 
                },{            
                    title: '企业名称',
                    key: 'entname',
                    type: 'text', 
                    readonly: 'all'
                }, {
                    title: '企业编号',
                    key: 'entcode',
                    type: 'demonList',
                    extra: {
                        key: 'company',
                        valueMap: [
                            {from: 'code',        to: 'entcode'},
                            {from: 'name',        to: 'entname'},
                            {from: [function(fn) {
                                let entcode = '';
                                let _that = this;
                                let token = cookies.get('token') || '1591705854804628120';
                                let searchParam = {};
                                searchParam.entcode = 'ZHONGBAI';
                                let res = request({
                                    method: 'post',
                                    url: viewConfig.list.resources + '&method=autho.licence.generateAuthoCode&token=' + token,
                                    data: searchParam
                                }, function(resData){                
                                    entcode = resData.data.authocode;
                                });
                            }], to: 'authocode',}
                        ]
                    }
                },{            
                    title: '有效期(天)',
                    key: 'validdays',
                    type: 'text', 
                    readonly: 'all'
                },{            
                    title: '合同编号',
                    key: 'contractcode',
                    type: 'text'
                },{            
                    title: '产品名称',
                    key: 'productname',
                    type: 'text', 
                    readonly: 'all'
                },{
                    title: '产品编号',
                    key: 'productcode',
                    type: 'demonList',
                    extra: {
                        key: 'licenceresource',
                        valueMap: [
                            {from: 'resourcecode',        to: 'productcode'},
                            {from: 'resourcename',        to: 'productname'}                            
                        ]
                    }
                },{            
                    title: '起始日期',
                    key: 'startdate',
                    type: 'date'
                },{            
                    title: '申请类型',
                    key: 'applicationtype',
                    type: 'select',
                    extra: 'applicationtype',
                },{            
                    title: '授权模式',
                    key: 'authomode',
                    type: 'select',
                    extra: 'authomode',
                },{            
                    title: '控制方式',
                    key: 'controlmode',
                    type: 'select',
                    extra: 'controlmode',
                },{            
                    title: '截止日期',
                    key: 'enddate',
                    type: 'date'
                },{            
                    title: '许可类型',
                    key: 'licencetype',
                    type: 'select',
                    extra: 'licencetype',
                },{            
                    title: '资源类型',
                    key: 'resourcetype',
                    type: 'select',
                    extra: 'resourcetype',
                },{            
                    title: '资源版本',
                    key: 'resourceverid',
                    type: 'select',
                    extra: 'resourceverid',
                },{            
                    title: '授权码',
                    key: 'authocode',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '验证周期(天)',
                    key: 'checkcycle',
                    type: 'text',
                },{            
                    title: '延长验证(天)',
                    key: 'maxcheckcycle',
                    type: 'text',
                },{            
                    title: '创建人',
                    key: 'createman',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '创建日期',
                    key: 'createtime',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '客户端数量',
                    key: 'clientamount',
                    type: 'text',
                },{            
                    title: '提前预警(天)',
                    key: 'promptdays',
                    type: 'text',
                },{            
                    title: '申请人',
                    key: 'applicantid',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '申请日期',
                    key: 'applydate',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '申请原因',
                    key: 'applyreason',
                    type: 'select',
                    extra: 'applyreason',
                },{            
                    title: '状态',
                    key: 'status',
                    type: 'select',
                    extra: 'status',
                    readonly: 'all'
                },{            
                    title: '审批人',
                    key: 'approverid',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '审批日期',
                    key: 'approvedate',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: 'POS数量',
                    key: 'posamount',
                    type: 'text'
                },{            
                    title: '服务器数量',
                    key: 'serveramount',
                    type: 'text'
                },{            
                    title: '修改人',
                    key: 'modifyman',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '修改日期',
                    key: 'modifytime',
                    type: 'text',
                    readonly: 'all'
                },{            
                    title: '备注',
                    key: 'note',
                    type: 'textarea'
                }],
            },
            // 明细子表
        }
    }
});

export default viewConfig;
