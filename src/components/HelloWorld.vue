<template>
  <div id="mainnn">
    <!-- <Grade :grade="grade"></Grade> -->

    <el-row :gutter="20" v-if="0">
      <el-col :span="18">
        <el-slider v-model="bl" :min="((config.blRange.minBpm * config.blRange.minLength))"
          :max="((config.blRange.maxBpm * config.blRange.maxLength))" show-input :step="1">
        </el-slider>
        <br>
      </el-col>
    </el-row>
    <div style="padding: 5px;background-color: #bfa;margin: 5px;">
      <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <h2>{{ config.bpm }}</h2> 步频<br>
        </el-col>
        <el-col :span="6">
          <h2>{{ config.length }}</h2> 步幅<br>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <h2>{{ (speed * 3.6).toFixed(2) }}</h2> km/h <br>
        </el-col>
        <el-col :span="6">
          <h2>{{ speed.toFixed(2) }}</h2> m/s <br>
        </el-col>
        <el-col :span="6">
          <h2>{{ (speed * 3.6 * 0.621371192).toFixed(2) }}</h2> mile/h <br>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <h2>{{ grade.toFixed(2) }}</h2>跑力<br>
        </el-col>
      </el-row>

    </div>
    <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
      <el-col :span="18">
        <el-slider v-model="config.bpm" input-size="large" :disabled="defaultConfig.bpmLock"
          :min="config.blRange.minBpm" :max="config.blRange.maxBpm" show-input :step="1">
        </el-slider>
      </el-col>
    </el-row>
    <div style="height: 10px;"></div>
    <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
      <!-- <el-col :span="4">
        <button @click="defaultConfig.lengthLock = !defaultConfig.lengthLock">锁定</button>
      </el-col> -->
      <el-col :span="18">
        <el-slider v-model="config.length" input-size="large" :disabled="defaultConfig.lengthLock"
          :min="config.blRange.minLength" :max="config.blRange.maxLength" show-input :step="1">
        </el-slider>
      </el-col>
    </el-row>
    <br>
    <template v-for="(card, index) in config.cards">
      <Det :blRange="config.blRange" :index="index" :speed="speed" :is-mile="card.isMale" :distance="card.distance"
        @deleteCard="deleteCard" @moveCard="moveCard"></Det>
    </template>
    <template>
      <el-button v-if="!isAdding" icon="el-icon-s-tools" circle @click="isAdding = !isAdding"
        type="primary"></el-button>
      <el-row v-if="isAdding" :gutter="24" type="flex" class="row-bg" align="middle" justify="space-around">
        <el-col :span="5">
          <el-input v-model.number="newCard.distance" placeholder="distance"></el-input>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="newCard.isMale" :label="false">M</el-radio>
          <el-radio v-model="newCard.isMale" :label="true">Mi</el-radio>
        </el-col>
        <el-col :span="5">
          <el-button type="success" @click="addNewCard">Submit</el-button>
          <el-button type="danger" @click="isAdding = !isAdding">Cancel</el-button>
        </el-col>
      </el-row>
      <el-row v-if="isAdding" :gutter="24" type="flex" class="row-bg" align="middle" justify="space-around">
        <el-button v-if="isAdding" icon="el-icon-refresh-left" circle
          @click="config = defaultConfig; isAdding = !isAdding" type="primary"></el-button>
      </el-row>

    </template>
  </div>
</template>
<script>
import Det from './Det.vue'

import Grade from './Grade.vue'
export default {

  created() {
    const historyConfigs = JSON.parse(localStorage.getItem('configs'));
    const reset = this.shoudldDeleteConfigForUpdate(historyConfigs)
    if (historyConfigs == null || reset) {
      this.config = this.defaultConfig
    } else {
      this.config = historyConfigs
    }
    console.log("history detected")

  },
  data() {
    return {
      isAdding: false,
      config: null, //config used in runtimes
      newCard: {
        distance: 100,
        isMale: false,
      },
      defaultConfig: {
        bpm: 170,
        length: 145,
        bpmLock: false,
        lengthLock: false,
        version: 20240525,
        cards: [
          { distance: 400, isMale: false },
          { distance: 1000, isMale: false },
          { distance: 5 * 1000, isMale: false },
          { distance: 1000, isMale: true },
          { distance: 5 * 1000, isMale: true },
          { distance: 3 * 1000, isMale: false },
          { distance: 10 * 1000, isMale: false },
          { distance: 42.195 * 1000 * 0.5, isMale: false },
          { distance: 42.195 * 1000 * 1.0, isMale: false },
        ],
        blRange: {
          minBpm: 80,
          minLength: 80,
          maxBpm: 196,
          maxLength: 196,
        },
      }
    }
  },
  components: {
    Det,
    Grade,
  },
  computed: {
    speed() {
      //速度(m/s)
      const speed = (this.config.bpm * this.config.length) / (60 * 100)
      this.saveToLocalStorage()//可能会重复地无意义调用,但不影响
      console.log(123)    //每次data更新,computed都会被调用
      return speed
    },
    grade() {
      return this.Grade(this.speed)
    }
  },
  watch: {
    // speed: {
    //   immediate: false, //初始化时让handler调用一下
    //   //handler什么时候调用？当isHot发生改变时。
    //   handler(newValue, oldValue) {
    //     console.log("qq")

    //   }
    // }
  },
  methods: {
    addNewCard() {
      const newCardCopy = { ...this.newCard };
      this.config.cards.push(newCardCopy)
      this.newCard.distance = 0
      this.newCard.isMale = false
    },
    moveCard(index, direction) {

      console.log("index", index)
      console.log("direction", direction)
      //大于0则向高下标移动
      let frontPosition = direction > 0 ? index : index + direction;
      let tailPosition = direction < 0 ? index : index + direction;

      if (frontPosition >= 0 && tailPosition < this.config.cards.length) {

        //forbiden in son componount
        let t1 = this.config.cards[frontPosition]
        let t2 = this.config.cards[tailPosition]
        console.log(t1)
        console.log(t2)
        this.config.cards.splice(frontPosition, 2, t2, t1)
        //   // this.config.cards.pop()
        console.log(this.config.cards)
      }

    },
    deleteCard(index) {

      console.log(index)
      this.config.cards.splice(index, 1)
      return

    },
    Grade(speed, isMale = true) {

      const timeSpand = (42.195 * 1000 * 1.0) / speed;
      console.log(timeSpand)
      const scoreRanges = [
        // 男性时间范围和对应分数
        [
          { time: 7200, score: 100 },
          { time: 9900, score: 95 },
          { time: 12600, score: 85 },
          { time: 14400, score: 75 },
          { time: 21600, score: 60 },
          { time: 26400, score: 40 }
        ],
        // 女性时间范围和对应分数
        [
          { time: 8040, score: 100 },
          { time: 11100, score: 95 },
          { time: 13800, score: 85 },
          { time: 15600, score: 75 },
          { time: 22800, score: 60 },
          { time: 26400, score: 40 }
        ]
      ];

      const ranges = isMale ? scoreRanges[0] : scoreRanges[1];
      let score = 0;

      for (let i = 0; i < ranges.length; i++) {
        if (timeSpand < ranges[i].time) {
          if (i === 0) {
            score = ranges[i].score;
          } else {
            const prevTime = ranges[i - 1].time;
            const prevScore = ranges[i - 1].score;
            score = prevScore - ((timeSpand - prevTime) / (ranges[i].time - prevTime)) * (prevScore - ranges[i].score);
          }
          break;
        }
      }

      return score ? score : 40;
    },
    saveToLocalStorage() {
      //invoked when (speed-change \ cards-order-change \ cards-delete-add)
      // 将数据保存到LocalStorage
      localStorage.setItem('configs', JSON.stringify(this.config));

    },
    getFromLocalStorage() {
      // 从LocalStorage中获取数据
      // 如果保存的是JSON字符串，需要使用JSON.parse()将其转换回对象
      // this.savedData = JSON.parse(localStorage.getItem('myData'));
    },
    shoudldDeleteConfigForUpdate(historyConfigs) {
      if (historyConfigs == null) {
        return false
      } else {
        if (1 && ((!historyConfigs.version) || (historyConfigs.version < this.defaultConfig.version))) {
          console.log("need to reset")
          return true;
        } else {
          console.log("no need to reset")
          return false
        }
      }
    }
  },

}
</script>
<style scoped>
#mainnn{
  width: 100%;
}
</style>