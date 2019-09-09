import {SociComponent, html, render} from './soci-component.js'

export default class SociColumn extends SociComponent {
  constructor() {
    super()
  }

  css(){
    return `
      :host {
        padding-top: 88px;
        position: relative;
        display: block;
        height: 100%;
        width: 100%;
        max-width: 1200px;
      }
      :host header {
        height: 88px;
        width: 100%;
        color: #fff;
        position: absolute;
        top: 0;
        z-index: 1;
        box-sizing: border-box;
      }
      :host filters {
        display: flex;
        flex-direction: flex-end;
        padding: 0 12px;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
      :host filter {
        opacity: 0.5;
        text-transform: capitalize;
        position: relative;
        padding: 6px 12px;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }
      :host filter:first-child {
        margin-right: auto;
      }
      :host filter:hover {
        opacity: 0.7;
      }
      :host filter[selected] {
        opacity: 1;
      }
      :host filter[selected]::after {
        content:'';
        display: block;
        position: absolute;
        top: -2px;
        left: calc(50% - 8px);
        width: 16px;
        height: 4px;
        border-radius: 2px;
        background: #fff;
      }

      :host #tag-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 56px;
        margin-left: 10px;
      }

      :host soci-post-list {
        height: 100%;
      }
    `
  }

  static get observedAttributes() {
    return ['tag', 'color', 'filter']
  }

  attributeChangedCallback(name, oldValue, newValue){
    switch(name){
      case "filter":
        this.filterPosts(newValue)
        break
      case "tag":
        this.select('#tag-title').innerHTML = '#' + newValue
        break
    }
  }

  filterPosts(filter){
    //
    // Visuals
    //

    filter = filter || "all"
    Array.from(this.select("filters").children).forEach(child => {
      if(child.innerHTML == filter) child.setAttribute('selected', '')
      else child.removeAttribute('selected')
    })
  }

  filterClick(e){
    this.setAttribute('filter', e.currentTarget.innerHTML)
  }

  getColorSchemes(){
    let schemes = ''
    let colors = {
      "red": ['r2', 'r3', 'light'],
      "light-red": ['r1', 'r2', 'light'],
      "orange": ['o2', 'o3', 'light'],
      "light-orange": ['o0', 'o1', 'dark'],
    }

    for(let color in colors){
      schemes += `:host([color="${color}"]) header {
        background: linear-gradient(180deg, var(--${colors[color][0]}) 0%, var(--${colors[color][1]}) 40%);
        color: ${colors[color][2] == 'light' ? 'rgba(255,255,255, 0.95)' : 'rgba(0,0,0,0.95)'};
      }`
    }
    return schemes
  }

  render(){
    let data = 'data-example.json'
    this.filterClick = this.filterClick.bind(this)
    return html`
      ${this.getCss()}
      <style>
        ${this.getColorSchemes()}
      </style>
      <header>
        <div id="tag-title"></div>
        <filters>
          <filter selected @click=${this.filterClick}>all</filter>
          <filter @click=${this.filterClick}>images</filter>
          <filter @click=${this.filterClick}>videos</filter>
          <filter @click=${this.filterClick}>audio</filter>
          <filter @click=${this.filterClick}>blogs</filter>
        </filters>
      </header>
      <soci-post-list data=${data}></soci-post-list>
    `
  }
}
