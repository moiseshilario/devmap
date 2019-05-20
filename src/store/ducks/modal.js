/**
 * Types
 */
export const Types = {
  SHOW_MODAL: 'modal/SHOW',
  HIDE_MODAL: 'modal/HIDE',
};

/**
 * Actions
 */
export const Creators = {
  showModal: () => ({
    type: Types.SHOW_MODAL,
  }),
  hideModal: () => ({
    type: Types.HIDE_MODAL,
  }),
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  visible: false,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_MODAL:
      return { visible: true };
    case Types.HIDE_MODAL:
      return { visible: false };
    default:
      return state;
  }
}
