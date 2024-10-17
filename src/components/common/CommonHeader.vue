<template>
  <div id="header">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    msg: String
  }
}
</script>

<style scoped>
p {
  color: #425eb9;
}
</style>
