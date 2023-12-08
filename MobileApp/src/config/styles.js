import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#161616'
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent', // Example background color
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#7ac68a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  connect: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#161616',
    color: 'white'
  },
  container: {
    flex: 1,
    paddingTop: 20, 
    flexDirection: 'column',
    backgroundColor: '#161616'
  },
  mainContent: {
    flex: 1,
    zIndex: -1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    backgroundColor: '#161616'
  },
  widget1: { 
    height: '20%', 
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginTop: 16, 
  },
  widget2: {
    height: '20%', 
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginTop: 16, 
  },
  widget3: {
    height: '20%', 
    backgroundColor: 'lightblue', 
    borderRadius: 10,
    marginTop: 16, 
  },
  widgetText: {
    margin: 16, 
  },
  shortcutText: {
    margin: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  shortcutBackground: {
    height: '12%', 
    backgroundColor: 'lightgreen', 
    borderRadius: 10,
    marginTop: 16,
  }, 
  contextMenu: {
    color: 'white'
  }
});