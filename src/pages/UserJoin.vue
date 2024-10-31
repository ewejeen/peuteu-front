<template>
  <v-container class="align-self-center container-box">
    <v-img
      class="mx-auto mt-6"
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
      <v-text-field
        variant="outlined"
        v-model="userId"
        :rules="[
          rules.email.required,
          rules.email.formatted,
          rules.email.duplicated,
        ]"
      ></v-text-field>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        비밀번호
      </div>
      <v-text-field
        :append-inner-icon="pwVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="pwVisible ? 'text' : 'password'"
        variant="outlined"
        v-model="userPw"
        @click:append-inner="pwVisible = !pwVisible"
      ></v-text-field>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        비밀번호 확인
      </div>
      <v-text-field
        :append-inner-icon="pwCheckVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="pwCheckVisible ? 'text' : 'password'"
        variant="outlined"
        v-model="userPwCheck"
        @click:append-inner="pwCheckVisible = !pwCheckVisible"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">닉네임</div>
      <v-text-field
        variant="outlined"
        v-model="nickname"
        :rules="[]"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">성별 (선택)</div>
      <v-select
        variant="outlined"
        v-model="gender"
        label="성별"
        :items="genderItems"
        :rules="[]"
        single-line
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis">키 (선택)</div>
      <v-text-field
        variant="outlined"
        v-model="height"
        :rules="[]"
        suffix="cm"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">몸무게 (선택)</div>
      <v-text-field
        variant="outlined"
        v-model="weight"
        :rules="[]"
        suffix="kg"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">
        단백질 섭취 목적 (선택)
      </div>
      <v-select
        variant="outlined"
        v-model="goal"
        label="목적"
        :items="goalItems"
        :rules="[]"
        single-line
      ></v-select>
      <v-btn
        class="mt-4"
        color="teal-lighten-2"
        size="large"
        height="50px"
        block
        @click="join"
      >
        가입하기
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { join } from "@/api/user";

export default {
  name: "UserJoin",
  data() {
    return {
      pwVisible: false,
      pwCheckVisible: false,
      userId: null,
      userIdDup: null,
      userPw: null,
      userPwCheck: null,
      nickname: null,
      nicknameDup: null,
      gender: null,
      height: null,
      weight: null,
      goal: null,
      genderItems: [
        { value: "M", title: "남성" },
        { value: "F", title: "여성" },
        { value: "X", title: "선택안함" },
      ],
      goalItems: [
        { value: "H", title: "건강" },
        { value: "M", title: "근성장" },
      ],

      rules: {
        email: {
          required: (value) => !!value || "이메일을 입력해 주세요.",
          formatted: (value) =>
            (!!value &&
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
                value
              )) ||
            "이메일 형식이 올바르지 않습니다.",
          duplicated: (value) => this.checkDuplicatedEmail(value),
        },
      },
    };
  },
  created() {
    console.log(process.env); // TODO: 확인 후 삭제
  },
  methods: {
    join() {
      const userId = this.userId;
      const userPw = this.userPw;
      const nickname = this.nickname;
      const gender = this.gender;
      const height = this.height;
      const weight = this.weight;
      const goal = this.goal;

      if (!userId) {
        alert("아이디를 입력하세요.");
        return;
      }
      if (!userPw) {
        alert("비밀번호를 입력하세요.");
        return;
      }
      if (!nickname) {
        alert("닉네임을 입력하세요.");
        return;
      }
      const payload = {
        email: userId,
        password: userPw,
        nickname: nickname,
        gender: gender,
        height: height,
        weight: weight,
        goal: goal,
      };

      join(payload)
        .then((result) => {
          console.log(result);
          if (result && result.data.result === "success") {
            alert("가입 성공");
            this.$router.push("/login");
          } else {
            alert("가입 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    checkDuplicatedEmail() {
      const userId = this.userId;
      console.log(userId);

      // TODO: axios 로직 추가
      this.userIdDup = false;
      return true;
    },
    checkDuplicatedNickname() {
      const nickname = this.nickname;
      console.log(nickname);

      // TODO: axios 로직 추가
      this.nicknameDup = false;
      return true;
    },
  },
};
</script>

<style scoped></style>
