<template>
  <div class="layout">
    <!-- 工具栏 -->
    <div class="tool-content">
      <Card>        
        <BillToolbar 
          ref="cmpToolbar"
          :view="theConfig"
          :refs="theRefs">
        </BillToolbar>
      </Card>
    </div>
    <!-- 工具栏end -->
    <Card>
      <Tabs :type="theTab.type" :value="theTab.active" v-model="theTab.active" @on-click='tabsClick'>
        <TabPane 
          :label="theTab.tabs[0].label" 
          :name="theTab.tabs[0].name">          
            <div id="billDetailHead">
              <BillDetailHead 
                ref="cmpDetailHead"
                :view="theConfig" 
                :refs="theRefs">
              </BillDetailHead>
            </div>
            <div id="billDetailBody"
              v-if="!!theConfig.list.detail.body && theConfig.list.detail.body.length>0">
                <Tabs :value="theTab.active" v-model="theConfig.list.detail.bodyActivity" @on-click="detailTabsClick">
                  <TabPane v-for="det in theConfig.list.detail.body" :key="det.key"
                    :label="det.title"
                    :name="det.key">
                      <BillDetailBody 
                        ref="cmpDetailBody"
                        :view="theConfig" 
                        :refs="theRefs"
                        :body="det">
                      </BillDetailBody>
                  </TabPane>
                </Tabs>
            </div>
        </TabPane>
        <TabPane 
          :label="theTab.tabs[1].label" 
          :name="theTab.tabs[1].name">
          <BillSearchParam 
            ref="cmpSearchParam" 
            :view="theConfig" 
            :refs="theRefs">
          </BillSearchParam>
          <BillList 
            ref="cmpList" 
            :view="theConfig" 
            :refs="theRefs">
          </BillList>
        </TabPane>
      </Tabs>
    </Card>
    <Modal
        ref="demonModal"
        title="Title"
        width="90%"
        v-model="theConfig.demon.list.visible"
        :closable="false"
        :scrollable="true"
        :mask-closable="false"
        @on-ok="onDemonListOk"
        >
        <!-- <iframe ref="demonFrame" src="" frameborder="0" width="100%" height="320" marginwidth="0" marginheight="0"></iframe> -->
        <DemonList 
          :view="theConfig"
          :refs="theRefs"
          :theKey="theConfig.demon.list.remote"
          :valueMap="theConfig.demon.list.valueMap"
          :remote="theConfig.demon.list.remote"
          :multiple="theConfig.demon.list.multiple"
          :selected="theConfig.demon.list.selected">
        </DemonList>
    </Modal>
  </div>
  <!-- </Card> -->
</template>

<style scoped>
  .layout{
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .demonContainer{
    width: 90%;
    height: 80%;
  }
</style>

<script>
import BillToolbar from './Toolbar'
import BillList from './List'
import BillSearchParam from './SearchParam'
import BillDetailHead from './DetailHead'
import BillDetailBody from './DetailBody'
import DemonList from '../common/DemonList'

export default {
  name: 'Layout',
  components: { BillToolbar, BillList, BillSearchParam, BillDetailHead, BillDetailBody, DemonList },
  props: [
      'view', 'refs',
    ],
  data() {
    let _that = this;
    return {
        theConfig: _that.view,
        theRefs: _that.refs,
        theTab: _that.view.tab,
        theList: _that.view.list,
        // theDict: _that.view.dict,
        // theHead: _that.view.detail.head,
        // currentRow: _that.view.list.currentRow
    }
  },
  methods: { 
    tabsClick(name){
      this.view.tab.active = name;
    },
    setActiveTab(name){
      this.view.tab.active = name;
    },
    detailTabsClick(name){
      this.view.list.detail.bodyActivity = name;
    },
    onDemonListOk(){
      let _that = this;
      let key = this.view.demon.list.key;
      let valueMap = this.view.demon.list.valueMap;
      if(this.view.demon.list.isHeadField==true){
        let selectedRow = this.view.demon.list.theRow;        
        for(let j=0; j<valueMap.length; j++){
          if(!!selectedRow[valueMap[j].from]){
            this.view.list.currentRow[valueMap[j].to] = selectedRow[valueMap[j].from];
          }
        }
      } else {
        let selectedRows = this.view.demon.list.selected;
        let currentDetail = this.view.list.detail.body.find(function(det){
          return det.key==_that.view.list.detail.bodyActivity;
        });
        if(!!currentDetail){
          let _isAppendMode = false;
          if(currentDetail.config.list.theRow._flag=='I'){
            _isAppendMode = true;
          }
          let _newone = currentDetail.config.newone;
          let _rowsData = currentDetail.config.list.rowDatas;
          for(let i=0; i<selectedRows.length; i++){
            let r = null;
            if(i==0){
              r = {...currentDetail.config.list.theRow};
            }else{
              r = {..._newone};
              currentDetail.config.list.serial++;
              r._serial = currentDetail.config.list.serial;
              r._flag = 'I';
            }
            for(let j=0; j<valueMap.length; j++){
              if(typeof (valueMap[j].from) == 'object' && Array.isArray(valueMap[j].from)==true){
                let func = valueMap[j].from[0];
                let args = [];
                if(valueMap[j].from.length>1){
                  let defs = valueMap[j].from[valueMap[j].from.length-1];
                  for(let a=1; a<valueMap[j].from.length-1; a++){
                    let arg = null;
                    if(valueMap[j].from[a].indexOf('_main.')==0){
                      let argName = valueMap[j].from[a].replace('_main.', '');
                      arg = this.view.list.currentRow[argName];
                    } else if(valueMap[j].from[a].indexOf('_det.')==0){
                      let argName = valueMap[j].from[a].replace('_det.', '');
                      arg = currentDetail.config.list.theRow[argName];
                    } else if(valueMap[j].from[a].indexOf('_extra.')==0){
                      let argName = valueMap[j].from[a].replace('_extra.', '');
                      arg = selectedRows[i][argName];
                    }
                    if(arg==null || arg==undefined){
                      arg = defs[a];
                    }
                    args.push(arg);
                  }
                  r[valueMap[j].to] = func(...args);
                }
              }else{
                if(!!selectedRows[i][valueMap[j].from]){
                  r[valueMap[j].to] = selectedRows[i][valueMap[j].from];
                }else if(!!selectedRows[i][valueMap[j].default]){
                  r[valueMap[j].to] = selectedRows[i][valueMap[j].default];
                }
              }
            }

            let _f = false;
            let n = 0;
            for(; n<currentDetail.config.list.rowDatas.length; n++){    
              if( !!currentDetail.config.list.rowDatas[n][currentDetail.config.list.key] && 
                  !!currentDetail.config.list.theRow && 
                  currentDetail.config.list.rowDatas[n][currentDetail.config.list.key]===r[currentDetail.config.list.key]
              ){            
                _f = true;  
                break;
              }
            }
            if(_f){
              return;
            }else{                   
              if(currentDetail.config.list.rowDatas.length>0 && 
                currentDetail.config.list.rowDatas[currentDetail.config.list.rowDatas.length-1]._flag=='B'
                // 目前对于明细表的行数据采取较保守的编辑策略，即对已生成的行修改时，若出现（与当前行）不同的主键，则新增行，而不会直接替换当前行
                // (
                //   currentDetail.config.list.rowDatas[currentDetail.config.list.rowDatas.length-1]._flag=='B' ||
                //   (!!currentDetail.config.list.theRow && !!currentDetail.config.list.theRow[currentDetail.config.list.key])
                // )
              ){
                r._flag = 'I';
                currentDetail.config.list.rowDatas.splice(currentDetail.config.list.rowDatas.length-1, 1, {...r});
              }else{
                _rowsData.push(r);
              }
            } 
          }
        }
      }

    }
  },  
  watch: {
    'view.errorMsg': function(theOne, theOld){
        if( !!theOne ){
          this.$Message.error(theOne);
          this.view.errorMsg = null;
        }
    },
    'view.warnMsg': function(theOne, theOld){
        if( !!theOne ){
          this.$Message.warn(theOne);
          this.view.warnMsg = null;
        }
    },
    'view.tipMsg': function(theOne, theOld){
        if( !!theOne ){
          this.$Message.success(theOne);
          this.view.tipMsg = null;
        }
    },
    'view.toolbar.status.edit': function(theOne, theOld){
        if( theOne==='N' || 
            theOne==='E' ){
          this.setActiveTab('detail');
        }
    },
    'view.list.currentRow': function(theOne, theOld){   
      if(theOne._flag!='#'){
        this.setActiveTab('detail');
      }
    },
    'view.tab.active': function(theOne, theOld){ 
      let _that = this;
      // if( theOne==='list' && (
      //     _that.view.list.currentRow._flag==="I" || 
      //     _that.view.list.currentRow._flag==="U" 
      // )){
      //       this.$Modal.confirm({
      //           title: '系统提醒',
      //           content: '当前单据尚未保存，放弃编辑吗？',
      //           okText: '是的，中止编辑',
      //           onOk: function(){
      //               _that.view.list.currentRow = _that.view.newone;
      //           },
      //           onCancel: function(){
      //               console.log('modal Cancal!');
      //           }
      //       })
      //   }
    }
  },
  created: function () {
    // console.log("Layout--> view | refs: ", this.view, this.refs);
  }
}
</script>

        