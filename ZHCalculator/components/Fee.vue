<template>
  <div class="fee">
    <span>{{item}} 保费</span>
    <br>
    <span :class="getColorClass(fee)">{{ fee | capitalize }}</span>
  </div>
</template>

<script>

export default {
  name: 'Fee',
  props:['item', 'fee'],
  methods: {
    getColorClass: function(val) {
      return val > 0 ? 'ok' : 'no'
    }
  },
  filters: {
    //数字金额化
    capitalize: function(val) {
      
      //字符串提示
      if ( (typeof val === 'string') && val.constructor === String) {
        return val;
      }

      //NaN或负数
      if (isNaN(val) || val < 0) {
        return '不可投保！'
      }

      //金额
      return val.toFixed(2) + ' 元';
    }
  }
}
</script>

<style lang="scss">
.fee {
  color: sienna;
  background: #D3DCE6;
  padding: 8px 0;
  margin: 5px 8px;
  border-radius: 4px;

  .ok {
    color: green
  }

  .no {
    color: red;
  }
}
</style>
