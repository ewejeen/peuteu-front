<template>
  <v-container>
    <p>Home Page</p>
    <button @click="test1">click1 {{ item1 }}</button>
    <button @click="test2">click2 {{ item2 }}</button>
    <button @click="test3">click3 {{ item3 }}</button>
  </v-container>
</template>

<script>
import { test1, test2, test3 } from "@/api/test";

export default {
  name: "UserHome",
  created() {
    this.item1 = this.$store.getters.getItems1;
    this.item2 = this.$store.getters.getItems2;
    this.item3 = this.$store.getters.getItems3;
  },
  data() {
    return {
      item1: {},
      item2: "",
      item3: {},
      test11: "",
    };
  },
  methods: {
    test1() {
      const payload = {
        name: "post kim",
        age: 123,
      };

      test1(payload).then((result) => {
        this.$store.commit("updateItems1", result.data);
        this.item1 = this.$store.getters.getItems1;
      });
    },
    test2() {
      const code = "abcd";

      test2(code).then((result) => {
        this.$store.commit("updateItems2", result.data);
        this.item2 = this.$store.getters.getItems2;
      });
    },
    test3() {
      const payload = {
        name: "get kim",
        age: 312,
      };

      test3(payload).then((result) => {
        this.$store.commit("updateItems3", result.data);
        this.item3 = this.$store.getters.getItems3;
      });
    },
  },
};
</script>

<style scoped>
p {
  color: #9742b9;
}
button {
  display: block;
  background: blue;
  margin: 10px;
  color: white;
  font-size: 20px;
}
</style>
