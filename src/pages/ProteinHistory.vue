<template>
  <v-container>
    <p>Protein History</p>
    <p>couner1: {{ $store.state.counter }}</p>
    <p>{{ $store.getters.getTwoPowerCounter }}</p>
    <button @click="increase">increase</button><br />
    <button @click="apple">coding apple</button>
  </v-container>
</template>

<script>
export default {
  name: "ProteinHistory",
  data() {},
  methods: {
    increase() {
      // commit: mutations 함수를 호출함
      this.$store.commit("setCounter", ++this.$store.state.counter);
    },
    apple() {
      // dispatch: actions 함수를 호출함
      this.$store.dispatch("apiCallSample", "aaa");
    },
  },
};
</script>

<style scoped>
p {
  color: #64526b;
}
</style>
