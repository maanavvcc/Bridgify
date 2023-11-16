export const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  payload: socket,
});

export const updateSystemInfo = (info) => ({
  type: 'UPDATE_SYSTEM_INFO',
  payload: info,
});