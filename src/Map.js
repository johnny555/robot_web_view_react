import React from 'react';
import { Grid, Image, Icon, Header, Button, List, Card } from 'semantic-ui-react';
import Waypoint from "./waypoint";
import {ROS2D} from 'ros2d'; 

class Map extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {locations: []}
    }

    componentDidMount() {
        fetch('/api/locations')
        .then(res => res.json())
        .then((data) => {
            this.setState({ locations: data })
        })
        .catch(console.log)

        var viewer = new ROS2D.Viewer({
            divID: 'map',
            width: 600,
            height: 500
        });

        var gridClient = new ROS2D.OccupancyGridClient({
           ros : this.props.ros,
           rootObject : viewer.scene
        });

        gridClient.on('change', function(){
         viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
       });
    }


    render() {

       const elements = []

       for (const [index, value] of this.state.locations.entries() ) {
           elements.push(<Waypoint 
                    name={value.name}
                    color={value.color} 
                    key={index} 
                    actionClient={this.props.actionClient}
                    pose={value.pose}
                    set_goal={this.props.set_goal}
                    ></Waypoint>)
       }


       return ( 
           <div id='map'>
              
            
          </div>
           )
       
    }
   }


export default Map
