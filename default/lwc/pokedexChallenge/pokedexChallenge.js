import { LightningElement, track } from 'lwc'
import retrievePokemon from '@salesforce/apex/CtrlPokemon.retrievePokemon'
import LightningAlert from 'lightning/alert'

export default class Pokemon extends LightningElement {
  /* make sure all the methods and the variables used in the .html file are in the export default */
  // variable declaration
  @track currentPokemon = {}
  hasData = false
  errorMessage = 'No such pokemon in the database!'

  // connected callback is used to initialize some code as soon as the component loads
  async connectedCallback () {
    await this.initializeApp()
  }

  get disableSearch () { return !this.pokemonName }

  async initializeApp () {
    /* TODO:  
        * initialize pockemon name to 'charizard'
        * call fetch data!! */
  }

  handleChange (event) {
    /*  TODO: 
        * store in the pockemon name variable the user's input
        * you can access the input by using event.detail.value 
        * help link: https://developer.salesforce.com/docs/component-library/bundle/lightning-input/example
    */
  }

  async fetchData () {
    try {
      /* TODO: add spinner's loading */
      /* TODO:  
          * call retrievePokemon apex method using async...await and assign the method to a variable named resp
          * help link: https://www.sfdcblogs.com/post/async-and-await-in-lightning-web-components
      */
      
      /* TODO: console log the response to see what data you get*/
      if (resp.statusCode === 404) {
        // in this case we didn't find the pokemon in the database so no results div should be displayed
        this.hasData = false
        // we want to notify the user
        /* TODO:   
              * Use lightning alert to notify the users, message will be the errorMessage,
                the theme should be warning. Give your prefered title. 
             * help link: https://developer.salesforce.com/docs/component-library/bundle/lightning-alert/documentation */
      } else {
        // in this case we have data to show
        /** TODO: From the response data we want to take the following data:
            *  the species name
            *  the image (front_default) that is stored in the sprites object
            *  from the abilities attribute we want an array with only the ability (hint: use Array.prototype.map to take it)
            * from the stats attribute we want an array with only the stat name and the stat value that is stored to the base_stat attribute.
        */
        this.currentPokemon = {
          // Name: species name to uppercase,
          imgUrl: resp.sprites.front_default,
          // abilities: array of the abilities,
          stats: resp.stats.map(item => ({ name: item.stat.name, value: item.base_stat}))
        } 
      }
      // console log this.currentPokemon after wrappping it with 
      // JSON.parse(JSON.stringify(your_object))
    } catch (err) {
      console.error(err)
    } finally {
      this.spinner = false
    }
  }
}