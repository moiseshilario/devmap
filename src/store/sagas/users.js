import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  toast.configure({
    position: toast.POSITION.TOP_RIGHT,
  });

  try {
    const { data } = yield call(api.get, `/${action.payload.user}`);

    const isDuplicated = yield select(state => state.users.users.find(user => user.login === data.login));

    if (isDuplicated) {
      yield put(UserActions.addUserFailure('User already saved'));

      toast.warn('Duplicated User!');
    } else {
      const userData = {
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        position: action.payload.position,
      };

      yield put(UserActions.addUserSuccess(userData));

      toast.success('User added successfuly!');
    }
  } catch (err) {
    yield put(UserActions.addUserFailure('User not found'));

    toast.error('Error adding user! Please try again later or check if the user exists.');
  }
}
