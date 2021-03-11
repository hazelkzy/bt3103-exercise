<template>
  <div class="chart">
    <nav>
      <ul class="page">
        <li class="page"><router-link to="/" exact>Home</router-link></li>
        <li class="page">
          <router-link to="/orders" exact>Orders</router-link>
        </li>
        <li class="page">
          <router-link to="/dashboard" exact>Dashboard</router-link>
        </li>
      </ul>
    </nav>
    <h1 class="title">Bar Chart</h1>
    <bar-chart></bar-chart>
    <h1 class="title">Line Chart</h1>
    <line-chart></line-chart>

  </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";
export default {
  components: { BarChart, LineChart },
};
</script>

<style>
#chart {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
nav.page {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul.page {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li.page {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
h1.title {
  background-color: rgb(144, 180, 247);
  padding: 10px;
  text-align: center;
  font-size: 60px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
}
</style>
