import { all, takeLatest } from 'redux-saga/effects';

import { addUser } from './users';

import { Types as UserTypes } from '../ducks/users';

export default function* rootSata() {
  yield all([takeLatest(UserTypes.ADD_REQUEST, addUser)]);
}
