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
  header: {
    marginBottom: 20
  },
  divider: {
    marginVertical: 14
  },
  logo: {
    width: 80,
    height: 80,
    margin: 18
  },
  headerSub: {
    position: 'absolute',
    alignSelf: 'center',
    height: 100,
    justifyContent: 'center'
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center'
  },
  headerSubText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  initialInfo: {
    paddingHorizontal: 18
  },
  invoiceCodeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14
  },
  invoiceDateTime: {
    fontFamily: 'Inter-Medium'
  },
  itemPreviewContainer: {
    paddingHorizontal: 18
  },
  currencyText: {
    color: '#0788FF'
  },
  productName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 18
  },
  totalAmount: {
    alignSelf: 'flex-end',
    fontFamily: 'Inter-Medium'
  },
  everyTotal: {
    alignSelf: 'flex-end',
    fontFamily: 'Inter-Bold',
    fontSize: 18
  },
  grid: {
    marginBottom: 90
  },
  rowGridHeader: {
    height: 30
  },
  rowGrid: {
    height: 20
  },
  colTitle: {
    fontFamily: 'Inter-Bold'
  },
  colText: {
    fontFamily: 'Inter-Medium'
  },
  cancelButton: {
    height: 56,
    marginBottom: 14,
    justifyContent: 'center'
  },
  finalButton: {
    marginBottom: 14
  },
  buttonContainer: {
    paddingHorizontal: 18
  },
  statusReasonContainer: {
    paddingHorizontal: 18,
    marginTop: 24
  },
  statusTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14
  },
  reasonContainer: {
    marginTop: 18
  }
})