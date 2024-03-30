/**
 * @title Dice Game App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview js file for the app
 * @version  Solution_v1
 */
import { LightningElement } from 'lwc'

const DICE_ARRAY = [0,1,5,6,3,4,2]

export default class PigGame extends LightningElement {

  // initialize variables
  scoreP1 = 13
  scoreP2 = 24
  currentP1 = 0
  currentP2 = 0
  currentScore = 0
  activePlayer = 'P1'
  playing = true

  handleNewBtnClicked (e) {
    console.log('Button was clicked')
    this.init()
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async handleRollBtnClicked (e) {
    if (this.playing) {

      const diceEl = this.template.querySelector('[data-id="dice1"]')
      const diceSide = Math.floor((Math.random() * 6) + 1)

      console.log(diceSide)

      for (var i = 1; i <= 6; i++) {
        diceEl.classList.remove('show-' + i)
        if (diceSide === i) {
          diceEl.classList.add('show-' + i)
        }
      }

      await this.sleep(1100)
      const diceNum = DICE_ARRAY[diceSide]
      console.log(diceNum)

      if (diceNum !== 1) {
        // Add dice to current score
        this.currentScore += diceNum
        //save current score to current player
        this[`current${this.activePlayer}`] = this.currentScore
      } else {
        // Switch to next player
        this.switchPlayer()
      }
    }
  }

  handleHoldBtnClicked (e) {
    if (this.playing) {
      const scoreActive = `score${this.activePlayer}`
      // 1. Add current score to active player's score
      this[scoreActive] = this[scoreActive] + this.currentScore
  
      // 2. Check if player's score is >= 30
      if (this[scoreActive] >= 30) {
        // Finish the game
        this.playing = false

        const gameEl = this.template.querySelector('.game')
        gameEl.classList.add('hidden');
  
        this.template.querySelector(`.player${this.activePlayer}`)
          .classList.add('player--winner');
        this.template.querySelector(`.player${this.activePlayer}`)
          .classList.remove('player--active');
        this.template.querySelector(`.name${this.activePlayer}--winner`).classList.remove('hidden');
      } else {
        // Switch to the next player
        this.switchPlayer();
      }
    }
  }

  init () {
    this.playing = true
    this.currentScore = 0
    this.activePlayer = 'P1'

    const player1El = this.template.querySelector('.playerP1')
    const player2El = this.template.querySelector('.playerP2')

    const gameEl = this.template.querySelector('.game')
    gameEl.classList.remove('hidden')

    player1El.classList.remove('player--winner')
    player2El.classList.remove('player--winner')
    this.template.querySelector('.nameP1--winner').classList.add('hidden');
    this.template.querySelector('.nameP2--winner').classList.add('hidden');

    this.scoreP1 = 0
    this.scoreP2 = 0
    this.currentP1 = 0
    this.currentP2 = 0

    this.hideDice = true
    
    player1El.classList.add('player--active')
    player2El.classList.remove('player--active')
  }

  connectedCallback () {
    console.log('Connected is called!!')
  }

  switchPlayer () {
    const currentActive = `current${this.activePlayer}`
    this[currentActive] = 0
    this.currentScore = 0
    this.activePlayer = this.activePlayer === 'P1' ? 'P2' : 'P1'
    const player1El = this.template.querySelector('.playerP1')
    const player2El = this.template.querySelector('.playerP2')
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
  }
}