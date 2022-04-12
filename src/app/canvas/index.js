import AutoBind from 'auto-bind'
import { Renderer, Camera, Transform } from 'ogl'

import Component from '../classes/Component'
import Mouse from './components/Mouse'

export default class App extends Component {
  constructor ({ pages, routes, template }) {
    super()

    AutoBind(this)

    this.pages = pages
    this.routes = routes
    this.template = template

    this.createRenderer()
    this.createCamera()
    this.createGroup()
    this.createMouse()
    this.createPages()
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5)
    })

    this.gl = this.renderer.gl
    this.gl.canvas.classList.add('canvas')

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 5
  }

  createGroup () {
    this.group = new Transform()
  }

  createMouse () {
    this.mouse = new Mouse()
  }

  createPages () {
    this.scenes = {}

    for (const key in this.routes) {
      const { scene: Scene, template } = this.routes[key]

      this.scenes[template] = new Scene({
        gl: this.gl,
        group: this.group,
        mouse: this.mouse,
        page: this.pages[template]
      })
    }
  }

  /**
   * Events.
   */
  onMouseDown ({ originalEvent }) {
    this.mouse.onMouseDown(originalEvent)
  }

  onMouseMove ({ originalEvent }) {
    this.mouse.onMouseMove(originalEvent)
  }

  onMouseUp ({ originalEvent }) {
    this.mouse.onMouseUp(originalEvent)
  }

  onResize (event) {
    const { windowInnerSizes } = event

    this.sizes = windowInnerSizes

    this.renderer.setSize(this.sizes.width, this.sizes.height)

    this.camera.perspective({
      aspect: this.sizes.width / this.sizes.height
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.area = {
      height,
      width
    }

    this.mouse.onResize({
      area: this.area,
      sizes: this.sizes
    })

    this.scene?.onResize({
      area: this.area,
      sizes: this.sizes
    })
  }

  /**
   * Navigation.
   */
  hide () {
    this.scene.hide()
  }

  show (template) {
    this.template = template

    this.scene = this.scenes[this.template]
    this.scene.onResize({
      area: this.area,
      sizes: this.sizes
    })

    this.scene.create()
    this.scene.show()
  }

  /**
   * Update.
   */
  update () {
    if (!this.sizes) return

    this.mouse?.update()
    this.scene?.update()

    this.renderer.render({
      scene: this.group,
      camera: this.camera
    })
  }
}
