import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/${action.payload.user}`);

    const isDuplicated = yield select(state => state.users.users.find(user => user.login === data.login));

    if (isDuplicated) {
      yield put(UserActions.addUserFailure('User already saved'));
    } else {
      const userData = {
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        position: action.payload.position,
      };

      yield put(UserActions.addUserSuccess(userData));
    }
  } catch (err) {
    yield put(UserActions.addUserFailure('User not found'));
  }
}
