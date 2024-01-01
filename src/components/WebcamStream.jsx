import React, { Component } from 'react';

class WebcamStream extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      selectedDeviceId: null,
    };
  }

  async componentDidMount() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices.length > 0) {
        const deviceId = this.state.selectedDeviceId || videoDevices[0].deviceId;

        const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId } });

        if (this.videoRef.current) {
          this.videoRef.current.srcObject = stream;
        }
      } else {
        console.error('No video devices available.');
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }

  handleDeviceChange = (e) => {
    const selectedDeviceId = e.target.value;
    this.setState({ selectedDeviceId });

    // Reinitialize the webcam stream with the selected device
    this.componentDidMount();
  };

  render() {
    return(
      <div>
        <h2>Webcam Stream</h2>
        <div>
          <label>Select a webcam:</label>
          <select
            onChange={this.handleDeviceChange}
            value={this.state.selectedDeviceId || ''}
          >
            <option value="">Default</option>
            {navigator.mediaDevices.enumerateDevices().then(devices => (
              devices
                .filter(device => device.kind === 'videoinput')
                .map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))
            )
            )}
          </select>
        </div>
        <video ref={this.videoRef} autoPlay playsInline />
      </div>
    );
  }
}

export default WebcamStream;
