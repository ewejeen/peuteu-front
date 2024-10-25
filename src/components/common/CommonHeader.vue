<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Peuteu</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "CommonHeader",
  props: {
    msg: String,
  },
};
</script>

<style scoped></style>
