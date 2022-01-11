import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18
  },
  headerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 150,
    height: 150
  },
  divider: {
    marginVertical: 14
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16
  },
  divider: {
    marginVertical: 14
  },
  variantsContainer: {
    flex: 1,
    marginTop: 18
  },
  variantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  variantsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16
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
  }
})