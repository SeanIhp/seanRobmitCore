<style scoped>
</style>

<template>
  <BillLayout
    ref="cmpLayout"
    :view="theConfig" 
    :refs="theRefs">
  </BillLayout>
</template>

<script>
import BillLayout from '../../../components/efview/bill/Layout'
import view from './view.js'

export default {
  components: { BillLayout },
  data() {
    return {
      theRefs: null,
      theConfig: view,
      theDict: view.dict,
      theTab: view.tab,
      theList: view.list,
      theDetail: view.detail,


      //  tab切换标记
      // tabNameValue: 'list',     // "info",
      // // 客户单明细
      // customerVoucherInfo: {},
      // // 客户端明细是否可保存标记,false,true
      // customerVoucherInfoSaveType: true,
      // // 搜索条件
      // searchDate: [
      //   {
      //     selectType: false,
      //     field: "",
      //     sqlCondition: "",
      //     sqlRelation: "",
      //     fieldValue: "",
      //     action: 1
      //   }
      // ],
      // // 字段select内容数据
      // fields: [
      //   {
      //     label: "字段1",
      //     value: "a1"
      //   },
      //   {
      //     label: "字段2",
      //     value: "a2"
      //   },
      //   {
      //     label: "字段3",
      //     value: "a3"
      //   },
      //   {
      //     label: "字段4",
      //     value: "a4"
      //   },
      //   {
      //     label: "字段5",
      //     value: "a5"
      //   }
      // ],
      // // sql查询条件
      // sqlCondition: [
      //   {
      //     label: "等于",
      //     value: "="
      //   },
      //   {
      //     label: "大于",
      //     value: ">"
      //   },
      //   {
      //     label: "大于等于",
      //     value: ">="
      //   },
      //   {
      //     label: "小于",
      //     value: "<"
      //   },
      //   {
      //     label: "小于等于",
      //     value: "<="
      //   },
      //   {
      //     label: "不等于",
      //     value: "!="
      //   },
      //   {
      //     label: "包含",
      //     value: "like"
      //   }
      // ],
      // // sql字段查询关系
      // sqlRelation: [
      //   {
      //     label: "与",
      //     value: "and"
      //   },
      //   {
      //     label: "或",
      //     value: "or"
      //   }
      // ],
      // voucherTableColumns: [
      //   {
      //     field: "name1",
      //     title: "表单编号",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name2",
      //     title: "创建日期",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name3",
      //     title: "客户编码",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name4",
      //     title: "客户名称",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name5",
      //     title: "联系电话",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name6",
      //     title: "联系邮箱",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name7",
      //     title: "折扣权限",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   },
      //   {
      //     field: "name8",
      //     title: "单据状态",
      //     titleAlign: "center",
      //     columnAlign: "center",
      //     width: 80,
      //     isResize: true
      //   }
      // ],
      // voucherTableData: [
      //   {
      //     "createDate": "2017-11-14 00:00:00",
      //     "customCode": "10101011",
      //     "customName": "john",
      //     "discountPercent": 0.8,
      //     "email": "shizhuo@e-future.com.cn",
      //     "lastDate": "2017-11-14 00:00:00",
      //     "linkTel": "13480808080",
      //     "sheetID": "1584018502975489171",
      //     "state": 1
      //   }, {
      //     "createDate": "2017-11-14 00:00:00",
      //     "customCode": "101010",
      //     "customName": "石卓",
      //     "discountPercent": 0.91,
      //     "email": "shizhuo@e-future.com.cn",
      //     "lastDate": "2017-11-15 00:00:00",
      //     "linkTel": "18989898989",
      //     "sheetID": "1584098411806720542",
      //     "state": 1
      //   }, {
      //     "createDate": "2017-11-14 00:00:00",
      //     "customCode": "101010",
      //     "customName": "石卓",
      //     "discountPercent": 0.91,
      //     "email": "shizhuo@e-future.com.cn",
      //     "lastDate": "2017-11-15 00:00:00",
      //     "linkTel": "18989898989",
      //     "sheetID": "1584098411806720542",
      //     "state": 1
      //   }, {
      //     "createDate": "2017-11-14 00:00:00",
      //     "customCode": "101010",
      //     "customName": "石卓",
      //     "discountPercent": 0.91,
      //     "email": "shizhuo@e-future.com.cn",
      //     "lastDate": "2017-11-15 00:00:00",
      //     "linkTel": "18989898989",
      //     "sheetID": "1584098411806720542",
      //     "state": 1
      //   }
      // ]
    };
  },
  computed: {
      // columns: function() { 
      //   return view.list.properties.columns; 
      // }
  },
  methods: {
    // // 新增客户资料单
    // btnAddCustomerVoucher() {
    //   // tab切换到单据明细
    //   this.tabNameValue = "info";
    //   // 打开保存标记
    //   this.customerVoucherInfoSaveType = false;
    //   // 初始化
    //   this.initCustomerVoucherInfo();
    //   // 通过API获取单据编号
    //   this.customerVoucherInfo.SheetID = "1111111";
    //   // 创建时间赋值
    //   this.customerVoucherInfo.CreateDate = "2017-11-11";
    // },
    // // 保存客户资料单据
    // btnSaveCustomerVoucher() {
    //   // 关闭保存标记
    //   this.customerVoucherInfoSaveType = true;
    //   // 初始化
    //   this.initCustomerVoucherInfo();
    // },
    // // 初始化客户资料单实体信息
    // initCustomerVoucherInfo() {
    //   this.customerVoucherInfo = {
    //     SheetID: "", //单据编号
    //     CustomCode: "", //客户编码
    //     CustomName: "", //客户名称
    //     DiscountPercent: 0, //折扣百分比
    //     eMail: "", //客户邮箱
    //     Linktel: "", //联系电话
    //     State: "0", //审核状态(已审1/未审0)
    //     CreateDate: "", //建档日期
    //     LastDate: "", //最后修改日期
    //     CState: "0" //客户状态(可用1/停用0)
    //   };
    // },
    // // 初始化搜索条件item
    // initSearchInfo() {
    //   this.searchDate = [
    //     {
    //       selectType: false,
    //       field: "",
    //       sqlCondition: "",
    //       sqlRelation: "",
    //       fieldValue: "",
    //       action: 1
    //     }
    //   ];
    // },
    // // 添加搜索条件item
    // addSearchItem() {
    //   this.searchDate.push({
    //     selectType: false,
    //     field: "",
    //     sqlCondition: "",
    //     sqlRelation: "",
    //     fieldValue: "",
    //     action: 2
    //   });
    // },
    // // 删除搜索条件item
    // delSearchItem(index) {
    //   this.searchDate.splice(index, 1);
    // },
    // // 获取搜索条件信息
    // getSearchInfo() {
    //   const selList = this.searchDate.filter(item => {
    //     if (item.selectType) {
    //       return item;
    //     }
    //   });
    //   console.log(selList);
    //   view.list.load();
    // },
    // // 工具栏－查单按钮事件
    // btnSearch() {
    //   this.tabNameValue = "list";
    // },
    // // 客户单据清单表格单行点击事件
    // voucherTableColumnsClick(rowIndex, rowData, field){
    //   console.log(rowIndex);
    //   console.log(rowData);
    //   console.log(field);
    //   // tab切换到单据明细
    //   this.tabNameValue = "info";
    //   // 打开保存标记
    //   this.customerVoucherInfoSaveType = false;
    // },
    /**   */
  },
  watch: {
    'theList.currentRow': function(theOne, theOld){
    }
  },
  mounted() {},
  created() {
    view.init();
    this.theRefs = this.$refs;
  }
};
</script>
