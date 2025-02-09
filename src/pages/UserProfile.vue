<template>
  <v-container>
    <div class="mb-3">
      <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">설정</div>
    </div>
    <div class="mb-3 mt-5">
      <p class="text-h5 font-weight-bold text-teal-lighten-1">
        일 단백질 섭취량
      </p>
    </div>
    <div class="d-flex align-items-center mb-3">
      <v-text-field
        variant="outlined"
        v-model="target"
        :readonly="!proteinUpdatable"
        class="mr-2 text-field-fix"
        hide-details
      ></v-text-field>
      <span class="text-h5 font-weight-bold text-teal-lighten-1 mr-5">g</span>
      <v-btn
        v-if="!proteinUpdatable"
        color="teal-darken-2"
        density="comfortable"
        size="medium"
        class="mr-2 large-btn"
        @click="changeTarget"
      >
        수정
      </v-btn>
      <v-btn
        v-else
        color="teal-lighten-2"
        density="comfortable"
        size="medium"
        class="mr-2 large-btn"
        @click="saveTarget"
      >
        저장
      </v-btn>
      <v-switch
        v-if="mode === 'save'"
        color="teal-lighten-1"
        label="자동계산"
        true-value="on"
        false-value="off"
        v-model="autoCalculate"
        @change="calculateTarget"
        hide-details
      ></v-switch>
    </div>
    <!-- <div class="mt-10">
      <p class="text-h5 font-weight-bold text-teal-lighten-1">섭취 알림 설정</p>
    </div>
    <div class="d-flex align-items-center mb-3">
      <v-switch
        class="mr-3"
        color="teal-lighten-1"
        label="ON / OFF"
        true-value="on"
        false-value="off"
        v-model="alertStatus"
        hide-details
      ></v-switch>
      <p class="text-subtitle-1 text-teal-lighten-1 mr-3">시간</p>
      <p class="text-subtitle-1 text-teal-lighten-1">{{ alertTime }} ></p>
    </div> -->
    <div class="mt-10 mb-3">
      <p class="text-h5 font-weight-bold text-teal-lighten-1">개인 정보 수정</p>
    </div>
    <router-link
      to="/user-info"
      class="text-teal-lighten-2 text-decoration-none"
    >
      바로가기 <v-icon icon="mdi-chevron-right"></v-icon>
    </router-link>
    <v-row no-gutters class="mt-3">
      <v-col>
        <p class="text-subtitle-1 text-teal-lighten-1" @click="logout">로그아웃</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getMyProteinTarget,
  updateMyProteinTarget,
  calculateMyTarget,
} from "@/api/protein";
import { logout } from "@/api/user";

export default {
  name: "UserProfile",
  data() {
    return {
      mode: "modify",
      proteinUpdatable: false,
      target: 0,
      alertStatus: "off",
      autoCalculate: "off",
      alertTime: "05:00",
    };
  },
  created() {
    this.target = this.getMyTarget();
  },
  methods: {
    changeTarget() {
      this.proteinUpdatable = !this.proteinUpdatable;

      if (this.mode == "modify") {
        this.mode = "save";
      } else {
        this.mode = "modify";
      }
    },
    // 내 목표 섭취량 조회
    getMyTarget() {
      getMyProteinTarget()
        .then((result) => {
          if (result && result.data.result === "success") {
            this.target = result.data.data;
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    // 목표 섭취량 수정
    saveTarget() {
      const payload = {
        target: this.target,
      };
      updateMyProteinTarget(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            alert("수정 완료");

            this.getMyTarget();
            this.changeTarget();
          } else {
            alert("수정 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    // 목표 섭취량 자동 계산
    calculateTarget() {
      if (this.autoCalculate === "on") {
        if (
          confirm(
            "개인 정보에 입력된 키, 몸무게, 섭취 목적을 기준으로 섭취량을 계산합니다."
          )
        ) {
          calculateMyTarget()
            .then((result) => {
              if (result && result.data.result === "success") {
                this.target = result.data.data;
              } else {
                console.log("실패");
              }
            })
            .catch((error) => {
              if (error.data.message) {
                alert(error.data.message);
              } else {
                alert("서버 에러 발생");
              }

              this.autoCalculate = "off";
              console.error(error);
            });
        }
      }
    },
    // 로그아웃
    async logout() {
      const result = await logout();

      if (result && result.data.result === "success") {
        this.$store.commit("logout");
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style scoped>
/* Flexbox 스타일 조정 */
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
/* 버튼 크기 조정 */
.large-btn {
  height: 48px; /* 버튼 높이 조정 */
  min-width: 80px; /* 최소 너비 */
  font-size: 16px; /* 글자 크기 */
}

.text-field-fix {
  max-width: 100px;
}

/* v-text-field 내부 input 크기 조정 */
.text-field-fix input {
  max-width: 100px;
  height: 48px; /* 높이 설정 */
  line-height: 48px; /* 텍스트 정렬 */
  padding: 0 12px; /* 좌우 패딩 */
  font-size: 16px; /* 글자 크기 */
  box-sizing: border-box; /* 박스 크기 계산 */
}
</style>
