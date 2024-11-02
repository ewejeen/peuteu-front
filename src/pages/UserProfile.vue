<template>
  <v-container>
    <v-row no-gutters class="mb-3">
      <v-col>
        <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">설정</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="today-protein">
          <p class="text-h5 font-weight-bold mb-2 text-teal-lighten-1">
            일 단백질 섭취량
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="4">
        <v-text-field variant="outlined" model="target" readonly>{{
          target
        }}</v-text-field>
      </v-col>
      <v-col
        cols="1"
        class="text-h5 font-weight-bold text-teal-lighten-1 ml-2"
        align-self="center"
        ><span>g</span></v-col
      >
      <v-col cols="2">
        <v-btn
          color="teal-lighten-2"
          density="compact"
          size="small"
          slim
          width="15"
          height="56"
          class="ml-2"
          @click="changeTarget"
        >
          {{ mode == "modify" ? "수정" : "저장" }}
        </v-btn>
      </v-col>
      <v-col class="ml-5" v-if="mode == 'save'">
        <v-switch
          align-self="center"
          color="teal-lighten-1"
          label="자동계산"
          true-value="on"
          false-value="off"
          v-model="autoCalculate"
          hide-details
        ></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="today-protein">
          <p class="text-h5 font-weight-bold mb-2 text-teal-lighten-1">
            섭취 알림 설정
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="6">
        <v-switch
          align-self="center"
          color="teal-lighten-1"
          label="ON / OFF"
          true-value="on"
          false-value="off"
          v-model="alertStatus"
          hide-details
        ></v-switch>
      </v-col>
      <v-col cols="2" align-self="center"
        ><p class="text-subtitle-1 text-teal-lighten-1">시간</p>
      </v-col>

      <v-col align-self="center">
        <p class="text-subtitle-1 text-teal-lighten-1">{{ alertTime }} ></p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="today-protein">
          <p class="text-h5 font-weight-bold mb-2 text-teal-lighten-1">
            개인 정보 수정
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col>
        <p class="text-subtitle-1 text-teal-lighten-1">바로가기 ></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      mode: "modify",
      target: 0,
      alertStatus: "off",
      autoCalculate: "off",
      alertTime: "05:00",
    };
  },
  methods: {
    changeTarget() {
      if (this.mode == "modify") {
        this.mode = "save";
      } else {
        this.mode = "modify";
      }
    },
  },
};
</script>

<style scoped></style>
