<template>
  <div id="ordersList">
    <nav>
      <ul class="orders">
        <li class="orders"><router-link to="/" exact>Home</router-link></li>
        <li class="orders">
          <router-link to="/orders" exact>Orders</router-link>
        </li>
        <li class="page">
          <router-link to="/dashboard" exact>Dashboard</router-link>
        </li>
      </ul>
    </nav>
    <ul class="orders">
      <li v-for="order in orders" v-bind:key="order[0]" class="orders">
        <span
          v-for="(count, name) in order[1]"
          v-bind:key="name"
          class="orders"
        >
          {{ name }} : {{ count }}<br />
        </span>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">
          Delete
        </button>
        <button v-bind:id="order[0]" v-on:click="route($event)">
          Modify
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase";
export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          querySnapShot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "modify", params: { id: doc_id } });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul.orders {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li.orders {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
span.orders {
  font-size: 15px;
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
