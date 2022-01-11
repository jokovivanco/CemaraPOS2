import {
  SEARCH_PRODUCTS,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT
} from "../constants"

const initialState = {
  products: [],
  filteredProducts: [],
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.products,
        products: action.products
      }
    case SEARCH_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.filteredProducts
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        filteredProducts: action.products,
        products: action.products
      }
    default:
      return state
  }

}

export default products