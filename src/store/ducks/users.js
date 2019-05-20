/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'users/ADD_USER_REQUEST',
  ADD_SUCCESS: 'users/ADD_USER_SUCCESS',
  ADD_FAILURE: 'users/ADD_USER_FAILURE',
  REMOVE: 'users/REMOVE',
};

/**
 * Actions
 */
export const Creators = {
  addUserRequest: (user, position) => ({
    type: Types.ADD_REQUEST,
    payload: { user, position },
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
  removeUser: login => ({
    type: Types.REMOVE,
    payload: { login },
  }),
};

/**
 * Reducer
 */
const INITIAL_DATA = {
  users: [],
  error: null,
  loading: false,
};

export default function users(state = INITIAL_DATA, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload.data],
        loading: true,
        error: null,
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.REMOVE:
      return {
        ...state,
        users: state.users.filter(user => user.login !== action.payload.login),
      };
    default:
      return state;
  }
}
