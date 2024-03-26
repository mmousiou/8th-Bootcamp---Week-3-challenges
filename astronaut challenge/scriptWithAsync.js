/**
 * @title 💫How Many people are in space? 
 * @description Parts: 3, Steps 25, duration: ~ 1h)
 * @author yourName 👽 
 * @fileoverview 
 * * Application that calls an API and gets the current number of people in space, 
 *   their names and their spacecrafts.
 * * this script uses [async...await] to fetch the data
 * @version  v1 
 * @link http://open-notify.org/Open-Notify-API/People-In-Space/
 */

'use strict';

// #1-#4 are in index.html
// #5 is in the style.css

/* TODO #6. Add a variable to store the button element added on the html, 
       you can use getElementById method of the document element to access the button */
const outcomeEL = document.querySelector('.outcome');
const peopleNumberEL = document.querySelector('.outcome__people');
const peopleInfoEL = document.querySelector('.outcome__people__info');

let numberOfPeople
let peopleArray

const init = function () {
  // add hidden class to the 'outcome' element stored in outcomeEl variable
  outcomeEL.classList.add('hidden');
}

/* TODO #7. Call init function */

/* TODO #8. use addEventListener method (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
        and a callback function in the button element created in step 6. 
        a. The callback function must me asynchronous (async keyword must be used)
        b. the callback function will call and await the fetchData function 
            (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
        c. The callback function must remove the hidden class added to the outcome element in the init function
*/

async function fetchData() {
  const apiUrl = 'http://api.open-notify.org/astros.json'
  try {
    /* TODO #9.  a. Use the fetch API as shown in the documentation https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
                to fetch the data from apiUrl
            b. store the respose in a variable called response (as shown in the step 9.a link)
            c. store the response json in a variable called data (as shown in the step 9.a link)
            d. console.log the data variable and see the results of the API call
            Hint: the data object should be like this: data = { people: [array], number: num, message: 'success' }
    */
  
    /* TODO #10. Store in the numberOfPeople variable the data attribute that has the number of people  */
    // store in the peopleArray variable a shallow copy of the people attribute of the data object
    peopleArray = [ ...data.people ]
    // print the number of people in the '.outcome__people' element
    peopleNumberEL.innerHTML = numberOfPeople
    
    let moreInfoOutput = ''
    /* TODO #11. a. For each item of the peopleArray create a temp line like this: '<p>&nbsp🧑name, 🚀spacecraftName</p>' 
            b. Add the line to moreInfoOutput string
            c. print the moreInfoOutput in the '.outcome__people__info' element
    */
    /* TODO #12. Print the moreInfoOutput in the '.outcome__people__info' element */
  } catch (err) {
    console.error(err)
  }
  // when finished with the step 12 you can see the next part in the instructions.txt
}
