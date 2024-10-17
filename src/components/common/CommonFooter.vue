<template>
  <v-bottom-navigation v-model="value" color="teal" active grow>
    <v-btn @click="$router.push('/')">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <v-btn @click="$router.push('/history')">
      <v-icon>mdi-history</v-icon>
      <span>History</span>
    </v-btn>

    <v-btn @click="$router.push('/analysis')">
      <v-icon>mdi-chart-line-variant</v-icon>
      <span>Analysis</span>
    </v-btn>

    <v-btn @click="$router.push('/profile')">
      <v-icon>mdi-account</v-icon>
      <span>Profile</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "CommonFooter",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
p {
  color: #42b983;
}
</style>
