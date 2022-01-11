import {
  FETCH_PROMOS,
  SEARCH_PROMOS,
  UPDATE_PROMOS
} from "../constants"

const initialState = {
  promos: [],
  filteredPromos: []
}

const promos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROMOS:
      return {
        ...state,
        promos: action.promos,
        filteredPromos: action.promos
      }
    case SEARCH_PROMOS:
      return {
        ...state,
        filteredPromos: action.filteredPromos
      }
    case UPDATE_PROMOS:
      return {
        ...state,
        filteredPromos: action.promos,
        promos: action.promos
      }
    default:
      return state
  }

}

export default promos


