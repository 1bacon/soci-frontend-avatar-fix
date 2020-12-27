import SociComponent from './soci-component.js'
import config from '../config.js'

export default class SociPost extends SociComponent {
  constructor() {
    super()
  }

  css(){
    let CONTENT_HEIGHT = 300
    return `
       :host {
        background: var(--n0);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        z-index: 10;
        transition: opacity 0.1s var(--soci-ease);
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        min-width: 420px;
        opacity: 0;
      }

      :host([loaded]) {
        opacity: 1;
      }

      #media img {
        width: 100%;
        max-height: calc(100vh - ${CONTENT_HEIGHT}px);
        object-fit: contain;
        position: relative;
        z-index: 10;
        margin-bottom: -200%;
      }

      #media img#bg {
        position: inherit;
        z-index: 9;
        left: 0;
        object-fit: cover;
        transform: scale(1.1);
        filter: blur(20px) brightness(0.8) saturate(0.8);
        margin-bottom: 0;
      }

      #media {
        display: block;
        opacity: 0;
      }

      :host([loaded]) #media {
        opacity: 1;
        transition: opacity 0.3s var(--soci-ease);
      }

      content {
        box-shadow: 0 -2px 0 0 rgba(0,0,0,0.08);
        display: block;
        position: relative;
        background: #fff;
        z-index: 10;
      }

      #details-container {
        width: 100%;
        min-width: 500px;
        max-width: 840px;
        margin: 0 auto;
      }

      #details {
        margin: 0 auto;
        box-sizing: border-box;
        padding: 12px 18px 24px;
        position: sticky;
        top: 0;
      }

      title-container {
        display: block;
        padding-left: 60px;
        margin-bottom: 12px;
        transform: translateY(20px);
      }

      h1 {
        font-size: 24px;
        line-height: 28px;
        margin-top: -4px;
        font-weight: 400;
        margin-bottom: 0;
        min-height: 28px;
      }

      meta-data {
        display: block;
        margin-top: 4px;
        color: var(--n3);
      }

      soci-user[username-only] {
        --font-size: 16px;
        --font-weight: 700;
        color: var(--n4);
      }

       soci-comment-list {
        display: block;
        border-left: 2px solid rgba(0,0,0,0.08);
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }

       soci-user[avatar-only] {
        --avatar-size: 48px;
        position: absolute;
        left: 0px;
        top: 2px;
      }

       slot[name="description"] {
        margin-top: 12px;
        line-height: 1.5;
        display: block;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 4px;
        opacity: 0;
        transform: translateY(20px);
      }

      :host([type="blog"]) slot[name="description"] {
        transform: translateY(25px);
      }

      soci-comment soci-comment {
        --border-color: var(--r1);
      }

      soci-comment soci-comment soci-comment {
        --border-color: var(--o1);
      }

      soci-comment soci-comment soci-comment soci-comment {
        --border-color: var(--y1);
      }

      soci-comment soci-comment soci-comment soci-comment soci-comment {
        --border-color: var(--l1);
      }

      :host([type="blog"]) slot[name="description"] {
        padding: 32px 0 64px;
        border: 0;
      }

      :host([type="blog"]) #media {
        display: none;
      }

      :host([type="blog"]) content {
        padding-top: 60px;
      }

      :host([type="blog"]) title-container {
        padding-left: 0;
        margin-bottom: 8px;
        opacity: 0;
      }

      :host([type="blog"]) title-container h1 {
        font-size: 32px;
        line-height: 40px;
        margin-bottom: 8px;
      }

      :host([type="blog"]) soci-user[avatar-only] {
        float: left;
        position: static;
        transform: translateY(2px);
      }

      :host([type="blog"]) meta-data {
        padding-left: 60px;
        margin-top: 8px;
      }

      :host([type="blog"]) slot[name="tags"] {
        padding-left: 60px;
        display: block;
      }

      slot[name="tags"] {
        opacity: 0;
        transform: translateY(20px);
        display: block;
      }

      :host([loaded]) title-container,
      :host([loaded]) slot[name="tags"] {
        opacity: 1;
        transition: transform 0.3s cubic-bezier(.15,0,0,1), opacity 0.3s var(--soci-ease);
        transform: translateY(0);
      }

      :host([loaded]) slot[name="description"] {
        transition: transform 0.3s cubic-bezier(.15,0,0,1), opacity 0.3s var(--soci-ease);
        opacity: 1;
        transform: translateY(0);
      }

      :host([type="blog"][loaded]) slot[name="description"] {
        transition: all 0.35s cubic-bezier(.15,0,.20,1), opacity 0.35s var(--soci-ease);
      }

      slot[name="comments"] {
        display: block;
        opacity: 0;
        transform: translateY(30px);
      }

      :host([loaded]) slot[name="comments"] {
        opacity: 1;
        transform: translateY(0px);
        transition: all 0.4s cubic-bezier(.15,0,.35,1), opacity 0.4s var(--soci-ease);
      }
    `
  }

  html(){ return `
    <div id="media">
      <picture>
        <source>
        <source>
        <img @load=_pictureLoaded />
      </picture>
      <picture>
        <source>
        <source>
        <img id="bg" />
      </picture>
    </div>
    <content>
      <div id="details-container">
        <div id="details">
          <title-container>
            <h1></h1>
            <soci-user name="pwnies" avatar-only></soci-user>
            <meta-data>
              by <soci-user username-only></soci-user> &nbsp;|&nbsp; <time></time>
            </meta-data>
          </title-container>
          <slot name="tags"></slot>
          <slot name="description"></slot>
        </div>
      </div>
      <slot name="comments"></slot>
    </content>
  `}

  static get observedAttributes() {
    return ['title', 'score', 'time', 'user', 'thumbnail', 'type', 'comments', 'url']
  }

  connectedCallback(){
    this.select('#media').addEventListener('click', this._click)
  }

  attributeChangedCallback(name, oldValue, newValue){
    switch(name) {
      case 'title':
        this.select('h1').innerHTML = newValue
        break
      case 'type':
        this.loadContent(newValue)
        break
      case 'time':
        let date = new Date(parseInt(newValue))
        this.select('time').innerHTML = date.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
        break
      case 'user':
        this.selectAll('soci-user').forEach(user => user.setAttribute('name', newValue))
        break
      case 'score':
        this.querySelector('soci-tag-group').setAttribute('score', newValue)
        break
      case 'comments':
        this.select('#comments').innerHTML = newValue + (newValue == 1 ? ' comment' : ' comments')
        break
      case 'url':
        this.querySelector('soci-comment-list').setAttribute('url', newValue)
        this.loadPost(newValue)
        break
    }
  }

  loadPost(url) {
    this.toggleAttribute('loaded', false)
    this.getData('/posts/' + url).then(post => {
      for(let key in post) {
        switch(key){
          case 'content':
            this.renderDescription(post[key])
            break
          case 'tags':
            this.setAttribute(key, post[key].map(tag=>tag.tag).join(','))
            this.createTags(post[key])
            break
          case 'url':
            break
          default:
            this.setAttribute(key, post[key])
            break
        }
      }
      setTimeout(()=>{
      this.toggleAttribute('loaded', true)
      }, 100)
    })

    this.loadContent('image')
  }

  loadContent(type) {
    this.querySelector('soci-tag-group')?.setAttribute('format', type)
    switch(type){
      case 'image':
        this.select('img').src = `${config.THUMBNAIL_HOST}/${this.url}.webp`
        this.select('img#bg').src = `${config.THUMBNAIL_HOST}/${this.url}.webp`
        setTimeout(()=>{
          this.select('img').src = `${config.IMAGE_HOST}/${this.url}.webp`
          this.select('source').srcset = `${config.IMAGE_HOST}/${this.url}.webp`
        },1)
        break
    }
  }

  createTags(tags){
    let tagContainer = this.querySelector('soci-tag-group')
    tags.forEach(tag=>{
      let newTag = document.createElement('soci-tag')
      newTag.innerHTML = tag.tag
      newTag.setAttribute('score', tag.score)
      if(soci.votes[this.id]?.includes(tag.tagID)) newTag.toggleAttribute('upvoted')
      tagContainer.appendChild(newTag)
    })
  }

  renderDescription(description){
    let dom = this.querySelector('soci-quill-view[slot="description"]')
    if(!dom){
      dom = document.createElement('soci-quill-view')
      dom.setAttribute('slot', 'description')
      this.appendChild(dom)
    }
    dom.render(description)
  }

  get url(){
    return this.getAttribute('url')
  }

  _pictureLoaded(e) {
    let image = e.currentTarget
    let width = image.naturalWidth
    let height = image.naturalHeight
    let sidebarWidth = document.querySelector('soci-sidebar').offsetWidth
    if(width > window.innerWidth - sidebarWidth){
      //console.log('wide boi')
    }
    else if(height > window.innerHeight){
      //console.log('tall boi')
    }
    else {
      //console.log('mini boi')
    }
  }
}
