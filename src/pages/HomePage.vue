<template>
  <div>
    <PlayerProfile />
    <MessageBox />
    <div :key="index" v-for="index in 5">
      <TargetClick />
    </div>
  </div>
</template>

<script>
import TargetClick from '@/components/TargetClick.vue'
import PlayerProfile from '@/components/PlayerProfile.vue'
import MessageBox from '@/components/MessageBox.vue'

export default {
  name: 'HomePage',
  components: {
    TargetClick,
    PlayerProfile,
    MessageBox
  }
}
</script>

<style>
</style>
