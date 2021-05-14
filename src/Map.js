import React from 'react';
import { Grid, Image, Icon, Header, Button, List, Card } from 'semantic-ui-react';
import {ROS2D} from 'ros2d'; 

class Map extends React.Component {

    constructor(props)
    {
        super(props)
    }

    componentDidMount() {

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

  


       return ( 
           <div id='map'>
              
            
          </div>
           )
       
    }
   }


export default Map
