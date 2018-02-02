import mType from '../mType'

export default {
  [mType.UPDATE_HEADER_TITLE](state, title) {
    state.title = title
  },
  [mType.UPDATE_HEADER_SHOW_BACK](state, bool) {
    state.showBack = bool
  },
  [mType.UPDATE_HEADER_LEFT_HANDLER](state, handler) {
    state.leftHandler = handler
  }
}
