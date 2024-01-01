import React, { Component } from "react";
import { Joystick } from "react-joystick-component"
import Config from "../scripts/config";
import ROSLIB from "roslib";



class Map extends Component{
    state={ ros:null };

    constructor() {
        super();
        //this.init_connection = this.view_map.bind(this);
        this.view_map = this.view_map.bind(this);
      }

    // init_connection() {
    //     //this.setState({ ros: new ROSLIB.Ros() });
    //     this.state.ros = new ROSLIB.Ros();
    //     console.log("Map:" + this.state.ros);
    //     try {
    //         this.state.ros.connect(
    //         "ws://192.168.10.17:9090"
    //         );
    //     } catch (error) {
    //         console.log("cannot connect to the WS robot. Try again after 1 second");
    //     }
    // }
    
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
                //   "ws://192.168.10.17:9090"
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
                //   "ws://192.168.10.17:9090"
            "ws://192.168.10.102:9090"
              );
          } catch (error){
              console.log("connect error !!");
              this.setState({ connected: false });
          } 
     }, 1000); 

  }

    componentDidMount() {
        this.init_connection();
        console.log("Map: componentDidMount" + this.state.ros);
        this.view_map();
    }
    
    view_map() {
        var viewer = new window.ROS3D.Viewer({
            divID: "nav_div",
            width: 1000,
            height: 840,
            antialias : true
        });
        var tfClient = new ROSLIB.TFClient({
            ros: this.state.ros,
            angularThres : 0.01,
            transThres : 0.01,
            rate : 10.0,
            fixedFrame : '/base_link'
          });
          // Setup the marker client.
        var markerClient = new window.ROS3D.MarkerClient({
            ros: this.state.ros,
            tfClient : tfClient,
            topic : '/current_pose_mark1',
            rootObject : viewer.scene,
          });
        
          var markerClient = new window.ROS3D.MarkerClient({
            ros: this.state.ros,
            tfClient : tfClient,
            topic : '/next_target_mark1',
            rootObject : viewer.scene,
          });


        var tmpSub = new window.ROS3D.PointCloud2({
            ros: this.state.ros,
            tfClient: tfClient, 
            rootObject: viewer.scene,
            topic: '/points_map',
            material: {size: 0.2, color: 0xeeeeee },
            max_pts: 5000000
    
         });

         var markerWaypoint = new window.ROS3D.MarkerArrayClient({
            ros: this.state.ros,
            tfClient : tfClient,
            topic : '/waypoints_mark',
            rootObject : viewer.scene,            
         })
    
        //tmpSub.processMessage(msg);
        
        // var navClient = new window.NAV2D.OccupancyGridClientNav({
        //   ros: this.state.ros,
        //   rootObject: viewer.scene,
        //   viewer: viewer,
        //   serverName: "/move_base",
        //   withOrientation: true,
        // });
    }
    
    render() {
        return (
            <div id="nav_div">Viewer</div>
        );
    }
}
    
export default Map;