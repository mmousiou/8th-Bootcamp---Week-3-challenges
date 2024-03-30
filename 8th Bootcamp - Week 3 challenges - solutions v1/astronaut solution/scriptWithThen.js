/** 
 * @title Astronaut App - Solution
 * @author mmousiou@gmail.com (Maria Mousiou)
 * @fileoverview 
 * * Application that calls an API and gets the current number of people in space, 
 *   their names and their spacecrafts.
 * * this script uses [promise...then] to fetch the data
 * @version Solution_v2
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

let numberOfPeople
let peopleArray

const init = function () {
  spinner.style.display = 'none'
  outcomeEL.classList.add('hidden');
}

init()

btnCalc.addEventListener('click', function () {

  btnLabel.classList.add('hidden');
  spinner.style.display = 'flex'
  fetchData()
})

linkEL.addEventListener('click', function () {
  outcomeEL.classList.add('hidden')
})

const fetchData = function () {
  const apiUrl = 'http://api.open-notify.org/astros.json'
  fetch(apiUrl)
  .then(resp => resp.json())
  .then(data =>  {
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
  })
  .catch(err => console.error(err))
  .finally(() => {
    spinner.style.display = 'none'
    btnLabel.classList.remove('hidden');
    outcomeEL.classList.remove('hidden');
  })
}
