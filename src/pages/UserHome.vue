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
            <v-col cols="8">
              <div class="text-subtitle-1 text-medium-emphasis">이름</div>
              <v-text-field
                variant="outlined"
                v-model="foodName"
              ></v-text-field>
            </v-col>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">섭취량</div>
              <v-text-field
                variant="outlined"
                v-model="foodIntake"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserHome",
  data() {
    return {
      todayDate: "",
      nowProtein: 0,
      requiredProtein: 100,

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
  computed: {
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);

      return year + "-" + month + "-" + day;
    },
    getRandomProverb() {
      const proverbArr = [
        "오늘 흘린 땀은 내일의 어쩌고다",
        "Trust yourself",
        "Shut up and squat!",
      ];
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
  methods: {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
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

<style scoped></style>
