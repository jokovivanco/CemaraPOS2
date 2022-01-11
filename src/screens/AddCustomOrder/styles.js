import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navHeaderLeft: {
    marginRight: 32
  },
  mainInputContainer: {
    paddingHorizontal: 18
  },
  discountContainer: {
    paddingHorizontal: 18
  },
  row: {
    flexDirection: 'row'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainInputOrderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18
  },
  totalText: {
    flex: 2,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    letterSpacing: .5,
    alignSelf: 'center',
    textAlign: 'center'
  },
  inputBox: {
    marginBottom: 14
  },
  textInput: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    letterSpacing: .5
  },
  numberInput: {
    textAlign: 'right'
  },
  textInputDelete: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    letterSpacing: .5
  },
  totalInput: {
    flex: 3,
    textAlign: 'right'
  },
  operationButton: {
    flex: 2,
    marginLeft: 8
  },
  divider: {
    marginVertical: 14
  },
  addVariantButton: {
    alignItems: 'center'
  },
  addVariantText: {
    color: '#00AE84',
    fontFamily: 'Inter-Light',
    letterSpacing: .5
  },
  promoCard: {
    borderRadius: 2,
    backgroundColor: 'white'
  }
})