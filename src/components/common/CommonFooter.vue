<template>
  <div id="footer">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'CommonFooter',
  props: {
    msg: String
  }
}
</script>

<style scoped>
p {
  color: #42b983;
}
</style>
