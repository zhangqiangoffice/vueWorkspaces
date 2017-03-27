<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th v-for="item in course">
            {{item.zh}}
            <span class="up" @click="sortScores(item.en, 1)">&Delta;</span>
            <span class="down" @click="sortScores(item.en, -1)">&nabla;</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in scores">
          <td>{{item.name}}</td>
          <td>{{item.chiness}}</td>
          <td>{{item.math}}</td>
          <td>{{item.english}}</td>
          <td>{{item.total}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {scoresList, courseList} from "./scores.json"

export default {
  name: 'app',
  
  data () {
    return {
      scores: scoresList,
      course: courseList,
    }
  },

  methods: {
    sortScores: function(str, num) {
      this.scores = this.scores.sort((a, b) => {
        return num * (a[str] - b[str])
      })
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
  font-size: 25px;
}

table{
  border: 1px solid #ccc;
  border-collapse: collapse;
  th{
    padding: 10px 35px;
    background: #666;
    color: #fff;
    border: 1px solid #ccc;
    position: relative;

    span{
      position: absolute;
      font-size: 15px;
      cursor:pointer;

      &.up {
        top: 10px;
        right: 12px;
      }

      &.down {
        top: 27px;
        right: 13px;
      }
    }
  }
  td {
    border: 1px solid #ccc;
  }
}
</style>
