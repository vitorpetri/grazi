import GSAP from 'gsap'

import Component from '../classes/Component'

export default class extends Component {
  constructor () {
    super({
      element: '.menu__button',
      elements: {
        title: '.menu__button__title',
        list: '.menu__button__list',
        selected: '.menu__button__select',
        line: '.menu__button__select__line'
      }
    })
  }

  // onMouseEnter () {
  //   this.hover = GSAP.timeline({
  //     paused: true
  //   })

  //   this.hover.to(this.elements.selected, {
  //     duration: 0.3,
  //     right: '2.7rem',
  //     width: '7.4rem',
  //     height: '3.2rem',
  //     ease: 'Power2.easeOut'
  //   }, 0.05)

  //   this.hover.to(this.elements.line, {
  //     duration: 0.3,
  //     width: '5.4rem',
  //     ease: 'Power2.easeOut'
  //   }, 0.05)

  //   this.hover.play()
  // }

  // onMouseLeave () {
  //   this.hover.reverse()
  // }

  onHide () {
    this.element.classList.remove('menu__button--active')

    this.toggle = GSAP.timeline({
      paused: true
    })
  }

  onShow () {
    this.element.classList.add('menu__button--active')
  }

  onToggle () {
    if (this.element.classList.contains('menu__button--active')) {
      this.onHide()
    } else {
      this.onShow()
    }
  }

  addEventListeners () {
    this.element.addEventListener('mouseenter', this.onMouseEnter)
    this.element.addEventListener('mouseleave', this.onMouseLeave)
    this.element.addEventListener('click', this.onToggle)
  }
}
