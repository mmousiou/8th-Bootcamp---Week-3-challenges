/**
 * @title Dice Game App - Challenge
 * @description Steps 25, duration: ~ 1h)
 * @tutorial the comments including TODO must be done by you the normal comments are there to help you understand the use of the elements, variables and methods in the js file
 * @author yourName 👽
 * @version  v1
 */
import { LightningElement } from 'lwc'

const DICE_ARRAY = [0,1,5,6,3,4,2]

export default class DiceGame extends LightningElement {

  /* 🆘 
     * to call in the js file a method or a variable of DiceGame class the this keyworkd
        must be used. 
     * instead of using the document.querySelector method in LWC framework we use 
        this.template.querySelector method
  */

  scoreP1 = 13 //variable to store 1st player's score
  scoreP2 = 24 //variable to store 2nd player's score
  currentP1 = 0 //variable to store first player's current score
  currentP2 = 0 //variable to store second player's current score
  activePlayer = 'P1' //variable to store active player
  currentScore = 0 //vaiable to store current dice number
  playing = true

  handleNewBtnClicked (e) {
    // call the init method when the new game btn is clicked
    this.init()
  }

  init () {
    // this function will initialize the game variables and classes of the elements
    this.playing = true
    this.currentScore = 0
    this.activePlayer = 'P1'
    /* TODO #4. Initialize the variables scoreP1, scoreP2, currentP1, currentP2 to  0. */

    const player1El = this.template.querySelector('.playerP1')
    const player2El = this.template.querySelector('.playerP2')

    // select the game element and remove the hidden class (we add the hidden class when the game is over)
    const gameEl = this.template.querySelector('.game')
    gameEl.classList.remove('hidden')

    /* TODO #5. Remove the player--winner class from player1 and plaeyer2 elements */

    // hide the win icons added on player divs my adding the hidden class to nameP1-winner and name---p2 elements
    this.template.querySelector('.nameP1--winner').classList.add('hidden');
    this.template.querySelector('.nameP2--winner').classList.add('hidden');

    // the player active class is initialy assigned to player1 so we must add it to player 1 element and remove it from player 2 element
    player1El.classList.add('player--active')
    player2El.classList.remove('player--active')
  }

  sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async handleRollBtnClicked (e) {
    if (this.playing) {
      // choose a random dice side (it doesn't correspond to the number shown on the dice that's why we use the transformation on DICE_ARRAY)
      const diceSide = Math.floor((Math.random() * 6) + 1)
      console.loe('Dice side: ' , diceSide)
      // make the 3D dice roll!!!
      const diceEl = this.template.querySelector('[data-id="dice1"]')
      for (var i = 1; i <= 6; i++) {
        diceEl.classList.remove('show-' + i)
        if (diceSide === i) {
          diceEl.classList.add('show-' + i)
        }
      }

      await this.sleep(1100) // we want to have a small delay in assigning the numbers due to the rolling of the dice
      const diceNum = DICE_ARRAY[diceSide]

      /* TODO #6. Complete the basic algorith of the user roll dice 
          a. if diceNum is not equal to 1 
              i. add to the current score (currentScore variable) the diceNum.
             ii. assign the currentScore variable to the current score of the active player
                Help: if this activePlayer is P1 assign the current score to currentP1 variable.
                      if this activePlayer is P2 asign the current score to currentP2 variable.
                      (Hint: currentP1 = current + P1 and activePlayer is either P1 or P2 strings 💣)
          b. if diceNum is equal to 1 according yo the flow chart we must switch the player so
              the switchPlayer function must be called.
      */
    }
  }

  handleHoldBtnClicked (e) {
    if (this.playing) {
      /* TODO #7. Complete the user holds score algorithm:
          a. Add the current score to the score of the active player.
              Hint: For example if the active player is P1 we want to add the currentScore to the scoreP1 variable
          b. If the score of the active player is greater or equal than 100
              i. set the playing variable to false
             ii. select the game element and add hidden class
            iii. select the active player element and add the 'player--winner' class and remove the  'player--active' class.
             iv. select the name+ActivePlayer--winner element and remove the hidden class
          c. if the score of the active player is lower than 100 the switchPlayer function must be called.
      */
    }
  }

  switchPlayer () {
    /* TODO #8. Complete the switch player logic:
          a. set the current+Active player score to 0
          b. set the currentScore to zero
          c. we must switch the activePlayer!!
            i. if the current activePlayer is 'P1' the activePlayer must be set to 'P2'
           ii. if the current activePlayer is 'P2' the activePlayer must be set to 'P1'
    */

    // toggle classes
    const player1El = this.template.querySelector('.playerP1')
    const player2El = this.template.querySelector('.playerP2')
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
  }
}