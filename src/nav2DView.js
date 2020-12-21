import React from 'react'


class Nav2DView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {pose_msg: {pose: "{}"},
                      battery_msg: {}
        };
    }

    componentDidMount = () => {
        // assume connected. 
        this.props.ros_state.poseTopic.subscribe((pose) => {
            this.setState({pose_msg: pose});
        });
        this.props.ros_state.batteryTopic.subscribe((bat_msg) => {
            this.setState({battery_msg: bat_msg});
        })
    }


    render() {

        var msg;
        if (this.state.pose_msg.pose.pose) {
            msg = this.state.pose_msg.pose.pose.position.x;
        }
        else { msg = "No data"}

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
               Robot pose: 
               { msg.toString() }
               <br></br>
               
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


export default Nav2DView
