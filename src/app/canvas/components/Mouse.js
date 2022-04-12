import { Vec2 } from 'ogl'

export default class Mouse {
  constructor () {
    this.position = new Vec2()
    this.normalized = new Vec2()
  }

  onMouseDown (event) {

  }

  onMouseMove (event) {
    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.position.set(x, y)

    const xNorm = x / this.sizes.width - 0.5
    const yNorm = y / this.sizes.height - 0.5

    this.normalized.set(xNorm, yNorm)
  }

  onMouseUp (event) {

  }

  onResize ({ area, sizes }) {
    this.area = area
    this.sizes = sizes
  }

  update () {

  }
}
