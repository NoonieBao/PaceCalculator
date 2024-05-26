<template>
  <div>
    <div style="padding: 5px;background-color: #abf;margin: 5px;">
      <el-row :gutter="25" align="middle" type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <h2 v-if="isMile">
            {{ distance.toFixed(1) }} mi
          </h2>
          <h2 v-if="!isMile">
            {{ distance.toFixed(1) }} m
          </h2>
        </el-col>
        <el-col :span="6">
          <h3>
            <template v-if="timeP.hours">
              {{ timeP.hours.toString().padStart(2, '0') }}:
            </template>
            {{ timeP.minutes.toString().padStart(2, '0') }}:
            {{ timeP.seconds.toString().padStart(2, '0') }}
            <!-- .{{ Math.floor( timeP.milliseconds/100).toString().padStart(1, '0') }} -->

            
          </h3>
        </el-col>
        <el-col :span="6">
          <h3>
            {{ timeSpand.toFixed(1) }} s
          </h3>
        </el-col>
        <el-col class="buttons" :span="5">

          <el-button type="info" @click="moveHandler(-1)" icon="el-icon-caret-top" circle></el-button>

          <el-button type="info" @click="moveHandler(1)" icon="el-icon-caret-bottom" circle></el-button>

          <el-button type="info" @click="deleteHandler" icon="el-icon-delete-solid" circle></el-button>

        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="less">
.buttons >button{
  margin: 3 3px !important;
}
</style>
<script>
export default {
  data() {
    return {
      timeP: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds:0,
      }
    }
  },
  props: {
    speed: {
      type: Number, //类型
      required: false, //必要性
    },
    distance: {
      type: Number, //类型
      required: false, //必要性
      default: 1000,
    },
    blRange: {
      required: false, //必要性
    },
    index: {
      required: false, //必要性
    },
    isMile: {
      type: Boolean, //类型
      required: false, //必要性
      default: false,
    },
  },
  computed: {
    timeSpand() {
      const timeSpand = (this.distanceApdater / this.speed)
      this.formatTime(timeSpand)
      return timeSpand
    },
    distanceApdater() {
      return this.distance * (this.isMile ? 1.609344 : 1);
    },
  },
  methods: {
    formatTime(timeSpand) {
      const qqq = this.$dayjs.duration(timeSpand, "seconds")
      this.timeP.hours = qqq.hours();
      this.timeP.minutes = qqq.minutes();
      this.timeP.seconds = qqq.seconds();
      this.timeP.milliseconds = qqq.milliseconds();
      // console.log(qqq)
      
    },
    deleteHandler() {
      this.$emit("deleteCard", this.index)
    },
    moveHandler(direction) {
      console.log("direction", direction)
      this.$emit("moveCard", this.index, direction)
    }
    /**
    
        timeSpandChangeHandler(_, __) {
          return
          const sfsafsfsafa = this.timeP.hours * 60 * 60 + this.timeP.minutes * 60 + this.timeP.seconds
          this.timeSpand = sfsafsfsafa
    
    
    
     *       <el-input-number controls-position="right" v-model="timeP.hours" @change="timeSpandChangeHandler" :min="0"
            :max="59">
          </el-input-number>
          <el-input-number controls-position="right" v-model="timeP.minutes" @change="timeSpandChangeHandler" :min="0"
            :max="59">
          </el-input-number>
          <el-input-number controls-position="right" v-model="timeP.seconds" @change="timeSpandChangeHandler" :min="0"
            :max="59">
          </el-input-number>
    
              // reflashPace(newSpeed) {
        //   this.$emit("changSpeed", newSpeed)
        // },
              set(newTimeSpand) {
        const newSpeed = this.distanceApdater / newTimeSpand;
        this.reflashPace(newSpeed)
      }
    },
    
        }
     */
  }
}
</script>