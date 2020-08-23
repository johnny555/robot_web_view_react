import React from 'react'
import { Grid, Image, Icon, Header, Button, List, Card } from 'semantic-ui-react'
import Waypoint from "./waypoint";

class ROSInfoView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {pose_msg: {pose: "{}"}};
    }

    componentDidMount = () => {
        // assume connected. 
        this.props.ros_state.poseTopic.subscribe((pose) => {
            this.setState({pose_msg: pose});
        });

    }


    render() {

        var msg;
        if (this.state.pose_msg.pose.pose) {
            msg = this.state.pose_msg.pose.pose.position.x;
        }
        else { msg = "No data"}

       return ( 
           <div>
               Robot pose: 
               { msg.toString() }
          </div>
           )
       
    }
   }


export default ROSInfoView
