import { Transform } from 'ogl'

export default class Scene {
  constructor ({ gl, group, mouse, page }) {
    this.group = new Transform()

    this.gl = gl
    this.mouse = mouse
    this.page = page
    this.scene = group
  }

  create () {

  }

  /**
   * Animations.
   */
  hide () {
    this.group.setParent(null)
  }

  show () {
    this.group.setParent(this.scene)
  }

  /**
   * Events.
   */
  onResize ({ area, sizes }) {
    this.area = area
    this.sizes = sizes
  }

  /**
   * Loop.
   */
  update () {

  }
}
