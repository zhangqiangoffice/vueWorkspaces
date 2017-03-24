<template>
  <div id="app">
    <el-row>
      <el-col :span="24">中荷保费 速算器</el-col>
    </el-row>
    <ul class="box">
      <li>投保人</li>
      <li>
        <span>投保人是被保人的</span>
        <br>
        <input type="radio" id="self" value="self" v-model="relation">
        <label for="self">自己</label>
        <input type="radio" id="parent" value="parent" v-model="relation">
        <label for="parent">父母</label>
        <input type="radio" id="other" value="other" v-model="relation">
        <label for="other">其他</label>
      </li>
      <li>
        <span>投保人年龄</span>
        <br>
        <input type="number" class="short" :min="18" v-model.number="applicantAge" >
      </li>
      <li>
        <span>投保人性别</span>
        <br>
        <input type="radio" id="applicantNan" value="nan" v-model="applicantSex">
        <label for="applicantNan">男</label>
        <input type="radio" id="applicantNv" value="nv" v-model="applicantSex">
        <label for="applicantNv">女</label>
      </li>

    </ul>
    <ul class="box">
      <li>
        被保险人
      </li>
      <li>
        <span>性别</span>
        <br>
        <input type="radio" id="nan" value="nan" v-model="sex">
        <label for="nan">男</label>
        <input type="radio" id="nv" value="nv" v-model="sex">
        <label for="nv">女</label>
      </li>

      <li>
        <span>年龄</span>
        <br>
        <input type="number" class="short" :min="0" :max="50" v-model.number="age" >
      </li>

      <li>

        <span>职业类别</span>
        <br>
        <select v-model="indu" class="middle">
          <option v-for="ind in indus" v-bind:value="ind">
            {{ ind }}
          </option>
        </select>
        <br>
        <select v-model="occupation" class="middle">
          <option v-for="job in jobs" v-bind:value="job">
            {{ job.work }}
          </option>
        </select>
      </li>
    
    </ul>
    <ul class="box">
      <li>CIF 主险</li>
      <li>
        <span>年期</span>
        <br>
        <input type="radio" id="ten_years" value="10" v-model.number="year">
        <label for="ten_years">十年</label>
        <input type="radio" id="twenty_years" value="20" v-model.number="year">
        <label for="twenty_years">二十年</label>
      </li>
      <li>
        <span>保额(万元)</span>
        <br>
        <input type="number" class="short" :min="1" :max="50" v-model.number="coverage" >
      </li>
      
      <li class="fee">
        <span>CIF主险</span>
        <br>
        <span>保费: <span :class="getColorClass(cifFee)">{{ cifFee | capitalize }}</span></span>
      </li>
    </ul>

    <ul class="box">
      <li>HRC或HRD</li>
      <li>
        <span>已购买社保或新农合</span>
        <br>
        <input type="checkbox" id="hasSocialSecurity" v-model="hasSocialSecurity">
        <label for="hasSocialSecurity">{{ hasSocialSecurity | yesOrNo }}</label>
      </li>

      <li>
        <span>首次投保</span>
        <br>
        <input type="checkbox" id="isFirst" v-model="isFirst">
        <label for="isFirst">{{ isFirst | yesOrNo }}</label>
      </li>

      <li>
        <span>投保计划</span>
        <br>
        <el-select v-model="plan" clearable placeholder="请选择">
          <el-option
            v-for="item in planTop"
            :label="chars[item - 1]"
            :value="item - 1">
          </el-option>
        </el-select>
      </li>
      <li v-show="!hasSocialSecurity" class="fee">
        <span>HRC</span>
        <br>
        <span>保费: <span :class="getColorClass(hrcFee)">{{ hrcFee | capitalize }}</span></span>
      </li>
      <li v-show="hasSocialSecurity" class="fee">
        <span>HRD</span>
        <br>
        <span>保费: <span :class="getColorClass(hrdFee)">{{ hrdFee | capitalize }}</span></span>
      </li>
    </ul>

    <ul class="box">
      <li>ADDC</li>
      <li>
        <span>ADDC保额(万元)</span>
        <br>
        <input type="number" class="short" :min="0" :max="99" v-model.number="addcCoverage">
      </li>
      <li class="fee">
        <span>ADDC</span>
        <br>
        <span>保费: <span :class="getColorClass(addcFee)">{{ addcFee | capitalize }}</span></span>
      </li>
    </ul>

    <ul class="box">
      <li>AMRC</li>
      <li>
        <span>AMRC保额(千元)</span>
        <br>
        <input type="number" class="short" :min="0" v-model.number="amrcCoverage">
      </li>
      <li class="fee">
        <span>AMRC</span>
        <br>
        <span>保费: <span :class="getColorClass(amrcFee)">{{ amrcFee | capitalize }}</span></span>
      </li>
    </ul>


    <ul class="box">
      <li>W系列</li>
      <li>
        <span>主险及附加保费合计</span>
        <br>
        <span>{{ totalFee | capitalize}}</span>
      </li>
      <li class="fee">
        <span>WA</span>
        <br>
        <span>保费: <span :class="getColorClass(waFee)">{{ waFee | capitalize }}</span></span>
      </li>
      <li class="fee">
        <span>WPA</span>
        <br>
        <span>保费: <span :class="getColorClass(wpaFee)">{{ wpaFee | capitalize }}</span></span>
      </li>
      <li class="fee">
        <span>WPB</span>
        <br>
        <span>保费: <span :class="getColorClass(wpbFee)">{{ wpbFee | capitalize }}</span></span>
      </li>
      <li class="fee">
        <span>WP</span>
        <br>
        <span>保费: <span :class="getColorClass(wpFee)">{{ wpFee | capitalize }}</span></span>
      </li>
    </ul>

  </div>
</template>

<script>
import cifRates from './json/cif.json';
import hrcRates from './json/hrc.json';
import hrdRates from './json/hrd.json';
import addcRates from './json/addc.json';
import amrcRates from './json/amrc.json';
import waRates from './json/wa.json';
import wpaRates from './json/wpa.json';
import wpbRates from './json/wpb.json';
import wpRates from './json/wp.json';
import industries from './json/industryCategory.json';

export default {
  name: 'app',
  data () {
    return {
      sex: 'nan',
      year: 10,
      age: 20,
      hasSocialSecurity: false,
      isFirst: true,
      coverage: 10,
      applicantAge: 45,
      applicantSex: 'nan',
      indu: '农牧业 - 农业',
      chars: ['不投保', '计划一', '计划二', '计划三', '计划四', '计划五', '计划六'],
      plan: 1,
      occupation: {"industory": "农牧业 - 农业", "code": "02060", "work": "农民", "life": 0, "accident": 2, "hospital": 2},
      addcCoverage: 2,
      amrcCoverage: 5,
      relation: 'self',
      hasWA: true,
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
    },
    //判断：“是”或者“否”
    yesOrNo: function(val) {
      return val ? '是' : '否'; 
    },
  },
  computed: {
    //CIF主险保费
    cifFee: function () {
      return (cifRates[`${this.sex}_year${this.year}_age${this.age}`] + this.occupation.life) * this.coverage;
    },
    //hrc附加保费
    hrcFee: function () {
      //可选不投保
      if (this.plan === 0 ) {
        return '未投保'
      }

      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      return Math.round(hrcRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1))
    },
    //hrd附加保费
    hrdFee: function () {
      //可选不投保
      if (this.plan === 0 ) {
        return '未投保'
      }

      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      return Math.round(hrdRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1))
    },
    //addc附加保费
    addcFee: function () {
      
      //被保人成年，则ADDC保额+主险保额<= 100万
      if (this.age > 18 && this.coverage + this.addcCoverage > 100 ) {
        return '保额超过100万'
      }

      //被保人未成年，则ADDC保额+主险保额<= 50万
      if (this.age <= 18 && this.coverage + this.addcCoverage > 50 ) {
        return '保额超过50万'
      }

      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      return addcRates[`occu${this.occupation.accident}`] * 10 * this.addcCoverage
    },
    //amrc附加保费
    amrcFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      //ADDC必须投保成功
      if (this.noFee(this.addcFee) ) {
        return '未买ADDC'
      }

      //AMRC的保额不能超过ADDC保额的20%
      if (this.amrcCoverage > this.addcCoverage * 2 ) {
        return '过ADDC20%'
      }

      return amrcRates[`occu${this.occupation.accident}`] * 1 * this.amrcCoverage
    },
    //wa附加保费
    waFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      //被保险人须在18-55周岁
      if (this.age < 18 || this.age > 55 ) {
        return '被保须18-55岁'
      }

      //缴费期满被保险人不得超过65周岁
      if (this.age + this.year > 65) {
        return '被保期满已过65岁'
      }

      return waRates[`${this.sex}_year${this.year}_age${this.age}`] * 1 * (this.totalFee / 1000)
    },
    //wpa附加保费
    wpaFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      //投保人是被保人父母
      if (this.relation !== 'parent' ) {
        return '须父母投保'
      }

      //被保人不得超过十八周岁
      if (this.age > 18 ) {
        return '被保已过18岁'
      }

      return wpaRates[`age${this.applicantAge}_year${this.year}`] * 1 * (this.totalFee / 1000)
    },
    //wpb附加保费
    wpbFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      //主险必须投保成功
      if (this.relation === 'self' ) {
        return '须不为同一人'
      }

      //投保人不得超过五十五周岁
      if (this.applicantAge > 55 ) {
        return '投保已过55岁'
      }

      return wpbRates[`${this.applicantSex}_year${this.year}_age${this.applicantAge}`] * 1 * (this.totalFee / 1000)
    },
    //wp附加保费
    wpFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未买主险'
      }

      //投被保人为同一人时才可投保wp
      if (this.relation !== 'self') {
        return '须为同一人'
      }
      return wpRates[`age${this.applicantAge}_year${this.year}`] * 1 * (this.totalFee / 1000)
    },

    //主险、HRC_HRD、ADDC、AMRC保费合计
    totalFee: function() {
      let total = 0;
      if (!isNaN(this.cifFee) && this.cifFee > 0) {
        total += this.cifFee;
      }
      if (!isNaN(this.hrcFee) && this.hrcFee > 0 && !this.hasSocialSecurity) {
        total += this.hrcFee;
      }
      if (!isNaN(this.hrdFee) && this.hrdFee > 0 && this.hasSocialSecurity) {
        total += this.hrdFee;
      }
      if (!isNaN(this.addcFee) && this.addcFee > 0) {
        total += this.addcFee;
      }
      if (!isNaN(this.addcFee) && this.addcFee > 0 && !isNaN(this.amrcFee) && this.amrcFee > 0 ) {
        total += this.amrcFee;
      }
      return total;

    },
    //所有行业的名称数组
    indus: function() {
      let industriesArr = [industries[0].industory];
      const len = industries.length;
      for (let i = 1; i < len; i++) {
        if (industries[i].industory !== industries[i - 1].industory) {
          industriesArr.push(industries[i].industory)
        }
      }
      return industriesArr;
    },
    //年龄段
    ageGroup: function() {
      if (this.age <= 17) {
        return parseInt(this.age / 5);
      } else {
        return parseInt(this.age / 5) + 1;
      }
    },
    //选择行业后的所有工种
    jobs: function () {
      const that = this;
      return industries.filter(function(ele) {
        return ele.industory === that.indu;
      })
    },
    //最高可以购买的投保计划等级
    planTop: function() {
      let max = this.ageGroup < 4 ? 4 : 7;
      let coverage = this.coverage;
      if (coverage < 2) {
        max = 1;
      } else if (coverage < 4) {
        max = 2;
      } else if (coverage < 10) {
        max = 3;
      } else if (coverage < 16) {
        max = 4;
      } else if (coverage < 20) {
        max = 5;
      }
      return max
    }
  },
  methods: {
    getColorClass: function(val) {
      return val > 0 ? 'ok' : 'no'
    },
    noFee: function (fee) {
      return ! (fee > 0)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width:1008px;
  color: #2c3e50;
  margin: 10px auto;
}

.short {
  width: 40px;
  }

.middle {
  width: 150px;
}

.box {
  list-style-type: none;
  border: 1px solid #ccc;
  padding: 10px 0;
  margin-bottom: 10px;
  li {
    display: inline-block;
    margin: 0 10px;
    vertical-align: top;

    &:first-child{
      font-size: 20px;
      float: left;
      color: orange;
    }

    &.fee {
      color: sienna;
      float: right;
      width: 180px;
      text-align: left;

      .ok {
        color: green
      }

      .no {
        color: red;
      }
    }
  }
}

</style>
