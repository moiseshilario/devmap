import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import 'react-toastify/dist/ReactToastify.min.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import { UserMarker } from './styles';

import Aside from '../Aside';
import InputModal from '../InputModal';

import { Creators as UserActions } from '../../store/ducks/users';
import { Creators as ModalActions } from '../../store/ducks/modal';

import mapboxConfig from '../../config/mapbox';

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
    },
    position: {
      latitude: null,
      longitude: null,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onSubmit = (e, input) => {
    e.preventDefault();

    this.props.addUserRequest(input, this.state.position);
  };

  onCancel = () => {
    this.props.hideModal();
  };

  onRemoveUser = (login) => {
    this.props.removeUser(login);
  };

  onLocateUser = ({ latitude, longitude }) => {
    this.setState(previousState => ({
      viewport: {
        ...previousState.viewport,
        latitude,
        longitude,
      },
    }));
  };

  resize = () => {
    this.setState(previousState => ({
      viewport: {
        ...previousState.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }));
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;

    // alert(`Latitude: ${latitude} \nLongitude: ${longitude}`);
    this.props.showModal();
    this.setState({
      position: {
        latitude,
        longitude,
      },
    });
  };

  renderMarker = (user) => {
    const {
      position: { latitude, longitude },
      avatar,
      login,
    } = user;
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        // onClick={this.handleMapClick}
        captureClick
        key={login}
        offsetTop={-25}
        offsetLeft={-25}
      >
        <UserMarker alt="avatar" src={avatar} />
      </Marker>
    );
  };

  render() {
    const { viewport } = this.state;
    const { users, modalVisible } = this.props;
    return (
      <div>
        <Aside onRemoveUser={this.onRemoveUser} onLocateUser={this.onLocateUser} />
        {modalVisible && <InputModal onSubmit={this.onSubmit} onCancel={this.onCancel} />}
        <MapGL
          {...viewport}
          onClick={this.handleMapClick}
          mapStyle={mapboxConfig.mapStyle}
          mapboxApiAccessToken={mapboxConfig.token}
          onViewportChange={vp => this.setState({ viewport: vp })}
        >
          {!!users.length && users.map(user => this.renderMarker(user))}
        </MapGL>
      </div>
    );
  }
}

Map.propTypes = {
  addUserRequest: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
  modalVisible: state.modal.visible,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...UserActions,
    ...ModalActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
