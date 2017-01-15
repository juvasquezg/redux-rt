function createRT() {
  return store => next => (action) => {
    const state = store.getState()

    if (state.socket) {
      state.socket.emit('send', action.data)
    }
    return next(action)
  }
}

export default createRT
