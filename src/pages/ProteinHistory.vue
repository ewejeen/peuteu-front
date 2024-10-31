<template>
  <v-container>
    <v-row no-gutters class="mb-3">
      <v-col>
        <div class="text-h4 font-weight-bold mt-3 text-teal-darken-1">
          프로틴 히스토리
        </div>
      </v-col>
    </v-row>
    <div class="pt-calendar">
      <v-row>
        <v-col>
          <v-calendar ref="calendar"></v-calendar>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-2">
        <v-col>
          <p class="text-subtitle-1">
            이 달의 목표 달성일: {{ successDays }}일
          </p>
        </v-col>
      </v-row>
    </div>
    <div class="selected-history">
      <p class="text-h5 font-weight-bold mt-7 mb-2 text-teal-lighten-1">
        {{ selectedDate }}의 히스토리
      </p>
      <v-row>
        <v-col cols="6">이름</v-col>
        <v-col>섭취량 (g)</v-col>
        <v-col>수정</v-col>
      </v-row>
      <v-infinite-scroll height="300" mode="manual" @load="load">
        <template v-for="item in desserts" :key="item">
          <v-row>
            <v-col cols="6">{{ item.name }}</v-col>
            <v-col style="color: blue">{{ item.protein }}g</v-col>
            <v-col>
              <v-icon
                small
                class="mr-2 mdi-pencil"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                class="mdi-delete-forever"
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </v-col>
          </v-row>
        </template>
      </v-infinite-scroll>
    </div>
    <div class="add-area mt-6">
      <v-row>
        <v-col cols="8">
          <div class="text-subtitle-1 text-medium-emphasis">이름</div>
          <v-text-field variant="outlined" v-model="foodName"></v-text-field>
        </v-col>
        <v-col>
          <div class="text-subtitle-1 text-medium-emphasis">섭취량</div>
          <v-text-field
            variant="outlined"
            v-model="foodIntake"
            suffix="g"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        block
        color="teal-darken-1"
        rounded="xl"
        variant="flat"
        size="x-large"
        class="mt-3 mb-4 font-weight-bold"
        >추가</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ProteinHistory",
  data() {
    return {
      successDays: 1,
      selectedDate: "2024-10-29",

      search: "",
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Protein (g)", value: "protein" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
