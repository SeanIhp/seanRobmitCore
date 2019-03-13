<template>
    <!-- 单据清单 -->
    <Row :gutter="16" style="margin-bottom:10px;" type="flex" align="middle">
        <Col :span="24">
              <!-- 条件遍历体 -->
              <!-- <Row :key="index" v-for="(seitem,index) in searchDate" :gutter="16" type="flex" align="middle" style="margin-bottom:5px;">
                <Col :span="1" style="text-aligh:right;">
                    <Checkbox v-model="seitem.selectType"></Checkbox>
                </Col>
                <Col :span="5">
                    <Select v-model="seitem.field" placeholder="字段名称">
                    <Option :key="index" v-for="(fitem,index) in fields" value="beijing" :value="fitem.value">{{fitem.label}}</Option>
                    </Select>
                </Col>
                <Col :span="5">
                    <Select v-model="seitem.sqlCondition" placeholder="条件">
                    <Option :key="index" v-for="(scitem,index) in sqlCondition" :value="scitem.value">{{scitem.label}}</Option>
                    </Select>
                </Col>
                <Col :span="5">
                    <Select v-model="seitem.sqlRelation" placeholder="关系">
                    <Option :key="index" v-for="(sritem,index) in sqlRelation" :value="sritem.value">{{sritem.label}}</Option>
                    </Select>
                </Col>
                <Col :span="5">
                    <Input v-model="seitem.fieldValue" placeholder="输入信息"></Input>
                </Col>
                    <Col :span="1" style="text-aligh:right;">
                    <Button @click="addSearchItem" v-if="seitem.action===1" type="ghost" shape="circle" icon="plus" size="small"></Button>
                    <Button @click="delSearchItem(index)" v-if="seitem.action===2" type="error" shape="circle" icon="minus-round" size="small"></Button>
                </Col>
              </Row> -->
              <!-- 条件遍历体end -->
              <!-- <p style="padding:0 20px;margin-bottom:10px;">
                <Button @click="getSearchInfo" icon="printer" type="ghost" long>查询</Button>
              </p>
              <p style="padding:0 20px;">
                <Button @click="initSearchInfo" icon="printer" type="ghost" long>清除</Button>
              </p> -->
            <!-- <v-table is-horizontal-resize column-widthwidth-drag style="width:100%" :columns="theList.columns" :table-data="theList.rowDatas" row-hover-color="#eee" row-click-color="#edf7ff" :on-row-click="voucherTableColumnsClick"></v-table> -->
            <Table 
              ref="cmpDemonListTable" 
              :columns="this.view.demon.list.columns" 
              :stripe="this.view.demon.list.stripe" 
              :data="this.view.demon.list.rowDatas"
              :loading="this.view.demon.list.loading" 
              :highlight-row="true" 
              @on-current-change="onTheRowChange" 
              @on-select="onSelect"
              @on-select-cancel="onSelectCancel"
              border
              height="320">
            </Table>
            <Page 
              style="margin-top:10px;"
              ref="cmpDemonListPager" 
              :current="view.demon.list.pager.pageIndex" 
              :total="view.demon.list.pager.total" 
              :page-size="view.demon.list.pager.pageSize" 
              :page-size-opts="view.demon.list.pager.sizeOption" 
              @on-change="onPageChange" 
              @on-page-size-change="onPageSizeChange" 
              placement="top" 
              show-total 
              show-elevator 
              show-sizer>
            </Page>
        </Col>
    </Row>
</template>

<script>
export default {
  name: 'DemonList',
  props: [
      'view', 'refs', 'theKey', 'valueMap', 'remote', 'multiple', 'selected'
    ],
  data() {
    let _that = this;
    return {
        tab: _that.view.tab,
        list: _that.view.list,
        dict: _that.view.dict,
        head: _that.view.list.detail.head,
    }
  },
  methods: { 
    onPageChange: function (pageIndex) {
        // console.log('onPageChange: ', this, this.$data.list.pager);
        this.view.demon.list.pager.pageIndex = pageIndex;
        this.view.demon.list.load();
    },
    onPageSizeChange: function (pageSize) {
        // console.log('onPageSizeChange: ', this);
        this.view.demon.list.pager.pageSize = pageSize;
        this.view.demon.list.load();
    },
    onTheRowChange: function (currentRow, oldCurrentRow) {
        // console.log('onTheRowChange: ', this);
        this.view.demon.list.theRow = currentRow;
    },
    onSelect: function(selectedRows, row){
        // console.log('onSelect: ', this);
        this.view.demon.list.selected = selectedRows;
    },
    onSelectCancel: function(selectedRows, row){
        // console.log('onSelectCancel: ', this);
        this.view.demon.list.selected = selectedRows;
    }
  },  
  watch: {
  }, 
  created: function () {
    //   console.log("DemonList !!!!! created@@  ###############");
  },
  updated: function () {
    //   console.log("DemonList !!!!! update  ###############", this, this.view);
  }
}
</script>

        