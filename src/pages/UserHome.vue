<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">
          오늘의 프로틴
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="today-protein">
          <p class="text-h5 font-weight-bold mb-2">{{ getTodayDate }}</p>
          <p class="text-subtitle-1 font-italic">{{ getRandomProverb }}</p>
          <div class="mt-7 mb-5">
            <v-row>
              <v-col
                class="text-right text-h3 font-weight-bold text-teal-darken-1 now-protein"
              >
                {{ nowProtein }}g
              </v-col>
              <v-col cols="1" class="text-center text-h5" align-self="end">
                /
              </v-col>
              <v-col class="text-left text-h5" align-self="end">
                <span class="required-protein">{{ requiredProtein }}g</span>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col class="headline text-center">
                {{ remainProtein }}
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="register-protein">
          <p class="text-h5 font-weight-bold mb-1 text-teal-lighten-1">
            프로틴 등록
          </p>
          <v-row>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">음식</div>
              <v-text-field variant="outlined" v-model="food"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">섭취량</div>
              <v-text-field variant="outlined" v-model="intake"></v-text-field>
            </v-col>
            <v-col class="ml-4">
              <div class="text-subtitle-1 text-medium-emphasis">섭취시간</div>
              <div>
                <VueDatePicker
                  v-model="intakeTime"
                  time-picker
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    margin-top: -15px;
                  "
                />
              </div>
            </v-col>
          </v-row>
          <v-btn
            block
            color="teal-darken-1"
            rounded="xl"
            variant="flat"
            size="x-large"
            class="mt-3 mb-4 font-weight-bold"
            @click="saveProtein"
            >저장</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h5 font-weight-bold mt-4 mb-1 text-teal-lighten-1">
          프로틴 내역
        </p>
        <v-row>
          <v-col cols="6">음식</v-col>
          <v-col>섭취량 (g)</v-col>
          <v-col>수정</v-col>
        </v-row>
        <v-infinite-scroll mode="manual" @load="load">
          <template v-for="item in foodList" :key="item">
            <v-row>
              <v-col cols="6">{{ item.name }}</v-col>
              <v-col style="color: blue">{{ item.intake }}g</v-col>
              <v-col>
                <v-icon small class="mr-2 mdi-pencil" @click="editItem(item)">
                  edit
                </v-icon>
                <v-icon
                  small
                  class="mdi-delete-forever"
                  @click="deleteProtein(item.id)"
                >
                  delete
                </v-icon>
              </v-col>
            </v-row>
          </template>
        </v-infinite-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  deleteProtein,
  getNowProteinSum,
  getProteinList,
  saveProtein,
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

      search: "",
      pagination: {},
      selected: [],
      foodList: [],
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

    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
  },
  created() {
    this.intakeTime = this.getNowTime;
    this.getProteinList();
    this.getNowProtein();
  },
  methods: {
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
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },

    saveProtein() {
      const food = this.food;
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
      const payload = {
        food: food,
        intake: intake,
        intakeTime: `${intakeTimeHour}:${intakeTimeMinute}`,
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
            alert("삭제 완료");

            this.refreshProtein();
          } else {
            alert("삭제 실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    refreshProtein() {
      this.getNowProtein();
      this.getProteinList();
    },

    load({ done }) {
      setTimeout(() => {
        this.items.push(
          ...Array.from({ length: 5 }, (k, v) => v + this.items.at(-1) + 1)
        );

        done("ok");
      }, 10);
    },
  },
};
</script>

<style scoped>
.dp__input {
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  position: relative;
}
</style>
