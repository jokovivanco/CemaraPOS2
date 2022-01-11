import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 18,
    paddingHorizontal: 18
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    flex: 1
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    justifyContent: 'center'
  },
  dateChooseContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  calendarText: {
    fontFamily: 'Inter-Medium'
  }
})