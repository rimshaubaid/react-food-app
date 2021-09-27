import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{
    color: 'white', 
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 2.5,
      lng: 2.0
    },
    zoom: 4
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCYSe88Tj9SKG9fM_6e9j03R1Rmob685pU'}}
          defaultCenter={{lat:13.3139843,lng:121.5640535}}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
        
            lat={1.3169018}
            lng={103.6967477}
            text="RoofTop Outlet"
          />

          <AnyReactComponent
          
            lat={13.01}
            lng={121.1}
            text="Main Branch"
          />
         
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;