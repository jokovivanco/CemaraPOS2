import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 18
  },
  headerContainer: {
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 150,
    height: 150
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16
  },
  divider: {
    marginBottom: 7
  },
  numberInput: {
    textAlign: 'right'
  },
  addVariantButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addVariantText: {
    color: '#00AE84',
    fontFamily: 'Inter-Light',
    letterSpacing: .5
  },
  containerForm: {
    paddingTop: 18,
    paddingHorizontal: 18
  },
  inputForm: {
    marginBottom: 18
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16
  },
  row: {
    flexDirection: 'row'
  },
  operationButtonDiscount: {
    marginLeft: 10,
    width: 82
  },
  flex: {
    flex: 1
  },
  assetsChooseContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  calendarText: {
    fontFamily: 'Inter-Medium'
  }
})