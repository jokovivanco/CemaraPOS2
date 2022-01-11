import { StyleSheet } from "react-native";

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
    paddingTop: 18
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
  assetsChooseContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '80%',
    padding: 20
  },
  listItemStyle: {
    marginTop: 5,
    paddingVertical: 0
  },
  radioStyle: {
    justifyContent: 'center'
  },
  addNewOwnerContainer: {
    alignSelf: 'center',
    marginTop: 40
  },
  addNewOwnerText: {
    color: '#00AE84',
    fontFamily: 'Inter-Light',
    letterSpacing: .5
  },
  addNewOwnerButtons: {
    flexDirection: 'row'
  },
  addNewOwnerCancelButton: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 2
  },
  addNewOwnerAddButton: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 2,
    backgroundColor: '#00AE84',
    color: 'white'
  }
})