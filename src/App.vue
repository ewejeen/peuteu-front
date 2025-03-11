<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "App",
  created() {
    this.fetchNoAuthUrls(); // 앱 시작 시 로그인 불필요 URL 로드
  },
  methods: {
    ...mapActions(["fetchNoAuthUrls"])
  }
};
</script>
