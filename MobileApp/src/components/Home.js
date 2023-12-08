import React, { useState, useEffect } from 'react';
import { View, Button, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import 'react-native-gesture-handler';
import { setSocket } from '../config/actions.js';
import config from '../config/config.json';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../config/styles.js';
import * as SysInfo from '../config/sysinfo.js';
import * as Shortcuts from '../config/shortcut.js';

const HomeScreen = ({ route, navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const systemInfo = useSelector((state) => state.systemInfo);
  const shortcutInfoSelector = useSelector((state) => state.shortcutInfo);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const gpuInfo = SysInfo.getGPUInfo(systemInfo);
  const cpuInfo = SysInfo.getCPUInfo(systemInfo);
  const memInfo = SysInfo.getMemInfo(systemInfo);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const shortcutInfo = Shortcuts.getShortcuts(shortcutInfoSelector);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [downloadableFiles, setDownloadableFiles] = useState([]);


  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
      dispatch(setSocket(null));
      navigation.navigate('Connect');
    }
  };

  const toggleDownloadModal = () => {
    setDownloadModalVisible(!downloadModalVisible);
    if (!downloadModalVisible) {
      // Fetch the list of files when the download modal is opened
      fetch(config.server.ip+':3000/getFiles')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the received data to inspect it
        setDownloadableFiles(data);
      })
      .catch(error => console.error('Error fetching files:', error));
    }
  };

  const handleDownloadFile = async (fileName) => {
    setDownloadModalVisible(false); // Close the download modal

    console.log(`${fileName} downloaded`);
  };


  const handleMainContentLongPress = () => {
    setIsContextMenuVisible(true);
  };

  const handleContextMenuClose = () => {
    setIsContextMenuVisible(false);
  };

  const handleContextMenuPress = (option) => {
    switch (option) {
      case 'Add CPU':
        setIsVisible(true);
        break;
      case 'Add GPU':
        setIsVisible2(true);
        break;
      case 'Add MEM':
        setIsVisible3(true);
        break;
      case 'Remove CPU':
        setIsVisible(false);
        break;
      case 'Remove GPU':
        setIsVisible2(false);
        break;
      case 'Remove MEM':
        setIsVisible3(false);
        break;
      default:

    }

    console.log(`Selected option: ${option}`);
  };

  const handleShortcutSelection = (shortcutID) => {
    socket.emit('shortcut-pressed', {id: shortcutID});
  }

  const remoeExistingShortcuts = () => {
    $('.container').find('.shortcut').remove();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
          <Image source={require('../assets/connected.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        {!isCollapsed && (
          <Collapsible style={styles.menu} collapsed={isCollapsed}>      
            <TouchableOpacity style={styles.button} onPress={handleDisconnect}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          </Collapsible>
        )}
      </View>
      <TouchableOpacity onPress={toggleDownloadModal}>
        <Text style={{color: 'white'}} >Download File</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainContent} onLongPress={handleMainContentLongPress}>
          {isVisible && (
            <View style={styles.widget1}>
              <Text style={styles.widgetText}>{`${cpuInfo.brand}\n\nCores: ${cpuInfo.cores}  |  Threads: ${cpuInfo.threads}  |  Speed: ${cpuInfo.speed}\n\nCurrent CPU Load: ${cpuInfo.load}`}</Text>
            </View>
          )}
          {isVisible2 && (
          <View style={styles.widget2}>
            <Text style={styles.widgetText}>{`${gpuInfo.model}\n\nFan Speed: ${gpuInfo.fanSpeed}  |  GPU Temp: ${gpuInfo.temperature}  |  GPU Load: ${gpuInfo.utilizationGpu}\n\nGPU VRAM: ${gpuInfo.vram}  |  GPU Mem Load: ${gpuInfo.utilizationMemory}`}</Text>
          </View>
          )}
          {isVisible3 && (
          <View style={styles.widget3}>
            <Text style={styles.widgetText}>{`Total Memory:${memInfo.total}\n\nFree: ${memInfo.free}  |  Used: ${memInfo.used}\n\nMemory Load: ${memInfo.load}`}</Text>
          </View>
          )}
      </TouchableOpacity>

      <Modal isVisible={isContextMenuVisible} onBackdropPress={handleContextMenuClose}>
        <View style={styles.contextMenu}>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Add CPU')}>Add CPU Widget</Text>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Add GPU')}>Add GPU Widget</Text>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Add MEM')}>Add Memory Widget</Text>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Remove CPU')}>Remove CPU Widget</Text>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Remove GPU')}>Remove GPU Widget</Text>
          <Text style={{color: 'white'}} onPress={() => handleContextMenuPress('Remove MEM')}>Remove Memory Widget</Text>
          <Text style={{color: 'white'}} onPress={handleContextMenuClose}>Close</Text>
        </View>
      </Modal>

      <Modal isVisible={downloadModalVisible} onBackdropPress={toggleDownloadModal}>
        <View>
          <Text style={{color: 'white'}}>Select a file to download:</Text>
          <FlatList
            data={downloadableFiles}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleDownloadFile(item)}>
                <Text style={{color: 'white'}}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleDownloadModal}>
            <Text style={{color: 'white'}}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View id='shortcutContainer'>
          {
            shortcutInfo && remoeExistingShortcuts() &&
            Object.values(shortcutInfo).map((shortcut) => 
              <TouchableOpacity class='shortcut' key={'shortcutBackgroundID'+shortcut.id} style={styles.shortcutBackground} onPress={() => handleShortcutSelection(shortcut.id)}>
                <Text class='shortcut' style={styles.shortcutText} key={'shortcutID' + shortcut.id}>{shortcut.name}</Text>
              </TouchableOpacity>
            )
          }
      </View>
    </View>
  );
};

export default HomeScreen;
