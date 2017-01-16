function createRT() {
  return ({ dispatch, getState }) => next => (action) => {
    const state = getState()
    const actions = [
      { type: 'redux-form/BLUR' },
      { type: 'redux-form/CHANGE', fields: ['aph1Id', 'aph2Id'] },
      { type: 'SHOW_CASOPOSITIVO' },
      { type: 'SHOW_CASOPOSITIVO' },
      { type: 'ADD_COMMET' },
      { type: 'REGISTRAR_HORA' },
      { type: 'UPDATE_AMBDESPACHADA' },
    ]

    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    if (state.global.socket) {
      const { meta, payload, type } = action
      actions.map((a) => {
        if (!a.fields && a.type === type) {
          state.global.socket.emit('send', { meta, payload })
        } else if (!a.fields.indexOf(meta.field) === -1) {
          state.global.socket.emit('send', { meta, payload })
        }
        return a
      })
    }
    return next(action)
  }
}

export default createRT
