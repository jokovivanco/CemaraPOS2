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
  navHeaderLeft: {
    marginRight: 32
  },
  divider: {
    marginVertical: 14
  },
  header: {
    paddingTop: 18,
    paddingHorizontal: 18
  },
  productName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 14
  },
  initialInfoContainer: {
    flexDirection: 'row'
  },
  headerRight: {
    flex: 1,
    marginLeft: 20
  },
  headerImage: {
    width: 150,
    height: 150
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 3
  },
  headerForm: {
    marginBottom: 18,
    textAlign: 'right'
  },
  variantContainer: {
    paddingHorizontal: 18
  },
  componentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold'
  },
  VariantButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  operationButton: {
    width: 82
  },
  operationButtonDiscount: {
    marginLeft: 10,
    width: 82
  },
  variantItemContainer: {
    marginBottom: 24
  },
  discountContainer: {
    paddingHorizontal: 18
  },
  inputBox: {
    marginBottom: 14
  },
  row: {
    flexDirection: 'row'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  numberInput: {
    textAlign: 'right'
  },
  promoCard: {
    borderRadius: 2,
    backgroundColor: 'white'
  }
})