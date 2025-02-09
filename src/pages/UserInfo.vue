<template>
  <v-container v-if="!isAuthenticated" class="align-self-center container-box">
    <v-card
      variant="text"
      color="surface-variant"
      class="mx-auto my-auto pa-5"
      max-width="448"
      style="margin-top: 200px"
      rounded="lg"
    >
      <div
        class="text-subtitle-1 text-center text-teal-lighten-1"
        style="margin-top: 130px; margin-bottom: 80px"
      >
        소중한 개인정보 보호를 위해 <br />비밀번호를 다시 입력해주세요
      </div>
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mt-12"
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

      <v-btn
        class="mt-4"
        color="teal-lighten-2"
        size="large"
        height="50px"
        block
        @click="enterPassword"
      >
        확인
      </v-btn>
    </v-card>
  </v-container>
  <v-container v-if="isAuthenticated" class="align-self-center container-box">
    <div class="text-h4 font-weight-bold mt-3 mb-3 text-teal-darken-1">
      개인 정보 수정
    </div>
    <v-card
      variant="text"
      color="surface-variant"
      class="mx-auto my-auto pa-2 mt-2"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">아이디(이메일)</div>
      <p class="text-subtitle-1 mb-4">{{ email }}</p>
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
        @click="saveUser"
      >
        수정 완료
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { getUserInfo, updateUserInfo, validatePassword } from "@/api/user";

export default {
  name: "UserInfo",
  data() {
    return {
      isAuthenticated: false,
      pwVisible: false,
      email: null,
      nickname: null,
      gender: null,
      height: null,
      weight: null,
      goal: null,
      genderItems: [
        { value: "MALE", title: "남성" },
        { value: "FEMALE", title: "여성" },
        { value: "X", title: "선택안함" },
      ],
      goalItems: [
        { value: "HEALTH", title: "건강" },
        { value: "MUSCLE", title: "근성장" },
      ],
    };
  },
  created() {
    this.setUser();
  },
  methods: {
    enterPassword() {
      const payload = {
        password: this.userPw,
      };

      if(!this.userPw) {
        alert('비밀번호를 입력해 주세요.');
        return;
      }

      validatePassword(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            if (result.data.data) {
              this.isAuthenticated = true;
            } else {
              alert("비밀번호가 일치하지 않습니다.");
            }
          }
        })
        .catch((error) => {
          if(error.data.message) {
            alert(error.data.message)
          } else {
            alert("서버 에러 발생");
          }
          console.error(error);
        });
    },
    setUser() {
      getUserInfo()
        .then((result) => {
          if (result && result.data.result === "success") {
            const info = result.data.data;
            this.email = info.email;
            this.nickname = info.nickname;
            this.gender = info.gender;
            this.height = info.height;
            this.weight = info.weight;
            this.goal = info.goal;
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    saveUser() {
      const nickname = this.nickname;
      const gender = this.gender;
      const height = this.height;
      const weight = this.weight;
      const goal = this.goal;

      if (!nickname) {
        alert("닉네임을 입력하세요.");
        return;
      }
      const payload = {
        nickname: nickname,
        gender: gender,
        height: height,
        weight: weight,
        goal: goal,
      };

      updateUserInfo(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            alert("수정 완료");
            this.setUser();
          } else {
            alert("수정 실패");
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

<style scoped></style>
