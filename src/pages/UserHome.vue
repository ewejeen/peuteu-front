<template>
  <v-container>
    <div class="header-section">
      <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">
        오늘의 프로틴
      </div>
    </div>

    <div class="today-protein">
      <p class="text-h5 font-weight-bold mb-2">{{ getTodayDate }}</p>
      <!-- <p class="text-subtitle-1 font-italic">{{ getRandomProverb }}</p> -->
      <div class="protein-summary mt-7">
        <div class="protein-info">
          <div class="now-protein text-h3 font-weight-bold text-teal-darken-1">
            {{ nowProtein }}g
          </div>
          <div class="divider text-h5">/</div>
          <div class="required-protein text-h5">{{ requiredProtein }}g</div>
        </div>
        <div class="protein-remaining mt-5">
          <div class="text-center">
            {{ remainProtein }}
          </div>
        </div>
      </div>
    </div>

    <div class="register-protein mt-10">
      <p class="text-h5 font-weight-bold mb-1 text-teal-lighten-1">
        프로틴 등록
      </p>
      <div class="register-fields">
        <div class="field">
          <div class="text-subtitle-1 text-medium-emphasis">음식</div>
          <v-combobox
            variant="outlined"
            v-model="food"
            :items="intakeList"
            item-title="name"
            hide-details
            style="font-size: 0.5rem"
          ></v-combobox>

          <!-- <v-text-field
            variant="outlined"
            v-model="food"
            hide-details
            style="font-size: 0.5rem"
          ></v-text-field> -->
        </div>
      </div>
      <div class="register-fields">
        <div class="field">
          <div class="text-subtitle-1 text-medium-emphasis">섭취량</div>
          <v-text-field
            variant="outlined"
            v-model="intake"
            class="custom-text-field"
            hide-details
            type="number"
            suffix="g"
          ></v-text-field>
        </div>
        <div class="field">
          <div class="text-subtitle-1 text-medium-emphasis">섭취시간</div>
          <div class="custom-date-picker">
            <VueDatePicker
              v-model="intakeTime"
              time-picker
              class="custom-text-field"
            />
          </div>
        </div>
      </div>
      <v-btn
        block
        color="teal-darken-1"
        rounded="xl"
        variant="flat"
        size="x-large"
        class="mt-10 mb-4 font-weight-bold"
        @click="saveProtein"
        >저장</v-btn
      >
    </div>

    <div class="protein-history mt-12">
      <p class="text-h5 font-weight-bold text-teal-lighten-1 mb-4">
        프로틴 내역
      </p>
      <div class="mb-6">
        <v-table fixed-header class="pt-table">
          <thead>
            <tr>
              <th class="ht-th" style="width: 50%">음식</th>
              <th class="ht-th" style="width: 27%">섭취량 (g)</th>
              <th class="ht-th" style="width: 23%">수정</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in foodList" :key="item.id">
              <td>
                <v-text-field
                  v-if="item.edit"
                  variant="outlined"
                  v-model="item.name"
                  hide-details
                  density="compact"
                ></v-text-field>
                <span v-else>{{ item.name }}</span>
              </td>
              <td>
                <v-text-field
                  v-if="item.edit"
                  variant="outlined"
                  v-model="item.intake"
                  suffix="g"
                  hide-details
                  density="compact"
                  type="number"
                  style="font-size: 0.7rem"
                ></v-text-field>
                <span v-else>{{ item.intake }}g</span>
              </td>
              <td>
                <div v-if="item.edit">
                  <v-icon
                    small
                    class="mr-2 mdi-check"
                    @click="updateProtein(item)"
                  >
                    check
                  </v-icon>
                  <v-icon small class="mdi-close" @click="editCancel(item)">
                    close
                  </v-icon>
                </div>
                <div v-else>
                  <v-icon
                    small
                    class="mr-2 mdi-pencil"
                    @click="editProtein(item)"
                  >
                    pencil
                  </v-icon>
                  <v-icon
                    small
                    class="mdi-delete-forever"
                    @click="deleteProtein(item.id)"
                  >
                    delete_forever
                  </v-icon>
                </div>
              </td>
            </tr>
            <tr v-if="!foodList.length">
              <td colspan="3" class="text-center">내역이 없어요</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </v-container>
</template>

<script>
import {
  deleteProtein,
  getNowProteinSum,
  getProteinIntakeList,
  getProteinList,
  saveProtein,
  updateProtein,
} from "@/api/protein";
// import { useCookies } from "vue3-cookies";
// const { cookies } = useCookies();

export default {
  name: "UserHome",
  data() {
    return {
      todayDate: "",
      nowProtein: 0,
      requiredProtein: 120,
      food: null,
      intake: null,
      intakeTime: null,

      selected: [],
      foodList: [],
      intakeList: [],
    };
  },
  computed: {
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);

      return year + "-" + month + "-" + day;
    },
    getNowTime() {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();

      return { hours: hours, minutes: minutes };
    },
    getRandomProverb() {
      const proverbArr = ["오늘 흘린 땀은 내일의 어쩌고다"];
      return proverbArr[this.getRandomNumber(0, 2)];
    },
    remainProtein() {
      const rem = this.requiredProtein - this.nowProtein;
      if (rem <= 0) {
        return "짝짝짝! 오늘의 프로틴을 모두 채웠어요!";
      } else {
        return `${rem}g 남았어요!`;
      }
    },
  },
  created() {
    this.checkLogin();
    this.intakeTime = this.getNowTime;
    this.getProteinList();
    this.getNowProtein();
    this.getProteinIntakeList();
  },
  watch: {
    food: function () {
      if (this.food) {
        this.intake = this.food.intake;
      }
    },
  },
  methods: {
    checkLogin() {
      console.log('checklogin')
      if (!this.$store.getters.getAccessToken) {
        console.log('no token')
        this.$router.push('/login')
        return;
      }
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getNowProtein() {
      getNowProteinSum()
        .then((result) => {
          if (result && result.data.result === "success") {
            const proteinSum = result.data.data;
            if (proteinSum) {
              this.$store.commit("updateProteinSum", result.data.data);
              this.nowProtein = result.data.data;
            } else {
              this.nowProtein = 0;
            }
          } else {
            console.log("실패");
            this.nowProtein = 0;
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          this.nowProtein = 0;
          console.error(error);
        });
    },

    getProteinList() {
      const payload = {
        userId: "somxkosub2no", // TODO
        targetDate: this.getTodayDate,
        page: 0,
      };

      getProteinList(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            this.foodList = result.data.data;
            this.foodList.forEach((item) => (item.edit = false));
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },

    // 섭취 프로틴 목록 검색
    getProteinIntakeList() {
      getProteinIntakeList()
        .then((result) => {
          if (result && result.data.result === "success") {
            this.intakeList = result.data.data;
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },

    // 프로틴 저장
    saveProtein() {
      const food = typeof this.food != "string" ? this.food.name : this.food;
      const intake = this.intake;
      const intakeTime = this.intakeTime;
      const intakeTimeHour = ("0" + intakeTime.hours).slice(-2);
      const intakeTimeMinute = ("0" + intakeTime.minutes).slice(-2);

      if (!food) {
        alert("음식 이름을 입력하세요.");
        return;
      }
      if (!intake) {
        alert("섭취량을 입력하세요.");
        return;
      }
      if (!intakeTime) {
        alert("섭취시간을 입력하세요.");
        return;
      }

      const todayDate = this.getTodayDate;
      const payload = {
        food: food,
        intake: intake,
        intakeTime: `${todayDate} ${intakeTimeHour}:${intakeTimeMinute}`,
      };

      saveProtein(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            alert("저장 완료");

            this.refreshProtein();
          } else {
            alert("저장 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },

    deleteProtein(id) {
      deleteProtein(id)
        .then((result) => {
          if (result && result.data.result === "success") {
            if (confirm("삭제하시겠습니까?")) {
              alert("삭제 완료");
              this.refreshProtein();
            }
          } else {
            alert("삭제 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },

    editProtein(item) {
      item.edit = true;
    },
    updateProtein(item) {
      const name = item.name;
      const intake = item.intake;

      if (!name) {
        alert("음식 이름을 입력하세요.");
        return;
      }
      if (!intake) {
        alert("섭취량을 입력하세요.");
        return;
      }
      const payload = {
        proteinId: item.id,
        food: name,
        intake: intake,
        intakeTime: item.intakeTime,
      };

      updateProtein(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            alert("수정 완료");

            this.refreshProtein();
          } else {
            alert("수정 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });

      item.edit = false;
    },
    refreshProtein() {
      this.getNowProtein();
      this.getProteinList();

      this.food = null;
      this.intake = null;
      this.intakeTime = null;
    },
    editCancel(item) {
      item.edit = false;
    },
  },
};
</script>
<style scoped>
/* Flexbox 스타일을 사용하여 반응형 정렬 */
.header-section {
  margin-bottom: 20px;
}

/* 오늘의 프로틴 정보 섹션 스타일 */
.protein-summary {
  display: block;
  align-items: center;
  justify-content: space-between;
}

.protein-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  margin: 0 20px;
}

/* 등록 섹션 스타일 */
.register-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.field {
  flex: 1;
}

.pt-table {
  color: #666666 !important;
}

.ht-th {
  text-align: center !important;
  font-weight: 600 !important;
}

:deep(.pt-table .v-text-field input) {
  font-size: 0.8rem;
}

.v-icon {
  cursor: pointer;
  color: #757575;
  transition: color 0.2s;
}

.v-icon:hover {
  color: #424242;
}

.mdi-check {
  color: #4caf50;
}

.mdi-pencil {
  color: #2196f3;
}

.mdi-delete-forever {
  color: #f44336;
}
</style>

<style scoped>
/* 섭취시간과 섭취량 스타일을 맞추기 위한 공통 스타일 */
.custom-date-picker {
  display: flex;
  align-items: center;
  height: 56px; /* v-text-field와 동일한 높이 */
  border: 1px solid #bdbdbd; /* v-text-field의 테두리 색상과 일치 */
  border-radius: 4px; /* 동일한 둥근 모서리 */
  padding: 0 8px; /* 내부 여백을 v-text-field와 동일하게 설정 */
  box-sizing: border-box;
  font-size: 16px;
}

/* 포커스될 때 테두리 색상을 변경 */
.custom-date-picker:focus-within {
  border: 2px #000 solid;
}

/* VueDatePicker의 인풋 필드 스타일 */
.custom-date-picker input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 0;
}

.dp__theme_light {
  --dp-border-color: none;
}
</style>
