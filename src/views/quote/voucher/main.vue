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
    };
  },
  computed: {
  },
  methods: {
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





