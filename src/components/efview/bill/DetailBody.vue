<template>
  <div class="detailBodyLayout">

    <Row :gutter="16" style="margin-top:-12px;margin-bottom:5px;">
        <Col :span="24">  
            <span v-for="(btngroup, idx) in buttons" :key="'det_tb_btn_'+idx">
                <ButtonGroup>
                    <Button v-for="btn in btngroup" :key="btn.name" :disabled="btn.disabled" @click="btn.action" type="ghost">
                        <Icon :type="btn.icon"></Icon>
                    </Button>
                </ButtonGroup>
            </span> 
        </Col>
    </Row>
    <Row :gutter="16">
        <Col :span="24">   
            <Table 
            :ref="'cmpDetailTable_'+body.config.list.id" 
            :columns="body.config.list.columns" 
            :stripe="body.config.list.stripe" 
            :data="body.config.list.rowDatas"
            :highlight-row="true" 
            @on-current-change="onTheRowChange"
            @on-row-dblclick="oRowDblClick"
            border>
            </Table>
            <Page 
            style="margin-top:10px;"
            :ref="'cmpDetailPager_'+body.config.list.id" 
            :current="body.config.list.pager.pageIndex" 
            :total="body.config.list.pager.total" 
            :page-size="view.list.detail.isLazyload?body.config.list.pager.pageSize:body.config.list.pager.total" 
            :page-size-opts="body.config.list.pager.sizeOption" 
            placement="top" 
            :show-total="!view.list.detail.isLazyload"
            :show-elevator="view.list.detail.isLazyload" 
            :show-sizer="view.list.detail.isLazyload">
            </Page>        
        </Col>
    </Row>
  </div>
</template>

<style scope>
.detailBodyLayout{
    background: "#FFF";
}
</style>

<script>
import Efview from '../../../libs/efview';
import Cellet from '../common/Cellet';


export default {
  name: 'DetailBody',
  props: ['view', 'refs', 'body'],
  components: { Cellet },
  data() {
    let _that = this;
    return {
        buttons: [[
        {
            text: '',
            icon: 'plus-round',
            name: 'addData',
            disabled: true,
            action: function(){
                console.log('plus-round--------------: ', _that);
                if(_that.body.config.list.rowDatas.length==0 || 
                    _that.body.config.list.rowDatas[_that.body.config.list.rowDatas.length-1]._flag=='#' || 
                    (_that.body.config.list.rowDatas[_that.body.config.list.rowDatas.length-1]._flag=='I' && !!_that.body.config.list.rowDatas[_that.body.config.list.rowDatas.length-1][_that.body.config.list.key])
                ){
                    let r = {..._that.body.config.newone};
                    r._flag = 'B';
                    _that.body.config.list.serial++;
                    r._serial = _that.body.config.list.serial;
                    _that.body.config.list.rowDatas.push(r);
                }

            }
        }, {
        //     text: '',
        //     icon: 'edit',
        //     name: 'editData',
        //     disabled: true,
        //     action: function(){}
        // }, {
            text: '',
            icon: 'minus-round',
            name: 'deleteData',
            disabled: true,
            action: function(){
                console.log('minus-round--------------: ', _that.body.config.list.rowDatas, _that.body.config.list.theRow);
                if(!!_that.body.config.list.theRow){
                    if(!!_that.body.config.list.theRow[_that.body.config.list.key]){
                        for(let i=0; i<_that.body.config.list.rowDatas.length; i++){
                            if(_that.body.config.list.rowDatas[i][_that.body.config.list.key]==_that.body.config.list.theRow[_that.body.config.list.key]){
                                _that.body.config.list.rowDatas[i]._flag = 'D';
                                _that.body.config.list.deletedRowDatas.push({..._that.body.config.list.rowDatas[i]});
                                _that.body.config.list.rowDatas.splice(i, 1);
                                break;
                            }
                        }
                    }else{
                        for(let i=0; i<_that.body.config.list.rowDatas.length; i++){
                            if(_that.body.config.list.rowDatas[i]._serial==_that.body.config.list.theRow._serial){
                                _that.body.config.list.rowDatas.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
                // if(_that.body.config.list.rowDatas.length>0 && !!_that.body.config.list.theRow){
                //     _that.body.config.list.theRow._flag = 'D';
                // }
                // let r = _that.body.config.list.rowDatas.find(function(row){
                //     return row[_that.body.config.list.key]==_that.body.config.list.theRow[_that.body.config.list.key];
                // });
                // let _f = false;
                // for(let i=0; i<_that.body.config.list.rowDatas.length; i++){
                //     if(_that.body.config.list.rowDatas[i][_that.body.config.list.key]==_that.body.config.list.theRow[_that.body.config.list.key]){
                //         _that.body.config.list.rowDatas[i]._flag = 'D';
                //         break;
                //     }
                // }
                // console.log('minus-round-------*******-------: ', _that.body.config.list.rowDatas);
                // if(!!r){
                //     r._flag = 'D';
                // }
            }
        }
        ]],
        __theRow: null,
        __prevRow: null,
    }
  },
  methods: {
    onTheRowChange: function (currentRow, oldCurrentRow) {
        if(!!this.body.config.list.theRow && this.body.config.list.theRow._ready2Edit===true){
            this.body.config.list.theRow._ready2Edit = false;
        }
        this.body.config.list._prevRow = oldCurrentRow;
        this.body.config.list.theRow = currentRow;
        this.$data.__theRow = currentRow;
        console.log("onTheRowChange: ", currentRow);
        // console.log("DETAIL'S balabala: ", this.body, this.body.config.list.theRow);
        // console.log("DETAIL'S this: ", this);
        // console.log("DETAIL'S this.$data: ", this.$data);
        // console.log("DETAIL'S this.$data.__theRow: ", this.$data.__theRow);
    },
    oRowDblClick: function(currentRow, index){
        this.body.config.list.theRow = currentRow;
        this.body.config.list.theRow._ready2Edit = true;   
        console.log("oRowDblClick: ", currentRow);    
    }
  },  
  watch: {
    'view.list.theRow': function(theOne, theOld){
        // if (theOne[this.view.list.key]===this.theOld[this.view.list.key]) {
        // }
    },
    'view.toolbar.status.edit': function(theOne, theOld){
        for(let i=0; i<this.$data.buttons[0].length; i++){
            if (theOne=='N' || theOne=='E') {
                this.$data.buttons[0][i].disabled = false;
            }else{
                this.$data.buttons[0][i].disabled = true;
            }
        }
    },
    'body.config.list.theRow': function(theOne, theOld){
        console.log('[Watch] this.body.config.list.rowDatas: ', theOne);
    },
    // '_data.__theRow': function(theOne, theOld){
    //     console.log('[Watch] this.body.config.list.rowDatas: ', theOne);
    //     let edtBtn = this.$data.buttons[0].find(function(btn){
    //         return btn.name== 'editData';
    //     });
    //     if(!!edtBtn){
    //         if(theOne!=null && theOne._flag=='#'){
    //             edtBtn.disabled = true;
    //         }else{
    //             edtBtn.disabled = false;
    //         }
    //     }    
    // }
  },
  created: function () {
    this.$data.__prevRow = new Date();
    this.$data.__theRow = this.body.config.list.theRow;
    //   console.log("i'm from detailbody: ", this);
    //   console.log("i'm from detailbody--view  {{{created}}}: ", this.view);
    
    let _that = this;
        if (!!_that && _that.body) {
            for (let i = 0; i < _that.body.config.list.columns.length; i++) {
                _that.body.config.list.columns[i].render = function (createElement, obj) {
                    return createElement('Cellet', {ref: _that.body.config.name+'_'+(!!obj.column?obj.column.key:'$xx'), style: {'width': '100%'}, props: {view: _that.view, refs: _that.refs, body: _that.body, row: obj.row, column: obj.column}}, null);
                }                     
            }
        }
  },
}
</script>
