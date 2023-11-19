import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white', // Example background color
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'black', // Example text color
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    zIndex: -1,
    flexDirection: 'column',
    margin: 0,
    padding: 0
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
});