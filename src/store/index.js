import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    highestScore: 0,
    currentScore: 0
  }),
  actions: {
    updateHighestScore(newHighestScore) {
      this.highestScore = newHighestScore
    },
    increaseCurrentScore(value) {
      this.currentScore += value
    },
    decreaseCurrentScore(value) {
      this.currentScore -= value
    },
    resetCurrentScore() {
      this.currentScore = 0
    }
  }
})