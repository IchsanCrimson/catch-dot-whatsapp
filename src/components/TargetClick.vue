<template>
  <div @mouseover="targetReached" class="target" :style="positionStyle"/>
</template>

<script>
import {mapActions} from "pinia/dist/pinia";
import {useProfileStore} from "@/store";

export default {
  name: 'TargetClick',
  data () {
    return {
      y: 0,
      x: 0,
      marginXY: 10,
      score: 2
    }
  },
  computed: {
    positionStyle () {
      return {
        top: this.y + 'px',
        left: this.x + 'px'
      }
    }
  },
  methods: {
    ...mapActions(useProfileStore, ['increaseCurrentScore']),
    randomizePosition() {
      this.y = Math.floor(Math.random() * (window.innerHeight - 2*this.marginXY)) + this.marginXY
      this.x = Math.floor(Math.random() * (window.innerWidth - 2*this.marginXY)) + this.marginXY
    },
    targetReached() {
      this.increaseCurrentScore(this.score)
      this.randomizePosition()
    }
  },
  created() {
    this.randomizePosition()
  },
}
</script>

<style>
.target {
  position: absolute;
  border-radius: 10px;
  background-color: red;
  width: 20px;
  height: 20px;
  /*cursor: url(https://sweezy-cursors.com/wp-content/uploads/cursor/rec-room-bucket-hand-animated/rec-room-bucket-hand-animated-custom-cursor.gif);*/
}
</style>
