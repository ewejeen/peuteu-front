<template>
  <div id="app">
    <CommonHeader msg="header"></CommonHeader>
    <UserLogin></UserLogin>
    <CommonFooter msg="footer"></CommonFooter>
  </div>
</template>

<script>
import CommonFooter from './components/common/CommonFooter.vue';
import CommonHeader from './components/common/CommonHeader.vue';
import UserLogin from './components/UserLogin.vue';

export default {
  name: 'App',
  components: {
    CommonHeader,
    UserLogin,
    CommonFooter,
  }
}
</script>

<style>
</style>
