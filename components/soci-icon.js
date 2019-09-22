import {SociComponent, html, render} from './soci-component.js'

const icons = {
  home: '<g fill="none"><path d="M18.9878 10.2948C19.3133 10.5796 19.5 10.9911 19.5 11.4236V18.083C19.5 18.9115 18.8284 19.583 18 19.583H6C5.17157 19.583 4.5 18.9115 4.5 18.083L4.5 11.4236C4.5 10.9911 4.68672 10.5796 5.01224 10.2948L11.0122 5.04478C11.5778 4.54994 12.4222 4.54994 12.9878 5.04478L18.9878 10.2948Z" stroke="currentColor"/><path d="M9.5 15C9.5 14.1716 10.1716 13.5 11 13.5H13C13.8284 13.5 14.5 14.1716 14.5 15V19.5H9.5V15Z" stroke="currentColor"/></g>',
  search: '<g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z" stroke="currentColor"/><path d="M15.0459 15.6484L19.3975 20" stroke="currentColor" stroke-linecap="round"/>',
  tags: '<g fill="none"><path d="M18.6375 12.9527L11.7513 19.8388C11.1655 20.4246 10.2158 20.4246 9.63001 19.8388L3.97315 14.182C3.38737 13.5962 3.38737 12.6464 3.97315 12.0607L10.8593 5.17451C11.1406 4.89321 11.5221 4.73517 11.92 4.73517L17.5768 4.73517C18.4052 4.73517 19.0768 5.40675 19.0768 6.23517V11.892C19.0768 12.2899 18.9188 12.6714 18.6375 12.9527Z" stroke="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1347 7.94765C15.4948 7.86457 15.8174 8.18724 15.7344 8.54728L15.0564 11.4849C14.9681 11.8676 14.4934 12.0038 14.2157 11.7261L11.956 9.46633C11.6783 9.18863 11.8144 8.71388 12.1971 8.62558L15.1347 7.94765Z" stroke="currentColor"/></g>',
  filter: '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9146 7H17.4545C17.7558 7 18 7.24421 18 7.54545C18 7.8467 17.7558 8.09091 17.4545 8.09091H10.8791C10.6498 8.62553 10.1186 9 9.5 9C8.88139 9 8.35025 8.62553 8.12088 8.09091H6.54545C6.24421 8.09091 6 7.8467 6 7.54545C6 7.24421 6.24421 7 6.54545 7H8.08535C8.29127 6.4174 8.84689 6 9.5 6C10.1531 6 10.7087 6.4174 10.9146 7ZM10.9146 17C10.7087 17.5826 10.1531 18 9.5 18C8.84689 18 8.29127 17.5826 8.08535 17H6.54545C6.24421 17 6 16.7558 6 16.4545C6 16.1533 6.24421 15.9091 6.54545 15.9091H8.12088C8.35025 15.3745 8.88139 15 9.5 15C10.1186 15 10.6498 15.3745 10.8791 15.9091H17.4545C17.7558 15.9091 18 16.1533 18 16.4545C18 16.7558 17.7558 17 17.4545 17H10.9146ZM14.5 13.5C15.136 13.5 15.6795 13.1042 15.8977 12.5455H17.4545C17.7558 12.5455 18 12.3013 18 12C18 11.6988 17.7558 11.4546 17.4545 11.4546H15.8977C15.6796 10.8958 15.136 10.5 14.5 10.5C13.864 10.5 13.3204 10.8958 13.1023 11.4546H6.54545C6.24421 11.4546 6 11.6988 6 12C6 12.3013 6.24421 12.5455 6.54545 12.5455H13.1023C13.3205 13.1042 13.864 13.5 14.5 13.5Z" fill="currentColor"/>'
}
export default class SociIcon extends SociComponent {
  constructor() {
    super()
  }

  css(){
    return `
      :host {
        width: 24px;
        height: 24px;
      }

      :host svg {
        width: inherit;
        height: inherit;
      }
    `
  }

  static get observedAttributes() {
    return ['glyph']
  }

  attributeChangedCallback(name, oldValue, newValue){
    let svg = this.select('svg')
    if(name == 'glyph') svg.innerHTML = icons[newValue]
  }

  render(){
    return html`
      ${this.getCss()}
      <svg viewBox="0 0 24 24" fill='currentColor'></svg>
    `
  }
}
