function createRT() {
  return store => next => (action) => {
    const state = store.getState()

    if (state.global.socket) {
      state.global.socket.emit('send', action.data)
    }
    return next(action)
  }
}

export default createRT
