import {
  FETCH_INVOICES,
  ADD_INVOICE,
  SEARCH_INVOICES,
  UPDATE_INVOICE
} from "../constants"

const initialState = {
  invoices: [],
  filteredInvoices: []
}

const invoices = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES:
      return {
        ...state,
        filteredInvoices: action.invoices,
        invoices: action.invoices
      }
    case SEARCH_INVOICES:
      return {
        ...state,
        filteredInvoices: action.filteredInvoices
      }
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [
          ...state.invoices,
          action.invoice
        ],
        filteredInvoices: [
          ...state.invoices,
          action.invoice
        ]
      }
    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: action.invoices,
        filteredInvoices: action.invoices
      }
    default:
      return state
  }

}

export default invoices