import React, { Component } from "react";
import { Joystick } from "react-joystick-component"
import Config from "../scripts/config";
import ROSLIB from "roslib";

class Teleoperation extends Component{
    state={ ros:null,  cmd_vel: null };

    constructor() {                     
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
        // this.animationFrameId = null;


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

        this.state.cmd_vel = new ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });


    }

    handleMove(event){
        console.log("Robot moving");
        //We need to create a ROS publisher on the topic cmd_vel
        // var cmd_vel = new ROSLIB.Topic({
        //     ros: this.state.ros,
        //     name: "/cmd_vel",
        //     messageType: "geometry_msgs/Twist",
        // })
        
        //We need to create a twist message to be to published to ROSbridge
        var twist = new ROSLIB.Message({
            linear: {
                x: 0.2*event.y,
                y: 0,
                z: 0,
            },
            angular: {
                x :0,
                y :0,
                z :-0.2*event.x,
            }
        });

        //We need to publish message on the cmd_vel topic
        this.state.cmd_vel.publish(twist);
        // this.animationFrameId = requestAnimationFrame(this.handleMove);
    }

    handleStop(event){
        console.log("Robot Stop");
        // var cmd_vel = new ROSLIB.Topic({
        //     ros: this.state.ros,
        //     name: "/cmd_vel",
        //     messageType: "geometry_msgs/Twist",
        // })

        // cancelAnimationFrame(this.animationFrameId);


        //We need to create a twist message to be to published to ROSbridge
        var twist = new ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0,
            },
            angular: {
                x :0,
                y :0,
                z :0,
            }
        });

        //We need to publish message on the cmd_vel topic
        this.state.cmd_vel.publish(twist)
    }

    render(){
        return (
            <div>
                <Joystick 
                size={100} 
                sticky={true} 
                baseColor="gray" 
                stickColor="black" 
                move={this.handleMove} 
                stop={this.handleStop}
                ></Joystick>

            </div>
        )
    }
}

export default Teleoperation;