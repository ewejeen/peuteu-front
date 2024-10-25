<template>
  <v-app>
    <v-main>
      <!-- <CommonHeader msg="header"></CommonHeader> -->
      <router-view />
      <CommonFooter msg="footer"></CommonFooter>
    </v-main>
  </v-app>
</template>

<script>
import CommonFooter from "@/components/common/CommonFooter.vue";
// import CommonHeader from "@/components/common/CommonHeader.vue";

export default {
  name: "MainLayout",

  components: {
    // CommonHeader,
    CommonFooter,
  },

  data: () => ({
    //
  }),
};
</script>
