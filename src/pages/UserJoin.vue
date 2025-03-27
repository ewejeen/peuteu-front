<template>
  <v-container v-if="!joinCompleted" class="align-self-center container-box">
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
        :rules="[
          rules.password.required, 
          rules.password.validation
        ]"
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
        :rules="[
          rules.passwordChk.required, 
          rules.passwordChk.validation
        ]"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">닉네임</div>
      <v-text-field
        variant="outlined"
        v-model="nickname"
        :rules="[
          rules.nickname.required,
          rules.nickname.length,
          rules.nickname.charType,
          rules.nickname.duplicated,
        ]"
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
        :rules="[
          rules.height.validation,
          rules.height.range,
        ]"
        suffix="cm"
        placeholder="예: 170"
        @keypress="onlyAllowNumbersAndDot($event, height)"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">몸무게 (선택)</div>
      <v-text-field
        variant="outlined"
        v-model="weight"
        :rules="[rules.weight.validation]"
        suffix="kg"
        placeholder="예: 60"
        @keypress="onlyAllowNumbersAndDot($event, weight)"
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
  <v-container v-else class="align-self-center container-box mx-auto my-auto">
    <v-card
        variant="text"
        color="surface-variant"
        class="mx-auto my-auto pa-5 mt-16"
        max-width="448"
        rounded="lg"
    >
      <div
          class="text-subtitle-1 text-center text-teal-lighten-1"
          style="margin-top: 130px; margin-bottom: 140px"
      >
        환영합니다!<br>
        회원 가입이 완료되었습니다.
      </div>

      <v-btn
          class="mb-8 mt-14"
          color="teal-lighten-2"
          size="large"
          height="50px"
          block
          @click="goToLogin"
      >
        확인
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { checkEmail, checkNickname, join } from "@/api/user";

export default {
  name: "UserJoin",
  data() {
    return {
      joinCompleted: false,
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
      regex: {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        nickname: /^[a-zA-Z0-9가-힣]+$/,
        password: /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/,
        doubleNumber: /^\d+(\.\d)?$/,
      },
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
            (!!value && this.regex.email.test(value)) ||
            "이메일 형식이 올바르지 않습니다.",
          duplicated: (value) => {
            if(!value) return true;
            
            if (this.debounceTimerId) {
              clearTimeout(this.debounceTimerId);
            }

            return new Promise((resolve) => {
              this.debounceTimerId = setTimeout(async () => {
                const isDuplicated = await this.checkDuplicatedEmail();
                resolve(isDuplicated ? "이미 등록된 이메일입니다." : true);
              }, 300);
            });
          }
        },
        password: {
          required: (value) => !!value || "비밀번호를 입력해 주세요.",
          validation: (value) =>
            (!!value && this.regex.password.test(value)) ||
            "비밀번호는 한글, 영어, 숫자를 포함하여 8~16자로 입력해 주세요.",
        },
        passwordChk: {
          required: (value) => !!value || "비밀번호 확인값을 입력해 주세요.",
          validation: (value) =>
            value === this.userPw || "비밀번호와 일치하지 않습니다.",
        },
        nickname: {
          required: (value) => !!value || "닉네임을 입력해 주세요.",
          length: (value) =>
            value.length <= 8 || "닉네임은 8자 이내로 입력해 주세요.",
          charType: (value) =>
            (!!value && this.regex.nickname.test(value)) ||
            "닉네임은 한글, 영어, 숫자로만 입력해 주세요.",
          duplicated: (value) => {
            if(!value) return true;
            
            if (this.debounceTimerNickname) {
              clearTimeout(this.debounceTimerNickname);
            }

            return new Promise((resolve) => {
              this.debounceTimerNickname = setTimeout(async () => {
                const isDuplicated = await this.checkDuplicatedNickname();
                resolve(isDuplicated ? "이미 등록된 닉네임입니다." : true);
              }, 300);
            });
          }
        },
        height: {
          validation: (value) =>
            (!!value && this.regex.doubleNumber.test(value)) ||
              "키는 소수점 첫 번째 자리까지 입력 가능합니다.",
          range: (value) =>
            (value >= 100 && value <= 300) || "키는 100~300까지 입력 가능합니다.",
        },
        weight: {
          validation: (value) =>
            (!!value && this.regex.doubleNumber.test(value)) ||
              "몸무게는 소수점 첫 번째 자리까지 입력 가능합니다.",
          range: (value) =>
            (value >= 100 && value <= 300) || "몸무게는 10~300까지 입력 가능합니다.",
        },
      },

      debounceTimerId: null,
      debounceTimerNickname: null,
    };
  },
  methods: {
    validateJoin() {
      if (!this.userId) {
        alert("아이디를 입력하세요.");
        return false;
      }
      if (!this.regex.email.test(this.userId)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return false;
      }
      if(this.userIdDup) {
        alert("이미 등록된 이메일입니다.");
        return false;
      }
      
      if (!this.userPw) {
        alert("비밀번호를 입력하세요.");
        return false;
      }
      if (!this.regex.password.test(this.userPw)) {
        alert("비밀번호는 한글, 영어, 숫자를 포함하여 8~16자로 입력해 주세요.");
        return false;
      }
      if (!this.userPwCheck) {
        alert("비밀번호 확인값을 입력하세요.");
        return false;
      }
      if(this.userPw !== this.userPwCheck) {
        alert("비밀번호와 비밀번호 확인값이 일치하지 않습니다.");
        return false;
      }

      if (!this.nickname) {
        alert("닉네임을 입력하세요.");
        return false;
      }
      if (this.nickname.length > 8) {
        alert("닉네임은 8자 이내로 입력해 주세요.");
        return false;
      }
      if (!this.regex.nickname.test(this.nickname)) {
        alert("닉네임은 한글, 영어, 숫자로만 입력해 주세요.");
        return false;
      }
      if(this.nicknameDup) {
        alert("이미 등록된 닉네임입니다.");
        return false;
      }

      if (this.height) {
        if (!this.regex.doubleNumber.test(this.height)) {
          alert("키는 소수점 첫 번째 자리까지 입력 가능합니다.");
          return false;
        }
        if (this.height < 100 || this.height > 300) {
          alert("키는 100~300까지 입력 가능합니다.");
          return false;
        }
      }

      if (this.weight) {
        if (!this.regex.doubleNumber.test(this.weight)) {
          alert("몸무게는 소수점 첫 번째 자리까지 입력 가능합니다.");
          return false;
        }
        if (this.weight < 10 || this.weight > 300) {
          alert("몸무게는 10~300까지 입력 가능합니다.");
          return false;
        }
      }
      return true;
    },
    join() {
      if(!this.validateJoin()) {
        return;
      }

      const userId = this.userId;
      const userPw = this.userPw;
      const nickname = this.nickname;
      const gender = this.gender;
      const height = this.height;
      const weight = this.weight;
      const goal = this.goal;

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
          if (result && result.data.result === "success") {
            this.joinCompleted = true;
          } else {
            alert("가입 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    // 이메일 중복확인
    async checkDuplicatedEmail() {
      const payload = { email: this.userId };

      try {
        const result = await checkEmail(payload);
        if (result && result.data.result === "success") {
            this.userIdDup = result.data.data.duplicated;
          } else {
            console.log("실패");
          }
      } catch (error) {
        console.error(error);
      }
      
      return this.userIdDup;
    },
    // 닉네임 중복확인
    async checkDuplicatedNickname() {
      const payload = { nickname: this.nickname };

      try {
        const result = await checkNickname(payload);
        if (result && result.data.result === "success") {
            this.nicknameDup = result.data.data.duplicated;
          } else {
            console.log("실패");
          }
      } catch (error) {
        console.error(error);
      }
      
      return this.nicknameDup;
    },
    // 키, 몸무게 소수만 입력 가능
    onlyAllowNumbersAndDot($event, val) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

      // 숫자와 점 한 개 허용
      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || val.indexOf('.') != -1)) { // 46 == 점
        $event.preventDefault();
      }

      // 소수점 한자리만 허용
      if(val!=null && val.indexOf(".") > -1 && (val.split('.')[1].length > 0)){
        $event.preventDefault();
      }
    },
    // 로그인 페이지로 이동
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
