import {
  USER_STATE_CHANGE,
  FETCH_USERROLE,
  FETCH_ROLES,
  FETCH_PRODUCTS,
  FETCH_PROMOS,
  FETCH_INVOICES,
  FETCH_ASSETS,
  FETCH_ASSETS_OWNERS,
  FETCH_ASSETS_TYPES,
  UPDATE_PRODUCT,
  UPDATE_INVOICE,
  UPDATE_ASSET,
  UPDATE_ASSET_OWNER,
  UPDATE_ASSET_TYPES,
  UPDATE_PROMOS,
  SEARCH_ASSETS,
  SEARCH_PRODUCTS,
  SEARCH_INVOICES,
  SEARCH_PROMOS,
  ADD_INVOICE,
  UPDATE_USERROLE,
  UPDATE_ROLES,
  SEARCH_ROLES,
  SEARCH_USERROLE,
} from "../constants";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { CommonActions } from "@react-navigation/native";

export const fetchEverything = () => {
  return dispatch => Promise.all([
    dispatch(fetchUserRole),
    dispatch(fetchUser),
    dispatch(fetchRoles),
    dispatch(fetchProducts),
    dispatch(fetchInvoices),
    dispatch(fetchAssets),
    dispatch(fetchPromos)
  ])
}

export const fetchUser = async dispatch => {
  await firestore().collection('users')
    .doc(auth().currentUser.uid)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        const data = {
          ...snapshot.data(),
          role: `${snapshot.data().role.charAt(0).toUpperCase()}${snapshot.data().role.slice(1)}`
        }
        console.log('fetchUser')
        return dispatch({ type: USER_STATE_CHANGE, currentUser: data });
      } else {
        console.log('Doesn\' exist')
      }
    })
    .catch((error) => {
      console.log("Error while fetching user action", error)
    })
}

export const fetchUserRole = async dispatch => {
  await firestore().collection('users')
    .get()
    .then(snapshot => {
      const users = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
      console.log('fetchUserRoles')
      return dispatch({ type: FETCH_USERROLE, users })
    })
    .catch(error => { console.log('Error while fetching roles action', error) })
}

export const fetchRoles = async dispatch => {
  await firestore().collection('roles')
    .get()
    .then(snapshot => {
      const roles = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
      console.log('fetchRoles')
      return dispatch({ type: FETCH_ROLES, roles })
    })
    .catch(error => { console.log('Error while fetching roles action', error) })
}

export const fetchProducts = async dispatch => {
  await firestore().collection('products')
    .get()
    .then(snapshot => {
      const products = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      console.log('fetchProducts')
      return dispatch({ type: FETCH_PRODUCTS, products })
    })
    .catch(error => { console.log('Error while fetching products action', error) })
}

export const fetchAssets = async dispatch => {
  await firestore().collection('assets')
    .get()
    .then(snapshot => {
      const assets = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      console.log('fetchAssets')
      return dispatch({ type: FETCH_ASSETS, assets })
    })
    .catch(error => { console.log('Error while fetching assets action', error) })

  await firestore().collection('assetsOwners')
    .get()
    .then(snapshot => {
      const assetsOwners = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      console.log('fetchAssetsOwners')
      return dispatch({ type: FETCH_ASSETS_OWNERS, assetsOwners })
    })
    .catch(error => { console.log('Error while fetching assetsOwners action', error) })

  await firestore().collection('assetsTypes')
    .get()
    .then(snapshot => {
      const assetsTypes = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      console.log('fetchAssetsTypes')
      return dispatch({ type: FETCH_ASSETS_TYPES, assetsTypes })
    })
    .catch(error => { console.log('Error while fetching assets action', error) })
}

export const fetchPromos = async dispatch => {
  await firestore().collection('promos')
    .get()
    .then(snapshot => {
      const promos = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })

      console.log('fetchPromos')
      return dispatch({ type: FETCH_PROMOS, promos })
    })
    .catch(error => { console.log('Error while fetching promos action', error) })
}

export const deleteProducts = id => (dispatch, getState) => {
  const { products } = getState().products
  const newProdcuts = products.filter(product => product.id !== id)
  dispatch({ type: UPDATE_PRODUCT, products: newProdcuts })
}

export const deleteAssets = id => (dispatch, getState) => {
  const { assets } = getState().assets
  const newAssets = assets.filter(asset => asset.id !== id)
  dispatch({ type: UPDATE_ASSET, assets: newAssets })
}

export const deleteUsers = id => (dispatch, getState) => {
  const { users } = getState().user
  const newUsers = users.filter(user => user.id !== id)
  dispatch({ type: UPDATE_USERROLE, users: newUsers })
}

export const deleteRoles = id => (dispatch, getState) => {
  const { roles } = getState().roles
  const newRoles = roles.filter(role => role.id !== id)
  dispatch({ type: UPDATE_ROLES, roles: newRoles })
}

export const deletePromos = id => (dispatch, getState) => {
  const { promos } = getState().promos
  const newPromos = promos.filter(promo => promo.id !== id)
  dispatch({ type: UPDATE_PROMOS, promos: newPromos })
}

export const deleteAssetsOwnersItem = id => (dispatch, getState) => {
  const { assetsOwners } = getState().assets
  const newAssetsOwners = assetsOwners.filter(owner => owner.id !== id)
  dispatch({ type: UPDATE_ASSET_OWNER, assetsOwners: newAssetsOwners })
}

export const deleteAssetsTypesItem = id => (dispatch, getState) => {
  const { assetsTypes } = getState().assets
  const newAssetsTypes = assetsTypes.filter(type => type.id !== id)
  dispatch({ type: UPDATE_ASSET_TYPES, assetsTypes: newAssetsTypes })
}

export const searchProducts = text => (dispatch, getState) => {
  const { products } = getState().products
  const filteredProducts = products.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_PRODUCTS, filteredProducts: filteredProducts })
  } else {
    dispatch({ type: SEARCH_PRODUCTS, filteredProducts: products })
  }
}

export const searchAssets = text => (dispatch, getState) => {
  const { assets } = getState().assets
  const filteredAssets = assets.filter(asset => asset.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_ASSETS, filteredAssets: filteredAssets })
  } else {
    dispatch({ type: SEARCH_ASSETS, filteredAssets: assets })
  }
}

export const searchRoles = text => (dispatch, getState) => {
  const { roles } = getState().roles
  const filteredRoles = roles.filter(role => role.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_ROLES, filteredRoles: filteredRoles })
  } else {
    dispatch({ type: SEARCH_ROLES, filteredRoles: roles })
  }
}

export const searchUsers = text => (dispatch, getState) => {
  const { users } = getState().user
  const filteredUsers = users.filter(user => user.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_USERROLE, filteredUsers: filteredUsers })
  } else {
    dispatch({ type: SEARCH_USERROLE, filteredUsers: users })
  }
}

export const fetchInvoices = async dispatch => {
  await firestore()
    .collection('invoices')
    .get()
    .then(snapshot => {
      const invoices = snapshot.docs.map(doc => {
        const data = doc.data();
        const invoiceCode = doc.id;
        return { invoiceCode, ...data }
      })
      console.log('fetchInvoices')
      return dispatch({ type: FETCH_INVOICES, invoices: invoices })
    })
    .catch(error => {
      console.log('Error while fetching invoices action', error);
    })
}

export const createNewInvoice = (data, navigation) => (dispatch, getState) => {
  const { currentUser } = getState().user
  const dataParse = {
    productId: data.productId,
    productName: data.productName,
    seller: currentUser.name,
    total: data.total,
    dateTimeCreated: data.dateTimeCreated,
    items: data.inputs,
    status: 'cancel',
    discount: data.discount,
    promo: data.selectedPromo,
    custom: data.custom,
    finalTotal: data.finalTotal,
    capitalPriceTotal: data.capitalPriceTotal

  }

  firestore().collection('invoices')
    .doc(data.invoiceCode)
    .set(dataParse)
    .then(() => {
      dispatch({ type: ADD_INVOICE, invoice: { ...dataParse, invoiceCode: data.invoiceCode } })
    })
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
          routes: [
            {
              name: 'InvoiceScreen',
              params: {
                inputs: data.inputs,
                total: data.total,
                stock: data.stock,
                discount: data.discount,
                selectedPromo: data.selectedPromo,
                productId: data.productId,
                productName: data.productName,
                custom: data.custom,
                dateTimeCreated: data.dateTimeCreated,
                mode: '',
                invoiceCode: data.invoiceCode,
                status: 'cancel'
              }
            }
          ]
        })
      )
    })
    .catch(error => { console.log('Error while creating invoice action', error) })
}

export const updateProductData = data => (dispatch, getState) => {
  const { products } = getState().products
  const productsInlier = products.filter(product => product.id !== data.productId)
  const productsOutlier = products.filter(product => product.id === data.productId)[0]

  const nextCompleteTx = productsOutlier.completeTx + 1

  const originalVariant = productsOutlier.variants
  const changedVariantIndexes = data.inputs.map(input => input.indexPos)
  const inlierVariant = originalVariant.filter(variant => changedVariantIndexes.indexOf(variant.indexPos) === -1)
  const outlierVariant = data.inputs

  firestore().collection('products').doc(data.productId)
    .update({
      completeTx: nextCompleteTx,
      lastTx: firestore.Timestamp.now(),
      variants: [
        ...inlierVariant,
        ...outlierVariant
      ]
    })
    .then(() => {
      const productsResult = [
        ...productsInlier,
        {
          ...productsOutlier,
          completeTx: nextCompleteTx,
          lastTx: firestore.Timestamp.now(),
          variants: [
            ...inlierVariant,
            ...outlierVariant
          ]
        }
      ]
      dispatch({ type: UPDATE_PRODUCT, products: productsResult })
    })
}

export const updateInventoryData = (data, productName, addData, onDelete) => (dispatch, getState) => {
  const { products } = getState().products
  const { id } = data

  const productsInlier = products.filter(product => product.id !== id)
  const productsOutlier = products.filter(product => product.id === id)[0]

  const productsResult = [
    ...productsInlier,
    {
      ...productsOutlier,
      name: productName,
      variants: addData
    }
  ]

  dispatch({ type: UPDATE_PRODUCT, products: productsResult })
}

export const updateAssetsData = data => (dispatch, getState) => {
  const { assets } = getState().assets
  const { id } = data

  const currentAssets = assets.filter(asset => asset.id !== id)

  const newAssets = [
    ...currentAssets,
    data
  ]

  dispatch({ type: UPDATE_ASSET, assets: newAssets })
}

export const updatePromosData = data => (dispatch, getState) => {
  const { promos } = getState().promos
  const { id } = data

  const currentPromos = promos.filter(promo => promo.id !== id)

  const newPromos = [
    ...currentPromos,
    data
  ]

  dispatch({ type: UPDATE_PROMOS, promos: newPromos })
}

export const addInventoryData = singleObj => (dispatch, getState) => {
  const { products } = getState().products
  const newProducts = [
    ...products,
    singleObj
  ]
  dispatch({ type: UPDATE_PRODUCT, products: newProducts })
}

export const addAssetsData = singleObj => (dispatch, getState) => {
  const { assets } = getState().assets
  const newAssets = [
    ...assets,
    singleObj
  ]
  dispatch({ type: UPDATE_ASSET, assets: newAssets })
}

export const addRolesData = singleObj => (dispatch, getState) => {
  const { roles } = getState().roles
  const newRoles = [
    ...roles,
    singleObj
  ]
  dispatch({ type: UPDATE_ROLES, roles: newRoles })
}

export const addPromosData = singleObj => (dispatch, getState) => {
  const { promos } = getState().promos
  const newPromos = [
    ...promos,
    singleObj
  ]
  dispatch({ type: UPDATE_PROMOS, promos: newPromos })
}

export const addAssetsOwnerItem = (name, id) => (dispatch, getState) => {
  const { assetsOwners } = getState().assets
  const newAssetsOwners = [
    ...assetsOwners,
    { name, id }
  ]
  dispatch({ type: UPDATE_ASSET_OWNER, assetsOwners: newAssetsOwners })
}

export const addAssetsTypeItem = (name, id) => (dispatch, getState) => {
  const { assetsTypes } = getState().assets
  const newAssetsTypes = [
    ...assetsTypes,
    { name, id }
  ]
  dispatch({ type: UPDATE_ASSET_TYPES, assetsTypes: newAssetsTypes })
}

export const updateInvoiceStatus = (data, status) => (dispatch, getState) => {
  const { invoices } = getState().invoices
  const inlier = invoices.filter(invoice => invoice.invoiceCode !== data.invoiceCode)
  const outlier = invoices.filter(invoice => invoice.invoiceCode === data.invoiceCode)[0]
  const invoice = [
    ...inlier,
    {
      ...outlier,
      status: status
    }
  ]
  dispatch({ type: UPDATE_INVOICE, invoices: invoice })
}

export const updateInvoiceReason = (data, reason) => (dispatch, getState) => {
  const { invoices } = getState().invoices
  const inlier = invoices.filter(invoice => invoice.invoiceCode !== data.invoiceCode)
  const outlier = invoices.filter(invoice => invoice.invoiceCode === data.invoiceCode)[0]
  const invoice = [
    ...inlier,
    {
      ...outlier,
      reason: reason
    }
  ]
  dispatch({ type: UPDATE_INVOICE, invoices: invoice })
}

export const searchInvoices = text => (dispatch, getState) => {
  const { invoices } = getState().invoices
  const filteredInvoices = invoices.filter(item => item.productName.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_INVOICES, filteredInvoices: filteredInvoices })
  } else {
    dispatch({ type: SEARCH_INVOICES, filteredInvoices: invoices })
  }
}

export const searchPromos = text => (dispatch, getState) => {
  const { promos } = getState().promos
  const filteredPromos = promos.filter(promo => promo.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
  if (text) {
    dispatch({ type: SEARCH_PROMOS, filteredPromos: filteredPromos })
  } else {
    dispatch({ type: SEARCH_PROMOS, filteredPromos: promos })
  }
}