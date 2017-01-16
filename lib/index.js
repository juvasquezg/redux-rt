'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createRT() {
  return function (store) {
    return function (next) {
      return function (action) {
        var state = store.getState();

        if (state.global.socket) {
          state.global.socket.emit('send', action.data);
        }
        return next(action);
      };
    };
  };
}

exports.default = createRT;