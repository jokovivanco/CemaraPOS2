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
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    letterSpacing: 1
  },
  status: {
    fontFamily: 'Inter-Medium',
    fontSize: 14
  },
  date: {
    fontFamily: 'Inter-Light'
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})