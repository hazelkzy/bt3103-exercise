<template>
  <div id="modify">
    <p v-for="(count, name, index) in datapacket[0]" v-bind:key="name">
      {{ name }}: {{ count }}<br /><br />
      <input :id="index" type="number" min=0 placeholder=0 class="modify" />
    </p>
    <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase";
export default {
  data() {
    return {
      datapacket: [],
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .doc(this.id)
        .get()
        .then((querySnapShot) => {
          this.datapacket.push(querySnapShot.data());
        });
    },
    updateOrder: function() {
      var datapacketCopy = JSON.parse(JSON.stringify(this.datapacket));
      for (let i = 0; i < Object.keys(datapacketCopy[0]).length; i++) {
        var keys = Object.keys(datapacketCopy[0]);
        if (document.getElementById(i).value != "") {
          datapacketCopy[0][keys[i]] = parseInt(document.getElementById(i).value);
        } else {
          continue; 
        }
      }
      database
        .collection("orders")
        .doc(this.id)
        .update(datapacketCopy[0])
        .then(() => this.$router.push({ name: "orders" }));
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#modify {
  font-size: 20px;
}
input.modify {
  font-size: 20px;
}
button {
  width: 200px;
  height: 50px;
  background-color: #f7cac9;
  border-radius: 10px;
  font-size: 25px;
  text-align: center;
  justify-content: center;
}
</style>
