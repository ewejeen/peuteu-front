<template>
  <v-container>
    <v-row no-gutters class="mb-3">
      <v-col>
        <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">
          프로틴 분석
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-6 w-50 ml-auto">
      <v-select
        variant="outlined"
        density="compact"
        v-model="standard"
        label="기준"
        :items="standardItems"
      ></v-select>
    </v-row>
    <div class="pt-chart">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="3"
        rounded="lg"
      >
        <v-sparkline
          :model-value="value"
          :labels="labels"
          color="white"
          line-width="2"
          height="180"
          padding="16"
        >
        </v-sparkline>
      </v-sheet>
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
export default {
  name: "ProteinAnalysis",
  data() {
    return {
      standard: null,
      standardItems: [
        { value: "WEEK", title: "이번 주" },
        { value: "MONTH", title: "이번 달" },
        { value: "YEAR", title: "이번 해" },
      ],
      labels: ["10/28", "10/29", "10/30", "10/31", "11/1", "11/2", "11/3"],
      value: [200, 675, 410, 390, 310, 460, 250],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
