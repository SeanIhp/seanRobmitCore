<template>
    <!-- 搜索条件 -->
    <Form :label-width="100" :model="searchParam">
        <Row :gutter="16" style="margin-bottom:10px;" v-for="(data,index) in searchParam.rows">
            <Col :span="5" v-for="item in searchData">
                    <FormItem :label="item.title" v-if="item.key == 'keyWord'">
                        <Input type="text" v-model="data['keyWord']" v-if="item.type===undefined || item.type==='text' || item.type==='email'"></Input>
                        <Select v-else-if="item.type==='select'" :label-in-value="true" placeholder="请选择" v-model="data['keyWord']" @on-change="selectChange(data,'keyWord',index)">
                            <Option v-for="opt in view.dict[item.extra].data" :value="opt.code" :key="opt.code">
                                {{ opt.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="item.title" v-else-if="item.key == 'value'">
                        <Input type="text" v-model="data['value']" v-if="item.type===undefined || item.type==='text' || item.type==='email' || data.selectItem.showInput" @on-change="inputChange(data)"></Input>
                        <Select v-else-if="item.type==='select' || data.selectItem.showSelect " :label-in-value="true" placeholder="请选择" v-model="data['value']" @on-change="selectValueChange(data)">
                            <Option v-for="opt in data.selectItem.types" :value="opt.value" :key="opt.value">
                                {{ opt.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="item.title" v-else-if="item.key == 'relationship'">
                        <Input type="text" v-model="data['relationship']" v-if="item.type===undefined || item.type==='text' || item.type==='email'"></Input>
                        <Select v-else-if="item.type==='select'" :label-in-value="true" placeholder="请选择" v-model="data['relationship']">
                            <Option v-for="opt in view.dict[item.extra].data" :value="opt.code" :key="opt.code">
                                {{ opt.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="item.title" v-else-if="item.key == 'condition'">
                        <Input type="text" v-model="data['condition']" v-if="item.type===undefined || item.type==='text' || item.type==='email'"></Input>
                        <Select v-else-if="item.type==='select'" :label-in-value="true" placeholder="请选择" v-model="data['condition']" >
                            <Option v-for="opt in view.dict[item.extra].data" :value="opt.code" :key="opt.code">
                                {{ opt.name }}
                            </Option>
                        </Select>
                    </FormItem>
            </Col>
            <Col :span="4">
                <ButtonGroup>
                <Button @click="addrow" type="ghost">
                    增加
                </Button>
                <Button @click="removerow(index)" type="ghost">
                    删除
                </Button>
                </ButtonGroup>
            </Col>
        </Row>    
    </Form>
</template>

<script>
export default {
  name: 'SearchParam',
  props: [
      'view', 'refs',
    ],
  data() {
    let _that = this;
    return {
        tab: _that.view.tab,
        list: _that.view.list,
        dict: _that.view.dict,
        head: _that.view.list.detail.head,
        searchParam: _that.view.list.searchParam,
        searchData: _that.view.list.searchData,
        // currentRow: _that.view.list.currentRow,
    }
  },
  methods: {
    selectChange: function(Option,key,index) {
        let _that = this;
        let item = this.view.list.selectItem.find((item) => {
            return item.value == Option[key]
        });
        if(item) {
            _that.view.list.searchParam.rows[index].selectItem = {showInput: true};
            Option.value = '';
            Option.value1 = '';
            Option.value2 = '';
            Option.value3 = '';
            this.view.list.searchData.forEach(element => {
                if(element.key == 'value' && item.showSelect) {
                    element.type = 'select';
                    setTimeout(function() {
                        _that.view.list.searchParam.rows[index].selectItem = item;
                    });
                }
            });
        }
    },
    selectValueChange: function(Option) {
        Option.value3 = Option.value;
    },
    inputChange: function(Option) {
        Option.value1 = Option.value;
    },
    addrow: function() {
        let obj = {
            condition:"",
            keyWord:"",
            relationship:"",
            selectItem:{showInput: true},
            value:"",
            value1:"",
            value2:"",
            value3:""
        };
        console.log("obj==="+JSON.stringify(obj));
        let _that = this;
        setTimeout(function() {
            _that.view.list.searchParam.rows.push(obj);
            console.log("obj11111==="+JSON.stringify(_that.view.list.searchParam.rows));
        });
    },
    removerow: function(index) {
        if(this.view.list.searchParam.rows.length == 1) {
            this.$Message.error('已经是最后一个了');
            return;
        }
        this.view.list.searchParam.rows.splice(index,1);
    }
  },  
  watch: {
  },
  created: function () {
  }
}
</script>

        