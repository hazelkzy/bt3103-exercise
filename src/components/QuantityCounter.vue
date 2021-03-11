<template>
  <div id="counter">
    <button class="counter" v-on:click="decrementCounter">-</button>
    <span> {{ count }} </span>
    <button class="counter" v-on:click="incrementCounter">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    decrementCounter: function() {
      if (this.count > 0) {
        this.count -= 1;
        this.$emit('counter', this.item, this.count);
      }
    },
    incrementCounter: function() {
      if (this.count < 10) {
        this.count += 1;
        this.$emit('counter', this.item, this.count);
      } else {
        alert("You cannot buy more than 10 items.");
      }
    },
  },
};
</script>

<style>
#counter {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 30px;
  color: black;
}

button.counter {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: rgb(248, 213, 218);
  height: 60px;
  width: 60px;
  border-radius: 8px;
  font-size: 30px;
  justify-content: center;
}
</style>
