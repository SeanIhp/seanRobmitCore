<template>
  <span class="Cellet">
    <span v-if="row._flag=='D'" style="text-decoration:line-through;">
        {{row[column.key]}}
    </span>
    <span v-else>
        <span v-if="this.$data.isSelected">
            <span v-if="!!column">
                <span v-if="!!column.editor">
                    <span v-if="column.editor=='textbox'">
                      <!-- <Input size="small" v-model="$data.__row[$data.__column.key]" @on-change="onChange"/> -->
                      <Input size="small" :value="row[column.key]" @on-blur="onBlur"/>
                    </span>

                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='textarea'">
                      <Input size="small" type="textarea" :autosize="{minRows: 2, maxRows: 5}" :value="row[column.key]" @on-blur="onBlur"/>
                    </span>

                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='number'">
                      <InputNumber 
                        :element-id="'field_'+column.key"
                        size="small"
                        :min="column.min || 0"
                        :max="column.max || 999999"
                        :step="column.step || 0.1"
                        :precision="column.precision || 2"
                        :value="row[column.key]"
                        :editable="true" 
                        @on-change="onChange" 
                        @on-blur="onBlur" >
                      </InputNumber>
                    </span>
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='switch'">    
                      <i-switch 
                        :value="''+row[column.key]"
                        true-value=1 false-value=0 
                        @on-change="onChange" >
                        <Icon type="android-done" slot="open"></Icon>
                        <Icon type="android-close" slot="close"></Icon>
                      </i-switch>
                    </span>  
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='date'"> 
                      <DatePicker 
                        :value="''+row[column.key]"
                        type="date" 
                        format="yyyy年MM月dd日"
                        @on-change="onChange" 
                        :transfer=true>
                      </DatePicker>
                    </span>   
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='daterange'"> 
                      <DatePicker 
                        :value="''+row[column.key]"
                        type="date" 
                        format="yyyy年MM月dd日"
                        @on-change="onChange" 
                        :transfer=true>
                      </DatePicker>
                    </span>  
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='datetime'"> 
                      <DatePicker 
                        :value="''+row[column.key]"
                        type="date" 
                        format="yyyy年MM月dd日"
                        @on-change="onChange" 
                        :transfer=true>
                      </DatePicker>
                    </span>   
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='datetimerange'"> 
                      <DatePicker 
                        :value="''+row[column.key]"
                        type="date" 
                        format="yyyy年MM月dd日"
                        @on-change="onChange" 
                        :transfer=true>
                      </DatePicker>
                    </span>  
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='select'">
                      <i-select size="small" :transfer=true placement="top" :value="''+row[column.key]" @on-change="onChange">
                        <i-option v-for="(opt,idx) in extra.data" :key="column.key+'_'+idx" :value="opt.code">{{!!opt?opt.name:''}}</i-option>
                      </i-select>
                    </span>   
                    
                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='selectmultiple'">
                      <Select size="small" multiple :transfer=true placement="top">
                        <Option v-for="(opt,idx) in extra.data" :key="column.key+'_'+idx" :value="opt.code">{{!!opt?opt.name:''}}</Option>
                      </Select>
                    </span>  

                    <!-- -------------------------------------- -->
                    <span v-else-if="column.editor=='demonList'">
                      <Input size="small" style="display:inline-block;width:70%;" :value="row[column.key]"/>
                      <Button size="small" @click="runDemonList" style="display:inline-block;width:20px;padding-left:4px;">...</Button>
                    </span>
                    <span v-else>
                      <span v-if="!!column">
                        <!-- 00-{{this.$data.isSelected}}-{{row[column.key]}} (column.extra.url, column.extra.key)-->
                        {{row[column.key]}}
                      </span>
                    </span>  
                </span>  
                <span v-else>
                    {{row[column.key]}}
                </span>  
            </span>      
            <!-- <span v-else>
                <span v-if="!!column">
                  22-{{this.$data.isSelected}}-{{row[column.key]}}
                </span>
            </span> -->
        </span>    
        <span v-else>
            <span v-if="!!column">
                <span v-if="!!column.editor">
                  <span v-if="column.editor=='select'">
                    <span v-if="!!column.extra">
                      {{(this.$data.extra.data.find(function(x){
                        return x.code==row[column.key]
                      })).name}} 
                    </span>
                  </span>
                  <span v-if="column.editor=='selectmultiple'">
                    <span v-if="!!column.extra && row[column.key].length>0">b
                      {{(this.$data.extra.data.find(function(x){
                        return x.code==row[column.key][0]
                      })).name}} 
                    </span>
                  </span>
                  <span v-else-if="column.editor=='demonList'">
                    <span v-if="!!column.extra">
                      {{row[column.key]}}
                    </span>
                  </span>
                  <span v-else>
                    {{row[column.key]}}
                  </span>  
                </span>
                <span v-else>
                    {{row[column.key]}}
                </span>  
            </span>
        </span>
    </span>

  </span>
</template>

<script>
import AsyncValidator from 'async-validate';
import AsyncValidatorPlugins from 'async-validate/plugin/all';

AsyncValidator.plugin(
  AsyncValidatorPlugins
);

export default {
  name: 'Cellet',
  props: ['view', 'refs', 'body', 'row', 'column'],

  data() {
    let _that = this;
    return {
      id: null,
      isSelected: false,
      isChanged: false,
      origValue: undefined,
      newValue: undefined,
      extra: undefined,
      demonShow: false,
      __row: null,
      __column: null,
      __validator: null,
      __tempValue: null,
    };
  },

  computed: {
  },

  methods: {
    onChange: function(e) {
      // console.log('***  onChange !!!', 'field_'+this.column.key, e, this.column.editor);
      let _that = this;
      // let theValue = e.srcElement.value;
      if(this.column.editor=='number'){
        let el = document.getElementById('field_'+this.column.key);
        el.focus();
        this.$data.__tempValue = e;
      }else{
        let vres = this.doValidate(e);
        if(vres==null){
            this.doWriteBack(e);
        }
      }

      // let _that = this;
      // let newValue = e.srcElement.value;
      // // let _theBody = this.body.find(function(bd){
      // //   return bd.key==this.view.list.detail.bodyActivity;
      // // });
      // let _row = this.body.config.list.rowDatas.find(function(r){
      //   return r[_that.body.config.list.key]==_that.row[_that.body.config.list.key]
      // });
      // // _row[this.column.key] = newValue;
      // if(_row._flag!='I') {
      //   _row._flag = 'U';
      // }
    },

    onBlur: function(e) {
      // console.log('***  onBlur !!!', e, this);
      // let _that = this;
      // let newValue = e.srcElement.value;
      // let _row = this.body.config.list.rowDatas.find(function(r){
      //   return r._serial==_that.row._serial
      // });
      // if(_row._flag!='I') {
      //   _row._flag = 'U';
      // }
      // _row[this.column.key] = newValue;
      if(this.column.editor=='number'){
        let vres = this.doValidate(this.$data.__tempValue);
        if(vres==null){
          // console.log('***  onBlur this.column.editor', this.$data.__tempValue);
          this.doWriteBack(this.$data.__tempValue);
          this.$data.__tempValue = null;
        }
        this.$data.isSelected = false;
      }else{
        this.doWriteBack(e.srcElement.value);
        this.$data.isSelected = false;
      }
    },

    doValidate: function (theValue){
      let _that = this;
      let r = {
        type: 'object',
        fields: {}
      };
      if(!!this.body.config.list.rules[this.column.key]){
        r.fields[this.column.key] = this.body.config.list.rules[this.column.key];
        this.$data.__validator = new AsyncValidator(r);
      }
      if(!!this.$data.__validator){
        let valObj = {};
        valObj[this.column.key] = theValue     
        let x = this.$data.__validator.validate(valObj, {first: true}, (err, res) => {
          if(err) {            
            this.$Notice.error({
                title: '出错啦！',
                desc: err,
            });
            console.log(err);
            throw err; 
          }else if(res) {
            this.$Notice.error({
                title: !!res.errors ? res.errors[0].message : '',
                desc: ''
            });
            return res.errors;
          }
          console.log('validation passed !!!', res);
        });
      }else{
        console.log('&&&  no need validate');
      }
      return null;
    },

    doWriteBack: function (newValue){
      let _that = this;
      let _row = this.body.config.list.rowDatas.find(function(r){
        return r._serial==_that.row._serial
      });
      console.log("_row[this.column.key] a: ", _row[this.column.key], _row);
      if(_row._flag!='I') {
        _row._flag = 'U';
      }
      _row[this.column.key] = newValue;
    },

    runDemonList: function(){
      console.log("!!runDemon: ", this.$data.__column, this.$data.extra, this, this.$refs );
      let opt = {...this.$data.extra};
      opt.refs = this.refs;
      opt.isNewDetail = true;
      this.view.demonShow("list", true, opt);
    }
  },

  watch: {
    'body.config.list.theRow._ready2Edit': function(theOne, theOld){
      let theRow = this.body.config.list.theRow;
      console.log('###Cellet###   body.config.list.theRow!!!!!: ',  theRow._ready2Edit);
      this.$data.isSelected = false;
      if(this.view.toolbar.status.edit=='N' || this.view.toolbar.status.edit=='E'){
        if(!!this.body && !!this.row){
          if(!!this.row[this.body.config.list.key]){
            if (theRow[this.body.config.list.key]===this.row[this.body.config.list.key] && theRow._ready2Edit===true) {
              // console.log('+++Cellet+++   body.config.list.theRow~~~: ', this, this.row);
              this.$data.isSelected = true;
            } 
          }else{
            if (theRow._serial===this.row._serial && theRow._ready2Edit===true) {
              console.log('+++Cellet+++   theRow._serial~~~: ', theRow._serial);
              this.$data.isSelected = true;
            } 
          }       
          // if (theOld[this.body.config.list.key]===this.row[this.body.config.list.key]) {
          //   console.log('+++Cellet+++   上次那行w~~~: ', this, this.row);
          // }
        }
      }
      // console.log('###Cellet###   body.config.list.theRow!!!!!: ', this.$data, this.body.config, this.$data.id, theOne[this.body.config.list.key], this.row[this.body.config.list.key]);
    },
  },

  beforeDestory: function(e) {
    console.log(" MY GOD !!", this.$data.__tempValue, e);
        // if(this.column.editor=='number'){
        //   if(!!this.$data.__tempValue){
        //     this.doWriteBack(this.$data.__tempValue);
        //   }
        // }
  },

  mounted: function() {},

  updated: function() {
    console.log('DEMON updated~~~~: ', this.row._flag);
  },

  created: function() {
          // console.log('DEMON INITIALIZED~~~~: ', this);
      let _that = this;
      this.$data.__row = this.row;
      this.$data.__column = this.column;
      if(!!this.body && !!this.row && !!this.column){
        this.$data.id = this.row[this.body.config.list.key] + '_' + this.column.key;
        let _defaultValue = null;
        let _extra = null;
        let colConf = this.body.config.list.columns.find(function(_c){
          return _c.key===_that.column.key;
        });  
        // console.log('DEMON @@@INITIALIZED~~~~: ', this.column.key, colConf);
        if(!!colConf && !!colConf.editor){
          // console.log('DEMON INITIALIZED~~~~: ', this);
          if(colConf.editor==='select'){
            if(!!colConf.extra){
              this.$data.extra = this.view.dict[colConf.extra];
              // console.log("_that.row[_that.column.key]: ", _that.row[_that.column.key]);
              // console.log('DEMON INITIALIZED~~  this.$data.extra ~~: ', this.$data.extra );
            }
          }else if(colConf.editor==='selectmultiple'){
            // let _v = _that.row[_that.column.key];
            // _that.row[_that.column.key] = [];
            // _that.row[_that.column.key].push(_v);
            // console.log("_that.row[_that.column.key]: ", _that.row[_that.column.key], _v);
            if(!!colConf.extra){
              this.$data.extra = this.view.dict[colConf.extra];
              // console.log('DEMON INITIALIZED~~  this.$data.extra ~~: ', this.$data.extra );
            }
          }else if(colConf.editor==='demonList'){
            if(!!colConf.extra){
              this.$data.extra = colConf.extra;
            }
          }
        }
      }
  }
};
</script>