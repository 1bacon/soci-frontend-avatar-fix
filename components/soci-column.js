import SociComponent from './soci-component.js'

export default class SociColumn extends SociComponent {
  constructor() {
    super()
  }

  css(){
    return `
      ${this.getColorSchemes()}
      :host {
        scroll-snap-align: start;
        position: relative;
        display: block;
        height: 100%;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        /* heh */
        min-width: 420px; 
      }
      
      separator {
        height: 100%;
        right: 0; 
        width: 2px;
        position: absolute;
        display: block;
        color: #f00;
      }

      scroll-container {
        overflow: auto;
        width: 100%;
        height: 100%;
        display: block;
        scrollbar-width: none;
      }

      scroll-container::-webkit-scrollbar {
        display: none;
      }

      content {
        display: block;
      }

      sub-header {
        display: block;
        position: sticky;
        top: 48px;
        width: 100%;
        color: #fff;
        z-index: 2;
        box-sizing: border-box;
        background-color: inherit;
      }

      sticky-header {
        color: #fff;
        background-color: inherit;
        position: sticky;
        top: 0;
        height: 48px;
        width: 100%;
        z-index: 2;
        display: block;
        padding: 0 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      sticky-header soci-icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
        border-radius: 8px;
      }

      sticky-header soci-icon:hover {
        background: rgba(255,255,255,0.2);
      }

      sticky-header button {
        height: 24px;
        border-radius: 3px;
        background: transparent;
        outline: none;
        border: none;
        margin: 1px;
        box-shadow: 0 0 0 1px #fff;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        opacity: 0.5;
      }

      sticky-header button:hover {
        background: rgba(255,255,255,0.2);
        opacity: 1;
      }

      sticky-header button:active {
        background: rgba(255,255,255,1);
        color: var(--n3);
      }

      filter-container {
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        border-top: 1px solid rgba(255,255,255,0.1);
      }

      filters,
      sorts {
        display: flex;
      }

      filter,
      sort {
        opacity: 0.5;
        text-transform: capitalize;
        position: relative;
        padding: 6px 12px;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }

      filter:hover,
      sort:hover {
        opacity: 0.7;
      }

      filter[selected],
      sort[selected] {
        opacity: 1;
      }

      filter[selected]::after,
      sort[selected]::after {
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

      #tag-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0.7px;
      }

      soci-post-list {
        min-height: calc(100% - 137px);
      }
    `
  }

  html(){
    return `
      <scroll-container>
        <content>
          <sticky-header>
            <div id="tag-title"></div>
            <button>subscribe &middot; 112</button>
          </sticky-header>
          <sub-header>
            <filter-container>
              <soci-select>
                <soci-option slot="selected">Popular</soci-option>
                <soci-option value="new">New</soci-option>
                <soci-option value="day">Top - Day</soci-option>
                <soci-option value="week">Top - Week</soci-option>
                <soci-option value="month">Top - Month</soci-option>
                <soci-option value="year">Top - Year</soci-option>
                <soci-option value="all">Top - All Time</soci-option>
              </soci-select>
              <filters @click=filterClick>
                <filter selected>all</filter>
                <filter>images</filter>
                <filter>videos</filter>
                <filter>audio</filter>
                <filter>blogs</filter>
              </filters>
            </filter-container>
          </sub-header>
          <soci-post-list data='/posts'></soci-post-list>
        </content>
      </scroll-container>
      <separator></separator>
    `
  }

  connectedCallback() {
    this.select('soci-select').addEventListener('selected', this._sortChanged.bind(this))
  }

  static get observedAttributes() {
    return ['tag', 'color', 'filter', 'sort']
  }

  attributeChangedCallback(name, oldValue, newValue){
    switch(name){
      case 'sort':
        this.sortPosts(newValue)
        break
      case 'filter':
        this.filterPosts(newValue)
        break
      case 'tag':
        this.select('#tag-title').innerHTML = '#' + newValue
        break
      case 'subscribers':
        let subs = newValue || 0
        this.select('subscribers').innerHTML = subs + ' subscribers'
        break
    }
  }

  get tag(){
    return this.getAttribute('tag')
  }
  set tag(val){
    return this.setAttribute('tag', val)
  }

  get color(){
    return this.getAttribute('color')
  }
  set color(val){
    return this.setAttribute('color', val)
  }

  get filter(){
    return this.getAttribute('filter')
  }
  set filter(val){
    return this.setAttribute('filter', val)
  }

  sortPosts(sort){
    let params = []
    sort = sort || 'popular'

    switch(sort){
      case 'new':
        params.push('sort=new')
        break
      case 'day':
        params.push('sort=top', 'time=day')
        break
      case 'week':
        params.push('sort=top', 'time=week')
        break
      case 'month':
        params.push('sort=top', 'time=month')
        break
      case 'year':
        params.push('sort=top', 'time=year')
        break
    }

    if(this.tag) params.push(`tag=${this.tag}`)
    let paramString = params.length > 0 ? `?${params.join('&')}` : ''

    this.select('soci-post-list').setAttribute('data', '/posts' + paramString)
  }

  filterPosts(filter){
    filter = filter || 'all'
    Array.from(this.select('filters').children).forEach(child => {
      if(child.innerHTML == filter) child.setAttribute('selected', '')
      else child.removeAttribute('selected')
    })

    this.select('soci-post-list').setAttribute('filter', filter)
  }

  filterClick(e){
    this.setAttribute('filter', e.target.innerHTML)
  }

  getColorSchemes(){
    let schemes = ''
    let colors = {
      'red': 'r1',
      'teal': 't2',
      'orange': 'o1',
      'purple': 'p2'
    }

    for(let color in colors){
      schemes += `:host([color="${color}"]) content{
        background: var(--${colors[color]})
      }`
    }
    return schemes
  }

  _sortChanged(){
    let sort = this.select('soci-select').value
    this.sortPosts(sort)
  }
}