import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Creators as UserActions } from '../../store/ducks/users';

import { AsideContainer, Separator } from './styles';

const Aside = ({ users, onRemoveUser, onLocateUser }) => (
  <AsideContainer>
    <h1>Users</h1>
    <ul>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Fragment key={user.login}>
            <li className="user">
              <img src={user.avatar} alt={`profile-${user.login}`} />
              <div className="user__info">
                <p className="user__name">{user.name}</p>
                <p className="user__login">{user.login}</p>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => onRemoveUser(user.login)}
              >
                <i className="fas fa-times" />
              </button>

              <button
                type="button"
                className="locate-button"
                onClick={() => onLocateUser(user.position)}
              >
                <i className="fas fa-chevron-right" />
              </button>
            </li>
            {index < users.length - 1 && <Separator />}
          </Fragment>
        ))
      ) : (
        <p>Click on the map to add a user</p>
      )}
    </ul>
  </AsideContainer>
);

Aside.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  onLocateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
