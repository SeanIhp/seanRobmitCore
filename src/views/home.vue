<style>

</style>

<template>
  <div>
    <p>微应用首页</p>
    <Button type="primary" @click="goCustom">客户资料单</Button>
    <Button type="primary" @click="goItem">商品资料单</Button>
    <Button type="primary" @click="goQuote">商品报价单</Button>
    <Button type="primary" @click="goTestLicence">测试许可证申请</Button>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {},
    methods: {
      goCustom() {
        this.$router.push({
          name: "customerVoucher"
        });
      },
      goItem() {
        this.$router.push({
          name: "itemVoucher"
        });
      },
      goQuote() {
        this.$router.push({
          name: "quoteVoucher"
        });
      },
      goTestLicence() {
        this.$router.push({
          name: "licenceVoucher"
        });
      }
    },
    watch: {},
    mounted() {},
    created() {}
  };
</script>
