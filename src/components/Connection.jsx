import React, { Component } from "react";
//  import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Config from "../scripts/config";

import ROSLIB from "roslib";
//import ROS2D from "ros2d";

class Connection extends Component {
    //state = {connected: false};
    state = {connected: false, ros: null};   


    constructor() {
        super();
        this.init_connection();
    }

    init_connection(){
        this.state.ros = new ROSLIB.Ros();
        //var ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on('connection', () =>{
            console.log("connection established!");
            this.setState({ connected: true });

        });



        this.state.ros.on('close', () => {
            console.log("disconnection!!");
            this.setState({ connected: false });

            //try reconnecting every 3 seconds
            setTimeout(() => {
                try{
                    this.state.ros.connect(
                //         "ws://" +
                //             Config.ROSBRIDGE_SERVER_IP +
                //             ":" +
                //             Config.ROSBRIDGE_SERVER_PORT +
                //  ""
                    // "ws://192.168.10.17:9090"
                    "ws://192.168.10.102:9090"
                    );
                } catch (error){
                    console.log("connect error !!");
                    this.setState({ connected: false });
                }
            }, 1000);            

        });

        this.state.ros.on('error', () => {
            console.log("connect error !!");
            this.setState({ connected: false });
        //     setTimeout(() => {
        //         try{
        //             this.state.ros.connect(
        // //             "ws://" +
        // //             Config.ROSBRIDGE_SERVER_IP +
        // //             ":" +
        // //             Config.ROSBRIDGE_SERVER_PORT +
        // //  ""
        //             "ws://192.168.10.48:9090"
        //             );
        //         } catch (error){
        //             console.log("connect error !!");
        //             this.setState({ connected: false });
        //         }
        //     }, 1000); 

        });

        setTimeout(() => {
            try{
                this.state.ros.connect(
    //            "ws://" +
    //            Config.ROSBRIDGE_SERVER_IP +
    //            ":" +
    //            Config.ROSBRIDGE_SERVER_PORT +
    //  ""
                // "ws://192.168.10.17:9090"
                "ws://192.168.10.102:9090"
                );
            } catch (error){
                console.log("connect error !!");
                this.setState({ connected: false });
            } 
       }, 1000); 

    }

    render() {
        return (
            <div>
                <h2>Connection</h2>
                <Alert className="text-center m-3" variant={this.state.connected? "success" : "danger"}>{this.state.connected? "Robot Connected": "Robot Disconnected"}</Alert>
            </div>
        );
    }
}

export default Connection;