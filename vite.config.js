import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

import glsl from 'vite-plugin-glsl'
import handlebars from 'vite-plugin-handlebars'
import { handlebarsHelpers } from './src/data/handlebars/helpers.js'

import Prismic from './src/data/prismic/Prismic.js'

import { SVGSpriteHelper } from './src/data/svg/helper.js'

export default async ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }

  // Prismic
  // const prismic = new Prismic()
  // const results = await prismic.getData()

  // SVG Sprite
  const svgSpriteHelper = new SVGSpriteHelper('src/icons/svg')
  await svgSpriteHelper.generate()

  return defineConfig({
    root: 'src/pages',
    build: {
      outDir: '../../dist',
      rollupOptions: {
        input: {
          main: resolve('src/pages/index.html'),
          about: resolve('src/pages/about/index.html'),
          lothus: resolve('src/pages/lothus/index.html')
        }
      }
    },
    plugins: [
      glsl.default(),

      handlebars({
        context () {
          return {
            // ENABLE WHEN USING PRISMIC
            // {...results}
          }
        },
        helpers: handlebarsHelpers,
        partialDirectory: resolve('src/views')
      })
    ]
  })
}
