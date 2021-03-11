<template>
  <div id="itemsList">
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
    <ul class="page">
      <li v-for="item in items" v-bind:key="item.id" class="page">
        <h1 id="itemName">{{ item.name }}</h1>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <counter v-on:counter="onCounter" v-bind:item="item"></counter>
      </li>
    </ul>
    <Basket v-bind:itemsSelected="itemsSelected" id="shoppingBasket"></Basket>
  </div>
</template>

<script>
import Basket from "./Basket";
import database from "../firebase.js";
export default {
  data() {
    return {
      items: [],
      itemsSelected: [],
    };
  },
  components: {
    Basket,
  },
  methods: {
    onCounter: function(item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item.name === item_name && count > 0) {
            this.$set(curr_item, 1, count);
            break;

            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          } else if (item.name === item_name && count == 0) {
            this.itemsSelected.splice(i, i + 1);
            break;

            // otherwise, if the item is not in itemsSelected, add it to itemsSelected by pushing the ORDER in.
          } else if (
            item.name !== item_name &&
            i === this.itemsSelected.length - 1
          ) {
            this.itemsSelected.push([item.name, count, item.price]);
            break;
          } else {
            continue;
          }
        }
      }
    },
    fetchItems: function() {
      database
        .collection("menu")
        .get()
        .then((querySnapShot) => {
          querySnapShot.docs.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
#itemsList {
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
