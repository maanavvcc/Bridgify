// reducer.js
const initialState = {
  socket: null,
  // other state properties...
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    // other cases...
    default:
      return state;
  }
};

export default rootReducer;