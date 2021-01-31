import SociComponent from './soci-component.js'

const icons = {
  attachment: '<path fill-rule="evenodd" clip-rule="evenodd" d="M7 7.35484C7 5.50201 8.45507 4 10.25 4C12.0449 4 13.5 5.50201 13.5 7.35484V15.3548C13.5 16.495 12.6046 17.4194 11.5 17.4194C10.3954 17.4194 9.5 16.495 9.5 15.3548V7.6129H10.5V15.3548C10.5 15.9249 10.9477 16.3871 11.5 16.3871C12.0523 16.3871 12.5 15.9249 12.5 15.3548V7.35484C12.5 6.07211 11.4926 5.03226 10.25 5.03226C9.00736 5.03226 8 6.07211 8 7.35484V15.3548C8 17.3502 9.567 18.9677 11.5 18.9677C13.433 18.9677 15 17.3502 15 15.3548V9.16129H16V15.3548C16 17.9203 13.9853 20 11.5 20C9.01472 20 7 17.9203 7 15.3548V7.35484Z" fill="currentColor"/>',
  comments: '<g fill="none"><path d="M8.89319 17L9.29319 16.7L9.14319 16.5H8.89319V17ZM10.8 19.5424L10.4 19.8424L10.4 19.8424L10.8 19.5424ZM15.1068 17V16.5H14.8568L14.7068 16.7L15.1068 17ZM13.8568 17L14.2568 17.3L14.8568 16.5H13.8568V17ZM10.1432 17V16.5H9.14319L9.74319 17.3L10.1432 17ZM11.6 18.9424L11.2 19.2424L11.2 19.2424L11.6 18.9424ZM12.4 18.9424L12 18.6424L12 18.6424L12.4 18.9424ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5V3.5C5.51472 3.5 3.5 5.51472 3.5 8H4.5ZM4.5 13V8H3.5V13H4.5ZM8 16.5C6.067 16.5 4.5 14.933 4.5 13H3.5C3.5 15.4853 5.51472 17.5 8 17.5V16.5ZM8.89319 16.5H8V17.5H8.89319V16.5ZM11.2 19.2424L9.29319 16.7L8.49319 17.3L10.4 19.8424L11.2 19.2424ZM12.8 19.2424C12.4 19.7757 11.6 19.7757 11.2 19.2424L10.4 19.8424C11.2 20.9091 12.8 20.9091 13.6 19.8424L12.8 19.2424ZM14.7068 16.7L12.8 19.2424L13.6 19.8424L15.5068 17.3L14.7068 16.7ZM16 16.5H15.1068V17.5H16V16.5ZM19.5 13C19.5 14.933 17.933 16.5 16 16.5V17.5C18.4853 17.5 20.5 15.4853 20.5 13H19.5ZM19.5 8V13H20.5V8H19.5ZM16 4.5C17.933 4.5 19.5 6.067 19.5 8H20.5C20.5 5.51472 18.4853 3.5 16 3.5V4.5ZM8 4.5H16V3.5H8V4.5ZM13.8568 16.5H10.1432V17.5H13.8568V16.5ZM9.74319 17.3L11.2 19.2424L12 18.6424L10.5432 16.7L9.74319 17.3ZM11.2 19.2424C11.6 19.7757 12.4 19.7757 12.8 19.2424L12 18.6424L12 18.6424L11.2 19.2424ZM12.8 19.2424L14.2568 17.3L13.4568 16.7L12 18.6424L12.8 19.2424Z" fill="currentColor"/><rect x="7" y="7" width="10" height="1" rx="0.5" fill="currentColor"/><rect x="7" y="10" width="10" height="1" rx="0.5" fill="currentColor"/><rect x="9" y="13" width="6" height="1" rx="0.5" fill="currentColor"/></g>',
  create: '<rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="0.75px" fill="var(--hover-color)"/><rect x="8" y="11.5" width="8" height="1" rx="0.5" fill="currentColor"/><rect x="11.5" y="8" width="1" height="8" rx="0.5" fill="currentColor"/>',
  downvote: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4 18.8C12.2 19.0667 11.8 19.0667 11.6 18.8L6.59999 12.1333C6.35278 11.8037 6.58797 11.3333 6.99999 11.3333H9.99999V6.33329C9.99999 5.78101 10.4477 5.33329 11 5.33329H13C13.5523 5.33329 14 5.78101 14 6.33329V11.3333H17C17.412 11.3333 17.6472 11.8037 17.4 12.1333L12.4 18.8Z" fill="var(--fill-color)"/><path d="M11.6 18.8L12 18.5L12 18.5L11.6 18.8ZM12.4 18.8L12 18.5L12 18.5L12.4 18.8ZM6.59999 12.1333L6.19999 12.4333L6.19999 12.4333L6.59999 12.1333ZM9.99999 11.3333H10.5V11.8333H9.99999V11.3333ZM14 11.3333V11.8333H13.5V11.3333H14ZM17.4 12.1333L17 11.8333L17 11.8333L17.4 12.1333ZM12 18.5L12 18.5L12.8 19.1C12.4 19.6333 11.6 19.6333 11.2 19.1L12 18.5ZM6.99999 11.8333L12 18.5L11.2 19.1L6.19999 12.4333L6.99999 11.8333ZM6.99999 11.8333L6.99999 11.8333L6.19999 12.4333C5.70557 11.7741 6.17595 10.8333 6.99999 10.8333V11.8333ZM9.99999 11.8333H6.99999V10.8333H9.99999V11.8333ZM10.5 6.33329V11.3333H9.49999V6.33329H10.5ZM11 5.83329C10.7239 5.83329 10.5 6.05715 10.5 6.33329H9.49999C9.49999 5.50486 10.1716 4.83329 11 4.83329V5.83329ZM13 5.83329H11V4.83329H13V5.83329ZM13.5 6.33329C13.5 6.05715 13.2761 5.83329 13 5.83329V4.83329C13.8284 4.83329 14.5 5.50486 14.5 6.33329H13.5ZM13.5 11.3333V6.33329H14.5V11.3333H13.5ZM17 11.8333H14V10.8333H17V11.8333ZM17 11.8333L17 11.8333V10.8333C17.824 10.8333 18.2944 11.7741 17.8 12.4333L17 11.8333ZM12 18.5L17 11.8333L17.8 12.4333L12.8 19.1L12 18.5Z" fill="currentColor"/>',
  error: '<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8.5 8.5L15.5 15.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15.5 8.5L8.5 15.5" stroke="currentColor" stroke-width="2" fill="none"/>',
  filter: '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9146 7H17.4545C17.7558 7 18 7.24421 18 7.54545C18 7.8467 17.7558 8.09091 17.4545 8.09091H10.8791C10.6498 8.62553 10.1186 9 9.5 9C8.88139 9 8.35025 8.62553 8.12088 8.09091H6.54545C6.24421 8.09091 6 7.8467 6 7.54545C6 7.24421 6.24421 7 6.54545 7H8.08535C8.29127 6.4174 8.84689 6 9.5 6C10.1531 6 10.7087 6.4174 10.9146 7ZM10.9146 17C10.7087 17.5826 10.1531 18 9.5 18C8.84689 18 8.29127 17.5826 8.08535 17H6.54545C6.24421 17 6 16.7558 6 16.4545C6 16.1533 6.24421 15.9091 6.54545 15.9091H8.12088C8.35025 15.3745 8.88139 15 9.5 15C10.1186 15 10.6498 15.3745 10.8791 15.9091H17.4545C17.7558 15.9091 18 16.1533 18 16.4545C18 16.7558 17.7558 17 17.4545 17H10.9146ZM14.5 13.5C15.136 13.5 15.6795 13.1042 15.8977 12.5455H17.4545C17.7558 12.5455 18 12.3013 18 12C18 11.6988 17.7558 11.4546 17.4545 11.4546H15.8977C15.6796 10.8958 15.136 10.5 14.5 10.5C13.864 10.5 13.3204 10.8958 13.1023 11.4546H6.54545C6.24421 11.4546 6 11.6988 6 12C6 12.3013 6.24421 12.5455 6.54545 12.5455H13.1023C13.3205 13.1042 13.864 13.5 14.5 13.5Z" fill="currentColor"/>',
  home: '<g fill="none"><path d="M18.9878 10.2948C19.3133 10.5796 19.5 10.9911 19.5 11.4236V18.083C19.5 18.9115 18.8284 19.583 18 19.583H6C5.17157 19.583 4.5 18.9115 4.5 18.083L4.5 11.4236C4.5 10.9911 4.68672 10.5796 5.01224 10.2948L11.0122 5.04478C11.5778 4.54994 12.4222 4.54994 12.9878 5.04478L18.9878 10.2948Z" stroke="currentColor"/><path d="M9.5 15C9.5 14.1716 10.1716 13.5 11 13.5H13C13.8284 13.5 14.5 14.1716 14.5 15V19.5H9.5V15Z" stroke="currentColor"/></g>',
  search: '<g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z" stroke="currentColor"/><path d="M15.0459 15.6484L19.3975 20" stroke="currentColor" stroke-linecap="round"/>',
  spinner: '<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" opacity="0.1" fill="none"/><path d="M12 1C6 1 1 6 1 12" stroke="currentColor" stroke-width="2" fill="none"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path>',
  success: '<circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2" fill="none"/><path d="M17.33 8.66998L11 15L7.5 11.5" stroke="currentColor" stroke-width="2" fill="none"/>',
  tags: '<g fill="none"><path d="M18.6375 12.9527L11.7513 19.8388C11.1655 20.4246 10.2158 20.4246 9.63001 19.8388L3.97315 14.182C3.38737 13.5962 3.38737 12.6464 3.97315 12.0607L10.8593 5.17451C11.1406 4.89321 11.5221 4.73517 11.92 4.73517L17.5768 4.73517C18.4052 4.73517 19.0768 5.40675 19.0768 6.23517V11.892C19.0768 12.2899 18.9188 12.6714 18.6375 12.9527Z" stroke="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1347 7.94765C15.4948 7.86457 15.8174 8.18724 15.7344 8.54728L15.0564 11.4849C14.9681 11.8676 14.4934 12.0038 14.2157 11.7261L11.956 9.46633C11.6783 9.18863 11.8144 8.71388 12.1971 8.62558L15.1347 7.94765Z" stroke="currentColor"/></g>',
  upvote: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4 5.53331C12.2 5.26665 11.8 5.26665 11.6 5.53331L6.59999 12.2C6.35278 12.5296 6.58797 13 6.99999 13H9.99999V18C9.99999 18.5523 10.4477 19 11 19H13C13.5523 19 14 18.5523 14 18V13H17C17.412 13 17.6472 12.5296 17.4 12.2L12.4 5.53331Z" fill="var(--fill-color)"/><path d="M11.6 5.53331L12 5.83331L12 5.83331L11.6 5.53331ZM12.4 5.53331L12 5.83331L12 5.83331L12.4 5.53331ZM6.59999 12.2L6.99999 12.5L6.99999 12.5L6.59999 12.2ZM9.99999 13H10.5V12.5H9.99999V13ZM14 13V12.5H13.5V13H14ZM17.4 12.2L17.8 11.9L17.8 11.9L17.4 12.2ZM12 5.83331L12 5.83331L12.8 5.23331C12.4 4.69998 11.6 4.69998 11.2 5.23331L12 5.83331ZM6.99999 12.5L12 5.83331L11.2 5.23331L6.19999 11.9L6.99999 12.5ZM6.99999 12.5L6.99999 12.5L6.19999 11.9C5.70557 12.5592 6.17595 13.5 6.99999 13.5V12.5ZM9.99999 12.5H6.99999V13.5H9.99999V12.5ZM10.5 18V13H9.49999V18H10.5ZM11 18.5C10.7238 18.5 10.5 18.2761 10.5 18H9.49999C9.49999 18.8284 10.1716 19.5 11 19.5V18.5ZM13 18.5H11V19.5H13V18.5ZM13.5 18C13.5 18.2761 13.2761 18.5 13 18.5V19.5C13.8284 19.5 14.5 18.8284 14.5 18H13.5ZM13.5 13V18H14.5V13H13.5ZM17 12.5H14V13.5H17V12.5ZM17 12.5L17 12.5V13.5C17.824 13.5 18.2944 12.5592 17.8 11.9L17 12.5ZM12 5.83331L17 12.5L17.8 11.9L12.8 5.23331L12 5.83331Z" fill="currentColor"/>',
  play: '<path d="M8 6.39758V17.6024C8 18.7777 9.29025 19.4964 10.2895 18.8778L19.3396 13.2754C20.2869 12.689 20.2869 11.311 19.3396 10.7246L10.2895 5.12218C9.29024 4.50357 8 5.22231 8 6.39758Z" stroke="currentColor" stroke-width="2" fill="none"/>',
  pause: '<path d="M8 5.5V18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 5.5V18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  fullscreen: '<path d="M8.5 5H6C5.5 5 5 5.5 5 6V8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M15.5 19L18 19C18.5 19 19 18.5 19 18L19 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M19 8.5L19 6C19 5.5 18.5 5 18 5L15.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M5 15.5L5 18C5 18.5 5.5 19 6 19L8.5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
  exitfullscreen: '<path d="M5 9L8 9C8.5 9 9 8.5 9 8L9 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M19 15H16C15.5 15 15 15.5 15 16V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M15 5L15 8C15 8.5 15.5 9 16 9L19 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M9 19L9 16C9 15.5 8.5 15 8 15L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
  volume: '<path d="M11.5 16.6693V7.33072C11.5 5.94568 9.7832 5.30061 8.87114 6.34297L6.54623 9H5C4.17157 9 3.5 9.67157 3.5 10.5V13.5C3.5 14.3284 4.17157 15 5 15H6.54623L8.87113 17.657C9.78319 18.6994 11.5 18.0543 11.5 16.6693Z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14.5 8.5C16.5 10.5 16.5 13.5 14.5 15.5M17 6C20.5 9 20.5 15 17 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
  muted: '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.27753 8.10596C3.24906 8.4159 2.5 9.37046 2.5 10.5V13.5C2.5 14.8807 3.61929 16 5 16H6.09246L8.11856 18.3155C9.63866 20.0528 12.5 18.9777 12.5 16.6693V16.3284L10.5 14.3284V14.9628V15.2491V16.2318V16.6693C10.5 17.1309 9.92773 17.346 9.62371 16.9985L9.33562 16.6693L8.68856 15.9298L8.5 15.7143L7 14H6H5C4.72386 14 4.5 13.7761 4.5 13.5V10.5C4.5 10.2238 4.72386 9.99998 5 9.99998H6H6.17155L4.27753 8.10596ZM10.5 8.67157V7.7682V7.3307C10.5 6.86902 9.92773 6.654 9.62371 7.00145L9.33562 7.3307L9.25326 7.42483L7.8359 6.00748L8.11856 5.68444C9.63867 3.94717 12.5 5.02231 12.5 7.3307V10.6716L10.5 8.67157ZM16.394 14.5655L14.8548 13.0264C15.2307 11.7182 14.8767 10.2909 13.7929 9.20709C13.4024 8.81656 13.4024 8.1834 13.7929 7.79287C14.1834 7.40235 14.8166 7.40235 15.2071 7.79287C17.0973 9.68305 17.4929 12.3501 16.394 14.5655ZM19.0424 17.214L17.5972 15.7687C19.302 12.9803 18.886 8.93364 16.3492 6.75924C15.9299 6.39981 15.8813 5.76851 16.2407 5.34919C16.6002 4.92986 17.2315 4.8813 17.6508 5.24072C21.08 8.18002 21.5438 13.6028 19.0424 17.214Z" fill="currentColor"/><path d="M4 5L18 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
}
export default class SociIcon extends SociComponent {
  constructor() {
    super()
  }

  css(){ return `
    :host {
      width: 24px;
      height: 24px;
    }

    svg {
      width: inherit;
      height: inherit;
    }
  `}

  html(){ return `
    <svg viewBox="0 0 24 24" fill='currentColor'></svg>
  `}

  static get observedAttributes() {
    return ['glyph']
  }

  set glyph(val){
    this.setAttribute('glyph', val)
  }

  attributeChangedCallback(name, oldValue, newValue){
    let svg = this.select('svg')
    if(name == 'glyph') svg.innerHTML = icons[newValue]
  }
}
