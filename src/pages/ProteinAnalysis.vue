<template>
  <v-container>
    <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1 mb-3">
      프로틴 분석
    </div>
    <div class="mt-6 w-50 ml-auto">
      <v-select
        variant="outlined"
        density="compact"
        v-model="standard"
        label="기준"
        :items="standardItems"
        @update:model-value="changeStandard"
      ></v-select>
    </div>
    <div class="pt-chart">
      <div v-if="!loaded">Loading...</div>
      <Line
        v-if="loaded"
        :data="chartData"
        :options="chartOptions"
        :key="chartData.labels.length"
      />
    </div>
    <div>
      <p class="text-h5 font-weight-bold mt-10 mb-2 text-teal-lighten-1">
        일 평균
      </p>
    </div>
    <v-card-text class="bg-surface-light">
      <div
        class="text-h4 font-weight-bold text-center text-teal-lighten-1"
        style="line-height: 80px"
      >
        60g
      </div>
    </v-card-text>
    <v-card-text>
      <div class="text-subtitle-2 text-center text-teal-lighten-3">
        이번 주 섭취량이 부족해요.<br />
        조금 더 힘내 보세요!
      </div>
    </v-card-text>
  </v-container>
</template>

<script>
import { getProteinSumByDates } from "@/api/protein";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "ProteinAnalysis",
  components: {
    Line,
  },
  data() {
    return {
      standard: "WEEK",
      standardItems: [
        { value: "WEEK", title: "이번 주" },
        { value: "MONTH", title: "이번 달" },
        { value: "YEAR", title: "이번 해" },
      ],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,

      loaded: false,
      sumDataArr: [],

      chartData: {
        labels: [],
        datasets: [
          {
            label: "Protein",
            backgroundColor: "#f87979",
            data: [0, 0, 0, 0, 0, 0, 0],
            tension: 0.3,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  computed: {
    getThisWeeksDates() {
      return Array.from(Array(7).keys()).map((idx) => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay() + (idx + 1));

        // const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);

        return month + "-" + day;
      });
    },
    getThisWeeksDatesWithYear() {
      return Array.from(Array(7).keys()).map((idx) => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay() + (idx + 1));

        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);

        return year + "-" + month + "-" + day;
      });
    },
    getThisMonthsWeeks() {
      return this.calculateWeeksOfMonth(this.currentYear, this.currentMonth);
    },
    getThisYearsMonths() {
      const arr = Array.from(Array(12).keys()).map((idx) => {
        return idx + 1;
      });
      return arr;
    },
  },
  created() {
    this.chartData.labels = this.getThisWeeksDates;
  },
  async mounted() {
    await this.getThisWeeksProteinDataSet(); // 화면 로딩 시 이번 주 기록 보여줌
  },
  watch: {
    sumDataArr: function () {
      this.chartData.datasets = [
        {
          label: "Protein",
          backgroundColor: "#f87979",
          data: JSON.parse(JSON.stringify(this.sumDataArr)),
          tension: 0.3,
        },
      ];
    },
  },
  methods: {
    formatDate(date) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}-${day}`;
    },
    // 월별 주 목록 계산 함수
    calculateWeeksOfMonth(year, month) {
      const weeks = [];
      let startDate = new Date(year, month - 1, 1); // 해당 월의 첫 번째 날짜
      const endDate = new Date(year, month, 0); // 해당 월의 마지막 날짜 (ex: 11월의 마지막은 11월 30일)

      // 시작 날짜를 해당 주의 월요일로 조정 (주 시작을 월요일로 가정)
      if (startDate.getDay() !== 1) {
        startDate.setDate(
          startDate.getDate() -
            (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
        );
      }

      while (startDate <= endDate) {
        const weekStart = new Date(startDate); // 주 시작 날짜
        const weekEnd = new Date(startDate);
        weekEnd.setDate(weekStart.getDate() + 6); // 주 끝 날짜 (6일 후)

        // 월 마지막 날을 넘지 않도록 조정
        if (weekEnd.getMonth() !== endDate.getMonth() || weekEnd > endDate) {
          weekEnd.setMonth(endDate.getMonth());
          weekEnd.setDate(endDate.getDate());
        }

        // 날짜를 'MM-DD' 형식으로 변환하여 저장
        const formattedWeek = `${this.formatDate(weekStart)}~${this.formatDate(
          weekEnd
        )}`;
        weeks.push(formattedWeek);

        // 다음 주로 이동
        startDate.setDate(startDate.getDate() + 7);
      }

      return weeks;
    },
    // 기준 변경
    changeStandard() {
      if (this.standard === "WEEK") {
        this.chartData.labels = this.getThisWeeksDates;
      } else if (this.standard === "MONTH") {
        this.chartData.labels = this.getThisMonthsWeeks;
      } else if (this.standard === "YEAR") {
        this.chartData.labels = this.getThisYearsMonths;
      }
    },
    // 이번주 분석결과
    async getThisWeeksProteinDataSet() {
      this.loaded = false;

      const weeks = this.getThisWeeksDatesWithYear;
      const payload = {
        targetDates: weeks.join(","),
      };

      await getProteinSumByDates(payload)
        .then((result) => {
          if (result && result.data.result === "success") {
            const dataList = result.data.data;

            let sumArr = weeks.map((date) => {
              const matchedData = dataList.find((item) => item.date === date);
              return matchedData ? matchedData.sum : 0; // date가 일치하면 sum 값, 아니면 0
            });
            this.sumDataArr = sumArr;
            this.loaded = true;
          } else {
            console.log("실패");
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
