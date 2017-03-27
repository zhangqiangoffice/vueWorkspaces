<template>
  <el-col :span="3"><div class="title">{{title}}</div></el-col>
</template>

<script>

export default {
  name: 'MainTitle',
  props:['title']
}
</script>

<style lang="scss">

.title {
  width: 100%;
  height: 70px;
  background: #fff;
  color: orange;
  font-size: 24px;
  line-height: 70px;
  border-right: 1px solid #ccc;
}
</style>
