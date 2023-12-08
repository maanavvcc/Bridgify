const initialState = {
  socket: null,
  systemInfo: null,
  shortcutInfo: null
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    case 'UPDATE_SYSTEM_INFO':
      return {
        ...state,
        systemInfo: {
          ...state.systemInfo,
          ...action.payload,
        },
      };
    case 'UPDATE_SHORTCUT_INFO':
      return {
        ...state,
        shortcutInfo: {
          ...state.shortcutInfo,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
