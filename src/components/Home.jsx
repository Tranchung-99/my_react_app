import React, { Component } from "react";
import { Row, Col, Button, Container} from "react-bootstrap";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import WebcamCapture from "./Teleoperation2";
import Map from "./Map";
import Teleoperation2 from "./Teleoperation2";


//import Connection from "./components"


class Home extends Component {
    state = {};

    // increment_counter(){
    //     this.setState({counter:this.state.counter + 1})
    //     console.log(this.state.counter);
    // }

    render() {
        return(
            <Container>
                <div>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    <Row>
                        <Col>
                            <h2>Controller</h2>
                            <Teleoperation />
                        </Col>
                        <Col>
                            <Connection />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>Map</h1>
                            <Map></Map>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default Home;
