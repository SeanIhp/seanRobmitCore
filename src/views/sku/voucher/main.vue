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
    <div>
        <!-- 工具栏 -->
        <div class="tool-content">
            <Card>
                <Button @click="btnAddCustomerVoucher" icon="android-add-circle" type="ghost">新单</Button>
                <Button icon="android-delete" type="ghost">删单</Button>
                <Button :disabled="skuVoucherInfoSaveType" @click="btnSaveSkuVoucher" icon="checkmark" type="ghost">保存</Button>
                <Button icon="android-checkbox-outline" type="ghost">审核</Button>
                <Button @click="btnSearch" icon="ios-search" type="ghost">查单</Button>
                <Button icon="printer" type="ghost">打印</Button>
            </Card>
        </div>
        <!-- 工具栏end -->
        <Card>
            <Tabs type="card" value="info" v-model="tabNameValue">
                <TabPane label="单据明细" name="info">
                    <!-- 单据明细 -->
                    <Form ref="customerVoucher" :model="customerVoucherInfo" :label-width="100">
                        <Row :gutter="16">

                            <Col :span="12">
                            <FormItem label="单据编号">
                                <Input disabled v-model="customerVoucherInfo.SheetID" placeholder="单据编号自动生成"></Input>
                            </FormItem>
                            <FormItem label="创建日期">
                                <Input disabled v-model="customerVoucherInfo.CreateDate" placeholder=""></Input>
                            </FormItem>
                            </Col>

                            <Col :span="12">
                            <FormItem label="单据状态">
                                <Select disabled v-model="customerVoucherInfo.State" class="">
                                    <Option value="1">已审核</Option>
                                    <Option value="0">未审核</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="审核日期">
                                <Input disabled v-model="customerVoucherInfo.LastDate" placeholder=""></Input>
                            </FormItem>
                            </Col>

                        </Row>
                    </Form>
                    <p class="vt-title">单据清单</p>
                    <p class="vt-btn-content">
                        <Button size="small" @click="btnAddVoucherSkuItem" icon="ios-search" type="ghost">增行</Button>
                        <Button size="small" icon="printer" type="ghost">删行</Button>
                        <Button size="small" icon="printer" type="ghost">导入</Button>
                    </p>
                    <v-table is-horizontal-resize style="width:100%" :columns="voucherSkuTableColumns" :table-data="voucherSkuTableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-edit-done="voucherSkuItemEdit" @on-custom-comp="voucherSkuTableCB"></v-table>
                    <!-- 单据明细end -->
                </TabPane>
                <TabPane label="单据清单" name="list">
                    <!-- 单据清单 -->
                    <Row :gutter="16" style="margin-bottom:10px;" type="flex" align="middle">
                        <Col :span="18">
                        <!-- 条件遍历体 -->
                        <Row :key="index" v-for="(seitem,index) in searchDate" :gutter="16" type="flex" align="middle" style="margin-bottom:5px;">
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
                        </Row>
                        <!-- 条件遍历体end -->
                        </Col>
                        <Col :span="6">
                        <p style="padding:0 20px;margin-bottom:10px;">
                            <Button @click="getSearchInfo" icon="printer" type="ghost" long>查询</Button>
                        </p>
                        <p style="padding:0 20px;">
                            <Button @click="initSearchInfo" icon="printer" type="ghost" long>清除</Button>
                        </p>
                        </Col>
                    </Row>
                    <p class="vt-title">单据清单</p>
                    <v-table is-horizontal-resize column-width-drag style="width:100%" :columns="voucherTableColumns" :table-data="voucherTableData" row-hover-color="#eee" row-click-color="#edf7ff" :on-row-click="voucherTableColumnsClick"></v-table>
                    <div style="padding:10px;text-align:right;">
                        <v-pagination :total="600" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
                    </div>
                    <!-- 单据清单end -->
                </TabPane>
            </Tabs>
        </Card>
    </div>
    <!-- </Card> -->
</template>

<script>
import Vue from "vue";
import { request } from "@/libs/httpRequest";
export default {
  components: {},
  data() {
    return {
      //  tab切换标记
      tabNameValue: "info",
      // 客户单明细
      customerVoucherInfo: {},
      // 客户端明细是否可保存标记,false,true
      skuVoucherInfoSaveType: true,
      // 搜索条件
      searchDate: [
        {
          selectType: false,
          field: "",
          sqlCondition: "",
          sqlRelation: "",
          fieldValue: "",
          action: 1
        }
      ],
      // 字段select内容数据
      fields: [
        {
          label: "字段1",
          value: "a1"
        },
        {
          label: "字段2",
          value: "a2"
        },
        {
          label: "字段3",
          value: "a3"
        },
        {
          label: "字段4",
          value: "a4"
        },
        {
          label: "字段5",
          value: "a5"
        }
      ],
      // sql查询条件
      sqlCondition: [
        {
          label: "等于",
          value: "="
        },
        {
          label: "大于",
          value: ">"
        },
        {
          label: "大于等于",
          value: ">="
        },
        {
          label: "小于",
          value: "<"
        },
        {
          label: "小于等于",
          value: "<="
        },
        {
          label: "不等于",
          value: "!="
        },
        {
          label: "包含",
          value: "like"
        }
      ],
      // sql字段查询关系
      sqlRelation: [
        {
          label: "与",
          value: "and"
        },
        {
          label: "或",
          value: "or"
        }
      ],
      //－－－－－－－－－－商品资料单录入table－－－－－－－－－－
      voucherSkuTableColumns: [
        {
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
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
          field: "ItemCode",
          title: "商品编码",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "ItemName",
          title: "商品名称",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "PurchaseCost",
          title: "采购成本价",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "AdvisePrice",
          title: "建议售价",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          isEdit: true
        },
        {
          field: "State",
          title: "商品状态",
          titleAlign: "center",
          columnAlign: "center",
          width: 100,
          isResize: true,
          componentName: "sku-state-sel"
        }
      ],
      voucherSkuTableData: [],
      //－－－－－－－－－－商品资料单录入table－－－－－－－－－－
      voucherTableColumns: [
        {
          field: "name1",
          title: "表单编号",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name2",
          title: "创建日期",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name3",
          title: "客户编码",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name4",
          title: "客户名称",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name5",
          title: "联系电话",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name6",
          title: "联系邮箱",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name7",
          title: "折扣权限",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        },
        {
          field: "name8",
          title: "单据状态",
          titleAlign: "center",
          columnAlign: "center",
          width: 80,
          isResize: true
        }
      ],
      voucherTableData: [
        {
          name1: "赵伟",
          name2: "赵伟",
          name3: "赵伟",
          name4: "赵伟",
          name5: "赵伟",
          name6: "赵伟",
          name7: "赵伟",
          name8: "赵伟"
        },
        {
          name1: "赵伟",
          name2: "赵伟",
          name3: "赵伟",
          name4: "赵伟",
          name5: "赵伟",
          name6: "赵伟",
          name7: "赵伟",
          name8: "赵伟"
        }
      ]
    };
  },
  computed: {},
  methods: {
    //   商品资料单明细表格回调事件－主要是内部组件传值使用
    voucherSkuTableCB(param) {
      this.voucherSkuTableData[param.index][param.field] = param.value;
    },
    //   编辑商品资料明细行
    voucherSkuItemEdit(newValue, oldValue, rowIndex, rowData, field) {
      console.log(this.voucherSkuTableData);
      console.log(rowIndex);
      console.log(field);
      this.voucherSkuTableData[rowIndex][field] = newValue;
    },
    //   商品资料单明细增行
    btnAddVoucherSkuItem() {
      this.voucherSkuTableData.push({
        ItemCode: "",
        ItemName: "",
        PurchaseCost: "",
        AdvisePrice: "",
        State: "1"
      });
    },
    // 新增客户资料单
    btnAddCustomerVoucher() {
      // tab切换到单据明细
      this.tabNameValue = "info";
      // 打开保存标记
      this.skuVoucherInfoSaveType = false;
      // 初始化
      this.initCustomerVoucherInfo();
      // 通过API获取单据编号
      this.customerVoucherInfo.SheetID = "1111111";
      // 创建时间赋值
      this.customerVoucherInfo.CreateDate = "2017-11-11";
    },
    // 保存客户资料单据
    btnSaveSkuVoucher() {
      // 关闭保存标记
      //   this.skuVoucherInfoSaveType = true;
      console.log(this.voucherSkuTableData);
      // 初始化
      //   this.initCustomerVoucherInfo();
    },
    // 初始化客户资料单实体信息
    initCustomerVoucherInfo() {
      this.customerVoucherInfo = {
        SheetID: "", //单据编号
        CustomCode: "", //客户编码
        CustomName: "", //客户名称
        DiscountPercent: 0, //折扣百分比
        eMail: "", //客户邮箱
        Linktel: "", //联系电话
        State: "0", //审核状态(已审1/未审0)
        CreateDate: "", //建档日期
        LastDate: "", //最后修改日期
        CState: "0" //客户状态(可用1/停用0)
      };
    },
    // 初始化搜索条件item
    initSearchInfo() {
      this.searchDate = [
        {
          selectType: false,
          field: "",
          sqlCondition: "",
          sqlRelation: "",
          fieldValue: "",
          action: 1
        }
      ];
    },
    // 添加搜索条件item
    addSearchItem() {
      this.searchDate.push({
        selectType: false,
        field: "",
        sqlCondition: "",
        sqlRelation: "",
        fieldValue: "",
        action: 2
      });
    },
    // 删除搜索条件item
    delSearchItem(index) {
      this.searchDate.splice(index, 1);
    },
    // 获取搜索条件信息
    getSearchInfo() {
      const selList = this.searchDate.filter(item => {
        if (item.selectType) {
          return item;
        }
      });
      console.log(selList);
    },
    // 工具栏－查单按钮事件
    btnSearch() {
      this.tabNameValue = "list";
    },
    // 客户单据清单表格单行点击事件
    voucherTableColumnsClick(rowIndex, rowData, field) {
      console.log(rowIndex);
      console.log(rowData);
      console.log(field);
      // tab切换到单据明细
      this.tabNameValue = "info";
      // 打开保存标记
      this.skuVoucherInfoSaveType = false;
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.initCustomerVoucherInfo();

    request(
      {
        url: "/ampAuthService?method=amp.auth.authentication.signInNoEnt",
        method: "post",
        data: {}
      },
      function(data) {
        console.log("111datadatadata", data);
      }
    );

    request(
      {
        url: "/sz?method=customer.manage.searchFirst&ent_id=0",
        method: "post",
        data: {}
      },
      function(data) {
        console.log("111datadatadata", data);
      }
    );
  }
};

// 自定义列组件-商品状态
Vue.component("sku-state-sel", {
  template: `
    <Select v-model="rowData.State" :transfer=true @on-change="change">
        <Option value="1">可用</Option>
        <Option value="0">停用</Option>
    </Select>
        `,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    change(value) {
      // 参数根据业务场景随意构造
      let params = { index: this.index, value: value, field: this.field };
      this.$emit("on-custom-comp", params);
    }
  }
});
</script>
