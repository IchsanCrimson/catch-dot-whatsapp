<template>
  <div class="score">
    Remaining number of letters: {{currentScore}}
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useProfileStore } from "@/store/index";

export default {
  name: 'PlayerProfile',
  components: {
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(useProfileStore, ['currentScore']),
  }
}
</script>

<style>
.score {
  color: white;
}
</style>
