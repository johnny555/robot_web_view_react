import React from 'react'
import ROSLIB from 'roslib'

import { Input, Divider, Button, Icon } from 'semantic-ui-react';
import Panel from './panel';
import ROSInfoView from './rosInfoView';

class ROSWrapper extends React.Component {

    constructor() {
        super();

        this.state = {
            connected: false,
            ros: null,
            loading: false,
            rosbridge_address: 'ws://ubiquityrobot.local',
            port: '9090',
            actionClient: null,
            goal: null,
            poseTopic: null
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


            this.setState({
                connected: true,
                loading: false,
                actionClient: actionClient,
                poseTopic: poseTopic
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

    render() {

        //If connected
        if (this.state.connected) {
            return (
                <div>
                    <Panel actionClient={this.state.actionClient} />
                    <Divider />
                    <ROSInfoView ros_state={this.state} />
                </div>)
        }
        else {

            return (
                <p>
                    <Button onClick={this.connect} >Connect to Robot</Button>
                </p>
            )
        }

    }
}

export default ROSWrapper

