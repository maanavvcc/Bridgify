import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShortcutInfo } from './actions.js'

const ShortcutInfoListener = () => {
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on('shortcut-info', (data) => {
        dispatch(updateShortcutInfo(data));
      });
    }

    return () => {
      if (socket) {
        socket.off('shortcut-info');
      }
    };
  }, [socket, dispatch]);

  return null;
};
/*
class ShortcutsList {
    constructor(data){
        this.shortcuts = data;
    }
  }
*/
export const getShortcuts = (shortcutInfo) => {
    return shortcutInfo;
}

export default ShortcutInfoListener;