import svgstore from 'svgstore'
import fs, { readdirSync } from 'fs'

export class SVGSpriteHelper {
  constructor (dir) {
    this.dir = dir
  }

  async generate () {
    const dirents = readdirSync(this.dir, {
      withFileTypes: true
    })

    const sprites = svgstore()
    for (const dirent of dirents) {
      const icon = dirent.name.replace('.svg', '')
      sprites.add(icon, fs.readFileSync(`src/icons/svg/${icon}.svg`, 'utf8'))
    }

    fs.writeFileSync('src/pages/public/sprites.svg', sprites)
  }
}
