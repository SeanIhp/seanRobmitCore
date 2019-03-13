import merge from 'lutils-merge';
import cookies from 'js-cookie';
import validator from 'async-validate';

import { request } from './httpRequest';
import services from '../config/services';
// import ChoiceBox from '../components/bill/ChoiceBox'
import Efdemon from './efdemon';
import Efsetting from './efsetting';

let Efview = {
    utils: {},
    base: {   // UI定义模板
        bill: { // 单据模板
            // view: 主表定义
            // detail: 明细定义
        }
    }
};

Efview.extend = function (_sub, _super, _ext) {
    let F = function () {};
    F.prototype = _super.prototype;
    let obj = new F();
    obj.constructor = _sub;
    _sub.prototype = obj;
    let theSub = merge([new _sub(), _ext], {depth: 12, types: { object: true, array: true }});
    console.log(theSub.list.id+"配置：", theSub, _ext);
    return theSub;
};

Efview.bind = function (_func, _scope) {
    return function () {
        return _func.apply(_scope, arguments);
    };
};

Efview.initRowStatus = function(rows){
    for(let i=0; i<rows.length; i++){
        rows[i]._flag = '#';
    }
}

Efview.loadDict = function(dictGroupCode, params){
    let _that = this;
    let token = cookies.get('token') || '1584928153141266120';
    let searchParam = params || {'dict_group_code': dictGroupCode};
    let dictGroupCodeStr = searchParam['dict_group_code'] || searchParam['dictGroupCode'];
    let dictGroupCodeArr = dictGroupCodeStr.split(',');
    let res = request({
        method: 'post',
        url: Efsetting.dict.resources + '?method=' + Efsetting.dict.method + '&ent_id=0&token=' + token,
        data: searchParam
    }, function(resData){    
        let res = resData.data[Efsetting.dict.response];
        let resCode = resData.returncode;
        if(resCode=='0'){
            for(let i=0; i<res.length; i++){
                if(_that.config.dict[res[i]['dict_group_code']]==undefined){
                    _that.config.dict[res[i]['dict_group_code']] = {
                        source: 'remote',
                        data: []
                    }
                }else{
                    _that.config.dict[res[i]['dict_group_code']].data.push({code:res[i]['code'] , name:res[i]['name']});
                }
            }
        }else{
            console.warn("字典数据缺失： ", searchParam);
        }
        _that.config.dict._loaded++;
        if(_that.config.dict._loaded==_that.config.dict._remote.length){
            console.log("字典加载完毕~ [DICT DATA] ", _that.config.dict);
            Efview.config.doInit();
        }
    });
}

Efview.renderByDict = function(f, obj){
    let res = '';
    if(!!Efview.config.dict && obj.column.extra){
        let x = Efview.config.dict[obj.column.extra].data.find(function(dict){
            return dict.code==obj.row[obj.column.key];
        });
        if(!!x){
            res = x.name;
        }
    }
    return res;
}


/* ------------------------------------------------------------------------------------------ */
Efview.utils.toDecimal2 = function(x) { //制保留2位小数，如：2，会在2后面补上00.即2.00 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return false; 
  } 
  var f = Math.round(x*100)/100; 
  var s = f.toString(); 
  var rs = s.indexOf('.'); 
  if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
  } 
  while (s.length <= rs + 2) { 
    s += '0'; 
  } 
  return s; 
} 
    

/* ------------------------------------------------------------------------------------------ */
Efview.base.bill.view = function () {
    this.errorMsg= null;
    this.warnMsg= null;
    this.tipMsg= null;
    this.dict= { // 字典
        _loaded: 0
        /*
        key: [...values]
        */
    };
    this.toolbar= { // 工具栏
        status: {
            bill: '#',
            edit: 'D'
        }
    };
    this.tab= {  // 主标签页
        type: 'card',
        tabs: [
                {name: 'detail', label: '单据明细'},
                {name: 'list', label: '单据清单'}
            ],
        active: 'list'
    };
    this.newone= {   //新单
        /*
        _flag: '#'
        */
    };
    this.demon = {
        list: {
            owner: null,
            key: null,
            valueMap: null,
            isHeadField: false,
            loading: false,
            remote: null,
            multiple: false,
            selected: [],
            visible: false, 
            rowDatas: [],
            theRow: null,
            theRowIndex: -1,
            fieldKey: null,
            pager: {
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                sizeOption: [10, 20, 50]
            },
            searchParamDefault: { },
            load: async function (param) {
                console.log("【Efview DemonList】***** load()...", this);
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
                    url: _that.remote.resources + '?method=' + _that.remote.method + '&ent_id=0&token=' + token,
                    data: searchParam
                }, function(resData){    
                    _that.rowDatas = resData.data[_that.remote.response];
                    // Efview.initRowStatus(_that.rowDatas);
                    _that.pager.total = resData.data.total_results;            
                    _that.loading = false;
                });
            },
        },
        grid: {
            owner: null,
            remote: null,
            mutiple: false,
            selected: [],
            visible: false
        }
    };
    this.list= {
        /*
        id: '',
        remote: {
            resources: services.goods,
            method: 'omd.goods.brand.search',
            response: 'brand',
            key: 'sheetID'
        },
        */
        readonly: false,
        rowDatas: [],
        theRow: null,       // 当前被点选的行
        currentRow: null,   // 当前被点选并编辑的行
        loading: false,
        stripe: true,
        stateKey: 'state',
        pager: {
            total: 0,
            pageIndex: 1,
            pageSize: 10,
            sizeOption: [10, 20, 50]
        },
        searchParamDefault: {
            /*
            fields: 'bid,code,name,scode,sname,desc,grade_id,grade_name,cat_id,cat_name,country_id,country,parent_id,parent_name,level,is_parent,img_url,status',
            order_direction: 'desc',
            order_field: 'bid'
            */
        },
        columns: [
            /*
            {   // 见iviewUI官网关于Table/Column配置文档
                type: 'index',  
                label: '#',
                width: 80,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }
            */
        ],  
        handleSave: function (refs) {
            console.log('handleSave----> ', refs, refs['detailHeadForm']);
            let res = false;
            refs['detailHeadForm'].validate((valid) => {
                console.log('handleSave---- valid --> ', valid);
                if (valid) {
                    res = true;
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
            return res;
        },      
        load: async function (param) {
            console.log("【Efview单据主表】 load()...");
        },
        add: async function (param, cb) {
            console.log("【Efview单据主表】 add()...");
        },
        update: async function (param, cb) {
            console.log("【Efview单据主表】 update()...");
        },
        delete: async function (param, cb) {
            console.log("【Efview单据主表】 delete()...");
        },
        detail: {    // 明细配置
            isLazyload: false,      //明细数据加载方式
            head: { // 单据头
                disabled: true,     //默认单头不可编辑
                fields: [
                    /*  
                    {
                    // 见iviewUI官网文档 
                    title: '单据编号',
                    key: 'sheetID',
                    type: 'text',   // number/email/select/datePicker/timePicker/colorPicker/radio/checkbox/textarea/cascader/switch/slider/rate                
                    max: 1,
                    min: 0,
                    step: 0.01,
                    // 其它
                    extra: 'billStatus',
                    defaultValue: 0
                    readonly: true
                    }
                    */
                ],            
                // rules: {
                    /*
                    校验规则
                    this.detail.head.fields.key: []
                    */
                // }
            },
            body: [ // 单据内容
                /*           
                {
                    key: 'itemQuotesDetail',
                    title: '商品报价',
                    config: detItems    // -->Efview.base.bill.viewDetail
                } 
                */
            ],            
            // bodyActivity: 'itemQuotesDetail',        
        }
    };
    this.demonShow = function(_type, _visible, _opt, _isHeadField){
        let _ihf = (!!_isHeadField && _isHeadField===true) ? true : false;
        if (_type=='list') {
            let theOpt = Efdemon.lists.find(function(demon){
                return demon.key == _opt.key;
            });        
            // console.log("---------demonShow$$$$!! ", _isHeadField, _ihf, this, theOpt, _opt);    
            this.demon.list.key = _opt.key;
            this.demon.list.valueMap = _opt.valueMap;
            this.demon.list.isHeadField = _ihf;
            this.demon.list.isNewDetail = _opt.isNewDetail || false;
            this.demon.list.remote = theOpt.remote;
            this.demon.list.columns = theOpt.columns;
            this.demon.list.multiple = theOpt.multiple;
            this.demon.list.selected = theOpt.selected;
            this.demon.list.visible = _visible;
            this.demon.list.theRow = null;
            this.demon.list.fieldKey = _opt.fieldKey || null;
            if(_ihf==true){
                this.demon.list.multiple = false;
            }
            if(this.demon.list.multiple!=true){
                this.demon.list.columns[0].type = 'index';
            }else{                
                this.demon.list.columns[0].type = 'selection';
            }
            this.demon.list.load();
            // console.log("===========demonShow$$$$!! ", this.demon.list.isNewDetail, this.demon.list.columns[0]); 
        } else if (_type=='grid') {

        }
    };
    this.init = function () {
        Efview.config = this;
        this.newone._flag = '#';
        this.list.currentRow = this.newone; 
        this.list._prevRow = null;
        if(!!this.dict._remote){
            for(let j=0; j<this.dict._remote.length; j++){
                Efview.loadDict(this.dict._remote[j].dictGroupCode, this.dict._remote[j].params);
            }
        }else{
            this.doInit();
        }
    };

    this.doInit = function () {
        this.list.load();
        this.demon['list'].owner = this;
        this.demon['grid'].owner = this;
        if(!!this.list.detail.body){
            if(this.list.detail.body.length>0){
                this.list.detail.bodyActivity = this.list.detail.body[0].key;
            }
            for(let i=0; i<this.list.detail.body.length; i++){
                this.list.detail.body[i].config.owner = this;
                this.list.detail.body[i].config.list._owner = this;                
                this.list.detail.body[i].config.list._ownerDetail = this.list.detail.body[i];
                this.list.detail.body[i].config.list._name = this.list.detail.body[i].config.name;
                // this.list.detail.body[i].config.newone._flag = '#';
                // this.list.detail.body[i].config.list._preRow = null;
                this.list.detail.body[i].config.init();
            }
        }
    }
};

Efview.base.bill.viewDetail = function () {
    this.owner = null;
    // this.name = 'itemQuotes',
    this.newone = {   //新单
        /*
        _flag: '#'
        */
    };
    this.list = {
        /*
        id: '',
        remote: {
            resources: services.goods,
            method: 'omd.goods.brand.search',
            response: 'brand',
            key: 'sheetID'
        },
        */
        serial: 0,
        readonly: false,
        rowDatas: [],
        deletedRowDatas: [],
        theRow: null,       // 当前被点选的行
        currentRow: null,   // 当前被点选并编辑的行
        loading: false,
        stripe: true,
        pager: {
            total: 0,
            pageIndex: 1,
            pageSize: 10,
            sizeOption: [10, 20, 50]
        },
        searchParamDefault: {
            /*
            fields: 'bid,code,name,scode,sname,desc,grade_id,grade_name,cat_id,cat_name,country_id,country,parent_id,parent_name,level,is_parent,img_url,status',
            order_direction: 'desc',
            order_field: 'bid'
            */
        },
        columns: [
            /*
            {   // 见iviewUI官网关于Table/Column配置文档
                type: 'index',  
                label: '#',
                width: 80,
                'header-align': 'center',
                align: 'center',
                fixed: 'left'
            }
            */
        ],        
        rules: {
            /*
            校验规则
            this.detail.head.fields.key: []
            */
        },
        // getValidator: function () {
        //     var validateRuler = new Promise(function (resolve, reject) {
        //     var validator = new AsyncValidator(rules)
        //     validator.validate(inputData, { firstFields: true }, (errors, fields) => {
        //      resolve(errors)
        //     })
        //     return validateRuler
        // },
        mount: async function (rowData) {
            console.log("【Efview单据明细表】 mount()...", this);
            this.rowDatas = rowData.details;
            for(let i=0; i<this.rowDatas.length; i++){
                this.serial++;
                this.rowDatas[i]._serial = this.serial;
                this.rowDatas[i]._ready2Edit = false;
            }
            Efview.initRowStatus(this.rowDatas);
            this.deletedRowDatas = [];
            this.pager.total = rowData.details.length;
            console.log("【Efview单据明细表】 mounted...", this);
        },   
        load: async function (param) {
            console.log("【Efview单据明细表】 load()...", this._owner);
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
                url: that._ownerDetail.config.list.resources + '?method=' + that._ownerDetail.config.list.method + '&ent_id=0&token=' + token,
                data: searchParam
            }, function(resData){                
                _that.rowDatas = resData.data[that._ownerDetail.config.list.response];
                for(let i=0; i<_that.rowDatas.length; i++){
                    _that.serial++;
                    _that.rowDatas[i]._serial = _that.serial;
                    _that.rowDatas[i]._ready2Edit = false;
                }
                Efview.initRowStatus(_that.rowDatas);                
                this.deletedRowDatas = [];
                _that.pager.total = resData.data.total_results;
                _that.loading = false;
            });
        },
        add: async function (param, cb) {
            console.log("【Efview单据明细表】 add()...");
        },
        update: async function (param, cb) {
            console.log("【Efview单据明细表】 update()...");
        },
        delete: async function (param, cb) {
            console.log("【Efview单据明细表】 delete()...");
        }
    };
    this.init = function(){
        this.newone._flag = '#';
        this.list._prevRow = null;
    };
}; 


export default Efview;
