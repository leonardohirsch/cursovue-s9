export { default as Carrusel } from '../..\\components\\Carrusel.vue'
export { default as FilmList } from '../..\\components\\FilmList.vue'
export { default as FilmReview } from '../..\\components\\FilmReview.vue'
export { default as FilmSearch } from '../..\\components\\FilmSearch.vue'
export { default as Menu } from '../..\\components\\Menu.vue'
export { default as ModalFilm } from '../..\\components\\ModalFilm.vue'
export { default as MovieMainData } from '../..\\components\\MovieMainData.vue'
export { default as PersonalComments } from '../..\\components\\PersonalComments.vue'
export { default as ProfileMainBtn } from '../..\\components\\ProfileMainBtn.vue'
export { default as ProfileSecondaryBtn } from '../..\\components\\ProfileSecondaryBtn.vue'
export { default as Spinner } from '../..\\components\\Spinner.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
