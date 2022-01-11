import {
  SEARCH_ASSETS,
  FETCH_ASSETS,
  UPDATE_ASSET,
  FETCH_ASSETS_OWNERS,
  FETCH_ASSETS_TYPES,
  UPDATE_ASSET_OWNER,
  UPDATE_ASSET_TYPES
} from "../constants"

const initialState = {
  assets: [],
  filteredAssets: [],
  assetsOwners: [],
  assetsTypes: []
}

const assets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS:
      return {
        ...state,
        filteredAssets: action.assets,
        assets: action.assets
      }
    case FETCH_ASSETS_OWNERS:
      return {
        ...state,
        assetsOwners: action.assetsOwners
      }
    case FETCH_ASSETS_TYPES:
      return {
        ...state,
        assetsTypes: action.assetsTypes
      }
    case SEARCH_ASSETS:
      return {
        ...state,
        filteredAssets: action.filteredAssets
      }
    case UPDATE_ASSET:
      return {
        ...state,
        filteredAssets: action.assets,
        assets: action.assets
      }
    case UPDATE_ASSET_OWNER:
      return {
        ...state,
        assetsOwners: action.assetsOwners
      }

    case UPDATE_ASSET_TYPES:
      return {
        ...state,
        assetsTypes: action.assetsTypes
      }
    default:
      return state
  }

}

export default assets