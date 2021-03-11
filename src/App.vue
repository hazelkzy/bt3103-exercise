<template>
  <div>
    <h1 class="title">Hazel's Zi Char</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style>
h1.title {
  background-color:rgb(144, 180, 247);
  padding: 10px;
  text-align: center;
  font-size: 60px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
}
</style>
