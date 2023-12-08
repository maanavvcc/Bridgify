export const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  payload: socket,
});

export const updateSystemInfo = (info) => ({
  type: 'UPDATE_SYSTEM_INFO',
  payload: info,
});

export const updateShortcutInfo = (info) => ({
  type: 'UPDATE_SHORTCUT_INFO',
  payload: info,
});