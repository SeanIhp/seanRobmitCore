<style scoped>
.vt-title {
  padding: 5px 10px;
  background-color: #f8f8f9;
  border: 1px solid #dddddd;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.ivu-form-item {
  margin-bottom: 0;
}
</style>
<template>
  <div>

    <Card>
      <Form ref="customerVoucher" :label-width="100">
        <Row :gutter="16">
          <Col :span="6">
          <FormItem label="客户编号">
            <Input placeholder="输入客户编号"></Input>
          </FormItem>
          </Col>
          <Col :span="6">
          <FormItem label="客户名称">
            <Input placeholder="输入客户名称"></Input>
          </FormItem>
          </Col>
          <Col :span="6">
          <Button type="ghost" icon="ios-search">查询</Button>
          <Button type="ghost" icon="ios-search">清空</Button>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card>
      <p class="vt-title">单据清单</p>
      <v-table is-horizontal-resize column-width-drag style="width:100%" :columns="voucherTableColumns" :table-data="voucherTableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
      <div style="padding:10px;text-align:right;">
        <v-pagination :total="600" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </Card>

  </div>
</template>

<script>
export default {
  data() {
    return {
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
  props: {
    slotTopClass: String,
    menuList: Array,
    iconSize: Number
  },
  computed: {},
  methods: {},
  watch: {},
  updated() {}
};
</script>
