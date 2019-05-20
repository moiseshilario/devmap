import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import { UserMarker } from './styles';

import Aside from '../Aside';
import InputModal from '../InputModal';

import { Creators as UserActions } from '../../store/ducks/users';

import mapboxConfig from '../../config/mapbox';

class Map extends Component {
  state = {
    showModal: false,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
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
    this.setState({ showModal: false });
  };

  onCancel = () => {
    this.setState({ showModal: false });
  };

  onRemoveUser = (login) => {
    this.props.removeUser(login);
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

    this.setState({
      showModal: true,
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
    const { showModal, viewport } = this.state;
    const { users } = this.props;
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <Aside onRemoveUser={this.onRemoveUser} />
        {showModal && <InputModal onSubmit={this.onSubmit} onCancel={this.onCancel} />}
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
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
