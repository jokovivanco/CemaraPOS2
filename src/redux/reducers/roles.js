import { FETCH_ROLES, SEARCH_ROLES, UPDATE_ROLES } from "../constants"

const initialState = {
  roles: [],
  filteredRoles: []
}

const roles = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return {
        ...state,
        roles: action.roles,
        filteredRoles: action.roles
      }
    case SEARCH_ROLES:
      return {
        ...state,
        filteredRoles: action.filteredRoles
      }
    case UPDATE_ROLES:
      return {
        ...state,
        filteredRoles: action.roles,
        roles: action.roles
      }
    default:
      return state
  }

}

export default roles


