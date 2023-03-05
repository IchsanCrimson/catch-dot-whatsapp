<template>
    <div class="container">
        <div class="header">Your message will be sent to the developer's personal WhatsApp Account!</div>
        <input class="input" id="input" @input="validateInput" placeholder="Input message here...">
        <div class="button-container">
            <div class="feedback"> 
                <div class="info">Message length: {{ text.length }}</div>
                <div :style="getFeedbackColor">{{ feedback }}</div>
            </div>
            <button class="button" @click="send">Send</button>
        </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'pinia';
  import { useProfileStore } from "@/store/index";
  import axios from 'axios'
  
  export default {
    name: 'MessageBox',
    data () {
        return {
            text: '',
            feedback: '',
            feedbackColor: 'red'
        }
    },
    methods: {
        ...mapActions(useProfileStore, ['decreaseCurrentScore']),
        send() {
            const data = { 'message': this.text }
            // for backend implementation please check: https://glitch.com/edit/#!/bush-basalt-age
            axios.post("https://bush-basalt-age.glitch.me/send", data)
                .then(response => this.successSend(response))
                .catch(response => this.failSend(response));
        },
        successSend(response) {
            console.log('success: ', response)
            this.updateFeedback('Message sent!', 'green')
            this.resetText()
        },
        failSend(response) {
            console.log('fail: ', response)
            this.updateFeedback('Failed to send message :(', 'red')
        },
        resetText() {
            this.decreaseCurrentScore(this.text.length)
            this.text = ''
            document.getElementById('input').value = this.text;
        },
        validateInput(event) {
            const value = event.target.value
            if(value.length - this.text.length <= this.currentScore) {
                this.text = value
                this.updateFeedback('', 'red')  
            } else {
                document.getElementById('input').value = this.text;
                this.updateFeedback('*Catch the red dot to get additional number of letters', 'red')
            }
        },
        updateFeedback(value, color) {
            this.feedbackColor = color
            this.feedback = value
        }
    },
    computed: {
        ...mapState(useProfileStore, ['currentScore']),
        getFeedbackColor() {
            return {
                color: this.feedbackColor
            }
        }
    },
    watch: {
        text(newText, oldText) {
            this.decreaseCurrentScore(newText.length - oldText.length)
        }
    }
  }
  </script>
  
  <style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80vh;
        flex-direction: column;
    }

    .header {
        color: white;
        font-size: large;
        margin-bottom: 20px;
    }
    
    .input {
        color: white;
        border-color: white;
        border-width: 5px;
        border-radius: 5px;
        width: 50%;
        height: 30px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-color: white;
        width: 50%;
        margin: 15px 0;
        height: 5%;
    }

    .feedback {
        font-size: medium;
    }

    .info {
        color: white;
    }

    .button {
        color: white;
        background-color: limegreen;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: x-large;
    }
    
    .button:active {
        background-color: grey;
    }
  </style>
  