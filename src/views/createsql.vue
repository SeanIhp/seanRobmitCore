<style scoped>
.tool-content {
  margin-bottom: 10px;
}
.form-item-width {
  width: 400px;
}
.vt-title {
  padding: 5px 10px;
  background-color: #f8f8f9;
  border: 1px solid #dddddd;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.vt-btn-content {
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  padding: 5px;
}
</style>

<template>
  <div style="height:100%;">
    <Row :gutter="10" style="height:100%;">
      <Col :span="12">
	      <Card style="margin-bottom:10px;">
	        <p class="vt-title">SQL输入</p>
	        <Input v-model="sqlInput" type="textarea" placeholder="SQL语句输入" :autosize="{minRows: 10,maxRows: 100}"></Input>
	      </Card>
	      <Card>
	        <p class="vt-title">SQL生成结果</p>
	        <Input readonly v-model="sqlOutPut" type="textarea" :rows="10" placeholder="" :autosize="true"></Input>
	      </Card>
      </Col>
      <Col :span="12" style="height:100%;">
	      <Card>
	        <div style="margin-bottom:10px;">
	          <Button @click="btnCreatSQL" style="margin-right:20px;" size="large" icon="printer" type="ghost">生成SQL</Button>
	          <Button @click="btnDelCondition" size="large" icon="printer" type="ghost">清除条件</Button>
	        </div>
	        <p class="vt-title">查询条件</p>
	        <p class="vt-btn-content">
	          <Button size="small" @click="btnAddVoucherSkuItem" icon="ios-search" type="ghost">增行</Button>
	          <Button size="small" @click="btnDelVoucherSkuItem" icon="printer" type="ghost">删行</Button>
	        </p>
	        <v-table is-horizontal-resize style="width:100%" :columns="voucherSkuTableColumns" :table-data="voucherSkuTableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-edit-done="voucherSkuItemEdit" error-content="暂无条件" :on-row-click="tableOnRowClick"></v-table>
	      </Card>
      </Col>
    </Row>
  </div>
  <!-- </Card> -->
</template>

<script>
// 导入libs下的httpRequest.js
import { request } from "@/libs/httpRequest";

// Policies子项目结构初始化
function initPolicies(tableName, tableCol, tableColValue) {
  let ls_pItem = {};
  ls_pItem[tableName] = {};
  ls_pItem[tableName][tableCol] = tableColValue.split(",");
  return ls_pItem;
}

export default {
  components: {},
  data() {
    return {
      sqlInput: "",
      sqlOutPut: "",
      //－－－－－－－－－－商品资料单录入table－－－－－－－－－－
      voucherSkuTableColumns: [
        {
          field: "custome",
          title: "序号",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowIndex + 1;
          }
          //   isResize: true
        },
        {
          field: "tableName",
          title: "表名",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "tableCol",
          title: "列名",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "tableColValue",
          title: "列值",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        }
      ],
      voucherSkuTableData: [],
      // 选中要删除的条件行下标
      selectConditionItem: -1
      //－－－－－－－－－－商品资料单录入table－－－－－－－－－－
    };
  },
  computed: {},
  methods: {
    //   生成sql按钮事件
    btnCreatSQL() {
      let policies = [];

      this.voucherSkuTableData.map((item, index) => {
        if (policies.length === 0) {
          // 初始化表
          policies.push(
            initPolicies(item.tableName, item.tableCol, item.tableColValue)
          );
        } else {
          let type = true;
          policies.map((pitem, pindex) => {
            if (pitem[item.tableName]) {
              // 表追加列
              policies[pindex][item.tableName][
                item.tableCol
              ] = item.tableColValue.split(",");
              type = false;
            }
          });
          if (type) {
            policies.push(
              initPolicies(item.tableName, item.tableCol, item.tableColValue)
            );
          }
        }
      });

      // API请求参数整理
      let param = {
        statement: this.sqlInput,
        policies: policies
      };
      console.log(JSON.stringify(param));

      //－－－－－－－－－－API异步请求－－－－－－－－－－
      const that = this;
      request(
        {
          url: "/data-utils/rest?method=sql-convert-service&token=", //API请求地址
          method: "post",
          data: param
        },
        function(data) {
          console.log(data); //打印API返回结果
          that.sqlOutPut = data.data; //sql生成结果赋予值
        }
      );
      //－－－－－－－－－－API异步请求end－－－－－－－－－－
    },
    //   表格单元格编辑回调事件
    voucherSkuItemEdit(newValue, oldValue, rowIndex, rowData, field) {
      this.voucherSkuTableData[rowIndex][field] = newValue;
    },

    // 表格多选改变事件
    tableOnRowClick(rowIndex, rowData, field) {
      this.selectConditionItem = rowIndex;
    },

    //   查询条件增加选项事件
    btnAddVoucherSkuItem() {
      this.voucherSkuTableData.push({
        tableName: "",
        tableCol: "",
        tableColValue: ""
      });
    },

    // 清除条件按钮事件
    btnDelCondition() {
      this.voucherSkuTableData = [];
    },

    // 删除条件项
    btnDelVoucherSkuItem() {
      if (this.selectConditionItem === -1) {
        this.$Modal.info({
          title: "操作提示",
          content: "请选择要删除的查询条件项"
        });
      } else {
        this.voucherSkuTableData.splice(this.selectConditionItem, 1);
        this.selectConditionItem = -1;
      }
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
