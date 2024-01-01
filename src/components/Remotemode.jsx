import React, { Component } from "react";
import { Joystick } from "react-joystick-component"
import Config from "../scripts/config";
import ROSLIB from "roslib";

class Teleoperation extends Component{
    state={ ros:null };

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);

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
                    // "ws://192.168.10.5:9090"
                    "ws://10.16.33.70:9090"
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
                "ws://192.168.10.5:9090"
                );
            } catch (error){
                console.log("connect error !!");
                this.setState({ connected: false });
            } 
       }, 1000); 

    }

}