import SociComponent from './soci-component.js'

export default class SociTab extends SociComponent {
  constructor() {
    super()
  }

  css(){
    return `
      :host {
        display: none;
        padding-top: 16px;
      }
      :host([activating]),
      :host([active]) {
        display: block;
      }
    `
  }

  connectedCallback(){
    this.removeAttribute('active')
    this.dataset.tabData = this.dataset.tabData || this.innerHTML 
    this.innerHTML = ''

    this.activate = this.activate.bind(this)

    if(this.hasAttribute('default')) this.activate()
  }

  activate(){
    if(this.hasAttribute('active')) return 0
    this.innerHTML = this.dataset.tabData
    this.dataset.tabData = ''
    this.setAttribute('activating', '')
    setTimeout(()=>{
      this.removeAttribute('activating')
      this.setAttribute('active', '')
      this.fire('tabactivate')
    }, 1)
  }

  deactivate(){
    if(this.hasAttribute('active')){
      this.removeAttribute('active')
      this.dataset.tabData = this.dataset.tabData || this.innerHTML 
      this.innerHTML = ''
      this.fire('tabdeactivate')
    }
  }

  get active() {
    return this.hasAttribute('active')
  }
}