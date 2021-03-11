<template>
  <div id="basket">
    <span>Menu:</span>
    <ul>
      <li v-for="item in itemsSelected" v-bind:key="item" class="basket">
        {{ item[0] }} x {{ item[1] }}<br /><br />
      </li>
    </ul>
    <button
      class="addOrder"
      v-on:click="
        show = true;
        sendOrder();
      "
    >
      Add Order
    </button>
    <p id="total" v-show="show">Subtotal: ${{ findTotal() }}</p>
    <p id="total" v-show="show">Grand Total: ${{ findGrandTotal }}</p>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      subtotal: 0,
      show: false,
    };
  },
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  methods: {
    findTotal: function() {
      var total = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        total += this.itemsSelected[i][2] * this.itemsSelected[i][1];
      }
      this.subtotal = total;
      return this.subtotal;
    },
    sendOrder: function() {
      var items = {
        "Prawn omelette": 0,
        "Dry Beef Hor Fun": 0,
        "Sambal KangKung": 0,
        "Pork Fried Rice": 0,
        "Mapo Tofu": 0,
        "Cereal Prawn": 0,
      };
      this.itemsSelected.forEach((item) => {
        items[item[0]] = item[1];
      });
      database
        .collection("orders")
        .add(items)
        .then(() => {
          location.reload();
        });
    },
  },
  computed: {
    findGrandTotal: function() {
      return (this.subtotal * 1.07).toFixed(2);
    },
  },
};
</script>

<style>
span {
  font-size: 30px;
}
li.basket {
  font-size: 30px;
}
button.addOrder {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: rgb(248, 213, 218);
  height: 60px;
  width: 160px;
  border-radius: 8px;
  font-size: 20px;
  justify-content: center;
}
#total {
  font-size: 30px;
}
</style>
