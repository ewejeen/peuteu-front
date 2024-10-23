<template>
  <v-container class="align-self-center container-box">
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="@/assets/image/logo-no-background.png"
    ></v-img>

    <v-card
      variant="text"
      color="surface-variant"
      class="mx-auto my-auto pa-5 mt-12"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">아이디(이메일)</div>
      <v-text-field variant="outlined" v-model="userId"></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mt-5"
      >
        비밀번호

        <a
          class="text-caption text-decoration-none text-teal-lighten-2"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          비밀번호를 잊으셨나요?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="pwVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="pwVisible ? 'text' : 'password'"
        variant="outlined"
        v-model="userPw"
        @click:append-inner="pwVisible = !pwVisible"
      ></v-text-field>

      <v-btn
        class="mb-8 mt-14"
        color="teal-lighten-2"
        size="large"
        height="50px"
        block
        @click="login"
      >
        로그인
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-teal-lighten-2 text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          color="teal-lighten-2"
        >
          회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "UserLogin",
  data() {
    return {
      pwVisible: false,
      userId: null,
      userPw: null,
    };
  },
  methods: {
    login() {
      this.$store.commit("initLoginResult");

      const userId = this.userId;
      const userPw = this.userPw;

      if (!userId) {
        alert("아이디를 입력하세요.");
        return;
      }
      if (!userPw) {
        alert("비밀번호를 입력하세요.");
        return;
      }

      const payload = {
        email: userId,
        password: userPw,
      };

      login(payload)
        .then((result) => {
          console.log(result);
          if (result && result.result === "success") {
            this.$store.commit("getLoginResult", result.data.result);
            alert("로그인 성공");
          } else {
            alert("로그인 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.container-box {
  position: relative;
  top: 10%;
}
</style>
