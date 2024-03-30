import { LightningElement, track } from 'lwc'
import retrievePokemon from '@salesforce/apex/CtrlPokemon.retrievePokemon'
import LightningAlert from 'lightning/alert'

export default class Pokemon extends LightningElement {
  pokemonName
  @track currentPokemon = {}
  spinner = false
  hasData = true
  errorMessage = 'No such pokemon in the database!'

  async connectedCallback () {
    await this.initializeApp()
  }

  get disableSearch () { return !this.pokemonName }

  async searchPokemon (event) {
    console.log('search: ' + this.pokemonName)
    await this.fetchData()
  }

  async initializeApp () {
    this.pokemonName = 'charizard'
    await this.fetchData()
  }

  handleChange (event) {
    this.pokemonName = event.detail.value
  }

  async fetchData () {
    this.spinner = true
    try {
      const resp = await retrievePokemon({ pokemonName: this.pokemonName })
      console.log(resp)
      if (resp.statusCode === 404) {
        this.hasData = false
        await LightningAlert.open({
          message: this.errorMessage,
          theme: 'warning',
          label: 'Warning'})
      } else {
        this.hasData = true
        this.currentPokemon = {
          Name: resp.species.name.toUpperCase(),
          imgUrl: resp.sprites.front_default,
          abilities: resp.abilities.map(el => el.ability),
          stats: resp.stats.map(item => ({ name: item.stat.name, value: item.base_stat}))
        } 
      }
      console.log(JSON.stringify(this.currentPokemon))
    } catch (err) {
      console.error(err)
    } finally {
      this.spinner = false
    }
  }
}