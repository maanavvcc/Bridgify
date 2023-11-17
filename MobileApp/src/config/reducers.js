const initialState = {
  socket: null,
  systemInfo: {
    cpu: null,
    memory: null,
    gpu: null,
    temperatures: { cpu: null },
    utilization: { cpu: null },
  },
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
    default:
      return state;
  }
};

export default rootReducer;