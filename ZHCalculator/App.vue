<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <h1 class="theme">闪电<img class="logo" src="./img/flash.png">速算器</h1>
        <span>中荷保费</span>
      </el-col>
    </el-row>
    
    <el-row class="box">
      <MainTitle title="被保险人"></MainTitle>
      <el-col :span="21">
        <el-row>
          <el-col :span="4">
            <div class="choice">
              <span>性别</span><br>
              <el-radio-group v-model="sex">
                <el-radio label="nan">男</el-radio>
                <el-radio label="nv">女</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <Age :age="age" @changeAge="changeInsuredAge"></Age>
          <!-- <el-col :span="4">
            <div class="choice">
              <span>年龄</span><br>
              <el-input class="middle" :maxlength="6" size="small" type="number" v-model.number="age" @change="transAge" ></el-input> 周岁
            </div>
          </el-col> -->
          <el-col :span="8" :offset="1">
            <div class="choice">
              <span>职业等级</span><br>
              <el-cascader
                expand-trigger="hover"
                :options="indus"
                filterable
                size="small"
                v-model="job"
                :show-all-levels="false">
              </el-cascader>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="box">
      <el-col :span="16" class="border_r border_b">
        <el-row>
          <el-col :span="6" :offset="6">
            <div class="choice">
              <span>缴费年期</span><br>
              <el-radio-group v-model="year">
                <el-radio :label="10">十年</el-radio>
                <el-radio :label="20">二十年</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="choice">
              <span>CIF保额</span>
              <br>
              <el-input size="small" class="short" type="number" v-model.number="coverage" :min="1" :max="50" ></el-input> 万元
            </div>
          </el-col>
          
          <el-col :span="6">
            <Fee item="CIF" :fee="cifFee"></Fee>
          </el-col>
          
        </el-row>
      </el-col>
      <el-col :span="8" class="border_b">
        <el-row>
          <el-col :span="12">
            <div class="choice">
              <span>ADDC保额</span>
              <br>
              <el-input size="small" class="short" type="number" v-model.number="addcCoverage" :min="0" :max="99" ></el-input> 万元
            </div>
          </el-col>
          <el-col :span="12">
            <Fee item="ADDC" :fee="addcFee"></Fee>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16" class="border_r">
        <el-row>
          <el-col :span="6">
            <div class="choice">
              <span>社保或新农合</span>
              <br>
              <el-radio-group v-model="hasSocialSecurity">
                <el-radio :label="true">有</el-radio>
                <el-radio :label="false">无</el-radio>
              </el-radio-group>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="choice">
              <span>首次投保</span>
              <br>
              <el-radio-group v-model="isFirst">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="choice">
              <span>投保计划</span>
              <br>
              <el-select v-model="plan" class="middle" size="small" placeholder="投保计划">
                <el-option
                  v-for="item in planTop"
                  :label="chars[item - 1]"
                  :value="item - 1">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" v-show="!hasSocialSecurity">
            <Fee item="HRC" :fee="hrcFee"></Fee>
          </el-col>
          <el-col :span="6" v-show="hasSocialSecurity">
            <Fee item="HRD" :fee="hrdFee"></Fee>
          </el-col>
        </el-row>
        
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="12">
            <div class="choice">
              <span>AMRC保额</span>
              <br>
              <el-input type="number" size="small" class="short" :min="0" v-model.number="amrcCoverage"></el-input> 千元
            </div>
          </el-col>
          <el-col :span="12">
            <Fee item="AMRC" :fee="amrcFee"></Fee>
          </el-col>
        </el-row>
        
      </el-col>
    </el-row>

    <el-row class="box">
      <MainTitle title="投保人"></MainTitle>
      <el-col :span="21">
        <el-row>
          <el-col :span="4">
            <div class="choice">
              <span>性别</span><br>
              <el-radio-group v-model="applicantSex">
                <el-radio label="nan">男</el-radio>
                <el-radio label="nv">女</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <Age :age="applicantAge" @changeAge="changeApplicantAge"></Age>
          <el-col :span="7">
            <div class="choice">
              <span>是被保人的</span><br>
              <el-radio-group v-model="relation">
                <el-radio label="self">自己</el-radio>
                <el-radio label="parent">父母</el-radio>
                <el-radio label="other">其他</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="box">
      <MainTitle title="W系列"></MainTitle>
      <el-col :span="21">
        <el-row>
          <el-col :span="8">
            <div class="choice">
              <span>主险及附加 保费合计</span>
              <br>
              <span>{{ totalFee.toFixed(2) }}元</span>
            </div>
          </el-col>
          <el-col :span="4" v-for="item in wList">
            <Fee :item="item.name" :fee="item.fee"></Fee>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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

import MainTitle from './components/MainTitle.vue'
import Fee from './components/Fee.vue'
import Age from './components/Age.vue'

export default {
  name: 'app',
  components: {
    MainTitle,
    Fee,
    Age
  },
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
      chars: ['不投保', '计划一', '计划二', '计划三', '计划四', '计划五', '计划六'],
      plan: 1,
      job: ["农牧业", "农业", "02060"],
      addcCoverage: 2,
      amrcCoverage: 5,
      relation: 'self',
      hasWA: true,
    }
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
        return '未投保主险'
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
        return '未投保主险'
      }

      return Math.round(hrdRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1))
    },
    //addc附加保费
    addcFee: function () {
      
      //被保人成年，则ADDC保额+主险保额<= 100万
      if (this.age > 18 && this.coverage + this.addcCoverage > 100 ) {
        return '总保额超过100万'
      }

      //被保人未成年，则ADDC保额+主险保额<= 50万
      if (this.age <= 18 && this.coverage + this.addcCoverage > 50 ) {
        return '总保额超过50万'
      }

      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
      }

      return addcRates[`occu${this.occupation.accident}`] * 10 * this.addcCoverage
    },
    //amrc附加保费
    amrcFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
      }

      //ADDC必须投保成功
      if (this.noFee(this.addcFee) ) {
        return '未投保ADDC'
      }

      //AMRC的保额不能超过ADDC保额的20%
      if (this.amrcCoverage > this.addcCoverage * 2 ) {
        return '超过ADDC的20%'
      }

      return amrcRates[`occu${this.occupation.accident}`] * 1 * this.amrcCoverage
    },
    //wa附加保费
    waFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
      }

      //被保险人须在18-55周岁
      if (this.age < 18 || this.age > 55 ) {
        return '被保人须18-55岁'
      }

      //缴费期满被保险人不得超过65周岁
      if (this.age - 0 + this.year > 65) {
        return '期满被保人超过65岁'
      }

      return waRates[`${this.sex}_year${this.year}_age${this.age}`] * 1 * (this.totalFee / 1000)
    },
    //wpa附加保费
    wpaFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
      }

      //投保人是被保人父母
      if (this.relation !== 'parent' ) {
        return '须父母投保'
      }

      //被保人不得超过十八周岁
      if (this.age > 18 ) {
        return '被保人已过18岁'
      }

      return wpaRates[`age${this.applicantAge}_year${this.year}`] * 1 * (this.totalFee / 1000)
    },
    //wpb附加保费
    wpbFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
      }

      //主险必须投保成功
      if (this.relation === 'self' ) {
        return '须不为同一人'
      }

      //投保人不得超过五十五周岁
      if (this.applicantAge > 55 ) {
        return '投保人已过55岁'
      }

      return wpbRates[`${this.applicantSex}_year${this.year}_age${this.applicantAge}`] * 1 * (this.totalFee / 1000)
    },
    //wp附加保费
    wpFee: function () {
      
      //主险必须投保成功
      if (this.noFee(this.cifFee) ) {
        return '未投保主险'
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
    //W系列的列表
    wList: function() {
      return [{name: 'WA', fee: this.waFee}, {name: 'WPA', fee: this.wpaFee}, {name: 'WPB', fee: this.wpbFee}, {name: 'WP', fee: this.wpFee}]
    },
    //所有行业的名称数组
    indus: function() {
      let industriesArr = [{
        value: industries[0].industory.split(' - ')[0], 
        label: industries[0].industory.split(' - ')[0], 
        children: [{
          value: industries[0].industory.split(' - ')[1],
          label: industries[0].industory.split(' - ')[1],
          children: [this.makeJob(industries[0])]
        }]
      }];
      const len = industries.length;
      for (let i = 1; i < len; i++) {
        let job = industries[i]
        let first = job.industory.split(' - ')[0];
        let second = job.industory.split(' - ')[1];

        if (first !== industries[i - 1].industory.split(' - ')[0]) {
          industriesArr.push({
            value: first, 
            label: first, 
            children: [{
              value: second,
              label: second, 
              children:[this.makeJob(job)]
            }]
          })
        } else if (second !== industries[i - 1].industory.split(' - ')[1]) {
          industriesArr[industriesArr.length - 1].children.push({
            label: second, 
            value: second,
            children: [this.makeJob(job)]
          })
        } else {
          let index = industriesArr[industriesArr.length - 1].children.length - 1;
          industriesArr[industriesArr.length - 1].children[index].children.push(this.makeJob(job))
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
    },
    //选中的职业等级
    occupation: function() {
      return industries.find((ele) => {
          return ele.code === this.job[2];
      })
    }
  },
  methods: {
    noFee: function (fee) {
      return ! (fee > 0)
    },
    makeJob: function(obj) {
      return {
            value: obj.code,
            label: `${obj.work}(${obj.code},寿${obj.life},意${obj.accident},医${obj.hospital})`
          }
    },
    changeInsuredAge: function (age) {
      this.age = age;
    },
    changeApplicantAge: function (age) {
      this.applicantAge = age;
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
  margin: 20px auto;
}
.logo {
  display: inline-block;
}
.theme {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 30px;
  color: #d18f07;
}
.choice {
  margin-top: 8px;
}
.border_r {
  border-right: 1px solid #ccc;
}

.border_b {
  border-bottom: 1px solid #ccc;
}

.short {
  width: 60px;
}

.middle {
  width: 100px;
}
.el-cascader--small {
  width: 100%
}
.box {
  list-style-type: none;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
