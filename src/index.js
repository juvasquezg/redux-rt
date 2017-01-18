function createRT(actions) {
  return ({ dispatch, getState }) => next => (action) => {
    const state = getState()

    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const types = actions.map(a => a.type)

    const { meta, payload, type } = action

    if (state.global.socket && !(types.indexOf(type) === -1)) {
      actions.map((a) => {
        if (meta && meta.touch) {
          if (!a.fields && a.type === type) {
            state.global.socket.emit('redux-rt', { meta, payload })
          } else if (a.fields && !(a.fields.indexOf(meta.field) === -1) && a.type === type) {
            state.global.socket.emit('redux-rt', { meta, payload })
          }
        }
        return a
      })
    }
    return next(action)
  }
}

export default createRT
