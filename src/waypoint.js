import React from 'react'
import { Grid, Image, Icon, Header, Button, Card } from 'semantic-ui-react'
import ROSLIB from 'roslib'

class WayPoint extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            moving: false,
            goal: null
        }
    }

    setGoal = () => {
        console.log('setting goal... ')
        var goal = new ROSLIB.Goal({
            actionClient: this.props.actionClient,
            
            goalMessage : {
                target_pose : {
                  header : {
                    frame_id : '/map'
                  },
                  pose : this.props.pose.pose
                }
              }
        });

        goal.on('feedback', (feedback) => {
            console.log('Feedback: ' + feedback.sequence);
        });

        goal.on('result', (result) => {
            console.log('Final Result: ' + result.sequence);
            this.setState({ moving: false, goal: null });
        });

        goal.send();

        this.setState({ moving: true, goal: goal });

    }

    cancel = () => {
        this.state.goal.cancel();
        this.setState({ moving: false, goal: null })

    }


    render() {
        var meta = "";

        if (this.moving) {
            meta = "moving to goal ...";
        }
        var stopButton = "";

        //if (this.moving) {
            stopButton = <Button basic color="red" onClick={this.cancel}>Stop</Button>
        //}



        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.name} </Card.Header>
                    <Card.Meta>{meta} </Card.Meta>
                    <Button basic color="green" onClick={this.setGoal}>Go</Button>
                    { stopButton }   
                </Card.Content>

            </Card>


        )

    }
}

export default WayPoint
