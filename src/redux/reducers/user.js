import { USER_STATE_CHANGE, FETCH_USERROLE, SEARCH_USERROLE, UPDATE_USERROLE } from "../constants"

const initialState = {
  currentUser: [],
  users: [],
  filteredUsers: []
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case FETCH_USERROLE:
      return {
        ...state,
        users: action.users,
        filteredUsers: action.users
      }
    case SEARCH_USERROLE:
      return {
        ...state,
        filteredUsers: action.filteredUsers
      }
    case UPDATE_USERROLE:
      return {
        ...state,
        filteredUsers: action.users,
        users: action.users
      }

    default:
      return state
  }

}

export default user


