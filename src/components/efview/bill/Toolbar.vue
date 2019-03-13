<template>
    <Row :gutter="16">
        <Col :span="24">
            
            <span v-for="(btngroup, idx) in config.buttons" :key="'tb_btn_'+idx">
                <ButtonGroup>
                    <Button v-for="btn in btngroup" :key="btn.name" :disabled="btn.disabled" @click="btn.action" type="ghost">
                        <Icon :type="btn.icon"></Icon>
                        {{btn.text}}
                    </Button>
                </ButtonGroup>
                &nbsp;
            </span>
        </Col>
    </Row>
</template>

<script>
import merge from 'lutils-merge';
import moment from 'moment';
import efview from '../../../libs/efview';

export default {
  name: 'Toolbar',
  props: ['view', 'refs'],  
  data() {
      let _that = this;
      return {
          list: _that.view.list,
        //   dict: _that.view.dict,
        //   head: _that.view.detail.head,
        //   currentRow: _that.view.newone,
        //   cmpList: null,
        //   cmpPager: null,
          config: {
              buttons: [
                [{
                    text: '',
                    icon: 'chevron-left',
                    name: 'goPrev',
                    disabled: true,
                    action: function(){
                        if(_that.view.list.theRowIndex>0){
                            _that.view.list._prevRow = _that.view.list.currentRow;
                            _that.view.list.theRow = _that.view.list.rowDatas[_that.view.list.theRowIndex-1];
                            _that.view.list.currentRow = _that.view.list.theRow;
                            _that.view.list.theRowIndex--;
                        }
                    }
                }, {
                    text: '',
                    icon: 'chevron-right',
                    name: 'goNext',
                    disabled: true,
                    action: function(){
                        if(_that.view.list.theRowIndex<(_that.view.list.rowDatas.length-1)){
                            _that.view.list._prevRow = _that.view.list.currentRow;
                            _that.view.list.theRow = _that.view.list.rowDatas[_that.view.list.theRowIndex+1];
                            _that.view.list.currentRow = _that.view.list.theRow;
                            _that.view.list.theRowIndex++;
                        }
                    }
                }],
                [{
                    text: '新增',
                    icon: 'document',
                    name: 'addData',
                    disabled: true,
                    action: function(){
                        _that.checkEditBreaking('N', function(){
                            _that.refs.cmpLayout.$refs.cmpList.$refs.cmpListTable.clearCurrentRow();
                            _that.view.list.theRow = null;
                            _that.view.list.currentRow = {..._that.view.newone};
                            _that.view.list.currentRow._flag = "I";
                            _that.setEditStatus('N');
                            _that.activateByStatus();
                        });
                   }
                }, {
                    text: '修改',
                    icon: 'ios-compose-outline',
                    name: 'editData',
                    disabled: true,
                    action: function(){
                        _that.checkEditBreaking('E', function(){
                            _that.view.list.currentRow._flag = '#';
                            _that.view.list.currentRow = _that.view.list.theRow;
                            _that.view.list.currentRow._flag = "U";
                            _that.setEditStatus('E');
                            _that.activateByStatus();
                            console.log("{{{{ ", _that.view.list)
                        });
                    }
                }, {
                    text: '保存',
                    icon: 'ios-box-outline',
                    name: 'saveData',
                    disabled: true,
                    action: function(){
                        console.log('保存: ', _that);
                        let res = efview.config.list.handleSave(_that.refs.cmpLayout.$refs.cmpDetailHead.$refs)
                        if(res){
                            _that.doSave(function(){
                                let theFlag = _that.view.list.currentRow._flag;
                                _that.view.list.currentRow._flag = '#';
                                _that.setBillStatus('#');
                                _that.setEditStatus('D');
                                _that.activateByStatus();
                                _that.synchRowDatas(theFlag);
                            });
                        }
                    }
                }],
                [{
                    text: '审核',
                    icon: 'android-done-all',
                    name: 'auditData',
                    disabled: true,
                    action: function(){
                        console.log(_that.tab);
                    }
                }, {
                    text: '取消',
                    icon: 'android-close',
                    name: 'cancelData',
                    disabled: true,
                    action: function(){
                        console.log(_that.tab);
                    }
                }],
                [{
                    text: '删除',
                    icon: 'ios-trash-outline',
                    name: 'delData',
                    disabled: true,
                    action: function(){
                        _that.checkEditBreaking('D', function(){             
                            _that.refs.cmpLayout.$refs.cmpList.$refs.cmpListTable.clearCurrentRow();
                            _that.view.list.theRow = null;
                            _that.setEditStatus('D');
                            _that.activateByStatus();
                            _that.synchRowDatas('D');
                        });
                    }
                }, {
                    text: '复制',
                    icon: 'ios-copy-outline',
                    name: 'copyData',
                    disabled: true,
                    action: function(){
                        console.log(_that.tab);
                    }
                }, {
                    text: '查询',
                    icon: 'android-search',
                    name: 'searchData',
                    disabled: true,
                    action: function(){
                        console.log(_that.view);
                        _that.searchData(function() {
                        });
                    }
                }],
                [{
                    text: '打印',
                    icon: 'printer',
                    name: 'printData',
                    disabled: true,
                    action: function(){
                        console.log(_that.tab);
                    }
                }]
            ],
            // status: {
            //     bill: '#',
            //     edit: 'D'
            // }, 
            rule: { // 按钮可用规则 Y:已审核, N:录入, C:已取消
                bill: {
                    '#': ['goPrev', 'goNext'],
                    'Y': ['goPrev', 'goNext', 'addData', 'cancelData', 'voidData','copyData', 'searchData', 'printData'],
                    'N': ['goPrev', 'goNext', 'addData', 'editData', 'auditData', 'delData', 'copyData', 'searchData', 'printData'],
                    'C': ['goPrev', 'goNext', 'addData', 'copyData', 'searchData', 'printData']
                },
                edit: { // 按钮同斥规则 N:新增后, V:查看, E:编辑后, S:保存后, A:审核后, C:取消后, D:删除后(默认) 
                    'N': ['goPrev', 'goNext', 'addData', 'saveData', 'searchData'],
                    'V': ['goPrev', 'goNext', 'addData', 'editData', 'auditData', 'delData', 'copyData', 'searchData', 'printData', 'goPrev', 'goNext'],
                    'E': ['goPrev', 'goNext', 'addData', 'saveData', 'delData', 'copyData', 'searchData', 'printData', 'goPrev', 'goNext'],
                    'S': ['goPrev', 'goNext', 'addData', 'editData', 'auditData', 'delData', 'copyData', 'searchData', 'printData', 'goPrev', 'goNext'],
                    'A': ['goPrev', 'goNext', 'addData', 'cancelData', 'voidData', 'copyData', 'searchData', 'printData', 'goPrev', 'goNext'],
                    'C': ['goPrev', 'goNext', 'addData', 'copyData', 'searchData', 'printData'],
                    'D': ['goPrev', 'goNext', 'addData', 'searchData']
                }
            }
          }
      }
  },
  methods: {                               
    goPrev() {
        console.log("do [goPrev]!!");
    },
    goNext() {
        console.log("do [goNext]!!");
    },
    addData() {
        console.log("do [addData]!!");
    },
    editData() {
        console.log("do [editData]!!");
    },
    saveData() {
        console.log("do [saveData]!!");
    },
    auditData() {
        console.log("do [auditData]!!");
    },
    cancelData() {
        console.log("do [cancelData]!!");
    },
    delData() {
        console.log("do [delData]!!");
    },
    copyData() {
        console.log("do [copyData]!!");
    },
    searchData(cb) {
        let param = {...this.view.list.searchParam};
        this.view.list.search(param, cb);
    },
    printData() {
        console.log("do [printData]!!");
    },
    disableAll() {
        for(let x=0; x<this.config.buttons.length; x++) {
            let btngrp = this.config.buttons[x];
            for(let i=0; i<btngrp.length; i++) {
                if(btngrp[i].name=='goPrev' || btngrp[i].name=='goNext'){
                    continue;
                }
                btngrp[i].disabled = true;
            }
        }
    },
    activateByStatus() {
        let activities = this.config.rule.bill[this.view.toolbar.status.bill].join(",") + "," + this.config.rule.edit[this.view.toolbar.status.edit].join(",");          
        this.disableAll();
        for(let x=0; x<this.config.buttons.length; x++) {
            let btngrp = this.config.buttons[x];
            for(let i=0; i<btngrp.length; i++) {
                if(btngrp[i].name=='goPrev' || btngrp[i].name=='goNext'){
                    continue;
                }
                if(activities.indexOf(btngrp[i].name)!=-1){
                    btngrp[i].disabled = false; 
                }else{
                    btngrp[i].disabled = true;
                }
            }
        }
    },
    setBillStatus(billStatus) {
        this.view.toolbar.status.bill = billStatus;
    },
    setEditStatus(editStatus){
        this.view.toolbar.status.edit = editStatus;
    },
    checkEditBreaking(stt, cb){
        let _that = this;
        if(stt==='N'){
            if(!!this.view.list.currentRow) {
                    if( this.view.list.currentRow._flag==='I' || 
                        this.view.list.currentRow._flag==='U' ) {                                
                            this.$Modal.confirm({
                                title: '系统提醒',
                                content: '当前单据尚未保存，放弃编辑吗？',
                                okText: '是的',
                                onOk: cb,
                                onCancel: function(){
                                    // _that.view.list.currentRow._flag = '#';
                                }
                            });
                    }else{
                        cb();
                    }
            }else{
                cb();
            }
        }else if(stt=='E'){
            if(!!this.view.list.theRow) {
                if(!!this.view.list.currentRow) {
                    if(this.view.list.theRow[this.view.list.key]!=this.view.list.currentRow[this.view.list.key]){                    
                        if( this.view.list.currentRow._flag==='I' || 
                            this.view.list.currentRow._flag==='U' ) {                                
                                this.$Modal.confirm({
                                    title: '系统提醒',
                                    content: '当前单据尚未保存，放弃编辑吗？',
                                    okText: '是的',
                                    onOk: cb,
                                    onCancel: function(){
                                    }
                                });
                        }else{
                            cb();
                        }
                    }else{
                        console.log("!!!", this.view.list.theRow[this.view.list.key]);
                        cb();
                    }
                }else{
                    cb();
                }
            }else{
                this.$Message.warning('请选择要编辑的行！');
            }
        }else if(stt=='D'){
            let _that = this;
            if(!!this.view.list.theRow) {
                if(!!this.view.list.currentRow) {
                    if( this.view.list.currentRow._flag==='I' || 
                        this.view.list.currentRow._flag==='U' ) {                                
                            this.$Modal.confirm({
                                title: '系统提醒',
                                content: '当前单据尚未保存，放弃编辑吗？',
                                okText: '是的',
                                onOk: new Function('cb', '_that.doDelete(cb)'),
                                onCancel: function(){
                                }
                            });
                    }else{
                        this.doDelete(cb);
                    }
                }else{
                    this.doDelete(cb);
                }
            }else{
                this.$Message.warning('请选择要删除的行！');
            }
        }
    },
    synchRowDatas(_flag){          
        let d = {...this.view.list.currentRow};
        if(_flag==="I"){
            this.view.list.rowDatas.push(d);
        }else if(_flag==="U"){
            for(let i=0; i<this.view.list.rowDatas.length; i++){
                if(this.view.list.rowDatas[i][this.view.list.key]===this.view.list.currentRow[this.view.list.key]){
                    this.view.list.rowDatas[i] = d;
                    break;
                }
            }
        }else if(_flag==="D"){
            for(let i=0; i<this.view.list.rowDatas.length; i++){
                if(this.view.list.rowDatas[i][this.view.list.key]===this.view.list.currentRow[this.view.list.key]){
                    this.view.list.rowDatas.splice(i, 1);
                    break;
                }
            }
            this.view.list.currentRow = this.view.newone;
        }
        let pureRes = [...this.view.list.rowDatas];
        this.view.list.rowDatas = pureRes;
    },      
    doSave(cb){
        let param = {...this.view.list.currentRow};
        // let param = merge([{}, this.view.list.currentRow], {depth: 12});
        param._flag = this.view.list.currentRow._flag;
        if(!!this.view.list.detail.head && !!this.view.list.detail.head.fields){
            for(let i=0; i<this.view.list.detail.head.fields.length; i++){
                let _field = this.view.list.detail.head.fields[i];
                if(_field.type==='date'){
                    if(!!param[_field.key]){
                        if(param[_field.key] instanceof Date){
                            param[_field.key] = moment(param[_field.key]).format("YYYY-MM-DD");
                        }
                    }
                }else if(_field.type==='datetime'){
                    if(!!param[_field.key]){
                        if(param[_field.key] instanceof Date){
                            param[_field.key] = moment(param[_field.key]).format("YYYY-MM-DD hh:mm:ss");
                        }
                    }

                }else if(_field.type==='daterange'){
                    if(!!param[_field.key] && param[_field.key] instanceof Array){                
                        if(param[_field.key][0] instanceof Date){
                            param[_field.key][0] = moment(param[_field.key][0]).format("YYYY-MM-DD");
                        }      
                        if(param[_field.key][1] instanceof Date){
                            param[_field.key][1] = moment(param[_field.key][1]).format("YYYY-MM-DD");
                        }
                    }
                }else if(_field.type==='datetimerange'){
                    if(!!param[_field.key] && param[_field.key] instanceof Array){         
                        if(param[_field.key][0] instanceof Date){
                            param[_field.key][0] = moment(param[_field.key][0]).format("YYYY-MM-DD hh:mm:ss");
                        }      
                        if(param[_field.key][1] instanceof Date){
                            param[_field.key][1] = moment(param[_field.key][1]).format("YYYY-MM-DD hh:mm:ss");
                        }
                    }
                }
            }
        }
        param.details = param.details || [];
        if(!!this.view.list.detail.body){
            for(let i=0; i<this.list.detail.body.length; i++){
                let dets = []
                let detrows = this.list.detail.body[i].config.list.rowDatas;
                for(let j=0; j<detrows.length; j++){
                    if(detrows[j]._flag!='#'){
                        dets.push(detrows[j]);
                    }
                }
                if(this.list.detail.body.length>1){
                    // 支持多个明细表数据同时提交
                    if(dets.length>0){
                        param.details.push({'key':this.list.detail.body[i].key, 'detail':dets});
                    }
                }else if(this.list.detail.body.length==1){
                    param.details = dets;
                }
            }
        }
        if(this.list.detail.body.length==0){
            delete param.details;
        }
        console.log("[Data to Save]: ", param, this.view.list.currentRow);
        if(param._flag==='I'){
            this.view.list.add(param, cb);
        }else if(param._flag==='U'){
            this.view.list.update(param, cb);
        }
    },
    doDelete(cb){
        this.view.list.currentRow = this.view.list.theRow;
        this.view.list.currentRow.flag = 'D';
        let _that = this;
        let param = {...this.view.list.currentRow};                         
        _that.$Modal.confirm({
            title: '系统提醒',
            content: '确定删除此单吗？',
            okText: '是的',
            onOk: function(){
                _that.view.list.delete(param, cb);
            },
            onCancel: function(){
            }
        });
    }
  }, 
  watch: {
    'view.tab.active': function(theOne, theOld){
        if(theOne=='detail'){
            this.config.buttons[0][0].disabled = false;
            this.config.buttons[0][1].disabled = false;
        }else{
            this.config.buttons[0][0].disabled = true;
            this.config.buttons[0][1].disabled = true;
        }        
        if(this.list.theRowIndex!=-1){
            if(this.list.theRowIndex<=0){
                this.config.buttons[0][0].disabled = true;
            }else{
                this.config.buttons[0][0].disabled = false;
            }
            if(this.list.theRowIndex>=(this.list.rowDatas.length-1)){
                this.config.buttons[0][1].disabled = true;
            }else{
                this.config.buttons[0][1].disabled = false;
            }
        }
    },
    'view.list.theRowIndex': function(theOne, theOld){
        if(theOne!=-1){
            if(theOne<=1){
                this.config.buttons[0][0].disabled = true;
            }
            if(theOne>=(efview.config.list.rowDatas.length-1)){
                this.config.buttons[0][0].disabled = true;
            }
        }
    },
    'view.toolbar.status': function(theOne, theOld){
        // console.log('[Toolbar] view.toolbar.status: ', theOne);
    },
    'view.list.theRow': function(theOne, theOld){
        // this.$data.currentRow = theOne;
        let bstt = '#';
        if(!!theOne){
            switch(theOne[this.view.list.stateKey]*1){
                case 0: 
                    bstt = 'N';
                    break;
                case 1:
                    bstt = 'Y';
                    break;
                case 2: 
                    bstt = 'C';
                    break;
                default:
                    bstt = 'N';
            }
        }
        this.setBillStatus(bstt);
        // _that.setEditStatus('N');
        this.activateByStatus();        
        if(this.list.theRowIndex!=-1){
            if(this.list.theRowIndex<=0){
                this.config.buttons[0][0].disabled = true;
            }else{
                this.config.buttons[0][0].disabled = false;
            }
            if(this.list.theRowIndex>=(this.list.rowDatas.length-1)){
                this.config.buttons[0][1].disabled = true;
            }else{
                this.config.buttons[0][1].disabled = false;
            }
        }
    },
  },
  created: function () {
    this.activateByStatus();
  }
}
</script>
