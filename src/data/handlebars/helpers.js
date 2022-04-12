import Handlebars from 'handlebars'

import * as prismicHelpers from '@prismicio/helpers'
import { prismicHelpersLinks } from '../prismic/helpers.js'

export const handlebarsHelpers = {
  breaklines: text => {
    text = Handlebars.Utils.escapeExpression(text)
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>')

    return new Handlebars.SafeString(text)
  },
  prismicLink: data => {
    return prismicHelpers.asLink(data, prismicHelpersLinks)
  },
  prismicHTML: data => {
    return prismicHelpers.asHTML(data, prismicHelpersLinks)
  },
  prismicText: data => {
    return prismicHelpers.asText(data, prismicHelpersLinks)
  }
}
