import React from 'react'
import {RadialGauge} from 'react-canvas-gauges';

class ROSInfoView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {battery_msg: {}
        };
    }

    componentDidMount = () => {
        // assume connected. 
     
        this.props.ros_state.batteryTopic.subscribe((bat_msg) => {
            this.setState({battery_msg: bat_msg});
        })
    }


    render() {

       

        var voltage;
        if (this.state.battery_msg.voltage) {
            voltage = this.state.battery_msg.voltage;
        }
        else { voltage = 0.}

        var data_highlights = [
            { "from": 21, "to": 22, "color": "rgba(255,0,0,.15)" }
        ];

       return ( 
           <div>
           
               
               <RadialGauge
                    units='V'
                    title='Battery Voltage'
                    value={voltage}
                    minValue={21}
                    maxValue={25}
                    majorTicks={['21', '22', '23',  '24',  '25']}
                    minorTicks={2}
                    highlights={data_highlights}
                    ></RadialGauge>
                

          </div>
           )
       
    }
   }


export default ROSInfoView
