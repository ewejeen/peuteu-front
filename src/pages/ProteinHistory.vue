<template>
  <v-container>
    <div class="mb-3">
      <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">
        프로틴 히스토리
      </div>
    </div>
    <div class="pt-calendar">
      <div>
        <VCalendar
          expanded
          :attributes="attrs"
          @did-move="moveMonth"
          @dayclick="showProteinList"
        />
      </div>
      <div class="mt-2">
        <p class="text-subtitle-1">이 달의 목표 달성일: {{ successCount }}일</p>
      </div>
    </div>
    <div class="selected-history">
      <p class="text-h5 font-weight-bold mt-7 mb-2 text-teal-lighten-1">
        {{ selectedDate }}의 히스토리
      </p>
      <p class="text-subtitle-1 mb-5">총 섭취량: {{ selectedDateSum }}g</p>
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
    <div class="register-protein mt-10">
      <div class="add-area">
        <div class="field">
          <div class="text-subtitle-1 text-medium-emphasis">음식</div>
          <v-text-field
            variant="outlined"
            v-model="food"
            hide-details
          ></v-text-field>
        </div>
      </div>
      <div class="add-area">
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
        >추가</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import {
  deleteProtein,
  getProteinList,
  getProteinStatByMonth,
  saveProtein,
  updateProtein,
} from "@/api/protein";

export default {
  name: "ProteinHistory",
  data() {
    return {
      successCount: null,
      selectedDate: null,
      selectedMonth: null,
      selectedDateSum: 0,
      successList: [],
      foodList: [],
      food: null,
      intake: null,
      intakeTime: null,
      calDate: null,

      attrs: [
        {
          key: "today",
          highlight: {
            color: "teal",
          },
          dates: new Date(),
        },
      ],
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
    getTodayMonth() {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);

      return year + "-" + month;
    },
    getNowTime() {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();

      return { hours: hours, minutes: minutes };
    },
  },
  created() {
    this.intakeTime = this.getNowTime;
    this.selectedDate = this.getTodayDate;
    this.selectedMonth = this.getTodayMonth;
    this.getProteinStatList();
    this.getProteinList();
  },
  methods: {
    getProteinStatList() {
      const dateArr = this.selectedMonth.split("-");
      const payload = {
        targetYear: dateArr[0],
        targetMonth: dateArr[1],
      };
      getProteinStatByMonth(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            this.successList = result.data.data;
            const dateList = [];
            const successDateList = [];

            let successCount = 0;
            this.successList.forEach((item) => {
              dateList.push(new Date(item.date));
              if (item.success) {
                successDateList.push(new Date(item.date));
                successCount++;
              }
            });

            this.attrs = this.attrs.filter(function (obj) {
              return obj.key == "today";
            });
            this.attrs.push(
              {
                key: "normalDay",
                dates: dateList,
                dot: "teal",
              },
              {
                key: "successDay",
                dates: successDateList,
                dot: "red",
              }
            );

            this.successCount = successCount;
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    getProteinList() {
      const payload = {
        userId: "somxkosub2no", // TODO
        targetDate: this.selectedDate,
      };

      getProteinList(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            this.foodList = result.data.data;
            let proteinSum = 0;
            this.foodList.forEach((item) => {
              item.edit = false;
              proteinSum += item.intake;
            });

            this.selectedDateSum = proteinSum;
          } else {
            console.log("실패");
          }
        })
        .catch((error) => {
          alert("서버 에러 발생");
          console.error(error);
        });
    },
    showProteinList(item) {
      this.selectedDate = item.id;
      this.getProteinList();
    },
    moveMonth(item) {
      this.selectedMonth = item[0].id;
      this.getProteinStatList();
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
        intakeTime: `${this.selectedDate} ${intakeTimeHour}:${intakeTimeMinute}`,
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
      this.getProteinStatList();
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
.add-area {
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
.custom-date-picker {
  display: flex;
  align-items: center;
  height: 56px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 16px;
}

.custom-date-picker:focus-within {
  border: 2px #000 solid;
}

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
