/**
 * @title Astronaut App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview 
 * * Application that calls an API and gets the current number of people in space, 
 *   their names and their spacecrafts.
 * * this script uses [async...await] to fetch the data
 * @version  Solution_v1 
 * @link http://open-notify.org/Open-Notify-API/People-In-Space/
 */

'use strict';

const btnCalc = document.getElementById('calculate');
const spinner = document.querySelector('.loader');
const btnLabel = document.querySelector('.btn__label');
const outcomeEL = document.querySelector('.outcome');
const peopleNumberEL = document.querySelector('.outcome__people');
const peopleInfoEL = document.querySelector('.outcome__people__info');
const linkEL = document.querySelector('.showLess');

let jsonObj = {}
let numberOfPeople
let peopleArray

const init = function () {
  spinner.style.display = 'none'
  outcomeEL.classList.add('hidden');
}

init()

btnCalc.addEventListener('click', async function () {
  btnLabel.classList.add('hidden');
  spinner.style.display = 'flex'
  await fetchData()
  spinner.style.display = 'none'
  btnLabel.classList.remove('hidden');
  outcomeEL.classList.remove('hidden');
})

linkEL.addEventListener('click', function () {
  outcomeEL.classList.add('hidden')
})

async function fetchData() {
  const apiUrl = 'http://api.open-notify.org/astros.json'
  try {
    const resp = await fetch(apiUrl)
    const data = await resp.json()
    console.log('🌟data: ', data)
    peopleArray = [...data.people]
    numberOfPeople = data.number
  
    peopleNumberEL.innerHTML = numberOfPeople
    
    let moreInfoOutput = ''
    peopleArray.forEach(item => {
      const temp = `<p>&nbsp🧑${item.name}, 🚀${item.craft}</p>`
      moreInfoOutput += temp
    })
  
    peopleInfoEL.innerHTML = moreInfoOutput
  } catch (err) {
    console.error(err)
  }
}
