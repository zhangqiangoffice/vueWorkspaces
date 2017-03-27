<template>
  <el-col :span="4">
    <div class="choice">
      <span>年龄</span><br>
      <el-input class="middle" :maxlength="6" size="small" type="number" v-model.number="theAge" @change="transAge"></el-input> 周岁
    </div>
  </el-col>
</template>

<script>

export default {
  name: 'Age',
  props:['age', 'who'],
  data: function () {
    return { theAge: this.age }
  },
  methods: {
    transAge: function(num) {
      const len = num.length;
      if (len <= 2) {
        this.$emit('changeAge', this.theAge)
      } else if (len === 6) {
        this.theAge = this.dateToAge(num)
        this.$emit('changeAge', this.theAge )
      }
    },
    //日期转周岁
    dateToAge: function(str) {
      const today = new Date();
      const thisYear = today.getFullYear() % 2000;
      const year = str.substr(0, 2);
      const month = str.substr(2, 2) - 1;
      const day = str.substr(4, 2);
      const birthDate = new Date((year - 0 < thisYear ? '20' : '19') + year , month, day)
      const m = today.getMonth() - birthDate.getMonth();

      let age = today.getFullYear() - birthDate.getFullYear();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
}
</script>


