<template>
    <Form :label-width="100" ref="detailHeadForm" :rules="view.list.detail.head.rules" :model="view.list.currentRow">
        <Row :gutter="16">
            <Col :span="8" v-for="field in view.list.detail.head.fields" :key="field.key">
                <FormItem 
                    :label="field.title" :prop="field.key">
                        <Input 
                            v-if="field.type===undefined || field.type==='text' || field.type==='email'" 
                            :element-id="field.key"
                            type="text" 
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]"
                            @on-blur="onChange" >
                        </Input>
                        <Input 
                            v-else-if="field.type==='textarea'" 
                            :element-id="field.key"
                            type="textarea" 
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            :autosize="{minRows: 2, maxRows: 6}"
                            v-model="view.list.currentRow[field.key]" 
                            @on-blur="onChange" >
                        </Input>
                        <InputNumber  
                            v-else-if="field.type==='number'" 
                            :element-id="field.key"
                            :min="field.min"
                            :max="field.max"
                            :step="field.step"
                            :precision="field.precision"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]">
                        </InputNumber>                    
                        <i-switch
                            v-else-if="field.type==='switch'" 
                            :element-id="field.key"
                            v-model="view.list.currentRow[field.key]"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            true-value=1 false-value=0 >
                            <Icon type="android-done" slot="open"></Icon>
                            <Icon type="android-close" slot="close"></Icon>
                        </i-switch>
                        <CheckboxGroup 
                            v-else-if="field.type==='checkbox'" 
                            :element-id="field.key"
                            v-model="view.list.currentRow[field.key]">
                            <Checkbox v-for="opt in view.dict[field.extra].data"                             
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            :key="opt.code" :label="opt.code">
                                {{opt.name}}
                            </Checkbox>
                        </CheckboxGroup>    
                        <RadioGroup 
                            v-else-if="field.type==='radio'" 
                            :element-id="field.key"
                            v-model="view.list.currentRow[field.key]">
                            <Radio v-for="opt in view.dict[field.extra].data"                             
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            :key="opt.code" :label="opt.code">
                                {{opt.name}}
                            </Radio>
                        </RadioGroup>
                        <DatePicker 
                            v-else-if="field.type==='date'" 
                            :element-id="field.key"
                            type="date" 
                            format="yyyy-MM-dd"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]"
                            :transfer=true
                            @on-change="onDateChange">
                        </DatePicker>
                        <DatePicker 
                            v-else-if="field.type==='daterange'" 
                            :element-id="field.key"
                            type="daterange" 
                            format="yyyy-MM-dd"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]"
                            :transfer=true>
                        </DatePicker>
                        <DatePicker 
                            v-else-if="field.type==='datetime'" 
                            :element-id="field.key"
                            type="datetime" 
                            format="yyyy-MM-dd HH:mm:ss"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]"
                            :transfer=true>
                        </DatePicker>
                        <DatePicker 
                            v-else-if="field.type==='datetimerange'" 
                            :element-id="field.key"
                            type="datetimerange" 
                            format="yyyy-MM-dd"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]"
                            :transfer=true>
                        </DatePicker>
                        <Select 
                            v-else-if="field.type==='select' && typeof(field.extra)=='string'" 
                            :element-id="field.key"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]">
                                <Option v-for="opt in view.dict[field.extra].data" :value="opt.code" :key="opt.code">
                                    {{ opt.name }}
                                </Option>
                        </Select>
                        <Select 
                            v-else-if="field.type==='select' && typeof(field.extra)=='object'" 
                            :element-id="field.key"
                            :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)"
                            v-model="view.list.currentRow[field.key]">
                                <Option v-for="opt in field.extra.data" :value="opt.code" :key="opt.code">
                                    {{ opt.name }}
                                </Option>
                        </Select>
                        <span v-else-if="field.type==='demonList'">
                            <Input :element-id="field.key" style="display:inline-block;width:70%;" :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)" v-model="view.list.currentRow[field.key]"/>
                            <Button @click="runDemonList(field)" :disabled="disabled?true:(!!field.readonly?((field.readonly=='all' || (field.readonly=='new' && view.toolbar.status.edit=='N') || (field.readonly=='modify' && view.toolbar.status.edit=='E'))?true:false):false)" style="display:inline-block;width:20px;padding-left:4px;">...</Button>
                        </span>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
import DemonList from '../common/DemonList';
import { request } from '../../../libs/httpRequest';
import services from '../../../config/services';
import cookies from 'js-cookie';

export default {
  name: 'DetailHead',
  components: { DemonList },
  props: ['view', 'refs'],
  data() {
      let _that = this;
      return {
          disabled: true,
        //   list: null,           //_that.view.list,
        //   dict: null,           //_that.view.dict,
        //   head: null,           //_that.view.list.detail.head,
        //   currentRow: null           //_that.view.newone
      }
  },
  methods: {    
        setDisabled(disable){
            this.view.list.detail.head.disabled = disable;
        },
        runDemonList: function(field){
            console.log("!!runDemon: ", field, this.view.list.detail.head);
            let opt = {...field.extra};
            opt.refs = this.refs;
            opt.fieldKey = field.key;
            this.view.demonShow("list", true, opt, true);
        },
        // onRadioChange: function(e, a){
        //         console.log('onRadioChange: ', e, this);
        //     let _that = this;
        //     let theValue = e.srcElement.value;
        //     let theId = e.srcElement.id;
        //     let targetField = _that.view.list.detail.head.fields.find(function(field){
        //         return field.key===theId;
        //     });    
        //     if(targetField.type=='radio'){  
        //         console.log('_that.view.dict[targetField.extra].data: ', _that.view.dict[targetField.extra].data);
        //     }
        // },
        onDateChange: function(e){
            console.log("onDateChange formatted VALUE: ", e, this);
        },
        onChange: function(e) {
            let _that = this;
            let token = cookies.get('token') || '1584928153141266120';
            console.log('***  onChange !!!  ', e, this);
            // let theValue = e.srcElement.value;
            // if(this.column.editor=='number'){
            //     let el = document.getElementById('field_'+this.column.key);
            //     el.focus();
            //     this.$data.__tempValue = e;
            // }else{
            //     // let vres = this.doValidate(e);
            //     // if(vres==null){
            //     //     this.doWriteBack(e);
            //     // }
            // }
            if(!!e){
                let dep = _that.view.list.detail.head.dependency;
                if(!!dep && dep.length>0){
                    let theValue = e.srcElement.value;
                    let theId = e.srcElement.id;
                    let theDependencies = [];
                    for(let i=0; i<dep.length; i++){
                        if(dep[i].source===theId){
                            theDependencies.push(dep[i]);
                        }
                    }
                    for(let i=0; i<theDependencies.length; i++){
                        let searchParam = theDependencies[i].remote.params;
                        searchParam[theDependencies[i].paramKey] = theValue;
                        _that.loading = true;
                        let res = request({
                            method: 'post',
                            url: theDependencies[i].remote.resources + '?method=' + theDependencies[i].remote.method + '&ent_id=0&token=' + token,
                            data: searchParam
                        }, function(resData){
                            let _i = i;
                            _that.rowDatas = resData.data[theDependencies[_i].remote.response];
                            let targetField = _that.view.list.detail.head.fields.find(function(field){
                                return field.key===theDependencies[_i].key;
                            });      
                            if(targetField.type=='select'){
                                let optDatas = [];
                                for(let n=0; n<_that.rowDatas.length; n++){
                                    let _code = null;
                                    let _name = null;
                                    for(let p=0; p<theDependencies[_i].valueMap.length; p++){
                                        if(theDependencies[_i].valueMap[p].to=='code') {
                                            _code = _that.rowDatas[n][theDependencies[_i].valueMap[p].from];
                                        }else if(theDependencies[_i].valueMap[p].to=='name') {
                                            _name = _that.rowDatas[n][theDependencies[_i].valueMap[p].from];
                                        }
                                    }
                                    if(!!_code && !!_name){
                                        optDatas.push({
                                            code: _code,
                                            name: _name
                                        });
                                    }
                                }
                                targetField.extra.data = optDatas;
                                console.log("targetField.extra.data: ", targetField.extra.data);
                            }else{
                                _that.view.list.currentRow[targetField.key] = _that.rowDatas[0][theDependencies[i].valueMap[0].from];
                            }
                            // Efview.initRowStatus(_that.rowDatas);
                            // _that.pager.total = resData.data.total_results;
                            _that.loading = false;
                        });
                    }
                }
            }

        }
  },  
  watch: {
    'view.list.detail.head.disabled': function(theOne, theOld) {
        // console.log("view.list.detail.head.disabled： ", theOne);
        if(theOne===false){
            this.$data.disabled = false;
        }else{
            this.$data.disabled = true;
        }
    },
    'view.toolbar.status.edit': function(theOne, theOld){
        // console.log('~~~~~~~: ', theOne);
        if( theOne==='N' || 
            theOne==='E' ){
          this.setDisabled(false);
        }else{
          this.setDisabled(true);
        }
    },
    // 'view.list.currentRow._flag': function(theOne, theOld){
    //         console.log("view.list.currentRow._flag： ", theOne);
    //     // this.$data.currentRow = theOne;
    //     //     console.log("view.list.currentRow._flag： ", this.$data.currentRow['_flag']);
    //     // if( this.$data.currentRow._flag==="I" || 
    //     //     this.$data.currentRow._flag==="U" ){
    //     //     this.$data.disabled = false;
    //     // }
    // //   console.log("[DETAILHEAD] currentRow AAA：", theOne);
    // //   console.log("[DETAILHEAD] currentRow BBB：", theOld);
    // //   console.log("[DETAILHEAD] currentRow --- ", this.$data.currentRow);
    // },
    'view.list.currentRow': function(theOne, theOld){
            console.log("view.list.currentRow@@： ", theOne);
        this.$data.currentRow = theOne;
            // console.log("view.list.currentRow._flag： ", this.$data.currentRow['_flag'], this.$data.currentRow);
        // if( this.$data.currentRow._flag==="I" || 
        //     this.$data.currentRow._flag==="U" ){
        //     this.$data.disabled = false;
        // }else{
        //     this.$data.disabled = true;
        // }
        if( this.view.list.currentRow._flag==="I" || 
            this.view.list.currentRow._flag==="U" ){
            this.$data.disabled = false;
        }else{
            this.$data.disabled = true;
        }
            // console.log("view.list.currentRow00000000： ", theOne);
    }
  },
  created: function () {
            // console.log("view.list.currentRow@@  created ", this);
        //   this.$data.list = this.view.list;
        //   this.$data.dict = this.view.dict;
        //   this.$data.head = this.view.list.detail.head;
        //   this.$data.currentRow = this.view.newone;
            console.log("view.list.currentRow!  created ", this);
  },
  updated: function () {
            // console.log("view.list.currentRow@@  updated： ", this);
  },
  handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
}
</script>
