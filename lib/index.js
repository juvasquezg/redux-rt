'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createRT() {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        var state = getState();
        var actions = [{ type: 'redux-form/BLUR' }, { type: 'redux-form/CHANGE', fields: ['aph1Id', 'aph2Id'] }, { type: 'SHOW_CASOPOSITIVO' }, { type: 'SHOW_CASOPOSITIVO' }, { type: 'ADD_COMMET' }, { type: 'REGISTRAR_HORA' }, { type: 'UPDATE_AMBDESPACHADA' }];

        if (typeof action === 'function') {
          return action(dispatch, getState);
        }

        var types = actions.map(function (a) {
          return a.type;
        });

        var meta = action.meta,
            payload = action.payload,
            type = action.type;


        if (state.global.socket && !types.indexOf(type) === -1) {
          actions.map(function (a) {
            if (meta) {
              if (!a.fields && a.type === type) {
                state.global.socket.emit('send', { meta: meta, payload: payload });
              } else if (a.fields && !a.fields.indexOf(meta.field) === -1) {
                state.global.socket.emit('send', { meta: meta, payload: payload });
              }
            }
            return a;
          });
        }
        return next(action);
      };
    };
  };
}

exports.default = createRT;