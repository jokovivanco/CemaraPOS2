import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  thumbnailWrapper: {
    justifyContent: 'center'
  },
  thumbnailImage: {
    width: 72,
    height: 72
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'flex-start'
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    letterSpacing: 1
  },
  text: {
    fontFamily: 'Inter-Medium',
    letterSpacing: 1
  },
  info: {
    fontFamily: 'Inter-Light',
    letterSpacing: .5
  },
  row: {
    flexDirection: 'row'
  },
  chevronWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  trashIconWrapper: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  }
})