import React from 'react'
import ROSLIB from 'roslib'

import { Divider, Button, Header, Card, Grid } from 'semantic-ui-react';
import Panel from './panel';
import ROSInfoView from './rosInfoView';

import NippleController from "./nippleControl";

class ROSWrapper extends React.Component {

    constructor(props) {
        super(props);

        var hostname = window.location.hostname;
        this.state = {
            connected: false,
            ros: null,
            loading: false,
            rosbridge_address: 'ws://' + hostname, //extract hostname from window
            port: '9090',
            actionClient: null,
            goal: null,
            poseTopic: null,
            cmdTopic: null,
            batteryTopic: null,
        };

    }

    connect = () => {
        let loading = true;
        console.log(this.state);
        let ros = new ROSLIB.Ros({
            url: this.state.rosbridge_address + ':' + this.state.port
        });


        ros.on('connection', () => {
            // connect move_base action client.
            var actionClient = new ROSLIB.ActionClient({
                ros: ros,
                serverName: "/move_base",
                actionName: "move_base_messages/MoveBaseAction"
            });

            // choosing /amcl_pose as the global_ekf doesn't emit a topic
            var poseTopic = new ROSLIB.Topic({
                ros: ros,
                name: "/fiducial_pose",
                messageType: "geometry_msgs/PoseWithCovarianceStamped"
            });

            var batteryTopic = new ROSLIB.Topic({
                ros: ros,
                name: "/battery_state",
                messageType: "sensor_msgs/BatteryState"
            });

            var cmdTopic = new ROSLIB.Topic({
                ros: ros,
                name: "/cmd_vel",
                messageType: "geometry_msgs/Twist"
            });

            this.setState({
                connected: true,
                loading: false,
                actionClient: actionClient,
                poseTopic: poseTopic,
                cmdTopic: cmdTopic,
                batteryTopic: batteryTopic
            });

        })
        ros.on('error', (error) => {
            console.log(error);
        })
        ros.on('close', () => {
            this.setState({
                connected: false,
                loading: false
            });
        });

    }

    disconnect() {
        this.state.ros.close();
    }

    set_goal = (g) => {
        this.setState((state) => {
            return { goal: g };
        });
    }

    cancel = () => {
        if (this.state.goal) {
            this.state.goal.cancel();
            this.setState((state) => {
                return { goal: null };
            });
        };
    }

    reverse = () => {
        this.state.cmdTopic.publish({
            "linear": { "x": -1, "y": 0, "z": 0 },
            "angular": { "x": 0, "y": 0, "z": 0 }
        });
    }

    move = (dv, dt) => {
        this.state.cmdTopic.publish({
            "linear": { "x": dv, "y": 0, "z": 0 },
            "angular": { "x": 0, "y": 0, "z": dt }
        });
    }

    componentDidMount = () => {
        // attempt automatic connection
        this.connect();
    }


    render() {

        var stop_button_active = 'disabled';
        if (this.state.goal) {
            stop_button_active='disabled';
        }

        //If connected
        if (this.state.connected) {
            return (
                    <>
                        <Card> <Button onClick={this.cancel} color="red" active={this.state.goal} >STOP</Button> </Card>

                        <Panel actionClient={this.state.actionClient} set_goal={this.set_goal} reverse={this.reverse} />
                        <Divider />
                        <NippleController 
                            cmd_vel={this.move}
                            title="Controller"
                            width={100}
                            height={100}
                            options={{
                                mode: "static",
                                color: "blue",
                                position: { top: "50%", left: "50%" }
                                }}  
                        />
                        <Divider />
                        <ROSInfoView ros_state={this.state} />

                    </>

                )
        }
        else {

            return (
                <p>
                   <Card> <Button onClick={this.connect} >Connect to Robot</Button></Card>
                </p>
            )
        }

    }
}

export default ROSWrapper

